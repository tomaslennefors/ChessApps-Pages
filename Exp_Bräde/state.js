import {FEN} from './vendor/cm-chessboard/src/Chessboard.js';

export const TABS = [
  {id:'settings',name:'Inställningar',description:'Prova brädtema, pjäser, ram, koordinater och storlek. Utseendet delas av alla tio tester, även i egna fönster.'},
  {id:'input',name:'Flytta pjäser',description:'Prova dra och släpp eller klicka på pjäs och målruta. Begränsa färg, avvisa testdrag och följ komponentens händelser.'},
  {id:'fen',name:'Ställningar / FEN',description:'Ladda en pjäsställning eller bygg en egen genom att välja en pjäs och klicka på brädet.'},
  {id:'markers',name:'Markeringar',description:'Välj markeringsform och markeringsfärg separat. Prova cirkel, ram, prick, fylld ruta, hörn och färgade pilar.'},
  {id:'animation',name:'Animationer',description:'Stega genom en kort öppning och prova animationstiden. Jämför mjuka förflyttningar med omedelbara positionsbyten.'},
  {id:'parameters',name:'Brädparametrar',description:'Prova dokumenterade grundparametrar: responsive, assetsCache och style.aspectRatio, utan att ändra komponentkoden.'},
  {id:'pointer',name:'Pekhändelser',description:'Prova enableSquareSelect med pointerdown, pointerup och pointermove och se vilka rutor komponenten rapporterar.'},
  {id:'rotation',name:'Pjäsrotation',description:'Prova den officiella PieceRotation-extensionen: rotera alla, vita eller svarta pjäser 0–270 grader, med eller utan animation.'},
  {id:'annotator',name:'Högerklick',description:'Prova officiella RightClickAnnotator: högerklick för cirkel och högerdra för pil. Modifierare väljer grön, blå, röd eller orange.'},
  {id:'accessibility',name:'Tillgänglighet',description:'Prova officiella Accessibility-extensionen med tangentbordsnavigering, tabell, dragformulär, pjäslista och skärmläsarstöd.'},
  {id:'testChessboard',name:'TestChessboard',description:'Komponentägarens originaltest för Chessboard-API: skapa/förstöra bräde, position, pjäser, orientering, animationkö och resize-regressioner.'},
  {id:'testMarkers',name:'TestMarkers',description:'Komponentägarens originaltest för Markers-extensionen.'},
  {id:'testArrows',name:'TestArrows',description:'Komponentägarens originaltest för Arrows-extensionen.'},
  {id:'testPosition',name:'TestPosition',description:'Komponentägarens originaltest för Position/FEN, rutor, pjäser och index.'},
  {id:'testPiecesAnimation',name:'TestPiecesAnimation',description:'Komponentägarens originaltest för avstånd och beräkning av positionsförändringar.'},
  {id:'testVisualMoveInput',name:'TestVisualMoveInput',description:'Komponentägarens originaltest för klick, drag, cancel, validering och visuellt dragläge.'},
  {id:'testPieceRotation',name:'TestPieceRotation',description:'Komponentägarens originaltest för PieceRotation-extensionen.'},
  {id:'specialMoves',name:'Specialdrag',description:'Prova animerad rockad och den officiella PromotionDialog-extensionen med klickbar bondepromovering.'},
  {id:'htmlLayer',name:'HTML-lager',description:'Prova den officiella HtmlLayer-extensionen som lägger HTML ovanpå schackbrädet.'},
  {id:'autoBorder',name:'AutoBorder',description:'Prova AutoBorderNone: ramen försvinner automatiskt när brädet blir smalare än vald gräns.'},
  {id:'persistence',name:'Persistence',description:'Prova komponentägarens Persistence-extension för localStorage. Ägaren markerar den uttryckligen som work in progress.'}
];
export const SAMPLE = 'r2q1rk1/ppp2ppp/2npbn2/8/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1';
export const DEFAULT_SETTINGS = {theme:'default',pieces:'standard.svg',border:'frame',coordinates:true,width:560,duration:250};
const KEY = 'ChessApps.Exp_Brade.v4';
const LEGACY_KEYS = ['ChessApps.Exp_Brade.v3','ChessApps.Exp_Brade.v2','ChessApps.Exp_Brade.v1'];
const tabDefaults = () => ({
  fen:FEN.start,orientation:'w',history:[],events:[],mode:'both',reject:false,palette:'wq',
  markers:[],arrows:[],markerType:'circlePrimary',markerShape:'circle',markerColor:'blue',arrowType:'success',step:0,
  responsive:true,assetsCache:false,aspectRatio:1,pointerEvent:'pointerdown',pointerEvents:[],
  rotationColor:'',rotationAngle:0,rotationAnimated:true,
  brailleNotationInAlt:true,boardAsTable:true,movePieceForm:true,piecesAsList:true,keyboardMoveInput:true,visuallyHidden:false,autoBorderThreshold:540
});
const fresh = () => ({settings:{...DEFAULT_SETTINGS},tabs:Object.fromEntries(TABS.map(t=>[t.id,tabDefaults()]))});
function normalize(raw){
  const base=fresh();
  if(raw?.settings)base.settings={...base.settings,...raw.settings};
  for(const t of TABS)if(raw?.tabs?.[t.id])base.tabs[t.id]={...base.tabs[t.id],...raw.tabs[t.id]};
  return base;
}
let fallback = fresh();
export function readState(){
  try{
    const current=localStorage.getItem(KEY);
    if(current)return normalize(JSON.parse(current));
    for(const legacyKey of LEGACY_KEYS){
      const legacy=localStorage.getItem(legacyKey);
      if(legacy){const migrated=normalize(JSON.parse(legacy));localStorage.setItem(KEY,JSON.stringify(migrated));return migrated;}
    }
  }catch{}
  return structuredClone(fallback);
}
const channel = typeof BroadcastChannel==='function' ? new BroadcastChannel(KEY) : null;
const listeners=new Set();
export function changeState(mutate){
  const s=readState();mutate(s);fallback=structuredClone(s);
  try{localStorage.setItem(KEY,JSON.stringify(s));}catch{document.dispatchEvent(new CustomEvent('storage-unavailable'));}
  channel?.postMessage({changed:true});return s;
}
export function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}
function notify(){for(const fn of listeners)fn(readState());}
if(channel)channel.onmessage=notify;
window.addEventListener('storage',e=>{if(e.key===KEY)notify();});

