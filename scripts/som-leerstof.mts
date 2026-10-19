// Haalt de theorie uit SOM (C:\Users\diego\som\src\stof\codes) en schrijft er markdown van.
// Gebruik: node --experimental-strip-types som-leerstof.mts <som-map> <uitvoer.md>
import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'

const [somMap, uit] = process.argv.slice(2)
const stof = join(somMap, 'src', 'stof')
const imp = (p: string) => import(pathToFileURL(join(stof, p)).href)

const HOOFDSTUKKEN: [string, string[]][] = [
  ['Rekenen', ['1a', '1b']],
  ['Algebra en machten', ['1c', '5a', '5b', '4a', '4b', '4c', '4d', '4e']],
  ['Statistiek en kansen', ['3a', '3b', '3c', '3d', '3e']],
  ['Haakjes', ['1d', '1e', '7a']],
  ['Breuken zonder letters', ['2a', '2b']],
  ['Breuken met letters', ['2c', '2d', '2e']],
  ['Lijnen en vergelijkingen', ['6a', '6b', '6c', '6d', '6e']],
  ['Hogeregraadsfuncties', ['7b', '7c', '5c', '5d', '5e', '7d', '7e']],
]

const { maakRng } = await imp('rng.ts')
// Nummer zoals SOM het toont: hoofdstuk plus letter in volgorde
const nr = (i: number, j: number) => `${i + 1}${"abcdefghijklmnop"[j]}`
const c = (s: unknown) => '`' + String(s).replace(/`/g, "'") + '`'
const tekst = (s: unknown) => String(s).replace(/\s+/g, ' ').trim()

const md: string[] = []
md.push('# Wiskunde')
md.push('')
md.push('> Alle theorie van de oefentoets **Startvaardigheden Wiskunde**, per onderwerp (1a t/m 8g), genummerd en geordend zoals in het oefenspel SOM hierboven: lees hier de theorie en oefen daarna in SOM.')
md.push('')
md.push('## Overzicht')
md.push('')
md.push('| Hoofdstuk | Codes en onderwerpen |')
md.push('|---|---|')

const onderwerpen: Record<string, any> = {}
for (const [, codes] of HOOFDSTUKKEN) for (const code of codes) onderwerpen[code] = (await imp(`codes/${code}.ts`)).onderwerp

HOOFDSTUKKEN.forEach(([naam, codes], i) => {
  md.push(`| ${i + 1}. ${naam} | ${codes.map((k, j) => `**${nr(i, j)}** ${onderwerpen[k].titel}`).join(' · ')} |`)
})
md.push('')

let teller = 0
HOOFDSTUKKEN.forEach(([naam, codes], i) => {
  md.push(`# Hoofdstuk ${i + 1}: ${naam}`)
  md.push('')
  codes.forEach((code, j) => {
    const o = onderwerpen[code]
    md.push(`## ${nr(i, j)} · ${o.titel}`)
    md.push('')
    md.push(`*${tekst(o.waarover)}${code !== nr(i, j) ? ` · in de oefentool: ${code}` : ""}*`)
    md.push('')
    for (const u of o.uitleg ?? []) {
      md.push(`**${tekst(u.kop)}**`)
      md.push('')
      md.push(tekst(u.tekst))
      md.push('')
      if (u.voorbeeld) {
        // Meerdere voorbeelden staan met drie of meer spaties uit elkaar: elk op een eigen regel
        md.push('> Voorbeeld: ' + String(u.voorbeeld).trim().split(/\s{3,}|\n/).map(x => c(tekst(x))).join('<br>'))
        md.push('')
      }
    }

    // Veel sommen trekken om alle valkuilen en tips te verzamelen
    const valkuilen = new Set<string>(), tips = new Set<string>()
    for (let z = 1; z <= 400; z++) {
      const op = o.maak(maakRng(z * 7919))
      for (const v of op.valkuilen ?? []) {
        // Zelfde fout met andere getallen of letters maar één keer tonen
        const t = tekst(v.heet)
        const sleutel = t.replace(/\d+/g, '#').replace(/\b[a-z]\b/gi, '@').replace(/harten|ruiten|schoppen|klaveren/g, 'S')
        if (![...valkuilen].some(x => x.split('\u0000')[0] === sleutel)) valkuilen.add(sleutel + '\u0000' + t)
      }
      if (op.tip) tips.add(tekst(op.tip))
    }

    // Eén uitgewerkt voorbeeld
    const vb = o.maak(maakRng(1000 + teller++))
    md.push('<details>')
    md.push(`<summary>Uitgewerkt voorbeeld: ${tekst(vb.opdracht)} ${tekst(vb.vraag)}</summary>`)
    md.push('')
    if (vb.keuzes?.length && vb.invoer === 'keuze') { md.push(`Keuzes: ${vb.keuzes.map(c).join(', ')}`); md.push('') }
    ;(vb.stappen ?? []).forEach((s: any, k: number) => {
      md.push(`${k + 1}. ${tekst(s.doe)}: ${c(tekst(s.werd))}${s.waarom ? ` *(${tekst(s.waarom)})*` : ''}`)
    })
    md.push('')
    md.push(`**Antwoord:** ${c(tekst(vb.antwoord))}`)
    md.push('')
    md.push('</details>')
    md.push('')

    if (tips.size) {
      md.push('**Onthoud**')
      md.push('')
      for (const t of [...tips].slice(0, 4)) md.push(`- ${t}`)
      md.push('')
    }
    if (valkuilen.size) {
      md.push('**Veelgemaakte fouten**')
      md.push('')
      for (const v of [...valkuilen].slice(0, 6)) md.push(`- ${v.split('\u0000')[1]}`)
      md.push('')
    }
  })
})

md.push('# Eigen notities')
md.push('')
md.push('Schrijf hier wat je zelf wilt onthouden.')
md.push('')
writeFileSync(uit, md.join('\n'))
console.log('geschreven:', uit, md.length, 'regels,', Object.keys(onderwerpen).length, 'onderwerpen')
