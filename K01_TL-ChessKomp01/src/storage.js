const KEY = "TL-ChessKomp01_V01:games";
export function storeGame(pgn) {
    if (!pgn || !pgn.trim()) throw new Error("Partiet innehåller inga drag.");
    const raw = localStorage.getItem(KEY);
    let games;
    try {games = raw ? JSON.parse(raw) : [];}
    catch (_) {throw new Error("Sparade partier har ogiltigt format.");}
    if (!Array.isArray(games)) throw new Error("Sparade partier har ogiltigt format.");
    games.push({savedAt: new Date().toISOString(), pgn: pgn});
    localStorage.setItem(KEY, JSON.stringify(games));
    return games.length;
}
