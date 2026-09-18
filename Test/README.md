# Test – cm-chessboard

Test-appen används för att prova `cm-chessboard` som grundkomponent för schackbräden i mina ChessApps.

## Starta appen

[**▶ Starta Test-appen**](https://tomaslennefors.github.io/ChessApps-Pages/Test/)

## Syfte

Appen provar själva schackbrädeskomponenten och dess grundläggande visning och interaktion. Version 1 har medvetet ingen fullständig schackregelkontroll.

## Struktur

```text
Test/                            ← appen Test
│
├── README.md                    ← denna beskrivning och startlänk
├── index.html                   ← appens startfil
├── app.js                       ← vår JavaScript-kod
├── styles.css                   ← vår layout och vårt utseende
├── VERSION.txt                  ← versions- och publiceringsinformation
│
└── vendor/                      ← externa komponenter som appen använder
    ├── README.md                ← förklaring av vendor-mappen
    └── cm-chessboard/           ← cm-chessboard 8.14.0
```

## Funktioner som testas

- flera brädteman
- Standard- och Staunty-pjäser
- koordinater av/på
- olika typer av ram
- vit eller svart orientering
- mus- och pekinteraktion
- responsiv storlek
- startställning, exempelställning och tomt bräde

## Extern komponent

Test använder **cm-chessboard 8.14.0**. De filer som krävs för den publicerade appen ligger under `vendor/cm-chessboard/`.

Licensinformationen för komponenten ligger kvar tillsammans med komponentfilerna.
