import {FEN} from './vendor/cm-chessboard/src/Chessboard.js';

export const TABS = [
  {id:'settings',name:'Inställningar',description:'Prova brädtema, pjäser, ram, koordinater och storlek. Utseendet delas av alla fem tester, även i egna fönster.'},
  {id:'input',name:'Flytta pjäser',description:'Prova dra och släpp eller klicka på pjäs och målruta. Begränsa färg, avvisa testdrag och följ komponentens händelser.'},
  {id:'fen',name:'Ställningar / FEN',description:'Ladda en pjäsställning eller bygg en egen genom att välja en pjäs och klicka på brädet.'},
  {id:'markers',name:'Markeringar',description:'Prova komponentens cirklar, ramar, prickar och pilar. Klicka på en ruta för att sätta eller ta bort vald markering.'},
  {id:'animation',name:'Animationer',description:'Stega genom en kort öppning och prova animationstiden. Jämför mjuka förflyttningar med omedelbara positionsbyten.'}
];
export const SAMPLE = 'r2q1rk1/ppp2ppp/2npbn2/8/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1';
export const DEFAULT_SETTINGS = {theme:'default',pieces:'standard.svg',border:'frame',coordinates:true,width:560,duration:250};
const KEY = 'ChessApps.Exp_Brade.v1';
const fresh = () => ({settings:{...DEFAULT_SETTINGS},tabs:Object.fromEntries(TABS.map(t=>[t.id,{fen:FEN.start,orientation:'w',history:[],events:[],mode:'both',reject:false,palette:'wq',markers:[],arrows:[],markerType:'circlePrimary',arrowType:'success',step:0}]))});
let fallback = fresh();
export function readState(){
  try {const s=JSON.parse(localStorage.getItem(KEY));if(s?.settings&&TABS.every(t=>s.tabs?.[t.id]))return s;}catch{}
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
