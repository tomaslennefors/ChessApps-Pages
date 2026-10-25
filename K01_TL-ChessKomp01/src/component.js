import {GameModel} from "./model.js";
import {BoardView, INPUT_EVENT_TYPE, PROMOTION_DIALOG_RESULT_TYPE} from "./board.js";
import {ChessGui} from "./gui.js";
import {storeGame} from "./storage.js";

// Kan återanvändas utan kontroller: new TLChessKomp01(element, {showGUI:false})
export class TLChessKomp01 {
    constructor(container, options = {}) {
        if (!(container instanceof HTMLElement)) throw new Error("HTML-behållare saknas.");
        this.game = new GameModel();
        this.busy = false;
        this.playing = false;
        this.timer = null;
        this.gui = new ChessGui(container, options.showGUI !== false, this.action.bind(this));
        this.board = new BoardView(this.gui.boardElement, this.game.fen, this.onInput.bind(this));
        this.refresh();
    }
    refresh() {this.gui.update(this.game, this.busy, this.playing);}
    onInput(event) {
        if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
            return !this.busy && !this.playing && !this.game.gameOver &&
                this.game.legalFrom(event.squareFrom).length > 0;
        }
        if (event.type !== INPUT_EVENT_TYPE.validateMoveInput) return;
        if (this.busy || this.playing) return false;
        const legal = this.game.legalFrom(event.squareFrom).filter(m => m.to === event.squareTo);
        if (!legal.length) return false;
        if (legal.some(m => m.promotion)) {
            this.busy = true;
            this.refresh();
            const from = event.squareFrom, to = event.squareTo, color = this.game.turn;
            this.board.promotion(to, color, async result => {
                this.busy = false;
                if (result.type === PROMOTION_DIALOG_RESULT_TYPE.pieceSelected) {
                    this.commit(from, to, result.piece.slice(1));
                } else {
                    await this.board.show(this.game.fen, this.game.lastMove(), false);
                    this.refresh();
                }
            });
            return false;
        }
        this.commit(event.squareFrom, event.squareTo);
        return false; // Position och animation bestäms av chess.js, inte av drag-widgeten.
    }
    commit(from, to, promotion) {
        const m = this.game.play(from, to, promotion);
        if (!m) {this.gui.message("Ogiltigt drag.");return;}
        this.busy = true;
        this.refresh();
        // Först låter vi cm-chessboard återgå från inmatningsläget.
        window.setTimeout(async () => {
            try {
                await this.board.show(this.game.fen, m, true);
                this.gui.message("");
            } catch (error) {
                console.error(error);
                this.gui.message("Brädet kunde inte uppdateras.");
            } finally {
                this.busy = false;
                this.refresh();
            }
        }, 0);
    }
    async goTo(ply, fromPlayback = false, animate = false) {
        if (this.busy || ply < 0 || ply > this.game.total) return;
        if (!fromPlayback) this.pause();
        this.busy = true;
        try {
            this.game.goTo(ply);
            this.refresh();
            await this.board.show(this.game.fen, this.game.lastMove(), animate);
            this.gui.message("");
        } catch (error) {
            console.error(error);
            this.gui.message("Kunde inte visa ställningen.");
        } finally {
            this.busy = false;
            this.refresh();
        }
    }
    async newGame() {
        if (this.busy) return;
        this.pause();
        this.busy = true;
        this.game.reset();
        try {
            await this.board.show(this.game.fen, null);
            this.gui.message("Nytt parti.");
        } catch (error) {
            console.error(error);
            this.gui.message("Kunde inte återställa brädet.");
        } finally {
            this.busy = false;
            this.refresh();
        }
    }
    async togglePlay() {
        if (this.playing) {this.pause();return;}
        if (this.busy || !this.game.total) return;
        if (this.game.ply === this.game.total) await this.goTo(0);
        this.playing = true;
        this.refresh();
        this.timer = window.setInterval(async () => {
            if (this.busy) return;
            if (this.game.ply === this.game.total) {this.pause();return;}
            await this.goTo(this.game.ply + 1, true, true);
            if (this.game.ply === this.game.total) this.pause();
        }, 950);
    }
    pause() {
        if (this.timer !== null) window.clearInterval(this.timer);
        this.timer = null;
        this.playing = false;
        this.refresh();
    }
    async copyFen() {
        try {
            await navigator.clipboard.writeText(this.game.fen);
            this.gui.message("FEN-koden kopierad.");
        } catch (_) {
            this.gui.message("Det gick inte att kopiera FEN till urklipp.");
        }
    }
    save() {
        try {
            const count = storeGame(this.game.fullPgn());
            this.gui.message("Partiet sparat i LocalStorage. Totalt " + count + " partier.");
        } catch (error) {
            this.gui.message(error.message || "Det gick inte att spara partiet.");
        }
    }
    action(action) {
        switch (action) {
            case "first": void this.goTo(0);break;
            case "prev": void this.goTo(this.game.ply - 1);break;
            case "next": void this.goTo(this.game.ply + 1);break;
            case "last": void this.goTo(this.game.total);break;
            case "new": void this.newGame();break;
            case "play": void this.togglePlay();break;
            case "fen": void this.copyFen();break;
            case "save": this.save();break;
        }
    }
    destroy() {this.pause();this.board.destroy();this.gui.destroy();}
}
