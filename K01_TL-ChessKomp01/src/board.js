import {Chessboard, COLOR, BORDER_TYPE, INPUT_EVENT_TYPE} from "../vendor/cm-chessboard/src/Chessboard.js";
import {Markers} from "../vendor/cm-chessboard/src/extensions/markers/Markers.js";
import {Arrows, ARROW_TYPE} from "../vendor/cm-chessboard/src/extensions/arrows/Arrows.js";
import {PromotionDialog, PROMOTION_DIALOG_RESULT_TYPE} from "../vendor/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js";

export {INPUT_EVENT_TYPE, PROMOTION_DIALOG_RESULT_TYPE};
const LAST_MARKER = {class: "marker-circle-success-filled", slice: "markerCircleFilled"};

export class BoardView {
    constructor(element, fen, inputHandler) {
        this.board = new Chessboard(element, {
            position: fen,
            assetsUrl: new URL("../vendor/cm-chessboard/assets/", import.meta.url).href,
            responsive: true,
            orientation: COLOR.white,
            style: {
                cssClass: "default",
                borderType: BORDER_TYPE.frame,
                showCoordinates: true,
                pieces: {file: "pieces/standard.svg"},
                animationDuration: 280
            },
            extensions: [
                {class: Markers, props: {autoMarkers: null}},
                {class: Arrows},
                {class: PromotionDialog}
            ]
        });
        this.board.enableMoveInput(inputHandler);
    }
    promotion(square, color, callback) {
        this.board.showPromotionDialog(square, color, callback);
    }
    async show(fen, lastMove, animated = false) {
        this.board.removeMarkers();
        this.board.removeArrows();
        if (animated && lastMove) this.board.addArrow(ARROW_TYPE.danger, lastMove.from, lastMove.to);
        try {await this.board.setPosition(fen, animated);}
        finally {
            this.board.removeArrows();
            if (lastMove) this.board.addMarker(LAST_MARKER, lastMove.to);
        }
    }
    destroy() {this.board.destroy();}
}
