# Exp_Bräde – version 4

V4 bygger vidare på V3 och använder cm-chessboard 8.14.0.

## Viktiga V4-ändringar

- **Flik 4 Markeringar:** markeringsform och markeringsfärg väljs nu i två separata listboxar.
  - Form: cirkel, ram, prick, fylld ruta, hörn.
  - Färg: standard/svart, blå, röd, grön, orange, lila.
- **Flik 18 Specialdrag:** animerad kort/lång rockad samt officiella PromotionDialog.
  - Rockad animeras genom `setPosition(..., true)`, samma princip som i cm-chessboards eget validate-moves-exempel.
  - Bonde b7 kan klickas/dras till b8 och därefter väljer man dam, torn, löpare eller springare direkt på brädet.
- **Flik 19 HTML-lager:** officiella HtmlLayer-extensionen.
- **Flik 20 AutoBorder:** officiella AutoBorderNone-extensionen.
- **Flik 21 Persistence:** officiella Persistence-extensionen. Komponentägaren markerar den som *work in progress* och säger att den inte bör användas i produktion.

## Flik 1–10: interaktiva experiment

1. Inställningar
2. Flytta pjäser
3. Ställningar / FEN
4. Markeringar
5. Animationer
6. Brädparametrar
7. Pekhändelser
8. Pjäsrotation
9. Högerklick
10. Tillgänglighet

## Flik 11–17: komponentägarens originaltester

11. TestChessboard
12. TestMarkers
13. TestArrows
14. TestPosition
15. TestPiecesAnimation
16. TestVisualMoveInput
17. TestPieceRotation

## Flik 18–21: fler officiella funktioner

18. Specialdrag – rockad + PromotionDialog
19. HTML-lager – HtmlLayer
20. AutoBorder – AutoBorderNone
21. Persistence – localStorage-demo

## Ytterligare saker i upstream som vi har identifierat

cm-chessboard har också exempel för många samtidiga bräden, destroy av många bräden, responsive board, generell positionsanimation, Chess960-validering och vanlig dragvalidering med chess.js. Dessa är nu kartlagda även om alla inte behöver en egen experimentflik.

## Licenser

cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
