// Vakken: afkorting -> naam en het leerstof-bestand in de map leerstof/
const VAKKEN = {
  db: { naam: 'Databases', bestand: 'databases.md' },
  wi: {
    naam: 'Wiskunde', bestand: 'wiskunde.md', trainer: 'https://diegosemper.github.io/som/',
    trainerLabel: 'OEFENSPEL', trainerNaam: 'SOM: Startvaardigheden Wiskunde',
    trainerTekst: 'Korte rondes van vijf sommen, met bij elke fout de hele uitwerking. Werkt het best op je telefoon.'
  },
  pr: { naam: 'Programmeren', bestand: 'programmeren.md' },
  bk: { naam: 'Bedrijfskunde', bestand: 'bedrijfskunde.md', trainer: 'trainers/bedrijfskunde.html' },
  sv: { naam: 'Schriftelijke vaardigheden', kort: 'Schriftelijk', bestand: 'schriftelijke-vaardigheden.md' }
};

// [iso-datum, label, [[vak, uren, notitie?]...], toets?]
const WEEKS = [
  ['Week 1 · 19 t/m 25 oktober', [
    ['2026-10-19', '19 okt', [['wi', 2, 'H1 Rekenen + H2 tot en met machten delen (1a–4b)'], ['bk', 1, 'Deel 1 BMC: bouwblok 1 t/m 4']]],
    ['2026-10-20', '20 okt', [['db', 2, 'Week 1 en 2 leren'], ['wi', 1, 'H2 afmaken: machten (4c, 4d, 4e)']]],
    ['2026-10-21', '21 okt', [['db', 1, 'Week 1 en 2 oefenen'], ['pr', 2]]],
    ['2026-10-22', '22 okt', [['db', 2, 'Week 3 en 4 leren'], ['bk', 1, 'Deel 1 BMC: bouwblok 5 t/m 9 + oefenen']]],
    ['2026-10-23', '23 okt', [['wi', 2, 'H3 Statistiek en kansen + H4 Haakjes'], ['db', 1, 'Week 3 en 4 oefenen']]],
    ['2026-10-24', '24 okt', [['db', 2, 'Week 5 en 6 leren'], ['pr', 1]]],
    ['2026-10-25', '25 okt', 'vrij']
  ]],
  ['Week 2 · 26 oktober t/m 1 november', [
    ['2026-10-26', '26 okt', [['sv', 2], ['wi', 1, 'H5 Breuken zonder letters']]],
    ['2026-10-27', '27 okt', [['sv', 2, 'tekst uit je hoofd'], ['db', 1, 'Week 5 en 6 oefenen']]],
    ['2026-10-28', '28 okt', [['bk', 2, 'Deel 2 Business Intelligence + deel 3 Kosten en opbrengsten']], 'Schriftelijke vaardigheden'],
    ['2026-10-29', '29 okt', [['wi', 2, 'H6 Breuken met letters + H7 Lijnen'], ['db', 1, 'Herhalen week 1 en 2']]],
    ['2026-10-30', '30 okt', [['wi', 2, 'H8 Hogeregraadsfuncties'], ['pr', 1]]],
    ['2026-10-31', '31 okt', [['wi', 2, 'Oefententamen: proeftoets in SOM'], ['db', 1, 'Herhalen week 3 en 4']]],
    ['2026-11-01', '1 nov', [['pr', 2], ['bk', 1, 'Deel 4 Procesmanagement']]]
  ]],
  ['Week 3 · 2 t/m 8 november', [
    ['2026-11-02', '2 nov', [['wi', 2, 'Fouten nakijken: theorie van je zwakke hoofdstukken'], ['db', 1, 'Herhalen week 5 en 6']]],
    ['2026-11-03', '3 nov', [['wi', 2, '2e oefententamen'], ['db', 1, 'Week 1 t/m 6: je zwakste punten']]],
    ['2026-11-04', '4 nov', [['db', 2, 'Week 1 t/m 6 samenvatten + oefenvragen']], 'Wiskunde'],
    ['2026-11-05', '5 nov', [['db', 3, 'Oefentoets + fouten']]],
    ['2026-11-06', '6 nov', [['pr', 2]], 'Databases'],
    ['2026-11-07', '7 nov', [['pr', 3, 'oefententamen + fouten']]],
    ['2026-11-08', '8 nov', [['pr', 2], ['bk', 1, 'Deel 5 Automatisering']]]
  ]],
  ['Week 4 · 9 t/m 11 november', [
    ['2026-11-09', '9 nov', [['bk', 2, 'Volledig oefententamen in de trainer + fouten']], 'Programmeren'],
    ['2026-11-10', '10 nov', [['bk', 3, 'Alle 5 delen herhalen + oefenvragen']]],
    ['2026-11-11', '11 nov', [], 'Bedrijfskunde'],
    null, null, null, null
  ]]
];
