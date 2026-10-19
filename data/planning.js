// Vakken: afkorting -> naam en het leerstof-bestand in de map leerstof/
const VAKKEN = {
  db: {
    naam: 'Databases', bestand: 'databases.md',
    aanpak: 'Je hebt stof uit 6 weken. Je leert steeds twee weken nieuw, oefent die een paar dagen later en herhaalt ze een week daarna nog eens. Zo blijft het beter hangen.'
  },
  wi: {
    naam: 'Wiskunde', bestand: 'wiskunde.md', trainer: 'https://diegosemper.github.io/som/',
    trainerLabel: 'OEFENSPEL', trainerNaam: 'SOM: Startvaardigheden Wiskunde',
    trainerTekst: 'Korte rondes van vijf sommen, met bij elke fout de hele uitwerking. Werkt het best op je telefoon.',
    aanpak: 'De 8 hoofdstukken uit de leerstof hieronder, in dezelfde volgorde als in SOM. Lees per sessie eerst de theorie en oefen daarna dat hoofdstuk in SOM. Daarna volgen twee oefententamens.'
  },
  pr: {
    naam: 'Programmeren', bestand: 'programmeren.md', trainer: 'https://hanze-hbo-ict.github.io/programmeren/about/syllabus.html',
    trainerLabel: 'CURSUSSITE', trainerNaam: 'Programmeren: lessen en opgaven',
    trainerTekst: 'De cursussite met alle lessen, werkcolleges, opgaven en uitwerkingen van week 1 t/m 7.',
    aanpak: 'Week 1 t/m 7 van de cursussite. Lees per week de les, maak de Basis-opgaven en kijk ze na met de uitwerkingen. Picobot (week 1) komt niet terug op het tentamen, lussen en strings leveren de meeste punten op. Op het tentamen mag je een online Python-editor gebruiken.'
  },
  bk: {
    naam: 'Bedrijfskunde', bestand: 'bedrijfskunde.md', trainer: 'trainers/bedrijfskunde.html',
    aanpak: 'De 5 delen één voor één. Lees per deel de samenvatting in de trainer en doe daarna 20 vragen over dat hoofdstuk. Op het einde volgt een volledig oefententamen.'
  },
  sv: { naam: 'Schriftelijke vaardigheden', kort: 'Schriftelijk', bestand: 'schriftelijke-vaardigheden.md' }
};

// [iso-datum, label, [[vak, uren, notitie?]...], toets?]
const WEEKS = [
  ['Week 1 · 19 t/m 25 oktober', [
    ['2026-10-19', '19 okt', [['wi', 2, 'H1 Rekenen + H2 Algebra en machten'], ['bk', 1, 'Deel 1 BMC: bouwblok 1 t/m 4']]],
    ['2026-10-20', '20 okt', [['db', 2, 'Week 1 en 2 leren'], ['wi', 1, 'H3 Statistiek en kansen']]],
    ['2026-10-21', '21 okt', [['db', 1, 'Week 1 en 2 oefenen'], ['pr', 2, 'Week 1 Picobot (kort) + week 2: variabelen, if, strings en lijsten']]],
    ['2026-10-22', '22 okt', [['db', 2, 'Week 3 en 4 leren'], ['bk', 1, 'Deel 1 BMC: bouwblok 5 t/m 9 + oefenen']]],
    ['2026-10-23', '23 okt', [['wi', 2, 'H4 Haakjes + H5 Breuken zonder letters'], ['db', 1, 'Week 3 en 4 oefenen']]],
    ['2026-10-24', '24 okt', [['db', 2, 'Week 5 en 6 leren'], ['pr', 1, 'Week 3: functies, return, docstrings en asserts']]],
    ['2026-10-25', '25 okt', 'vrij']
  ]],
  ['Week 2 · 26 oktober t/m 1 november', [
    ['2026-10-26', '26 okt', [['sv', 2], ['wi', 1, 'H6 Breuken met letters']]],
    ['2026-10-27', '27 okt', [['sv', 2, 'tekst uit je hoofd'], ['db', 1, 'Week 5 en 6 oefenen']]],
    ['2026-10-28', '28 okt', [['bk', 2, 'Deel 2 Business Intelligence + deel 3 Kosten en opbrengsten']], 'Schriftelijke vaardigheden'],
    ['2026-10-29', '29 okt', [['wi', 2, 'H7 Lijnen en vergelijkingen'], ['db', 1, 'Herhalen week 1 en 2']]],
    ['2026-10-30', '30 okt', [['wi', 2, 'H8 Hogeregraadsfuncties'], ['pr', 1, 'Week 4: lussen (for, while, accumulator)']]],
    ['2026-10-31', '31 okt', [['wi', 2, 'Oefententamen: proeftoets in SOM'], ['db', 1, 'Herhalen week 3 en 4']]],
    ['2026-11-01', '1 nov', [['pr', 2, 'Week 5 geneste lussen + week 6 data en bestanden'], ['bk', 1, 'Deel 4 Procesmanagement']]]
  ]],
  ['Week 3 · 2 t/m 8 november', [
    ['2026-11-02', '2 nov', [['wi', 2, 'Fouten nakijken: theorie van je zwakke hoofdstukken'], ['db', 1, 'Herhalen week 5 en 6']]],
    ['2026-11-03', '3 nov', [['wi', 2, '2e oefententamen'], ['db', 1, 'Week 1 t/m 6: je zwakste punten']]],
    ['2026-11-04', '4 nov', [['db', 2, 'Week 1 t/m 6 samenvatten + oefenvragen']], 'Wiskunde'],
    ['2026-11-05', '5 nov', [['db', 3, 'Oefentoets + fouten']]],
    ['2026-11-06', '6 nov', [['pr', 2, 'Week 7 mutabiliteit + oefenmidterm uit week 4']], 'Databases'],
    ['2026-11-07', '7 nov', [['pr', 3, 'Oefententamen PGM1 + fouten nakijken']]],
    ['2026-11-08', '8 nov', [['pr', 2, 'Zwakke weken herhalen: Basis-opgaven opnieuw maken'], ['bk', 1, 'Deel 5 Automatisering']]]
  ]],
  ['Week 4 · 9 t/m 11 november', [
    ['2026-11-09', '9 nov', [['bk', 2, 'Volledig oefententamen in de trainer + fouten']], 'Programmeren'],
    ['2026-11-10', '10 nov', [['bk', 3, 'Alle 5 delen herhalen + oefenvragen']]],
    ['2026-11-11', '11 nov', [], 'Bedrijfskunde'],
    null, null, null, null
  ]]
];
