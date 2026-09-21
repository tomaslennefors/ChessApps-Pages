# ChessApps-Pages

Här finns det publika menysystemet för schackprojekten som publiceras med GitHub Pages.

Den gemensamma startsidan ligger i roten. Varje publicerat projekt ligger i en egen mapp med samma projektnamn som används i utvecklingsrepositoryt.

## App-meny

[**Öppna app-menyn**](https://tomaslennefors.github.io/ChessApps-Pages/)

## Publicerade projekt

- [E01_Test](https://tomaslennefors.github.io/ChessApps-Pages/E01_Test/) – ursprungligt komponenttest för cm-chessboard.
- [E02_Bräde](https://tomaslennefors.github.io/ChessApps-Pages/E02_Br%C3%A4de/) – experimentprojekt för brädkomponenten.

## Trädstruktur

```text
ChessApps-Pages/
│
├── index.html
├── README.md
│
├── E01_Test/
│   ├── README.md
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── vendor/
│
└── E02_Bräde/
    ├── README.md
    ├── VERSION.txt
    ├── index.html
    ├── app.js
    ├── state.js
    ├── styles.css
    ├── windows.js
    └── vendor/
```

## Namnprincip

Publiceringsmappen ska använda samma projektnamn som utvecklingsprojektet när det är praktiskt möjligt. Det gör länkar, dokumentation och beroenden lättare att följa mellan `ChessApps` och `ChessApps-Pages`.
