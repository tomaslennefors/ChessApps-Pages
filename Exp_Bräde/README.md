# Exp_Bräde – version 3

V3 bygger vidare på V2 och använder cm-chessboard 8.14.0.

## Flik 1–10: våra interaktiva experiment

1. **Inställningar**
2. **Flytta pjäser**
3. **Ställningar / FEN**
4. **Markeringar**
5. **Animationer**
6. **Brädparametrar**
7. **Pekhändelser**
8. **Pjäsrotation**
9. **Högerklick**
10. **Tillgänglighet**

## Flik 11–17: komponentägarens originaltester

11. **TestChessboard** – Chessboard-API, position, pjäser, orientering, destroy, animationkö och resize-regression.
12. **TestMarkers** – Markers-extensionen.
13. **TestArrows** – Arrows-extensionen.
14. **TestPosition** – Position/FEN, index/rutor och pjäsoperationer.
15. **TestPiecesAnimation** – avstånd och analys av positionsförändringar.
16. **TestVisualMoveInput** – klick, drag, cancel, validering och visuellt dragläge.
17. **TestPieceRotation** – PieceRotation-extensionen.

Originalfilerna i `vendor/cm-chessboard/test/*.js` är **inte omskrivna**. V3 laddar och kör dem i separata testvyer. En lokal Teevi-kompatibel runner finns endast för att originaltesternas `describe`, `it` och `assert` ska kunna köras i den publicerade appen utan npm-installation.

Varje testflik visar PASS/FAIL per originaltest och har knappen **Kör om testet**.

## Lagring och fönster

V2-inställningar migreras automatiskt till V3. Alla 17 flikar kan lossas till egna fönster med samma mekanism som tidigare.

## API-översikt

Se `CM_CHESSBOARD_API.md`.

## Licenser

cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
