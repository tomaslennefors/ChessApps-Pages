export class ChessGui {
    constructor(container, showGUI, dispatch) {
        this.root = document.createElement("section");
        this.root.className = "tl-app" + (showGUI ? " with-gui" : "");
        this.root.innerHTML = [
            '<header class="tl-header"><h1>TL-ChessKomp01_V01</h1><p>Schackkomponent utan spelmotor</p></header>',
            '<div class="tl-grid">',
            '  <div class="tl-board-wrap"><div class="tl-board" data-board></div></div>',
            '  <aside class="tl-controls" aria-label="Schackkontroller">',
            '    <h2>Aktuellt drag</h2><div class="tl-notation" data-notation>Startställning</div>',
            '    <p class="tl-status" data-status></p><div class="tl-count" data-count></div>',
            '    <nav class="tl-nav" aria-label="Dragbläddring">',
            '      <button data-act="first" title="Första" aria-label="Första draget">⏮</button>',
            '      <button data-act="prev" title="Föregående" aria-label="Föregående drag">◀</button>',
            '      <button data-act="next" title="Nästa" aria-label="Nästa drag">▶</button>',
            '      <button data-act="last" title="Sista" aria-label="Sista draget">⏭</button>',
            '    </nav>',
            '    <div class="tl-actions">',
            '      <button data-act="new">Nytt parti</button><button data-act="play">Starta uppspelning</button>',
            '      <button data-act="fen">Kopiera FEN</button><button data-act="save">Spara parti</button>',
            '    </div>',
            '    <p class="tl-hint">Klicka på två rutor eller dra och släpp. Båda sidorna flyttas manuellt. Sparade partier lagras i LocalStorage.</p>',
            '  </aside>',
            '</div><p class="tl-message" data-message role="status" aria-live="polite"></p>'
        ].join("");
        container.replaceChildren(this.root);
        this.boardElement = this.root.querySelector("[data-board]");
        this.root.addEventListener("click", (event) => {
            const b = event.target.closest("button[data-act]");
            if (b && !b.disabled && this.root.contains(b)) dispatch(b.dataset.act);
        });
    }
    message(text) {this.root.querySelector("[data-message]").textContent = text || "";}
    update(model, busy, playing) {
        const display = (key, text) => {this.root.querySelector("[data-" + key + "]").textContent = text;};
        display("notation", model.notation());
        display("status", model.status());
        display("count", "Halvdrag " + model.ply + " av " + model.total);
        const disable = (key, flag) => {this.root.querySelector('[data-act="' + key + '"]').disabled = flag;};
        disable("first", busy || playing || model.ply === 0);
        disable("prev", busy || playing || model.ply === 0);
        disable("next", busy || playing || model.ply === model.total);
        disable("last", busy || playing || model.ply === model.total);
        disable("new", busy || playing);
        disable("fen", busy);
        disable("save", busy || playing || model.total === 0);
        const play = this.root.querySelector('[data-act="play"]');
        play.disabled = (busy && !playing) || model.total === 0;
        play.textContent = playing ? "Pausa uppspelning" : "Starta uppspelning";
    }
    destroy() {this.root.remove();}
}
