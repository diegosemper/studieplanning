# Programmeren (PGM1)

> De stof van **week 1 t/m 7** van de cursussite. Per week: wat je moet kunnen, de belangrijkste regels, en links naar de les, het werkcollege en de opgaven. Maak per week minstens de **Basis**-opgaven en kijk ze na met de uitwerkingen.

## Het tentamen

Het [PGM1-oefententamen](https://hanze-hbo-ict.github.io/programmeren/extra/practice/pgm1_examen.html) ([uitwerkingen](https://hanze-hbo-ict.github.io/programmeren/solutions/PGM1_examen.html)) laat zien wat je kunt verwachten: **7 opgaven, 90 punten**. Je mag een online Python-editor gebruiken (Online Python, Programiz of Trinket).

| Opgave | Punten | Wat er getoetst wordt | Week |
|---|---|---|---|
| 1 | 10 | Variabelen, rekenen, printen | 2 |
| 2 | 10 | `if` / `elif` / `else` met grenzen | 2 |
| 3 | 10 | Functie met `for` over een lijst, fout zoeken, docstring, asserts | 3 en 4 |
| 4 | 10 | `while`-lus met `input()`, teller en accumulator | 4 |
| 5 | 10 | Geneste lussen: een patroon printen | 5 |
| 6 | 15 | Strings slicen, alleen `len()` en `range()` toegestaan | 2 en 3 |
| 7 | 25 | Tekens tellen in een string, functies hergebruiken | 3 en 4 |

> Picobot (week 1) komt niet terug in het oefententamen. Daar ga je dus snel doorheen. Lussen (week 4) en strings (week 2) leveren de meeste punten op.

# Week 1 · Wat is informatica en Picobot

[Les: wat is informatica](https://hanze-hbo-ict.github.io/programmeren/lectures/1a_intro_programmeren.html) · [Les: Picobot](https://hanze-hbo-ict.github.io/programmeren/lectures/1b_picobot.html) · [Werkcollege](https://hanze-hbo-ict.github.io/programmeren/practicals/1_picobot.html) · [Uitwerking](https://hanze-hbo-ict.github.io/programmeren/solutions/1_picobot.html)

- Picobot is een robotje met **toestanden** en **regels**. Een regel zegt: in toestand X, met deze omgeving, zet een stap en ga naar toestand Y.
- Je leert hier vooral **probleemoplossend denken**: een groot probleem opdelen in kleine stappen.

# Week 2 · Variabelen, keuzes, strings en lijsten

[Les: maximum](https://hanze-hbo-ict.github.io/programmeren/lectures/2a_var_con.html) · [Les: strings en lists](https://hanze-hbo-ict.github.io/programmeren/lectures/2b_strings_en_lists.html) · [Rochambeau](https://hanze-hbo-ict.github.io/programmeren/practicals/2_rochambeau.html) · [Sequenties en data](https://hanze-hbo-ict.github.io/programmeren/practicals/2_sequenties_en_data.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/2_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/2_basis.html), [extra](https://hanze-hbo-ict.github.io/programmeren/problems/2_extra.html)

**Input, variabelen en datatypes**

- `input()` geeft altijd tekst terug. Wil je rekenen, zet het dan om: `getal = int(input("Geef een getal: "))`
- Datatypes: `int` (heel getal), `float` (kommagetal), `bool` (`True`/`False`), `str` (tekst), `list` (lijst).
- Rekenen: `7 / 2` is `3.5`, `7 // 2` is `3` (heel delen), `7 % 2` is `1` (rest), `2 ** 3` is `8`.

**Keuzes maken**

```python
if cijfer >= 7.5:
    print("Goed")
elif cijfer >= 5.5:
    print("Voldoende")
else:
    print("Onvoldoende")
```

- Een dubbelepunt achter elke voorwaarde, en de code eronder springt in.
- Python kiest het **eerste** blok dat klopt en slaat de rest over. Let dus op de volgorde.
- Bij `and` en `or` moet elke kant een volledige vergelijking zijn: `getal > 5 and getal < 10`, niet `getal > 5 and < 10`.

**Strings en lijsten**

- Tellen begint bij **0**: in `s = "hanze"` is `s[0]` gelijk aan `'h'` en `s[-1]` aan `'e'`.
- Slicen: `s[1:3]` is `'an'`. De stop doet **niet** mee.
- Weglaten mag: `s[:2]` is `'ha'`, `s[2:]` is `'nze'`. Met een stap: `s[::2]` is `'hne'`, en `s[::-1]` draait de string om.
- `len(s)` geeft de lengte, `+` plakt aan elkaar, `*` herhaalt: `2 * "ha" + "k"` is `'hahak'`.
- Een string kun je niet veranderen. Elke bewerking geeft een **nieuwe** string.

# Week 3 · Functies

[Les: functies](https://hanze-hbo-ict.github.io/programmeren/lectures/3a_functies.html) · [Les: functies aanroepen](https://hanze-hbo-ict.github.io/programmeren/lectures/3b_functies_aanroepen.html) · [Fijne functies](https://hanze-hbo-ict.github.io/programmeren/practicals/3_fijne_functies.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/3_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/3_basis.html), [extra](https://hanze-hbo-ict.github.io/programmeren/problems/3_extra.html)

```python
def flipside(s):
    """Geeft de tweede helft van s, gevolgd door de eerste helft."""
    x = len(s) // 2
    return s[x:] + s[:x]

assert flipside("homework") == "workhome"
assert flipside("a") == "a"
assert flipside("") == ""
```

- **Docstring**: de tekst tussen drie aanhalingstekens direct onder `def`. Op het tentamen wordt hij gevraagd.
- **`return` of `print`**: `return` geeft het resultaat terug aan wie de functie aanroept. `print` zet het alleen op het scherm. Een functie zonder `return` geeft `None` terug.
- **`assert`** test je functie. Klopt de bewering niet, dan krijg je een `AssertionError`. Test ook randgevallen, zoals een lege string. Op het tentamen moet je vaak **drie** asserts schrijven.
- Handige ingebouwde functies: `range(3, 11)` (3 t/m 10), `sum(...)`, `len(...)`.
- Een functie mag een andere functie aanroepen. Zo los je een groot probleem op met kleine stukken.

# Week 4 · Lussen

[Les: lussen](https://hanze-hbo-ict.github.io/programmeren/lectures/4a_lussen.html) · [Oefenmidterm](https://hanze-hbo-ict.github.io/programmeren/lectures/4b_midterm.html) · [Lussen in PythonBat](https://hanze-hbo-ict.github.io/programmeren/practicals/4_python_bat.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/4_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/4_basis.html), [extra](https://hanze-hbo-ict.github.io/programmeren/problems/4_extra.html)

**Het lusrecept: accumulator**

```python
def total(L):
    """Telt alle getallen in L op."""
    result = 0          # 1. beginwaarde
    for n in L:         # 2. langs alle elementen
        result += n     # 3. bijwerken
    return result       # 4. pas NA de lus teruggeven
```

- **`for`** gebruik je als je weet hoe vaak: langs een lijst, een string of `range(n)`.
- **`while`** gebruik je als je niet weet hoe vaak: zolang een voorwaarde klopt. Zorg dat die voorwaarde ooit onwaar wordt, anders blijft de lus eeuwig draaien.
- Langs de **elementen** (`for c in s`) is het simpelst. Langs de **indexen** (`for i in range(len(s))`) heb je nodig als je ook de buren wilt bekijken.
- `x += 1` is hetzelfde als `x = x + 1`. Een **teller** telt hoe vaak iets voorkomt, een **accumulator** verzamelt een totaal.
- `break` stopt de lus meteen, `continue` gaat door naar de volgende ronde. Een `return` in de lus stopt de hele functie.
- Valkuil: een `return` die in de lus staat in plaats van eronder. Dan stopt je functie na de eerste ronde.

```python
# while met input: tellen tot de gebruiker 0 typt
aantal = 0
totaal = 0
getal = int(input("Getal: "))
while getal != 0:
    aantal += 1
    totaal += getal
    getal = int(input("Getal: "))
print(aantal, totaal)
```

# Week 5 · Lussen in lussen

[Les: geneste lussen](https://hanze-hbo-ict.github.io/programmeren/lectures/5a_geneste_lus.html) · [ASCII Art](https://hanze-hbo-ict.github.io/programmeren/practicals/5a_ascii_art.html) · [Boter, kaas en eieren](https://hanze-hbo-ict.github.io/programmeren/practicals/5b_boter_kaas_eieren.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/5_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/5_basis.html), [extra](https://hanze-hbo-ict.github.io/programmeren/problems/5_extra.html)

**Patronen printen**

```python
def driehoek(n):
    """Print een driehoek van n regels hoog."""
    for rij in range(n):            # buitenste lus: de regels
        for kolom in range(rij + 1):  # binnenste lus: tekens op die regel
            print("*", end="")
        print()                     # nieuwe regel na elke rij
```

- De **buitenste** lus kiest de rij, de **binnenste** de kolom.
- `print(..., end="")` print zonder nieuwe regel. Een lege `print()` begint een nieuwe regel.

**2D-lijsten (rasters)**

- Een lijst van lijsten: `L = [[3, 2], [9, 2]]`. Eerst de rij, dan de kolom: `L[1][0]` is `9`.
- Een raster doorlopen: `for row in range(len(L)):` en daarbinnen `for col in range(len(L[0])):`.
- **Alle paren** vergelijken: laat de binnenste lus starten bij `ix1 + 1`, dan vergelijk je geen element met zichzelf en geen paar dubbel.
- Maximum zoeken: begin met het eerste element en vervang het als je iets groters vindt.

# Week 6 · Data en bestanden

[Les: data](https://hanze-hbo-ict.github.io/programmeren/lectures/6a_data.html) · [Fraaie plaatjes](https://hanze-hbo-ict.github.io/programmeren/practicals/6b_images.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/6_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/6_basis.html), [extra](https://hanze-hbo-ict.github.io/programmeren/problems/6_extra.html)

- Een variabele is een naam die naar een waarde in het geheugen wijst. Een **bit** is de kleinste eenheid, een **byte** is 8 bits.
- Het **type** bepaalt wat de bits betekenen: dezelfde bits kunnen een getal of een letter zijn.
- **ASCII** koppelt tekens aan getallen: `ord('C')` is `67`, en `chr(67)` is `'C'`. Hoofdletters komen vóór kleine letters, dus `'Z' < 'a'`.
- Een tekstbestand is een rij tekens. Een nieuwe regel is het teken `\n`.

```python
with open("namen.txt") as file:       # lezen
    for line in file:
        print(line.strip())           # strip() haalt de \n eraf

with open("namen.txt", "w") as file:  # schrijven (maakt het bestand leeg!)
    print("Anouk", file=file)
```

# Week 7 · Mutabiliteit en algoritmeontwerp

[Les: mutabiliteit](https://hanze-hbo-ict.github.io/programmeren/lectures/7a_lists_advanced.html) · [Vallende korrels](https://hanze-hbo-ict.github.io/programmeren/practicals/7b_vallende_korrels.html) · Opgaven: [opstap](https://hanze-hbo-ict.github.io/programmeren/problems/7_opstap.html), [basis](https://hanze-hbo-ict.github.io/programmeren/problems/7_basis.html), [extra: Game of Life](https://hanze-hbo-ict.github.io/programmeren/problems/7_extra.html)

- Een **lijst** kun je veranderen (`rij[1] = 5`), een **tuple** niet: `t[0] = 9` geeft een `TypeError`.
- `b = a` maakt **geen** kopie. Beide namen wijzen naar dezelfde lijst, dus `b[0] = 9` verandert ook `a`.
- Een echte kopie maak je met slicen: `kopie = a[:]`. Bij een 2D-lijst kopieer je elke rij: `[rij[:] for rij in bord]`.
- Een functie kan twee waarden teruggeven als tuple, en die pak je uit: `rij, kolom = midden(4)`.
- **Algoritmeontwerp**: laat elke functie één deelprobleem oplossen, test hem met een assert en bouw daarna de grotere functie op uit de kleine.

# Eigen notities

Schrijf hier wat je zelf wilt onthouden.