// Accept a placement or a syntactically valid full FEN. Only placement is used.
export function parsePlacement(value){
  const parts=value.trim().split(/\s+/);if(parts.length!==1&&parts.length!==6)throw Error('Ange pjäsdelen eller en fullständig FEN med sex fält.');
  const rows=parts[0].split('/');
  if(rows.length!==8)throw Error('FEN måste innehålla åtta rader, åtskilda av /.');
  for(const row of rows){
    if(!/^[prnbqkPRNBQK1-8]+$/.test(row)||/[1-8]{2}/.test(row))throw Error('Ogiltig rad i FEN. Använd schackpjäsernas FEN-bokstäver och siffrorna 1–8.');
    if([...row].reduce((sum,c)=>sum+(/[1-8]/.test(c)?Number(c):1),0)!==8)throw Error('Varje FEN-rad måste motsvara exakt åtta rutor.');
  }
  if(parts.length===6&&(!/^[wb]$/.test(parts[1])||!/^(-|K?Q?k?q?)$/.test(parts[2])||!/^(-|[a-h][36])$/.test(parts[3])||!/^\d+$/.test(parts[4])||! /^[1-9]\d*$/.test(parts[5])))throw Error('Ett av de fem efterföljande FEN-fälten har fel format.');
  return {placement:parts[0],full:parts.length===6};
}
