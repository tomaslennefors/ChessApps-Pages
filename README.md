# ChessApps-Pages

Här finns det publika menysystemet för schackprojekten som publiceras med GitHub Pages.

Den gemensamma startsidan ligger i roten. Varje publicerat projekt ligger i en egen mapp med samma projektnamn som används i utvecklingsrepositoryt.

## App-meny

[**Öppna app-menyn**](https://tomaslennefors.github.io/ChessApps-Pages/)

## Publicerade projekt

- [E01_Test](https://tomaslennefors.github.io/ChessApps-Pages/E01_Test/) – ursprungligt komponenttest för cm-chessboard.
- [E02_Bräde](https://tomaslennefors.github.io/ChessApps-Pages/E02_Br%C3%A4de/) – experimentprojekt för brädkomponenten.

## Trädstruktur

Trädet visar endast mappar.

```text
ChessApps-Pages/
├── E01_Test/
│   └── vendor/
│       └── cm-chessboard/
│           ├── assets/
│           │   └── pieces/
│           └── src/
│               ├── lib/
│               ├── model/
│               └── view/
│
└── E02_Bräde/
    └── vendor/
        └── cm-chessboard/
            ├── assets/
            │   ├── extensions/
            │   │   ├── arrows/
            │   │   ├── markers/
            │   │   └── promotion-dialog/
            │   └── pieces/
            └── src/
                ├── extensions/
                │   ├── accessibility/
                │   ├── arrows/
                │   ├── auto-border-none/
                │   ├── html-layer/
                │   ├── markers/
                │   ├── persistence/
                │   ├── piece-rotation/
                │   ├── promotion-dialog/
                │   └── right-click-annotator/
                ├── lib/
                ├── model/
                └── view/
```

## Namnprincip

Publiceringsmappen använder samma projektnamn som själva projektet, exempelvis `E01_Test` och `E02_Bräde`.

Utvecklingsrepositoryt `ChessApps` har dessutom överliggande struktur som exempelvis `2Experiment/`, `3Komponenter/` och `4Appar/`. Dessa nivåer finns inte i `ChessApps-Pages`. Ett projekt som ligger i:

`ChessApps/2Experiment/E02_Bräde/`

publiceras därför direkt som:

`ChessApps-Pages/E02_Bräde/`

På Pages ligger i första hand endast de filer och mappar som behövs för att den publicerade versionen ska kunna köras. Utvecklingsdokumentation, kravspecifikationer, versionsloggar, systemdokumentation och andra filer som inte behövs för exekveringen ska normalt inte kopieras hit.

Undantag är:

- `README.md`, som får finnas för att beskriva publiceringsområdet eller projektet.
- `LICENSE`, som behålls när licensvillkor behöver följa med publicerade komponenter eller resurser.

Det gör `ChessApps-Pages` till en ren publiceringsyta, medan utvecklingshistorik och full dokumentation ligger kvar i `ChessApps`.
