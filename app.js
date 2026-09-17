import {BORDER_TYPE, Chessboard, COLOR, FEN, INPUT_EVENT_TYPE} from "./vendor/cm-chessboard/src/Chessboard.js"

const boardElement = document.getElementById("board")
const themeElement = document.getElementById("theme")
const piecesElement = document.getElementById("pieces")
const borderElement = document.getElementById("border")
const coordinatesElement = document.getElementById("coordinates")
const moveInputElement = document.getElementById("moveInput")
const statusElement = document.getElementById("status")
const fenElement = document.getElementById("fen")
const orientationElement = document.getElementById("orientation")

const borderTypes = {
    none: BORDER_TYPE.none,
    thin: BORDER_TYPE.thin,
    frame: BORDER_TYPE.frame
}

let board = null
let currentPosition = FEN.start
let currentOrientation = COLOR.white

function updateInfo(message = "Klart.") {
    if (!board) return
    currentPosition = board.getPosition()
    currentOrientation = board.getOrientation()
    fenElement.value = currentPosition
    orientationElement.textContent = currentOrientation === COLOR.white ? "Vit" : "Svart"
    statusElement.textContent = message
}

function moveInputHandler(event) {
    switch (event.type) {
        case INPUT_EVENT_TYPE.moveInputStarted:
            statusElement.textContent = `Flyttar från ${event.squareFrom}`
            return true
        case INPUT_EVENT_TYPE.validateMoveInput:
            statusElement.textContent = `Drag ${event.squareFrom}–${event.squareTo}`
            return true
        case INPUT_EVENT_TYPE.moveInputCanceled:
            updateInfo("Flytten avbröts.")
            break
        case INPUT_EVENT_TYPE.moveInputFinished:
            updateInfo(event.squareTo ? `Flyttat ${event.squareFrom}–${event.squareTo}.` : "Flytten avslutades.")
            break
    }
}

function applyMoveInputSetting() {
    if (!board) return
    if (moveInputElement.checked) {
        board.enableMoveInput(moveInputHandler)
        statusElement.textContent = "Pjäserna kan flyttas. Ingen regelkontroll används."
    } else {
        board.disableMoveInput()
        statusElement.textContent = "Flyttning av pjäser är avstängd."
    }
}

function createBoard() {
    if (board) {
        currentPosition = board.getPosition()
        currentOrientation = board.getOrientation()
        board.destroy()
        boardElement.replaceChildren()
    }

    board = new Chessboard(boardElement, {
        position: currentPosition,
        orientation: currentOrientation,
        assetsUrl: "./vendor/cm-chessboard/assets/",
        assetsCache: false,
        style: {
            cssClass: themeElement.value,
            showCoordinates: coordinatesElement.checked,
            borderType: borderTypes[borderElement.value],
            pieces: {
                file: `pieces/${piecesElement.value}`
            },
            animationDuration: 250
        }
    })

    applyMoveInputSetting()
    updateInfo("Brädet är klart.")
}

async function setPosition(fen, message) {
    await board.setPosition(fen, true)
    updateInfo(message)
}

themeElement.addEventListener("change", createBoard)
piecesElement.addEventListener("change", createBoard)
borderElement.addEventListener("change", createBoard)
coordinatesElement.addEventListener("change", createBoard)
moveInputElement.addEventListener("change", applyMoveInputSetting)

document.getElementById("flip").addEventListener("click", async () => {
    const next = board.getOrientation() === COLOR.white ? COLOR.black : COLOR.white
    await board.setOrientation(next, true)
    updateInfo("Brädet vändes.")
})

document.getElementById("start").addEventListener("click", () => {
    setPosition(FEN.start, "Startställningen laddades.")
})

document.getElementById("sample").addEventListener("click", () => {
    setPosition("r2q1rk1/ppp2ppp/2npbn2/8/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1", "Exempelställningen laddades.")
})

document.getElementById("empty").addEventListener("click", () => {
    setPosition(FEN.empty, "Brädet tömdes.")
})

createBoard()
