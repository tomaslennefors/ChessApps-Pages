# Exp_Bräde – version 2

V2 bygger vidare direkt på fungerande V1 och använder cm-chessboard 8.14.0.

## Tio experiment

1. **Inställningar:** officiella teman + hög kontrast samt egna CSS-teman röd, orange, lila och turkos; Standard/Staunty, ram, koordinater och storlek.
2. **Flytta pjäser:** dra/släpp och klick/klick, färgbegränsning, avvisning, ångra och händelselogg.
3. **Ställningar / FEN:** formatkontroll, import av pjäsplacering, kopiering och pjäseditor.
4. **Markeringar:** blå, röd, grön, orange och lila cirklar/ramar samt färgade pilar.
5. **Animationer:** åtta halvdrag, stegning, uppspelning, stopp och animationstid.
6. **Brädparametrar:** responsive, assetsCache och style.aspectRatio.
7. **Pekhändelser:** enableSquareSelect med pointerdown, pointerup och pointermove.
8. **Pjäsrotation:** officiella PieceRotation-extensionen.
9. **Högerklick:** officiella RightClickAnnotator-extensionen.
10. **Tillgänglighet:** officiella Accessibility-extensionen med tangentbordsnavigation och alternativa representationer.

Alla tio flikar kan lossas till egna fönster precis som i V1. V1-inställningar migreras automatiskt till V2:s lokala lagring.

## Officiella testfiler

Originalprojektets testfiler har kopierats oförändrade till `vendor/cm-chessboard/test/` för referens:
`TestChessboard.js`, `TestArrows.js`, `TestMarkers.js`, `TestPieceRotation.js`, `TestPiecesAnimation.js`, `TestPosition.js`, `TestVisualMoveInput.js`, `headless.mjs` och `index.html`.

## API-översikt

Se `CM_CHESSBOARD_API.md` för sammanställning av dokumenterade constructor-properties, style-properties, metoder, events och extensioner som är relevanta för experimentappen.

## Begränsning

Detta är ett komponenttest, inte en schackmotor. Vanliga flyttar och ställningar kontrolleras inte automatiskt mot schackregler. FEN-fliken använder endast pjäsdelen av FEN.

## Licenser

cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
