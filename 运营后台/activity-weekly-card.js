(() => {
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rewardTypes=Object.freeze({...window.adminRewardTypes,DAILY_BONUS:'每日奖金'});
window.adminRewardTypes=rewardTypes;
window.makeWeeklyCardExample=()=>({rewardType:rewardTypes.DAILY_BONUS,conditions:[{type:'vip',min:0,max:2},{type:'recharge',min:0,max:1000}],plans:[{price:100,cycles:1,button:'领取',days:Array.from({length:7},(_,i)=>({amount:i===6?30:20,wager:1}))}]});
const style=document.createElement('style');style.textContent=`.wc-page .wc-summary{display:flex;gap:32px;padding:18px 20px;background:#eff6ff;border:1px solid #dbeafe;border-radius:7px;flex-wrap:wrap}.wc-summary span{display:block;font-size:12px;color:#64748b;margin-bottom:6px}.wc-summary strong{font-size:22px;color:#334155}.wc-page [data-reward-editor]{width:680px;max-width:100%;box-sizing:border-box}.wc-page [data-reward-editor] .ac-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),1fr))}.wc-page [data-reward-editor] table{table-layout:fixed;min-width:360px}.wc-page [data-reward-editor] :is(th,td){border:0;padding:5px 12px}.wc-page [data-reward-editor] th{background:transparent;color:#64748b;font-size:12px;font-weight:600;padding-bottom:8px}.wc-page [data-reward-editor] tbody td:first-child{white-space:nowrap;color:#475569}.wc-page [data-reward-editor] td:first-child{width:64px}.wc-day-field{display:grid;gap:4px}.wc-day-field span{font-size:12px;color:#475569}.wc-page .wc-table-wrap{overflow:auto;padding:0 16px 16px}.wc-page table{width:100%;border-collapse:collapse;min-width:580px}.wc-page th,.wc-page td{padding:10px 14px;border-bottom:1px solid #e7ecf3;text-align:left}.wc-page th{background:#f1f5f9;font-size:12px}.wc-page td input{box-sizing:border-box;width:100%;max-width:240px;border:1px solid #dce4ef;border-radius:5px;background:#f8fafc;height:36px;padding:8px 10px;color:#334155;font:inherit}.wc-page .wc-tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:16px}.wc-page .wc-tools input{height:35px;width:130px;padding:0 10px;border:1px solid #dce4ef;border-radius:5px}.wc-page .wc-preview{padding:20px;display:grid;grid-template-columns:minmax(200px,1fr) 2fr;gap:24px}.wc-page .wc-days{display:grid;grid-template-columns:repeat(7,minmax(70px,1fr));gap:8px;overflow:auto}.wc-page .wc-day{border:1px solid #dce4ef;border-radius:6px;text-align:center;padding:14px 5px;background:#f8fafc}.wc-day small{display:block;color:#64748b;margin-bottom:10px}.wc-page .wc-note{padding:0 16px 16px;margin:0;color:#64748b;font-size:12px;line-height:1.7}.wc-page .wc-preview h4{margin:0 0 8px;font-size:18px}.wc-page .wc-preview p{color:#64748b;line-height:1.6;margin:0}.wc-page input[readonly]{background:#f1f5f9;color:#64748b}@media(max-width:800px){.wc-page .wc-preview{grid-template-columns:1fr}.wc-page .wc-days{grid-template-columns:repeat(7,80px)}}`;style.textContent+=`.weekly-preview{width:min(390px,92vw);max-height:92vh;overflow:auto;padding:0;border:0;border-radius:16px;color:#213547}.weekly-preview::backdrop{background:#091621aa}.wp-head,.wp-controls{padding:14px 18px;background:#fff}.wp-head{display:flex;align-items:center;justify-content:space-between}.weekly-preview button,.weekly-preview select{cursor:pointer;border-radius:6px;border:1px solid #d4dce1;padding:5px 9px}.wp-phone{margin:0 14px;padding:24px 14px;text-align:center;border-radius:14px;background:linear-gradient(155deg,#087971,#102d37 65%);color:white}.wp-phone h2{color:#ffe584;margin:10px 0}.wp-phone p,.wp-phone span{font-size:13px}.wp-days{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:20px 0 14px}.wp-days>div{display:grid;gap:10px;background:#126869;padding:8px 2px;border-radius:7px}.wp-days>div:last-child{grid-column:span 2;background:#86621c}.wp-days .today{outline:2px solid #ffcf58}.wp-days small{font-size:10px}.wp-action{background:#ffcf58;color:#342708}.wp-phone nav,.wp-controls div{margin-top:12px}.wp-controls{font-size:12px}`;document.head.append(style);
function renderGroup(host,activity,onSave,onBack){
const initial={...window.makeWeeklyCardExample(),...JSON.parse(JSON.stringify(activity.rules||{}))};
const input=(key,label,value,type='number',hint='')=>`<div class="ac-field"><label for="wc-${key}">${label}</label><input id="wc-${key}" name="${key}" type="${type}" ${type==='number'?'min="0" step="0.01"':''} value="${esc(value)}" required>${hint?`<small class="ac-hint">${hint}</small>`:''}</div>`;
const select=(key,label,options)=>`<div class="ac-field"><label for="wc-${key}">${label}</label><select id="wc-${key}" name="${key}">${options.map(([value,text])=>`<option value="${value}">${text}</option>`).join('')}</select></div>`;
const card=(title,body)=>`<section class="ac-card"><h3>${title}</h3>${body}</section>`;
host.onkeydown=null;host.innerHTML=`<section class="ac-page wc-page"><header class="ac-top"><div><h2>周卡活动配置</h2><p class="ac-hint">活动 ID：${esc(activity.id)} · ${esc(activity.name)}</p></div><button type="button" data-back>返回列表</button></header><form class="ac-form" novalidate>
${card('参与条件',`<div data-conditions></div><div class="wc-tools"><button type="button" data-add-condition>＋ 新增用户条件</button></div><p class="wc-note">用户须同时满足已添加的全部条件。VIP等级包含首尾；累计充值金额按历史成功充值总额计算，包含下限、不含上限。</p>`)}
${card('奖励配置',`<div class="wc-tabs" role="tablist" aria-label="奖励配置" data-reward-tabs></div><div data-reward-editor></div>`)}
<div class="ac-error" data-error role="alert"></div><footer class="ac-footer"><button type="reset">重置</button><button type="submit" class="primary">保存配置</button></footer></form></section>`;
const q=s=>host.querySelector(s),form=q('form'),el=k=>form.elements.namedItem(k),value=k=>el(k).value;
let rewardRows=JSON.parse(JSON.stringify(initial.plans)),rewardActive=0;
const rewardName=i=>'配置'+(i<10?['一','二','三','四','五','六','七','八','九','十'][i]:i+1);
function captureReward(){const r=rewardRows[rewardActive];if(!el('cycles'))return;r.price=el('planPrice').valueAsNumber;r.cycles=el('cycles').valueAsNumber;r.button=value('buttonText').trim();r.days=r.days.map((_,i)=>({amount:el('amount'+i).valueAsNumber,wager:el('wager'+i).valueAsNumber}));}
function drawRewards(){q('[data-reward-tabs]').innerHTML=rewardRows.map((_,i)=>`<button type="button" role="tab" aria-selected="${i===rewardActive}" data-reward-tab="${i}">${rewardName(i)}</button>`).join('')+'<button type="button" data-add-reward>＋ 新增配置</button>'+(rewardRows.length>2?'<button type="button" data-delete-reward>删除当前配置</button>':'');
const r=rewardRows[rewardActive];q('[data-reward-editor]').innerHTML=`<div class="ac-grid">${input('planPrice','购买金额（₹）',r.price??100)}${input('cycles','循环次数',r.cycles,'number','每位用户可参与本配置的次数；填正整数，-1 表示不限次数。')}${input('buttonText','按钮文案',r.button,'text')}</div><div class="wc-table-wrap"><table><tbody>${r.days.map((day,i)=>`<tr><td>第${i+1}天</td>${['amount','wager'].map(k=>`<td><label class="wc-day-field"><span>${k==='amount'?'赠送金额（₹）':'打码倍数'}</span><input type="number" min="0" step="0.01" required name="${k}${i}" aria-label="第${i+1}天${k==='amount'?'赠送金额':'打码倍数'}" value="${esc(day[k])}"></label></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;el('cycles').min='-1';el('cycles').step='1';
q('[data-reward-tabs]').querySelectorAll('[data-reward-tab]').forEach(b=>b.onclick=()=>{captureReward();rewardActive=Number(b.dataset.rewardTab);drawRewards();update();});
const del=q('[data-delete-reward]');if(del)del.onclick=()=>{if(rewardRows.length<=2)return;rewardRows.splice(rewardActive,1);rewardActive=Math.min(rewardActive,rewardRows.length-1);drawRewards();update();};
q('[data-add-reward]').onclick=()=>{captureReward();rewardRows.push({price:100,cycles:1,button:'领取',days:Array.from({length:7},()=>({amount:null,wager:1}))});rewardActive=rewardRows.length-1;drawRewards();update();};}
let conditions=JSON.parse(JSON.stringify(initial.conditions));
function readConditions(){return [...q('[data-conditions]').querySelectorAll('[data-condition]')].map(row=>({type:row.querySelector('select').value,min:row.querySelector('[data-min]').value===''?null:Number(row.querySelector('[data-min]').value),max:row.querySelector('[data-max]').value===''?null:Number(row.querySelector('[data-max]').value)}));}
function drawConditions(){q('[data-conditions]').innerHTML=conditions.map((c,i)=>`<div class="wc-condition" data-condition><div class="ac-field"><label for="wc-condition-${i}">用户条件</label><select id="wc-condition-${i}"><option value="" ${!c.type?'selected':''}>请选择用户条件</option><option value="vip" ${c.type==='vip'?'selected':''}>VIP等级</option><option value="recharge" ${c.type==='recharge'?'selected':''}>累计充值金额</option></select></div><div class="ac-field"><label for="wc-min-${i}">下限（含）</label><input id="wc-min-${i}" data-min type="number" min="0" step="${c.type==='vip'?'1':'0.01'}" value="${esc(c.min)}" ${!c.type?'disabled':''} required></div><span>至</span><div class="ac-field"><label for="wc-max-${i}">上限</label><input id="wc-max-${i}" data-max type="number" min="0" step="${c.type==='vip'?'1':'0.01'}" value="${esc(c.max)}" ${!c.type?'disabled':''} required></div><button type="button" data-remove-condition="${i}" aria-label="删除用户条件${i+1}">删除</button></div>`).join('');
q('[data-conditions]').querySelectorAll('select').forEach((select,i)=>select.onchange=()=>{conditions=readConditions();conditions[i].min=null;conditions[i].max=null;drawConditions();});
q('[data-conditions]').querySelectorAll('[data-remove-condition]').forEach(button=>button.onclick=()=>{conditions=readConditions();conditions.splice(Number(button.dataset.removeCondition),1);drawConditions();});}
q('[data-add-condition]').onclick=()=>{conditions=readConditions();conditions.push({type:'',min:null,max:null});drawConditions();};
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2});
function update(){captureReward();}
function reset(){conditions=JSON.parse(JSON.stringify(initial.conditions));drawConditions();for(const [key,v]of Object.entries(initial)){if(key!=='rewards'&&el(key))el(key).value=v;}rewardRows=JSON.parse(JSON.stringify(initial.plans));rewardActive=0;drawRewards();q('[data-error]').textContent='';update();}
q('[data-back]').onclick=onBack;form.oninput=update;form.onchange=update;form.onreset=e=>{e.preventDefault();reset();};
form.onsubmit=e=>{e.preventDefault();q('[data-error]').textContent='';const invalid=form.querySelector('input:invalid');if(invalid){invalid.reportValidity();invalid.focus();return;}onSave(read());};
function read(){const data={};for(const key of Object.keys(initial))if(key!=='rewards'&&el(key))data[key]=el(key).type==='number'?(value(key)===''?null:Number(value(key))):value(key).trim();captureReward();data.plans=JSON.parse(JSON.stringify(rewardRows));data.conditions=readConditions();return data;}
host.readConfig=read;host.validateConfig=()=>{const invalid=form.querySelector('input:invalid');if(invalid){invalid.reportValidity();invalid.focus();return false;}return true;};reset();
};

window.renderWeeklyCardRules=function(host,activity,onSave,onBack){
const clone=x=>JSON.parse(JSON.stringify(x));
const source=activity.rules||window.makeWeeklyCardExample();
let groups=clone(source.configs||[source]),active=0;
const original=clone(groups);
style.textContent+=`.wc-condition{display:grid;width:800px;max-width:100%;box-sizing:border-box;grid-template-columns:minmax(140px,1.1fr) minmax(100px,1fr) 16px minmax(100px,1fr) 60px;justify-content:start;gap:12px;align-items:end;padding:0 16px;margin:0 0 10px}.wc-condition:first-child{padding-top:16px}.wc-condition+.wc-condition .ac-field>label{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.wc-condition>span{align-self:end;padding-bottom:10px}.wc-condition .ac-field{min-width:0}.wc-condition input,.wc-condition select{width:100%;min-width:0;box-sizing:border-box}.wc-condition>button{margin-bottom:1px;white-space:nowrap}.wc-tabs{display:flex;gap:8px;flex-wrap:wrap;padding:16px 20px;background:#fff;border-bottom:1px solid #e2e8f0}.wc-tabs button[aria-selected="true"]{background:#eff6ff;border-color:#60a5fa;color:#2563eb}.wc-group-host>.wc-page>.ac-top{display:none}.wc-group-host .ac-form{overflow:visible}.wc-groups{overflow:auto}.wc-group-host .ac-page{overflow:visible;height:auto}.wc-group-error{color:#dc2626;padding:0 20px}`;
function preview(){
 capture();
 const group=groups[active],dlg=document.createElement('dialog');
 dlg.className='weekly-preview';dlg.setAttribute('aria-label','周卡前台预览');
 host.append(dlg);let plans,index,clock,state;
 function restart(){plans=clone(group.plans);index=0;clock=0;state=plans.map(()=>({used:0,start:null,claimed:[]}));paint();}
 function paint(){
 const ids=plans.map((p,i)=>state[i].start!==null||p.cycles===-1||state[i].used<p.cycles?i:-1).filter(i=>i>=0);
 if(!ids.includes(index))index=ids[0];const p=plans[index],st=state[index],day=st?.start==null?-1:clock-st.start;
 dlg.innerHTML=`<div class="wp-head"><b>前台预览</b><button data-close aria-label="关闭预览">×</button></div><div class="wp-phone"><small>🎁 WEEKLY CARD · 周卡</small><h2>周卡礼金</h2><p>领取今日周卡奖励</p>${p?`<div class="wp-days">${p.days.map((d,i)=>`<div class="${i===day?'today':''}"><small>第 ${i+1} 天</small><strong>₹${esc(d.amount??'—')}</strong><small>${st.claimed.includes(i)?'已领取':day>i?'已作废':day===i?'待领取':''}</small></div>`).join('')}</div><button class="wp-action" data-action ${day>=0&&st.claimed.includes(day)?'disabled':''}>${day<0?'待购买':st.claimed.includes(day)?'已领取':'待领取'}</button>${ids.length>1?`<nav><button data-step="-1" aria-label="上一个方案">‹</button> ${ids.map(i=>i===index?'●':'○').join(' ')} <button data-step="1" aria-label="下一个方案">›</button></nav>`:''}`:'<p>本组方案的参与次数已用完。</p>'}</div><div class="wp-controls"><div>预览日：第 ${clock+1} 天 <button data-next>模拟次日 00:00</button> <button data-reset>重置演示</button></div></div>`;
 dlg.querySelector('[data-close]').onclick=()=>dlg.close();
 dlg.querySelector('[data-next]').onclick=()=>{clock++;state.forEach(s=>{if(s.start!==null&&clock-s.start>=7)s.start=null;});paint();};
 dlg.querySelector('[data-reset]').onclick=restart;
 dlg.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{index=ids[(ids.indexOf(index)+Number(b.dataset.step)+ids.length)%ids.length];paint();});
 if(p)dlg.querySelector('[data-action]').onclick=()=>{if(day<0){st.used++;st.start=clock;st.claimed=[];}else if(!st.claimed.includes(day))st.claimed.push(day);paint();};
 }
 restart();dlg.onclose=()=>dlg.remove();dlg.showModal();
}

function capture(){const inner=host.querySelector('.wc-group-host');if(inner?.readConfig)groups[active]=inner.readConfig();}
function draw(){host.innerHTML=`<section class="ac-page wc-groups"><header class="ac-top"><div><h2>周卡活动配置</h2><p class="ac-hint">活动 ID：${esc(activity.id)} · ${esc(activity.name)}</p></div><div><button type="button" data-preview>前台预览</button> <button type="button" data-back>返回列表</button></div></header><div class="wc-tabs" role="tablist">${groups.map((_,i)=>`<button type="button" role="tab" aria-selected="${i===active}" data-tab="${i}">配置${i+1}</button>`).join('')}<button type="button" data-add>＋ 新增配置</button></div><div class="wc-group-error" role="alert"></div><div class="wc-group-host"></div></section>`;
const inner=host.querySelector('.wc-group-host');
renderGroup(inner,{...activity,rules:groups[active]},data=>{groups[active]=data;save();},onBack);
host.querySelector('[data-back]').onclick=onBack;host.querySelector('[data-preview]').onclick=preview;
host.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{capture();active=Number(b.dataset.tab);draw();});
host.querySelector('[data-add]').onclick=()=>{capture();const next=window.makeWeeklyCardExample();next.conditions=[{type:'',min:null,max:null}];groups.push(next);active=groups.length-1;draw();};
inner.querySelector('[type=submit]').textContent='保存全部配置';
inner.querySelector('form').onreset=e=>{e.preventDefault();groups=clone(original);active=0;draw();};
}
function bounds(g,type){const rows=(g.conditions||[]).filter(c=>c.type===type);return [Math.max(0,...rows.map(c=>c.min)),Math.min(Infinity,...rows.map(c=>c.max))];}
function save(){
for(let i=0;i<groups.length;i++){
const g=groups[i];
let error='';
if(!g.conditions?.length)error='请至少添加一项用户条件。';
else if(g.conditions.some(c=>!['vip','recharge'].includes(c.type)||!Number.isFinite(c.min)||!Number.isFinite(c.max)||c.min<0||c.max<0||(c.type==='vip'?(!Number.isInteger(c.min)||!Number.isInteger(c.max)||c.min>c.max):c.min>=c.max)))error='请选择用户条件并填写有效区间。';
else if(['vip','recharge'].some(type=>{const range=bounds(g,type);return range[0]>range[1]||(type==='recharge'&&range[0]===range[1]);}))error='同一类型的条件区间无交集，请调整用户条件。';
for(const [j,plan] of g.plans.entries()){if(!Number.isFinite(plan.price)||plan.price<0||!Number.isSafeInteger(plan.cycles)||(plan.cycles!==-1&&plan.cycles<1)||!plan.button?.trim()||plan.days.length!==7||plan.days.some(d=>[d.amount,d.wager].some(v=>!Number.isFinite(v)||v<0))){error=`请检查第${j+1}套奖励配置的购买金额、循环次数、按钮文案和7天奖励。`;break;}}
if(error){active=i;draw();host.querySelector('.wc-group-error').textContent=`配置${i+1}：${error}`;return;}
for(let j=0;j<i;j++){const h=groups[j];if(['vip','recharge'].every(type=>{const a=bounds(g,type),b=bounds(h,type);return type==='vip'?a[0]<=b[1]&&a[1]>=b[0]:a[0]<b[1]&&a[1]>b[0];})){host.querySelector('.wc-group-error').textContent=`配置${j+1}与配置${i+1}的适用条件重叠，请调整VIP等级或累计充值区间。`;host.querySelector('.wc-group-error').scrollIntoView({block:'center'});return;}}
}
onSave({rewardType:rewardTypes.DAILY_BONUS,configs:clone(groups)});
}
draw();if(new URLSearchParams(location.hash.slice(1)).get('preview')==='1')preview();
};
})();
