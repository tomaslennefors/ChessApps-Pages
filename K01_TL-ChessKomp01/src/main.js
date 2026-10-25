const root = document.getElementById("app");
import("./component.js").then(({TLChessKomp01}) => {
    new TLChessKomp01(root, {showGUI: true});
}).catch((error) => {
    console.error(error);
    root.replaceChildren();
    const p = document.createElement("p");
    p.textContent = "TL-ChessKomp01_V01 kunde inte starta. Kontrollera anslutningen och ladda om sidan.";
    root.append(p);
});
