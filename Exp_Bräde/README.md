# Exp_Bräde – version 5

V5 bygger vidare på V4 och använder cm-chessboard 8.14.0.

## Nytt i V5

### Flik 22 – Ångra animation
Fem scenarier kan utföras och därefter ångras med animation:

- vanligt drag
- slag av pjäs
- en passant
- rockad
- promovering

cm-chessboard har ingen särskild undo-metod. Principen är att appen sparar föregående position och sedan använder `setPosition(föregåendePosition, true)`. Eftersom komponentens animationsmotor jämför två positioner fungerar detta även när flera pjäser flyttas/försvinner samtidigt, till exempel rockad och en passant.

### Flik 23 – Dragretur
Move-input skickar bland annat:

- `event.squareFrom`
- `event.squareTo`

V5 visar hur dessa kan sammanfogas till exempelvis `e2e4`. Det är UCI-liknande koordinatnotation. Själva textsträngen skapas av vår app; cm-chessboard levererar rutorna separat.

## Mobilstöd
Flik 6 har förtydligats. cm-chessboard har ingen separat `mobileMode`, men har:

- `responsive: true`
- ResizeObserver-baserad storleksanpassning
- touchstart / touchmove / touchend
- `style.aspectRatio`
- AutoBorderNone för att ta bort ram på små bräden
- appens/containerens CSS och bredd styr den praktiska mobilstorleken

## Animationer
Inbyggt finns positionsförflyttning med ease-in/out, fade in/fade out för pjäser som tillkommer/försvinner, brädvändning, PieceRotation och PromotionDialog fade-in.

Jag hittade inga inbyggda effekter för blinkning, glitter, gungning eller hoppning. V5 lägger därför inte till egna sådana effekter.

## Ett klick när pjäsen bara har ett möjligt drag
Detta finns inte i cm-chessboard eftersom brädkomponenten inte känner till schackregler eller antal lagliga drag. Funktionen kan byggas ovanpå komponenten om en regelmotor, exempelvis chess.js eller Stockfish, först räknar fram lagliga drag. V5 implementerar inte detta i själva brädkomponenten.

## Flikar
V5 innehåller totalt 23 flikar. Flik 1–21 från V4 finns kvar oförändrade i huvudsak, med mobilförtydligande i flik 6. Flik 22 och 23 är nya.

## Licenser
cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
