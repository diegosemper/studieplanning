# Studieplanning tentamenweken 2026

Een kleine webapp met mijn studieplanning (19 oktober t/m 11 november) en mijn leerstof per vak.

## Leerstof toevoegen

Elke vak heeft één bestand in de map `leerstof/`:

| Vak | Bestand |
|---|---|
| Databases | `leerstof/databases.md` |
| Wiskunde | `leerstof/wiskunde.md` |
| Programmeren | `leerstof/programmeren.md` |
| Bedrijfskunde | `leerstof/bedrijfskunde.md` |
| Schriftelijke vaardigheden | `leerstof/schriftelijke-vaardigheden.md` |

De bestanden zijn Markdown. Handige opmaak:

```markdown
## Kopje
**vet**, *schuin*, `code`
- lijstje

| kolom | kolom |
|---|---|
| a | b |

![uitleg](afbeeldingen/plaatje.png)

<details>
<summary>Oefenvraag</summary>
Verborgen antwoord
</details>
```

Afbeeldingen zet je in `leerstof/afbeeldingen/`.

Aanpassen kan direct op GitHub: open het bestand, klik op het potloodje, plak je tekst en klik op **Commit changes**. Na ongeveer een minuut staat het in de app.

## Planning aanpassen

De planning staat in `data/planning.js`. Elke dag ziet er zo uit:

```js
['2026-10-19', '19 okt', [['wi', 2], ['bk', 1, 'notitie']], 'Naam van toets (optioneel)'],
```

Afkortingen: `db` Databases, `wi` Wiskunde, `pr` Programmeren, `bk` Bedrijfskunde, `sv` Schriftelijke vaardigheden.
