# vendor

`vendor` innehåller **externa komponenter och tredjepartsfiler** som appen Test behöver för att fungera.

Detta skiljer externa komponenter från vår egen programkod i `Test/`.

## Starta Test-appen

[**▶ Starta Test-appen**](https://tomaslennefors.github.io/ChessApps-Pages/Test/)

## Struktur

```text
vendor/                              ← externa komponenter för Test
│
├── README.md                        ← denna förklaring av vendor-mappen
│
└── cm-chessboard/                   ← schackbrädeskomponenten cm-chessboard 8.14.0
    │
    ├── src/                         ← komponentens JavaScript-programkod
    │   ├── lib/                     ← gemensamma hjälpfunktioner
    │   ├── model/                   ← data och internt tillstånd
    │   └── view/                    ← visning och användarinteraktion
    │
    ├── assets/                      ← CSS och grafiska resurser
    │   └── pieces/                  ← SVG-filer med schackpjäser
    │
    ├── LICENSE                      ← komponentens licensvillkor
    └── VERSION.txt                  ← komponentens versionsinformation
```

## Nuvarande komponent

**cm-chessboard 8.14.0**

Komponenten sköter bland annat själva schackbrädet, pjäsernas visning och grundläggande användarinteraktion. Vår egen appkod ligger utanför `vendor/`, exempelvis i `Test/app.js`.

Tredjepartskod och licensinformation ska behållas tydligt åtskilda från vår egen kod.
