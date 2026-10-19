// Vakken: afkorting -> naam en het leerstof-bestand in de map leerstof/
const VAKKEN = {
  db: { naam: 'Databases', bestand: 'databases.md' },
  wi: { naam: 'Wiskunde', bestand: 'wiskunde.md' },
  pr: { naam: 'Programmeren', bestand: 'programmeren.md' },
  bk: { naam: 'Bedrijfskunde', bestand: 'bedrijfskunde.md', trainer: 'trainers/bedrijfskunde.html' },
  sv: { naam: 'Schriftelijke vaardigheden', kort: 'Schriftelijk', bestand: 'schriftelijke-vaardigheden.md' }
};

// [iso-datum, label, [[vak, uren, notitie?]...], toets?]
const WEEKS = [
  ['Week 1 · 19 t/m 25 oktober', [
    ['2026-10-19', '19 okt', [['wi', 2], ['bk', 1]]],
    ['2026-10-20', '20 okt', [['db', 2], ['wi', 1]]],
    ['2026-10-21', '21 okt', [['db', 1], ['pr', 2]]],
    ['2026-10-22', '22 okt', [['db', 2], ['bk', 1]]],
    ['2026-10-23', '23 okt', [['wi', 2], ['db', 1]]],
    ['2026-10-24', '24 okt', [['db', 2], ['pr', 1]]],
    ['2026-10-25', '25 okt', 'vrij']
  ]],
  ['Week 2 · 26 oktober t/m 1 november', [
    ['2026-10-26', '26 okt', [['sv', 2], ['wi', 1]]],
    ['2026-10-27', '27 okt', [['sv', 2, 'tekst uit je hoofd'], ['db', 1]]],
    ['2026-10-28', '28 okt', [['bk', 2]], 'Schriftelijke vaardigheden'],
    ['2026-10-29', '29 okt', [['wi', 2], ['db', 1]]],
    ['2026-10-30', '30 okt', [['wi', 2], ['pr', 1]]],
    ['2026-10-31', '31 okt', [['wi', 2, 'oefententamen'], ['db', 1]]],
    ['2026-11-01', '1 nov', [['pr', 2], ['bk', 1]]]
  ]],
  ['Week 3 · 2 t/m 8 november', [
    ['2026-11-02', '2 nov', [['wi', 2, 'fouten nakijken'], ['db', 1]]],
    ['2026-11-03', '3 nov', [['wi', 2, '2e oefententamen'], ['db', 1]]],
    ['2026-11-04', '4 nov', [['db', 2]], 'Wiskunde'],
    ['2026-11-05', '5 nov', [['db', 3, 'oefentoets + fouten']]],
    ['2026-11-06', '6 nov', [['pr', 2]], 'Databases'],
    ['2026-11-07', '7 nov', [['pr', 3, 'oefententamen + fouten']]],
    ['2026-11-08', '8 nov', [['pr', 2], ['bk', 1]]]
  ]],
  ['Week 4 · 9 t/m 11 november', [
    ['2026-11-09', '9 nov', [['bk', 2]], 'Programmeren'],
    ['2026-11-10', '10 nov', [['bk', 3, 'alle 5 delen + oefenvragen']]],
    ['2026-11-11', '11 nov', [], 'Bedrijfskunde'],
    null, null, null, null
  ]]
];
