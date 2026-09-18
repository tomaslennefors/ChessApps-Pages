import {TABS} from './state.js';

// One real browser window per detached tab; browser/OS owns screen placement.
export function createWindows(onChange){
  const params=new URLSearchParams(location.search);
  const popupId=TABS.some(t=>t.id===params.get('tab'))?params.get('tab'):null;
  let group=params.get('group');
  if(!group){try{group=sessionStorage.getItem('Exp_Brade.windowGroup');}catch{}if(!group)group=crypto.randomUUID();}
  if(!popupId){try{sessionStorage.setItem('Exp_Brade.windowGroup',group);}catch{}}
  const mainName='Exp_Brade_'+group;
  if(!popupId)window.name=mainName;
  const bus=typeof BroadcastChannel==='function'?new BroadcastChannel(mainName):null;
  const children=new Map();
  const remote=new Map();
  const send=data=>bus?.postMessage(data);
  function mark(id){remote.set(id,Date.now());onChange();}
  function dock(id){
    const child=children.get(id);if(child&&!child.closed)child.close();
    children.delete(id);remote.delete(id);send({type:'dock',id});onChange(id);
  }
  function announce(){send({type:'hello',id:popupId});}
  if(bus)bus.onmessage=({data})=>{
    if(popupId){if(data.type==='dock'&&data.id===popupId)window.close();if(data.type==='ping')announce();}
    else if(data.type==='hello'){if(TABS.some(t=>t.id===data.id)&&!remote.has(data.id))mark(data.id);else remote.set(data.id,Date.now());}
    else if(data.type==='returned')dock(data.id);
  };
  window.expDock=dock;
  const poll=setInterval(()=>{
    if(popupId){announce();return;}
    for(const [id,child] of children)if(child.closed){children.delete(id);remote.delete(id);onChange(id);}
    for(const [id,last] of remote)if(!children.has(id)&&Date.now()-last>12000){remote.delete(id);onChange(id);}
  },1000);
  if(popupId)announce();else send({type:'ping'});
  // pagehide also fires on reload: closure is detected by the parent's poll.
  window.addEventListener('pagehide',()=>{clearInterval(poll);});
  return {
    popupId,
    isDetached:id=>children.has(id)||remote.has(id),
    detach(id){
      const previous=children.get(id);if(previous&&!previous.closed){previous.focus();return true;}
      const url=new URL(location.href);url.search='';url.searchParams.set('tab',id);url.searchParams.set('group',group);url.hash='';
      const child=window.open(url.href,mainName+'_'+id,'popup=yes,width=1100,height=860,resizable=yes,scrollbars=yes');
      if(!child)return false;
      children.set(id,child);remote.set(id,Date.now());onChange();child.focus();return true;
    },
    dock,
    returnToMain(){
      const url=new URL(location.href);url.search='';url.searchParams.set('group',group);url.hash=popupId;
      let parent;
      try{if(window.opener&&!window.opener.closed&&typeof window.opener.expDock==='function')parent=window.opener;}catch{}
      if(parent){parent.focus();parent.expDock(popupId);}
      else {send({type:'returned',id:popupId});window.open(url.href,mainName);window.close();}
    }
  };
}
