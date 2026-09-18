# Exp_Bräde – version 1

Fem fristående experiment med cm-chessboard 8.14.0, byggda vidare på Test.

1. **Inställningar:** sex brädteman, Standard/Staunty-pjäser, tre ramar, koordinater och brädstorlek.
2. **Flytta pjäser:** dra/släpp och klick/klick, färgbegränsning, avvisning, ångra och händelselogg.
3. **Ställningar / FEN:** formatkontroll, import av pjäsplacering, kopiering och pjäseditor.
4. **Markeringar:** ramar, cirklar, prickar och färgade pilar via komponentens tillägg.
5. **Animationer:** åtta fördefinierade halvdrag, stegning, uppspelning, stopp och animationstid 0–1500 ms.

## Flera skärmar

Klicka på ↗ vid en flik eller på **Lossa fliken**. Ett riktigt webbläsarfönster öppnas. Flytta det med namnlisten till önskad skärm. **Sätt tillbaka** för tillbaka fliken. Stänger du extrafönstret återställs fliken automatiskt (normalt inom en sekund). Alla fem flikar kan vara lossade samtidigt. Tillåt popup-fönster för webbplatsen om webbläsaren blockerar öppnandet. På mobil kan webbläsaren välja att öppna en vanlig flik.

Varje test har ett eget bräde. Utseende och animationstid är gemensamma och synkroniseras mellan fönstren. Inställningar, testställningar, markeringar och händelselogg sparas lokalt i webbläsaren. En pågående animation stoppas när en flik lossas eller byts. Utan lokal lagring fungerar inte beständig lagring/synkronisering fullt ut.

## Begränsning

Detta är ett brädkomponenttest, inte en schackmotor. Flyttar och ställningar kontrolleras inte mot schackregler. FEN-import kontrollerar format men använder endast pjäsdelen; övriga fem fält i full FEN bevaras inte.

## Struktur och återanvändning

- `index.html`, `styles.css`: skal och layout.
- `app.js`: de fem testerna; vidareutvecklar Test/app.js:s brädskapande, inställningar, positionsbyte och draghändelser.
- `state.js`: gemensam lokal lagring, synkronisering och FEN-formatkontroll.
- `windows.js`: lossning, återplacering och livscykel för riktiga fönster.
- `vendor/cm-chessboard/`: oförändrade filer från Test/vendor/cm-chessboard, kompletterade med originalets Markers/Arrows och tillhörande resurser.

Kör via HTTP/HTTPS. ES-moduler fungerar inte tillförlitligt genom att dubbelklicka på HTML-filen.

## Licenser

cm-chessboard av Stefan Haack: MIT, se `vendor/cm-chessboard/LICENSE`.
Standard-pjäserna: CC BY-SA 3.0. Staunty-pjäserna: CC BY-NC-SA 4.0. Attribution och licenslänkar finns kvar i respektive SVG. Komponentversion och proveniens finns i `vendor/cm-chessboard/VERSION.txt`.
