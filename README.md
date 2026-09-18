# ChessApps-Pages

Här finns ett **menysystem till mina schack-appar** som publiceras med GitHub Pages.

Den gemensamma startsidan ligger i roten och länkar vidare till varje publicerad app. Varje app ligger i en egen mapp så att apparna hålls åtskilda och får tydliga webbadresser.

Körbar startsida:

`https://tomaslennefors.github.io/ChessApps-Pages/`

## Trädstruktur

```text
ChessApps-Pages/                         ← hela området för GitHub publicering
│
├── index.html                           ← gemensam startsida/meny med länkar till apparna
├── README.md                            ← denna beskrivning av publiceringsstrukturen
│
└── Test/                                ← egen mapp för appen Test
    │
    ├── index.html                       ← startfilen som öppnar Test-appen
    ├── app.js                           ← vår JavaScript-kod för Test
    ├── styles.css                       ← vårt utseende för Test
    ├── VERSION.txt                      ← versions- och publiceringsinformation för Test
    │
    └── vendor/                          ← externa komponenter som Test använder
        │
        └── cm-chessboard/               ← den externa komponenten cm-chessboard 8.14.0
            │
            ├── src/                     ← komponentens JavaScript-programkod
            │   ├── lib/                 ← gemensamma hjälpfunktioner för komponenten
            │   ├── model/               ← komponentens data- och tillståndsmodeller
            │   └── view/                ← komponentens visning och användarinteraktion
            │
            ├── assets/                  ← komponentens CSS och grafiska resurser
            │   └── pieces/              ← SVG-filer med schackpjäser
            │
            ├── LICENSE                  ← licensvillkor för cm-chessboard
            └── VERSION.txt              ← versionsinformation för cm-chessboard
```

## Princip för nya appar

Varje ny schack-app ska få en egen mapp direkt under `ChessApps-Pages/`.

Exempel:

```text
ChessApps-Pages/
├── index.html
├── Test/
├── FEN_Skapa/
├── MattGen/
├── LenneChess/
└── ChessAnalys1/
```

Rotens `index.html` fungerar som gemensam meny. En app öppnas sedan via sin egen mapp, till exempel:

`https://tomaslennefors.github.io/ChessApps-Pages/Test/`
