// Adapted from Test/app.js: board creation, move events, settings and positions.
import {Chessboard,COLOR,FEN,INPUT_EVENT_TYPE,POINTER_EVENTS} from './vendor/cm-chessboard/src/Chessboard.js';
import {Markers,MARKER_TYPE} from './vendor/cm-chessboard/src/extensions/markers/Markers.js';
import {Arrows,ARROW_TYPE} from './vendor/cm-chessboard/src/extensions/arrows/Arrows.js';
import {PieceRotation} from './vendor/cm-chessboard/src/extensions/piece-rotation/PieceRotation.js';
import {RightClickAnnotator} from './vendor/cm-chessboard/src/extensions/right-click-annotator/RightClickAnnotator.js';
import {Accessibility} from './vendor/cm-chessboard/src/extensions/accessibility/Accessibility.js';
import {PromotionDialog} from './vendor/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js';
import {HtmlLayer} from './vendor/cm-chessboard/src/extensions/html-layer/HtmlLayer.js';
import {AutoBorderNone} from './vendor/cm-chessboard/src/extensions/auto-border-none/AutoBorderNone.js';
import {Persistence} from './vendor/cm-chessboard/src/extensions/persistence/Persistence.js';
import {Position} from './vendor/cm-chessboard/src/model/Position.js';
import {TABS,SAMPLE,DEFAULT_SETTINGS,readState,changeState,subscribe,parsePlacement} from './state.js';
import {createWindows} from './windows.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options=(items,value)=>items.map(([v,l])=>`<option value="${v}" ${v===value?'selected':''}>${l}</option>`).join('');
const select=(id,label,items,value)=>`<label>${label}<select id="${id}">${options(items,value)}</select></label>`;
const check=(id,label,on)=>`<label class="check"><input id="${id}" type="checkbox" ${on?'checked':''}>${label}</label>`;
const LEGACY_EXTRA_MARKER_TYPE={circleSuccess:{class:'marker-circle-success',slice:'markerCircle'},circleWarning:{class:'marker-circle-warning',slice:'markerCircle'},circlePurple:{class:'marker-circle-purple',slice:'markerCircle'},frameSuccess:{class:'marker-frame-success',slice:'markerFrame'},frameWarning:{class:'marker-frame-warning',slice:'markerFrame'},framePurple:{class:'marker-frame-purple',slice:'markerFrame'}};
const MARKER_SLICE={circle:'markerCircle',frame:'markerFrame',dot:'markerDot',square:'markerSquare',bevel:'markerBevel'};
const MARKER_COLOR_CLASS={default:'default',blue:'primary',red:'danger',green:'success',orange:'warning',purple:'purple'};
function markerTypeFor(shape,color){
  const suffix=MARKER_COLOR_CLASS[color]||'default';
  return {class:`marker-${shape}-${suffix}`,slice:MARKER_SLICE[shape]||'markerCircle',...(shape==='dot'?{position:'above'}:{})};
}
function storedMarkerType(m){
  if(m.shape)return markerTypeFor(m.shape,m.color||'default');
  return MARKER_TYPE[m.type]||LEGACY_EXTRA_MARKER_TYPE[m.type];
}
const OWNER_TESTS={
  testChessboard:'TestChessboard',
  testMarkers:'TestMarkers',
  testArrows:'TestArrows',
  testPosition:'TestPosition',
  testPiecesAnimation:'TestPiecesAnimation',
  testVisualMoveInput:'TestVisualMoveInput',
  testPieceRotation:'TestPieceRotation'
};
const moves=[['e2','e4','1. e4'],['e7','e5','…e5'],['g1','f3','2. Sf3'],['b8','c6','…Sc6'],['f1','b5','3. Lb5'],['a7','a6','…a6'],['b5','a4','4. La4'],['g8','f6','…Sf6']];
const positions=[FEN.start];const pos=new Position(FEN.start);for(const [a,b] of moves){pos.movePiece(a,b);positions.push(pos.getFen());}
const CASTLE_WHITE_BEFORE='4k3/8/8/8/8/8/8/R3K2R';
const CASTLE_WHITE_K='4k3/8/8/8/8/8/8/R4RK1';
const CASTLE_WHITE_Q='4k3/8/8/8/8/8/8/2KR3R';
const PROMOTION_FEN='4k3/1P6/8/8/8/8/8/4K3';
const UNDO_SCENARIOS={
  move:{name:'Vanligt drag e2–e4',before:FEN.start,after:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR'},
  capture:{name:'Slag: Ta1xa8',before:'n3k3/8/8/8/8/8/8/R3K3',after:'R3k3/8/8/8/8/8/8/4K3'},
  enpassant:{name:'En passant e5xd6',before:'4k3/8/8/3pP3/8/8/8/4K3',after:'4k3/8/3P4/8/8/8/8/4K3'},
  castle:{name:'Rockad O-O',before:CASTLE_WHITE_BEFORE,after:CASTLE_WHITE_K},
  promotion:{name:'Promovering b7–b8=D',before:PROMOTION_FEN,after:'1Q2k3/8/8/8/8/8/8/4K3'}
};
let state=readState(), board=null,active='settings',busy=false,playing=false,playTimer=null,generation=0,disposing=false,htmlLayer=null;
let windows;
windows=createWindows(id=>{if(id)active=id;render();});
active=windows.popupId|| (TABS.some(t=>t.id===location.hash.slice(1))?location.hash.slice(1):'settings');
const tabState=()=>state.tabs[active];
function update(mutate){state=changeState(mutate);}
function message(text,error=false){if($('status')){$('status').textContent=text;$('status').classList.toggle('error',error);}}
function reportError(error){message(error?.message||String(error),true);}
function stop(){playing=false;clearTimeout(playTimer);if($('play'))$('play').textContent='Spela sekvens';}
function dispose(){stop();generation++;busy=false;disposing=true;htmlLayer=null;if(board){board.cancelMoveInput();for(const ev of Object.values(POINTER_EVENTS))board.disableSquareSelect(ev);board.destroy();board=null;}disposing=false;}
function drawTabs(){
  if(windows.popupId){$('tabs').innerHTML=`<div class="window-bar"><strong>↗ ${TABS.find(t=>t.id===active).name}<small>Eget fönster · flytta till valfri skärm</small></strong><button id="return">↙ Sätt tillbaka</button></div>`;$('return').onclick=()=>windows.returnToMain();return;}
  $('tabs').innerHTML=TABS.map((t,i)=>`<div class="tab-group ${t.id===active?'active':''} ${windows.isDetached(t.id)?'detached':''}"><button class="tab" role="tab" id="tab-${t.id}" aria-selected="${t.id===active}" aria-controls="panel" tabindex="${t.id===active?0:-1}" data-tab="${t.id}"><span class="tab-number">${i+1}</span>${t.name}${windows.isDetached(t.id)?' ↗':''}</button><button class="detach" data-detach="${t.id}" aria-label="${windows.isDetached(t.id)?'Sätt tillbaka':'Lossa'} ${t.name}" title="${windows.isDetached(t.id)?'Sätt tillbaka fliken':'Lossa till eget fönster'}">${windows.isDetached(t.id)?'↙':'↗'}</button></div>`).join('');
  $('tabs').setAttribute('role','tablist');
  for(const el of document.querySelectorAll('[data-tab]')){
    el.onclick=()=>{active=el.dataset.tab;history.replaceState(null,'','#'+active);render();};
    el.onkeydown=e=>{const i=TABS.findIndex(t=>t.id===active);let n;if(e.key==='ArrowRight')n=(i+1)%TABS.length;if(e.key==='ArrowLeft')n=(i+TABS.length-1)%TABS.length;if(e.key==='Home')n=0;if(e.key==='End')n=TABS.length-1;if(n!==undefined){e.preventDefault();active=TABS[n].id;render();$('tab-'+active).focus();}};
  }
  for(const el of document.querySelectorAll('[data-detach]'))el.onclick=()=>{const id=el.dataset.detach;if(windows.isDetached(id))windows.dock(id);else detach(id);};
}
function detach(id){stop();if(!windows.detach(id))message('Webbläsaren blockerade fönstret. Tillåt popup-fönster för den här webbplatsen och klicka på Lossa igen.',true);}
function commonControls(){return `<div class="buttons"><button id="flip">Vänd brädet</button><button id="start">Startställning</button></div>`;}
function controls(){const s=state.settings,t=tabState();switch(active){
case 'settings':return `<section class="card"><h3>Gemensamt utseende</h3><div class="fields">${select('theme','Brädtema',[['default','Default · trä'],['default-contrast','Default · hög kontrast'],['green','Grön'],['blue','Blå'],['red','Röd'],['orange','Orange'],['purple','Lila'],['teal','Turkos'],['chess-club','Chess club'],['chessboard-js','Chessboard.js'],['black-and-white','Svart och vitt']],s.theme)}${select('pieces','Pjäsuppsättning',[['standard.svg','Standard'],['staunty.svg','Staunty']],s.pieces)}${select('border','Ram',[['none','Ingen'],['thin','Tunn'],['frame','Bred']],s.border)}<div style="align-self:end">${check('coordinates','Visa koordinater',s.coordinates)}</div><label class="wide">Brädets maxbredd <output id="widthValue">${s.width} px</output><input id="width" type="range" min="240" max="900" step="20" value="${s.width}"></label></div><p class="hint">Brädet krymper automatiskt om fönstret är smalare.</p><div class="buttons"><button id="resetSettings">Återställ utseende</button></div></section><section class="card"><h3>Förhandsvisning</h3>${commonControls()}<div class="buttons"><button id="sample">Exempelställning</button><button id="empty">Tomt bräde</button></div><p class="hint">Ställningen bevaras när du byter utseende.</p></section>`;
case 'input':return `<section class="card"><h3>Mus, klick och pekskärm</h3>${select('mode','Vilka pjäser får flyttas?',[['both','Båda färgerna'],['w','Endast vita'],['b','Endast svarta'],['off','Ingen – låst bräde']],t.mode)}<div style="margin-top:16px">${check('reject','Avvisa alla drag (test av validering)',t.reject)}</div>${commonControls()}<div class="buttons"><button id="undo" ${t.history.length?'':'disabled'}>Ångra flytt</button><button id="cancel">Avbryt pågående flytt</button></div><p class="hint">Tillåtna flyttar är fria: detta testar inmatningen, inte schackreglerna. Högerklick eller Escape avbryter en pågående flytt.</p></section><section class="card"><h3>Händelser från brädet</h3><ol class="log" id="events"></ol><div class="buttons"><button id="clearLog">Töm logg</button></div></section>`;
case 'fen':return `<section class="card"><label for="fenInput">Ladda FEN</label><textarea id="fenInput" rows="3" spellcheck="false" placeholder="Klistra in FEN…">${esc(t.fen)}</textarea><div class="buttons"><button class="primary" id="loadFen">Ladda ställning</button><button id="copyFen">Kopiera pjäsdel</button></div><p class="hint">Endast pjäsplaceringen används och kopieras. Dragfärg, rockad, en passant och räknare i full FEN används inte. Format kontrolleras, inte ställningens laglighet.</p></section><section class="card"><h3>Placera eller radera pjäser</h3><div class="palette">${['w','b'].flatMap(c=>['k','q','r','b','n','p'].map(p=>`<button data-piece="${c+p}" class="${t.palette===c+p?'selected':''}" title="${c==='w'?'Vit':'Svart'} ${{k:'kung',q:'dam',r:'torn',b:'löpare',n:'springare',p:'bonde'}[p]}" aria-label="${c==='w'?'Vit':'Svart'} ${{k:'kung',q:'dam',r:'torn',b:'löpare',n:'springare',p:'bonde'}[p]}" aria-pressed="${t.palette===c+p}"><svg viewBox="0 0 40 40"><use href="./vendor/cm-chessboard/assets/pieces/${s.pieces}#${c+p}"></use></svg></button>`)).join('')}<button class="erase ${t.palette==='erase'?'selected':''}" data-piece="erase" aria-pressed="${t.palette==='erase'}">Radera pjäs</button></div>${commonControls()}<div class="buttons"><button id="sample">Exempelställning</button><button id="empty">Tomt bräde</button></div></section>`;
case 'markers':return `<section class="card"><h3>Rutor och symboler</h3><div class="fields">${select('markerShape','Markeringstyp',[['circle','Cirkel'],['frame','Ram'],['dot','Prick'],['square','Fylld ruta'],['bevel','Hörn']],t.markerShape)}${select('markerColor','Markeringsfärg',[['default','Standard / svart'],['blue','Blå'],['red','Röd'],['green','Grön'],['orange','Orange'],['purple','Lila']],t.markerColor)}</div><p class="hint">Typ och färg väljs oberoende av varandra. Klicka på en ruta för att lägga till eller ta bort den valda kombinationen.</p></section><section class="card"><h3>Pilar</h3><div class="fields"><label>Från ruta<input id="arrowFrom" type="text" maxlength="2" value="e2"></label><label>Till ruta<input id="arrowTo" type="text" maxlength="2" value="e4"></label></div><div style="margin-top:12px">${select('arrowType','Pilfärg',[['success','Grön'],['danger','Röd'],['info','Blå'],['warning','Gul']],t.arrowType)}</div><div class="buttons"><button class="primary" id="addArrow">Lägg till pil</button><button id="clearMarks">Rensa alla</button><button id="demoMarks">Visa exempel</button></div>${commonControls()}</section>`;
case 'animation':return `<section class="card"><h3>Animationstid</h3><label>Tid <output id="durationValue">${s.duration} ms</output><input id="duration" type="range" min="0" max="1500" step="50" value="${s.duration}"></label><p class="hint">0 ms stänger av animationerna. Inställningen gäller alla testbräden.</p></section><section class="card"><h3>Spansk öppning · åtta halvdrag</h3><div class="buttons"><button id="first">⏮ Början</button><button id="prev">← Föregående</button><button id="next">Nästa →</button><button class="primary" id="play">Spela sekvens</button><button id="stop">Stoppa</button></div><div class="steps" id="steps"></div><p id="stepInfo" class="hint"></p><div class="buttons"><button id="flip">Vänd brädet</button></div><p class="hint">Stoppa avslutar det pågående draget. Pil vänster/höger stegar när du inte skriver i ett fält.</p></section>`;
case 'parameters':return `<section class="card"><h3>Dokumenterade grundparametrar</h3><div class="fields"><div>${check('responsive','responsive · automatisk storleksändring',t.responsive)}</div><div>${check('assetsCache','assetsCache · cacha SVG-resurser',t.assetsCache)}</div><label class="wide">style.aspectRatio <output id="aspectValue">${Number(t.aspectRatio).toFixed(2)}</output><input id="aspectRatio" type="range" min="0.75" max="1.25" step="0.05" value="${t.aspectRatio}"></label></div><p class="hint">För mobil är det framför allt responsive=true som är viktigt. Komponenten lyssnar på ResizeObserver och anpassar sig till containerns bredd.</p></section><section class="card"><h3>Mobil / touch</h3><div class="api-values"><code>touchstart / touchmove / touchend</code><code>responsive: ${t.responsive}</code><code>aspectRatio: ${Number(t.aspectRatio).toFixed(2)}</code><code>AutoBorderNone kan ta bort ram på små bräden</code></div><p class="hint">Det finns ingen separat mobileMode-parameter. Mobilanpassningen görs med responsiv container/CSS, touch-stöd och eventuellt AutoBorderNone.</p>${commonControls()}</section>`;
case 'pointer':return `<section class="card"><h3>enableSquareSelect</h3>${select('pointerEvent','Pekhändelse',[['pointerdown','pointerdown'],['pointerup','pointerup'],['pointermove','pointermove']],t.pointerEvent)}<p class="hint">Rör eller klicka över brädet. pointermove kan ge många händelser.</p><div class="buttons"><button id="clearPointer">Töm logg</button></div></section><section class="card"><h3>Rapporterade rutor</h3><ol class="log" id="pointerLog"></ol>${commonControls()}</section>`;
case 'rotation':return `<section class="card"><h3>PieceRotation extension</h3><div class="fields">${select('rotationColor','Vilka pjäser?',[['','Alla pjäser'],['w','Endast vita'],['b','Endast svarta']],t.rotationColor)}<div style="align-self:end">${check('rotationAnimated','Animerad rotation',t.rotationAnimated)}</div></div><div class="buttons"><button data-rotate="0">0°</button><button data-rotate="90">90°</button><button data-rotate="180">180°</button><button data-rotate="270">270°</button></div><p class="hint">Pjäsernas symboler roteras på plats; rutor och ställning ändras inte. Du kan fortfarande flytta pjäser.</p>${commonControls()}</section>`;
case 'annotator':return `<section class="card"><h3>RightClickAnnotator extension</h3><p><strong>Högerklick</strong> = grön cirkel. <strong>Högerdra</strong> = grön pil.</p><p class="hint">Alt/Cmd/AltGr + höger = blå · Shift + höger = röd · Shift+Alt + höger = orange. Samma markering igen tar bort den.</p><div class="buttons"><button id="clearAnnotations">Rensa alla markeringar</button></div>${commonControls()}</section>`;
case 'accessibility':return `<section class="card"><h3>Accessibility extension</h3><div class="access-grid">${check('brailleNotationInAlt','Braille-notation i alt-text',t.brailleNotationInAlt)}${check('boardAsTable','Visa brädet som HTML-tabell',t.boardAsTable)}${check('movePieceForm','Visa formulär för drag',t.movePieceForm)}${check('piecesAsList','Visa pjäser som lista',t.piecesAsList)}${check('keyboardMoveInput','Tangentbordsnavigering på brädet',t.keyboardMoveInput)}${check('visuallyHidden','Dölj extra utdata visuellt',t.visuallyHidden)}</div><div class="buttons"><button id="focusBoard">Fokusera brädet</button></div><p class="hint">Med tangentbord: piltangenter flyttar fokus, Enter/Space väljer pjäs/målruta och Escape avbryter.</p>${commonControls()}</section>`;
case 'specialMoves':return `<section class="card"><h3>Animerad rockad</h3><div class="buttons"><button id="castleK">Vit O-O</button><button id="castleQ">Vit O-O-O</button><button id="castleReset">Rockadställning</button></div><p class="hint">cm-chessboard känner inte själv schackregeln. Som i ägarens validate-moves-exempel sätts den färdiga ställningen med setPosition(..., true), vilket animerar både kung och torn.</p></section><section class="card"><h3>Klickbar bondepromovering</h3><div class="buttons"><button class="primary" id="promotionReset">Ladda promoveringsställning</button><button id="promotionDemo">Promovera b7–b8</button></div><p class="hint">Du kan också själv klicka eller dra bonden b7 till b8. Därefter visas komponentens PromotionDialog där du klickar på dam, torn, löpare eller springare.</p></section>`;
case 'htmlLayer':return `<section class="card"><h3>HtmlLayer extension</h3><div class="buttons"><button class="primary" id="addHtmlLayer">Visa HTML-lager</button><button id="removeHtmlLayer">Ta bort lager</button></div><p class="hint">Lagret ligger som vanlig HTML ovanpå SVG-brädet. Det kan användas för instruktioner, status, analysinformation eller egna kontroller.</p>${commonControls()}</section>`;
case 'autoBorder':return `<section class="card"><h3>AutoBorderNone extension</h3><label>Ta bort ram under <output id="autoBorderValue">${t.autoBorderThreshold} px</output><input id="autoBorderThreshold" type="range" min="280" max="800" step="20" value="${t.autoBorderThreshold}"></label><div class="buttons"><button data-boardwidth="400">Bräde 400 px</button><button data-boardwidth="600">Bräde 600 px</button><button data-boardwidth="800">Bräde 800 px</button></div><p class="hint">När brädets faktiska bredd går under gränsen byter extensionen automatiskt borderType till none.</p></section>`;
case 'persistence':return `<section class="card"><h3>Persistence extension</h3><p class="hint"><strong>Observera:</strong> komponentägaren skriver själv att denna extension är work in progress och inte bör användas i produktion.</p><div class="buttons"><button id="persistStart">Startställning</button><button id="persistSample">Exempelställning</button><button id="persistEmpty">Tomt bräde</button><button id="persistClear">Glöm sparad position</button></div><p class="hint">Extensionen sparar automatiskt positionen i localStorage-nyckeln <code>chessboard</code> och laddar den igen när fliken skapas.</p></section>`;
case 'undoAnimations':return `<section class="card"><h3>Animerad utför / ångra</h3>${select('undoScenario','Scenario',Object.entries(UNDO_SCENARIOS).map(([k,v])=>[k,v.name]),t.undoScenario)}<div class="buttons"><button class="primary" id="doScenario">Utför</button><button id="undoScenarioBtn" ${t.undoDone?'':'disabled'}>Ångra</button><button id="resetScenario">Återställ före</button></div><p class="hint">Ångra är inte en separat cm-chessboard-funktion. Vi sparar föregående position och animerar tillbaka med <code>setPosition(föregående, true)</code>. Det fungerar även för flera samtidiga pjäsförändringar.</p></section>`;
case 'moveReturn':return `<section class="card"><h3>Dragretur</h3><div class="api-values"><code>Senaste dragkod: <strong id="moveCode">${esc(t.lastMoveCode)}</strong></code><code>Byggs av event.squareFrom + event.squareTo</code></div><p class="hint">Flytta valfri pjäs. Exempel: e2 till e4 ger <strong>e2e4</strong>. Detta är koordinatnotation/UCI-liknande text, men cm-chessboard levererar rutorna separat.</p><div class="buttons"><button id="clearMoveCode">Nollställ</button></div>${commonControls()}</section>`;
}}
function render(){
  dispose();state=readState();drawTabs();const tab=TABS.find(t=>t.id===active);
  document.title=`Exp_Bräde · ${tab.name}`;
  if(!windows.popupId&&windows.isDetached(active)){$('main').innerHTML=`<section class="card placeholder"><h2>${tab.name} ligger i ett eget fönster</h2><p>Flytta fönstret till en annan skärm med dess namnlist. Inställningar och testdata behålls.</p><div class="buttons"><button id="focusWindow">Visa fönstret</button><button class="primary" id="dockWindow">↙ Sätt tillbaka</button></div></section>`;$('focusWindow').onclick=()=>detach(active);$('dockWindow').onclick=()=>windows.dock(active);return;}
  if(OWNER_TESTS[active]){
    const testName=OWNER_TESTS[active];
    $('main').innerHTML=`<section id="panel" role="tabpanel" ${windows.popupId?'':`aria-labelledby="tab-${active}"`}><div class="panel-heading"><div><h2>${tab.name}</h2><p>${tab.description}</p></div>${windows.popupId?'':`<button id="detachActive" title="Öppna denna flik i ett riktigt webbläsarfönster">↗ Lossa fliken</button>`}</div><section class="card owner-test-card"><div class="owner-test-head"><div><strong>Originalfil: ${testName}.js</strong><p>Testet körs från vår oförändrade kopia av cm-chessboard 8.14.0.</p></div><button id="rerunTest">Kör om testet</button></div><iframe id="ownerTestFrame" class="owner-test-frame" title="${testName}" src="./vendor/cm-chessboard/test/${testName}.html"></iframe></section></section>`;
    if($('detachActive'))$('detachActive').onclick=()=>detach(active);
    $('rerunTest').onclick=()=>{const f=$('ownerTestFrame');f.src=f.src.split('?')[0]+'?run='+Date.now();};
    return;
  }
  $('main').innerHTML=`<section id="panel" role="tabpanel" ${windows.popupId?'':`aria-labelledby="tab-${active}"`}><div class="panel-heading"><div><h2>${tab.name}</h2><p>${tab.description}</p></div>${windows.popupId?'':`<button id="detachActive" title="Öppna denna flik i ett riktigt webbläsarfönster">↗ Lossa fliken</button>`}</div><div class="workspace"><div class="board-column"><div class="board-shell" style="width:${state.settings.width}px"><div id="board" class="board" aria-label="Schackbräde för ${tab.name}"></div><div class="board-caption"><span id="orientation"></span><span><span class="live-dot">●</span> Eget testbräde</span></div><div id="status" class="status" role="status">Brädet är klart.</div><div class="fen-output"><label for="fenOutput">Bräd-FEN · pjäsdelen</label><textarea id="fenOutput" rows="2" readonly></textarea></div></div></div><aside class="controls">${controls()}</aside></div></section>`;
  if($('detachActive'))$('detachActive').onclick=()=>detach(active);
  createBoard();bindControls();updateInfo();
}
function createBoard(){
  const s=state.settings,t=tabState();
  const extensions=[{class:Markers,props:{autoMarkers:null}},{class:Arrows}];
  if(active==='rotation')extensions.push({class:PieceRotation,props:{angle:t.rotationAngle||0,animationDuration:s.duration}});
  if(active==='annotator')extensions.push({class:RightClickAnnotator});
  if(active==='accessibility')extensions.push({class:Accessibility,props:{brailleNotationInAlt:t.brailleNotationInAlt,boardAsTable:t.boardAsTable,movePieceForm:t.movePieceForm,piecesAsList:t.piecesAsList,keyboardMoveInput:t.keyboardMoveInput,visuallyHidden:t.visuallyHidden}});
  if(active==='specialMoves')extensions.push({class:PromotionDialog});
  if(active==='htmlLayer')extensions.push({class:HtmlLayer});
  if(active==='autoBorder')extensions.push({class:AutoBorderNone,props:{chessboardBorderType:s.border,borderNoneBelow:t.autoBorderThreshold}});
  if(active==='persistence')extensions.push({class:Persistence,props:{initialPosition:FEN.start}});
  const initialPosition=active==='animation'?positions[t.step]:active==='specialMoves'?PROMOTION_FEN:active==='undoAnimations'?UNDO_SCENARIOS[t.undoScenario].before:t.fen;
  board=new Chessboard($('board'),{position:initialPosition,orientation:t.orientation,responsive:active==='parameters'?t.responsive:true,assetsUrl:'./vendor/cm-chessboard/assets/',assetsCache:active==='parameters'?t.assetsCache:false,style:{cssClass:s.theme,showCoordinates:s.coordinates,borderType:s.border,aspectRatio:active==='parameters'?Number(t.aspectRatio):1,pieces:{file:`pieces/${s.pieces}`,tileSize:40},animationDuration:s.duration},extensions});
  if(active==='input')applyMoveInputSetting();
  if(active==='rotation'||active==='accessibility')board.enableMoveInput(()=>true);
  if(active==='moveReturn')board.enableMoveInput(e=>{
    if(e.type===INPUT_EVENT_TYPE.moveInputStarted)return true;
    if(e.type===INPUT_EVENT_TYPE.validateMoveInput){
      const code=`${e.squareFrom}${e.squareTo}`;
      update(s=>s.tabs.moveReturn.lastMoveCode=code);
      if($('moveCode'))$('moveCode').textContent=code;
      message(`Dragkod: ${code}`);
      return true;
    }
    if(e.type===INPUT_EVENT_TYPE.moveInputFinished){update(s=>s.tabs.moveReturn.fen=board.getPosition());updateInfo();}
    return true;
  });
  if(active==='specialMoves')board.enableMoveInput(e=>{
    if(e.type===INPUT_EVENT_TYPE.moveInputStarted)return e.squareFrom==='b7';
    if(e.type===INPUT_EVENT_TYPE.validateMoveInput){
      const promotion=e.squareFrom==='b7'&&e.squareTo==='b8'&&e.piece==='wp';
      if(promotion){
        e.chessboard.state.moveInputProcess.then(()=>showPromotionChoice('b8','w'));
        return true;
      }
      return false;
    }
    return true;
  },COLOR.white);
  if(active==='fen'||active==='markers')board.enableSquareSelect(POINTER_EVENTS.pointerdown,e=>{
    if(!e.square||e.event.button!==0||busy)return;
    if(active==='fen'){const piece=tabState().palette;board.setPiece(e.square,piece==='erase'?null:piece,false).then(()=>{update(s=>{s.tabs.fen.fen=board.getPosition();});updateInfo();$('fenInput').value=board.getPosition();message(`${piece==='erase'?'Raderade på':'Placerade pjäs på'} ${e.square}.`);}).catch(reportError);}
    else{update(s=>{const tab=s.tabs.markers,a=tab.markers,i=a.findIndex(m=>m.square===e.square&&m.shape===tab.markerShape&&m.color===tab.markerColor);if(i>=0)a.splice(i,1);else a.push({square:e.square,shape:tab.markerShape,color:tab.markerColor});});drawMarks();message(`Markering på ${e.square} uppdaterad.`);}
  });
  if(active==='pointer'){board.enableSquareSelect(POINTER_EVENTS[t.pointerEvent]||POINTER_EVENTS.pointerdown,e=>{if(!e.square)return;const now=new Date().toLocaleTimeString('sv-SE');update(s=>{s.tabs.pointer.pointerEvents.unshift(`${now}  ${t.pointerEvent}: ${e.square}`);s.tabs.pointer.pointerEvents=s.tabs.pointer.pointerEvents.slice(0,80);});drawPointerEvents();});}
  if(active==='markers')drawMarks();
}
function updateInfo(){if(!board)return;$('fenOutput').value=board.getPosition();$('orientation').textContent=board.getOrientation()==='w'?'Vit sida nedåt':'Svart sida nedåt';if(active==='input'){drawEvents();$('undo').disabled=!tabState().history.length;}if(active==='pointer')drawPointerEvents();if(active==='animation')drawSteps();}
function addEvent(text){const time=new Date().toLocaleTimeString('sv-SE');update(s=>{s.tabs.input.events.unshift(`${time}  ${text}`);s.tabs.input.events=s.tabs.input.events.slice(0,40);});drawEvents();}
function drawEvents(){if($('events'))$('events').innerHTML=tabState().events.length?tabState().events.map(e=>`<li>${esc(e)}</li>`).join(''):'<li>Flytta en pjäs för att se händelser.</li>';}
function drawPointerEvents(){if($('pointerLog'))$('pointerLog').innerHTML=tabState().pointerEvents.length?tabState().pointerEvents.map(e=>`<li>${esc(e)}</li>`).join(''):'<li>Ingen pekhändelse ännu.</li>';}
function moveInputHandler(e){
  if(disposing)return false;
  if(e.type===INPUT_EVENT_TYPE.moveInputStarted){addEvent(`Start: ${e.squareFrom}`);return true;}
  if(e.type===INPUT_EVENT_TYPE.validateMoveInput){const ok=!tabState().reject;addEvent(`${ok?'Godkänd':'Avvisad'}: ${e.squareFrom}–${e.squareTo}`);if(ok)update(s=>{s.tabs.input.history.push(board.getPosition());s.tabs.input.history=s.tabs.input.history.slice(-100);});return ok;}
  if(e.type===INPUT_EVENT_TYPE.moveInputCanceled){addEvent('Flytten avbröts');message('Flytten avbröts.');}
  if(e.type===INPUT_EVENT_TYPE.moveInputFinished){update(s=>{s.tabs.input.fen=board.getPosition();});updateInfo();message(e.legalMove?`Flyttat ${e.squareFrom}–${e.squareTo}. Ingen regelkontroll.`:'Draget avvisades eller avbröts.');}
}
function applyMoveInputSetting(){board.disableMoveInput();if(tabState().mode!=='off')board.enableMoveInput(moveInputHandler,tabState().mode==='both'?undefined:tabState().mode);}
async function boardAction(action,after){if(busy||!board)return;busy=true;const g=generation;try{await action();if(g!==generation)return;after?.();updateInfo();}catch(e){if(g===generation)reportError(e);}finally{if(g===generation){busy=false;if(active==='animation')drawSteps();}}}
function setPosition(fen,label){return boardAction(()=>board.setPosition(fen,true),()=>{update(s=>{s.tabs[active].fen=fen;if(active==='input')s.tabs.input.history=[];});if($('fenInput'))$('fenInput').value=fen;message(label);});}
function drawMarks(){board.removeMarkers();board.removeArrows();for(const m of tabState().markers){const type=storedMarkerType(m);if(type)board.addMarker(type,m.square);}for(const a of tabState().arrows)board.addArrow(ARROW_TYPE[a.type],a.from,a.to);}
function showPromotionChoice(square,color){
  board.showPromotionDialog(square,color,result=>{
    if(result&&result.piece)board.setPiece(square,result.piece,true).then(()=>{update(s=>s.tabs.specialMoves.fen=board.getPosition());updateInfo();message(`Promoverade till ${result.piece}.`);});
    else board.setPosition(PROMOTION_FEN,true).then(()=>{updateInfo();message('Promoveringen avbröts.');});
  });
}
async function runPromotionDemo(){
  await board.setPosition(PROMOTION_FEN,false);
  await board.movePiece('b7','b8',true);
  showPromotionChoice('b8','w');
}
function drawSteps(){const n=tabState().step;$('steps').innerHTML=moves.map((m,i)=>`<span class="${i+1===n?'current':i<n?'done':''}">${m[2]}</span>`).join('');$('stepInfo').textContent=`${n} av ${moves.length} halvdrag visade`;$('prev').disabled=busy||playing||n===0;$('first').disabled=busy||playing||n===0;$('next').disabled=busy||playing||n===moves.length;$('play').disabled=busy||playing;$('play').textContent=playing?'Spelar…':'Spela sekvens';}
async function step(n){await boardAction(()=>board.setPosition(positions[n],true),()=>{update(s=>{s.tabs.animation.step=n;s.tabs.animation.fen=positions[n];});message(n?`Visar ${moves[n-1][2]}`:'Startställningen.');});}
async function play(){if(playing||busy)return;if(tabState().step===moves.length)await step(0);playing=true;drawSteps();const g=generation;async function advance(){if(!playing||g!==generation)return;if(tabState().step>=moves.length){stop();drawSteps();return;}await step(tabState().step+1);if(playing&&g===generation)playTimer=setTimeout(advance,400);}await advance();}
function bind(id,event,fn){if($(id))$(id).addEventListener(event,fn);}
function bindControls(){
  bind('flip','click',()=>boardAction(()=>board.setOrientation(board.getOrientation()==='w'?COLOR.black:COLOR.white,true),()=>{update(s=>s.tabs[active].orientation=board.getOrientation());message('Brädet vändes.');}));
  bind('start','click',()=>setPosition(FEN.start,'Startställningen laddades.'));bind('sample','click',()=>setPosition(SAMPLE,'Exempelställningen laddades.'));bind('empty','click',()=>setPosition(FEN.empty,'Brädet tömdes.'));
  for(const id of ['theme','pieces','border','coordinates'])bind(id,'change',()=>{const value=id==='coordinates'?$(id).checked:$(id).value;update(s=>s.settings[id]=value);render();message('Utseendet uppdaterades i alla testfönster.');});
  bind('width','input',()=>{const value=Number($('width').value);update(s=>s.settings.width=value);$('widthValue').textContent=value+' px';document.querySelector('.board-shell').style.width=value+'px';});
  bind('resetSettings','click',()=>{update(s=>s.settings={...DEFAULT_SETTINGS});render();});
  bind('mode','change',()=>{update(s=>s.tabs.input.mode=$('mode').value);applyMoveInputSetting();message(tabState().mode==='off'?'Pjäsflyttning avstängd.':'Inmatningsinställningen uppdaterad.');});
  bind('reject','change',()=>update(s=>s.tabs.input.reject=$('reject').checked));
  bind('cancel','click',()=>{board.cancelMoveInput();message('Pågående flytt avbruten.');});
  bind('undo','click',()=>{const h=tabState().history;if(h.length)boardAction(()=>board.setPosition(h.at(-1),true),()=>{update(s=>{s.tabs.input.fen=s.tabs.input.history.pop();});message('Senaste flytten ångrades.');});});
  bind('clearLog','click',()=>{update(s=>s.tabs.input.events=[]);drawEvents();});
  bind('loadFen','click',()=>{try{const f=parsePlacement($('fenInput').value);setPosition(f.placement,f.full?'FEN laddad. Endast pjäsplaceringen används.':'Pjäsställningen laddades.');}catch(e){reportError(e);}});
  bind('copyFen','click',async()=>{try{await navigator.clipboard.writeText(board.getPosition());message('FEN-pjäsdelen kopierad.');}catch{$('fenOutput').focus();$('fenOutput').select();message('Kopiera det markerade FEN-fältet med Ctrl+C.');}});
  for(const el of document.querySelectorAll('[data-piece]'))el.onclick=()=>{update(s=>s.tabs.fen.palette=el.dataset.piece);for(const x of document.querySelectorAll('[data-piece]')){const selected=x===el;x.classList.toggle('selected',selected);x.setAttribute('aria-pressed',selected);}message('Klicka på en ruta på brädet.');};
  bind('markerShape','change',()=>update(s=>s.tabs.markers.markerShape=$('markerShape').value));bind('markerColor','change',()=>update(s=>s.tabs.markers.markerColor=$('markerColor').value));bind('arrowType','change',()=>update(s=>s.tabs.markers.arrowType=$('arrowType').value));
  bind('addArrow','click',()=>{const from=$('arrowFrom').value.trim().toLowerCase(),to=$('arrowTo').value.trim().toLowerCase();if(!/^[a-h][1-8]$/.test(from)||!/^[a-h][1-8]$/.test(to)||from===to){message('Ange två olika rutor mellan a1 och h8.',true);return;}update(s=>{const a=s.tabs.markers.arrows,type=s.tabs.markers.arrowType;if(!a.some(x=>x.from===from&&x.to===to&&x.type===type))a.push({from,to,type});});drawMarks();message(`Pil ${from}–${to} tillagd.`);});
  bind('clearMarks','click',()=>{update(s=>{s.tabs.markers.markers=[];s.tabs.markers.arrows=[];});drawMarks();message('Alla markeringar och pilar borttagna.');});
  bind('demoMarks','click',()=>{update(s=>{s.tabs.markers.markers=[{square:'e4',shape:'circle',color:'blue'},{square:'d4',shape:'frame',color:'red'},{square:'f3',shape:'dot',color:'green'},{square:'c6',shape:'square',color:'orange'},{square:'g5',shape:'bevel',color:'purple'}];s.tabs.markers.arrows=[{from:'e2',to:'e4',type:'success'},{from:'g1',to:'f3',type:'info'}];});drawMarks();message('Exempelmarkeringar visas.');});
  bind('responsive','change',()=>{update(s=>s.tabs.parameters.responsive=$('responsive').checked);render();});
  bind('assetsCache','change',()=>{update(s=>s.tabs.parameters.assetsCache=$('assetsCache').checked);render();});
  bind('aspectRatio','input',()=>{const v=Number($('aspectRatio').value);update(s=>s.tabs.parameters.aspectRatio=v);$('aspectValue').textContent=v.toFixed(2);});
  bind('aspectRatio','change',()=>render());
  bind('pointerEvent','change',()=>{update(s=>s.tabs.pointer.pointerEvent=$('pointerEvent').value);render();});
  bind('clearPointer','click',()=>{update(s=>s.tabs.pointer.pointerEvents=[]);drawPointerEvents();});
  bind('rotationColor','change',()=>update(s=>s.tabs.rotation.rotationColor=$('rotationColor').value));
  bind('rotationAnimated','change',()=>update(s=>s.tabs.rotation.rotationAnimated=$('rotationAnimated').checked));
  for(const el of document.querySelectorAll('[data-rotate]'))el.onclick=()=>{const angle=Number(el.dataset.rotate);board.setPiecesRotation(angle,{color:tabState().rotationColor||undefined,animated:tabState().rotationAnimated}).then(()=>{update(s=>s.tabs.rotation.rotationAngle=angle);message(`Pjäser roterade till ${angle}°.`);}).catch(reportError);};
  bind('clearAnnotations','click',()=>{board.removeArrows();board.removeMarkers();message('Alla högerklicksmarkeringar rensades.');});
  for(const id of ['brailleNotationInAlt','boardAsTable','movePieceForm','piecesAsList','keyboardMoveInput','visuallyHidden'])bind(id,'change',()=>{update(s=>s.tabs.accessibility[id]=$(id).checked);render();});
  bind('focusBoard','click',()=>{board.view.svg.focus();message('Brädet har tangentbordsfokus.');});
  bind('castleK','click',async()=>{await board.setPosition(CASTLE_WHITE_BEFORE,false);await board.setPosition(CASTLE_WHITE_K,true);updateInfo();message('Vit kort rockad animerad: kung e1–g1 och torn h1–f1.');});
  bind('castleQ','click',async()=>{await board.setPosition(CASTLE_WHITE_BEFORE,false);await board.setPosition(CASTLE_WHITE_Q,true);updateInfo();message('Vit lång rockad animerad: kung e1–c1 och torn a1–d1.');});
  bind('castleReset','click',()=>board.setPosition(CASTLE_WHITE_BEFORE,true).then(()=>{updateInfo();message('Rockadställningen återställd.');}));
  bind('promotionReset','click',()=>board.setPosition(PROMOTION_FEN,true).then(()=>{updateInfo();message('Flytta bonden b7 till b8.');}));
  bind('promotionDemo','click',()=>runPromotionDemo().catch(reportError));
  bind('addHtmlLayer','click',()=>{if(htmlLayer)board.removeHtmlLayer(htmlLayer);htmlLayer=board.addHtmlLayer('<div class="demo-html-layer"><strong>HTML-lager</strong><span>Vanlig HTML ovanpå SVG-brädet</span></div>');message('HTML-lager tillagt.');});
  bind('removeHtmlLayer','click',()=>{if(htmlLayer){board.removeHtmlLayer(htmlLayer);htmlLayer=null;}message('HTML-lagret borttaget.');});
  bind('autoBorderThreshold','input',()=>{const v=Number($('autoBorderThreshold').value);update(s=>s.tabs.autoBorder.autoBorderThreshold=v);$('autoBorderValue').textContent=v+' px';});
  bind('autoBorderThreshold','change',()=>render());
  for(const el of document.querySelectorAll('[data-boardwidth]'))el.onclick=()=>{const w=Number(el.dataset.boardwidth);document.querySelector('.board-shell').style.width=w+'px';message(`Brädets demonstrationsbredd: ${w} px.`);};
  bind('persistStart','click',()=>board.setPosition(FEN.start,true).then(updateInfo));
  bind('persistSample','click',()=>board.setPosition(SAMPLE,true).then(updateInfo));
  bind('persistEmpty','click',()=>board.setPosition(FEN.empty,true).then(updateInfo));
  bind('persistClear','click',()=>{localStorage.removeItem('chessboard');board.setPosition(FEN.start,true).then(()=>{updateInfo();message('Persistence-lagringen rensad.');});});
  bind('undoScenario','change',()=>{update(s=>{s.tabs.undoAnimations.undoScenario=$('undoScenario').value;s.tabs.undoAnimations.undoDone=false;});render();});
  bind('doScenario','click',async()=>{const sc=UNDO_SCENARIOS[tabState().undoScenario];await board.setPosition(sc.before,false);await board.setPosition(sc.after,true);update(s=>s.tabs.undoAnimations.undoDone=true);updateInfo();$('undoScenarioBtn').disabled=false;message(sc.name+' utfört med animation.');});
  bind('undoScenarioBtn','click',async()=>{const sc=UNDO_SCENARIOS[tabState().undoScenario];await board.setPosition(sc.before,true);update(s=>s.tabs.undoAnimations.undoDone=false);updateInfo();$('undoScenarioBtn').disabled=true;message(sc.name+' ångrades med animation.');});
  bind('resetScenario','click',async()=>{const sc=UNDO_SCENARIOS[tabState().undoScenario];await board.setPosition(sc.before,false);update(s=>s.tabs.undoAnimations.undoDone=false);updateInfo();$('undoScenarioBtn').disabled=true;message('Scenariot återställt före draget.');});
  bind('clearMoveCode','click',()=>{update(s=>s.tabs.moveReturn.lastMoveCode='—');if($('moveCode'))$('moveCode').textContent='—';message('Dragkoden nollställd.');});
  bind('duration','input',()=>{const d=Number($('duration').value);update(s=>s.settings.duration=d);board.props.style.animationDuration=d;$('durationValue').textContent=d+' ms';});
  bind('first','click',()=>step(0));bind('prev','click',()=>step(Math.max(0,tabState().step-1)));bind('next','click',()=>step(Math.min(moves.length,tabState().step+1)));bind('play','click',play);bind('stop','click',()=>{stop();drawSteps();message('Uppspelningen stoppas efter pågående drag.');});
}
subscribe(next=>{
  const before=state;state=next;
  if(!board)return;
  const a={...before.settings},b={...next.settings};delete a.width;delete b.width;delete a.duration;delete b.duration;
  if(JSON.stringify(a)!==JSON.stringify(b)||JSON.stringify(before.tabs[active])!==JSON.stringify(next.tabs[active])){render();return;}
  document.querySelector('.board-shell').style.width=next.settings.width+'px';
  board.props.style.animationDuration=next.settings.duration;
  if($('width')){$('width').value=next.settings.width;$('widthValue').textContent=next.settings.width+' px';}
  if($('duration')){$('duration').value=next.settings.duration;$('durationValue').textContent=next.settings.duration+' ms';}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&board)board.cancelMoveInput();if(active==='animation'&&board&&!busy&&!playing&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)&&e.target.getAttribute('role')!=='tab'){if(e.key==='ArrowRight'){e.preventDefault();step(Math.min(8,tabState().step+1));}if(e.key==='ArrowLeft'){e.preventDefault();step(Math.max(0,tabState().step-1));}}});
document.addEventListener('storage-unavailable',()=>message('Webbläsaren tillåter inte lokal lagring. Inställningarna sparas bara i detta fönster.',true));
window.addEventListener('pagehide',dispose);
render();
