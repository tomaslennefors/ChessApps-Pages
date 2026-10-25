// Regler: chess.js 1.4.0, versionslåst officiell npm-distribution (ESM).
import {Chess} from "../vendor/chess.js/chess.js";

export class GameModel {
    constructor() {this.engine = new Chess(); this.moves = []; this.ply = 0;}
    get fen() {return this.engine.fen();}
    get total() {return this.moves.length;}
    get turn() {return this.engine.turn();}
    get gameOver() {return this.engine.isGameOver();}
    legalFrom(square) {return this.engine.moves({square: square, verbose: true});}
    lastMove() {return this.ply ? this.moves[this.ply - 1] : null;}
    play(from, to, promotion) {
        let m;
        try {
            const input = {from: from, to: to};
            if (promotion) input.promotion = promotion;
            m = this.engine.move(input);
        } catch (_) {return null;}
        if (!m) return null;
        // Nytt drag efter återgång skriver över resten av dragföljden.
        this.moves.length = this.ply;
        const entry = {from: m.from, to: m.to, promotion: m.promotion || undefined, san: m.san};
        this.moves.push(entry);
        this.ply++;
        return entry;
    }
    goTo(ply) {
        if (!Number.isInteger(ply) || ply < 0 || ply > this.total) throw new RangeError("Ogiltigt drag");
        this.engine.reset();
        for (let i = 0; i < ply; i++) {
            const m = this.moves[i];
            this.engine.move({from: m.from, to: m.to, promotion: m.promotion});
        }
        this.ply = ply;
    }
    reset() {this.engine.reset();this.moves = [];this.ply = 0;}
    notation() {
        const m = this.lastMove();
        if (!m) return "Startställning";
        const nr = Math.ceil(this.ply / 2);
        return (this.ply % 2 ? nr + ". " : nr + "... ") + m.san;
    }
    status() {
        if (this.engine.isCheckmate()) return "Schackmatt – " + (this.turn === "w" ? "svart" : "vit") + " vinner.";
        if (this.engine.isStalemate()) return "Remi – patt.";
        if (this.engine.isThreefoldRepetition()) return "Remi – trefaldig upprepning.";
        if (this.engine.isInsufficientMaterial()) return "Remi – otillräckligt material.";
        if (this.engine.isDraw()) return "Remi.";
        return (this.turn === "w" ? "Vit" : "Svart") + " vid draget" + (this.engine.isCheck() ? " – schack!" : ".");
    }
    fullPgn() {
        const game = new Chess();
        for (const m of this.moves) game.move({from: m.from, to: m.to, promotion: m.promotion});
        return game.pgn();
    }
}
