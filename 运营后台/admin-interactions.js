(()=>{
'use strict';
const style=document.createElement('style');
style.textContent=`
/* Shared, restrained interaction feedback; never delay business actions. */
#page button,.topbar button{transition:background-color 140ms ease,border-color 140ms ease,box-shadow 140ms ease,filter 140ms ease,scale 100ms ease}
@media(hover:hover){#page button:not(:disabled):not([aria-disabled=true]):hover{filter:brightness(.97);box-shadow:0 2px 5px #21334d12}#page tbody tr:hover>td{background-color:#f2f6fc}}
#page button:not(:disabled):not([aria-disabled=true]):active,.topbar button:not(:disabled):active{scale:.98;box-shadow:none}
#page button:focus-visible,.topbar button:focus-visible{outline:2px solid #5e91db;outline-offset:2px}
#page input:not([type=radio]):not([type=checkbox]),#page select,#page textarea,.menu-search input{transition:border-color 150ms ease,box-shadow 150ms ease,background-color 150ms ease}
#page input:not([type=radio]):not([type=checkbox]):focus-visible,#page select:focus-visible,#page textarea:focus-visible{outline:none;border-color:#739bce;box-shadow:0 0 0 3px #528bd51c;background-color:#fff}
#page input[type=radio],#page input[type=checkbox]{accent-color:#3879c7;cursor:pointer}
#page input:disabled,#page button:disabled{cursor:not-allowed}
#page tbody td{transition:background-color 120ms ease}
.menu-results:not([hidden]){animation:admin-pop-in 140ms ease-out both;transform-origin:top left}
#page [role=tabpanel]:not([hidden]){animation:admin-panel-in 160ms ease-out both}
@keyframes admin-pop-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
@keyframes admin-panel-in{from{opacity:.5}to{opacity:1}}
@media(prefers-reduced-motion:reduce){#page *, .topbar *{animation:none!important;transition:none!important}#page button:active,.topbar button:active{scale:1}}
`;
document.head.append(style);
const host=document.getElementById('page');
if(!host)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let current=null;
const observer=new MutationObserver(changes=>{
 if(reduce.matches||!changes.some(change=>change.addedNodes.length))return;
 const content=host.firstElementChild;
 if(!content||typeof content.animate!=='function')return;
 if(current)current.cancel();
 current=content.animate([{opacity:.55},{opacity:1}],{duration:180,easing:'ease-out'});
});
observer.observe(host,{childList:true});
reduce.addEventListener('change',()=>{if(reduce.matches&&current)current.cancel();});
})();
