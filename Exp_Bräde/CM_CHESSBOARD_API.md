# cm-chessboard 8.14.0 – egenskaper, parametrar och API

Källa: originalprojektets README och källkod i shaack/cm-chessboard 8.14.0.

## Constructor
`new Chessboard(context, props = {})`

### props
- `position`: FEN eller pjäsdelen av FEN. Standard `FEN.empty`.
- `orientation`: `COLOR.white` / `COLOR.black`. Standard vit.
- `responsive`: automatisk anpassning till container. Standard `true`.
- `assetsUrl`: basväg till assets. Standard `./assets/`.
- `assetsCache`: cache av SVG-sprites. Standard `true`.
- `style`: objekt med visuella parametrar.
- `extensions`: array av `{class, props}`.

### style
- `cssClass`: tema/CSS-klass. Original: `default`, `default-contrast`, `green`, `blue`, `chess-club`, `chessboard-js`, `black-and-white`.
- `showCoordinates`: visa koordinater.
- `borderType`: `none`, `thin`, `frame`.
- `aspectRatio`: höjd/bredd, standard 1.
- `pieces.type`: `PIECES_FILE_TYPE.svgSprite`.
- `pieces.file`: SVG-sprite, standard `pieces/standard.svg`.
- `pieces.tileSize`: sprite-rutstorlek, standard 40.
- `animationDuration`: millisekunder, 0 stänger av animation.

## Konstanter
- `PIECE`: wp, wb, wn, wr, wq, wk, bp, bb, bn, br, bq, bk.
- `PIECE_TYPE`: pawn, knight, bishop, rook, queen, king.
- `COLOR`: white/black.
- `BORDER_TYPE`: none/thin/frame.
- `FEN.start`, `FEN.empty`.
- `POINTER_EVENTS`: pekhändelsetyper för square select.
- `INPUT_EVENT_TYPE`: moveInputStarted, validateMoveInput, moveInputCanceled, moveInputFinished, movingOverSquare.

## Chessboard-metoder
- `setPiece(square, piece, animated=false)`
- `getPiece(square)`
- `movePiece(from, to, animated=false)`
- `setPosition(fen, animated=false)`
- `getPosition()`
- `setOrientation(color, animated=false)`
- `getOrientation()`
- `enableMoveInput(handler, color=undefined)`
- `disableMoveInput()`
- `cancelMoveInput()`
- `isMoveInputEnabled()`
- `enableSquareSelect(eventType, handler)`
- `disableSquareSelect(eventType)`
- `isSquareSelectEnabled()`
- `addExtension(extensionClass, props)`
- `getExtension(extensionClass)`
- `destroy()`

## Move-input events
- `moveInputStarted`: startfält; handler returnerar true/false.
- `validateMoveInput`: från/till; handler returnerar true/false.
- `moveInputCanceled`: avbrutet drag.
- `moveInputFinished`: avslutad inputsekvens.
- `movingOverSquare`: aktuell målruta medan pjäs dras.

## Extension points
- positionChanged
- boardChanged
- moveInputToggled
- moveInput
- beforeRedrawBoard
- afterRedrawBoard
- animation
- destroy

## Medföljande extensioner i 8.14.0
- Markers
- Arrows
- RightClickAnnotator
- Accessibility
- PromotionDialog
- HtmlLayer
- PieceRotation
- Persistence
- AutoBorderNone

## Markers
Metoder: `addMarker`, `getMarkers`, `removeMarkers`, `addLegalMovesMarkers`, `removeLegalMovesMarkers`.
Medföljande MARKER_TYPE: frame, framePrimary, frameDanger, circle, circlePrimary, circleDanger, circleDangerFilled, square, dot, bevel.
Egna markörtyper kan skapas som objekt med `class` och `slice`.

## Arrows
Metoder: `addArrow(type, from, to)`, `getArrows(...)`, `removeArrows(...)`.
Standardfärger: success/grön, warning/orange, info/blå, danger/röd.

## PieceRotation
Props: `angle` (0), `animationDuration` (300).
Metoder: `setPiecesRotation(angle,{color,animated})`, `getPiecesRotation(color)`.

## RightClickAnnotator
Högerklick = grön, Alt/Cmd/AltGr = blå, Shift = röd, Shift+Alt = orange.
Högerklick på ruta ger cirkel, högerdra ger pil.
Metoder som läggs till: `getAnnotations()`, `setAnnotations(...)`.

## Accessibility
Props: `brailleNotationInAlt`, `boardAsTable`, `movePieceForm`, `piecesAsList`, `keyboardMoveInput`, `visuallyHidden`.
Tangentbord: pilar navigerar, Enter/Space väljer, Escape avbryter.

## Notering
Färg på själva brädet är inte en separat "red/green/blue"-property. Den styrs via `style.cssClass` och CSS. Därför lägger Exp_Bräde V2 till egna CSS-klasser för röd, orange, lila och turkos.
