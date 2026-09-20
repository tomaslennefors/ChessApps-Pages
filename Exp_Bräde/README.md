# E02_Bräde – version 7

Kortnamn: **E02**

V7 bygger vidare på V6 och använder cm-chessboard 8.14.0.

## Flik 1 – Inställningar

### Inbyggda brädteman
cm-chessboard 8.14.0 innehåller sju teman:

- default
- default-contrast
- green
- blue
- chess-club
- chessboard-js
- black-and-white

E02 har dessutom fyra egna CSS-teman: röd, orange, lila och turkos. V7 märker nu tydligt vilka som är inbyggda respektive egna.

### Pjäsuppsättningar
Komponenten levereras med två pjäsuppsättningar och båda finns i listan:

- standard.svg
- staunty.svg

### Koordinatnotation
Kärn-API:t har bara den separata egenskapen `style.showCoordinates`.

Placeringen styrs indirekt av ramen:

- `borderType=frame` → koordinaterna placeras i ramen
- `borderType=none/thin` → koordinaterna placeras inne på rutorna
- orienteringen vänds automatiskt när brädet vänds

### Storlek och responsive
cm-chessboard sätter ingen egen min- eller maxbredd. Brädet följer sin container. V7 utökar därför experimentets testintervall till **120–1400 px** och gör `responsive` till en gemensam kryssruta i flik 1.

### extensions []
`extensions` är arrayen med extension-klasser som ska skapas tillsammans med brädet. E02 använder Markers och Arrows som bas och lägger till andra extensioner i de flikar där de behövs.

## Flik 4 – Markeringar

V7 lägger till:

- kryssruta för att visa/dölja markeringar
- fylld cirkel utöver cirkel, ram, prick, fylld ruta och hörn
- fler färger: gul, cyan, rosa, vit och grå
- alla sex inbyggda piltyper: default, success, secondary, warning, info och danger
- tillfällig pil från startruta till aktuell ruta under pågående pjäsflytt
- tydlig funktion för att lägga till en pil mellan två rutor utan att någon pjäs flyttas

Markeringsformen och markeringsfärgen väljs fortfarande separat. Det gör att V7 kan prova fler kombinationer än de färdiga standardkombinationerna i cm-chessboard.

## Tidigare funktioner

V1–V6 finns kvar: flyttinmatning, FEN/editor, animationer, parametrar, pekhändelser, PieceRotation, RightClickAnnotator, Accessibility, originaltester, PromotionDialog, HtmlLayer, AutoBorderNone, Persistence, animerad ångra, dragretur och pedagogiska överlägg.

## Licenser

cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0.
