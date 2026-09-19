# Exp_Bräde – version 6

V6 bygger vidare på V5 och använder cm-chessboard 8.14.0.

## Flik 22 – Ångra animation
Promoveringsscenariot använder nu den riktiga PromotionDialog-rutan. Du väljer själv dam, torn, löpare eller springare. Efter **Ångra** kontrollerar appen automatiskt att:

- b7 åter innehåller en vit bonde
- b8 är tom
- den valda promoveringspjäsen alltså inte ligger kvar

Samma flik testar även vanligt drag, slag, en passant och rockad baklänges med positionsanimation.

## Dragkod och protokoll
cm-chessboard ger `squareFrom` och `squareTo`, vilket räcker för rå koordinatkod som `e1g1`.

Att säkert skriva detta som **O-O** eller **O-O-O**, eller skapa korrekt SAN/PGN för slag, schack, matt och promovering, kräver information om spelställningen och schackregler. Det bör ligga i regel-/protokolllagret, exempelvis chess.js eller motsvarande, inte i själva brädkomponenten.

## Ljud
Jag hittade inga inbyggda ljudsignaler eller ljudfiler i cm-chessboard. Dragljud, slag, schack, matt osv. måste därför läggas som ett separat lager i vår app om vi vill ha det senare.

## Flik 10 – Tillgänglighet och pjäslista
`piecesAsList` är inte en materialräkning. Extensionen listar varje pjäs med sin ruta, separat för vit och svart, till exempel `Knight f3`.

V6 lägger till knappen **Visa pjäslistan tydligt** och egen CSS så listan går att granska visuellt. Funktionen är ursprungligen främst avsedd för skärmläsare och kan döljas visuellt med `visuallyHidden`.

## Flik 24 – Pedagogik
Nya visuella demonstrationer:

- Schack – pil mot kungen + markering
- Dubbelschack – två pilar från två angripare mot kungen
- Gaffel – två pilar från samma angripare mot två mål
- Avdragsschack – visar frigjord schacklinje och flytten som öppnade linjen

Detta är bara visuella överlägg. Automatisk identifiering av schack, dubbelschack, gaffel, avdragsschack, hot och pjäs-vinsthot kräver en regel-/analysmotor ovanpå cm-chessboard.

Arrows-extensionen har flera färger men en grundform på pilhuvudet. En särskild dubbelpil eller annan specialsymbol kräver ett eget SVG-/overlay-lager.

## Licenser
cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
