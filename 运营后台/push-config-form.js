(() => {
  const internalPages=['充值-在线充值','分销','FAQ','外跳FAQ','Account','拉起客服','VIP','充值返利','排行榜','签到','vip召回活动','新注册送活动','JILI活动','邀请排行榜','PPD转盘','订单详情','站内信','输返活动','qrcode分页','通用活动'];
  const games=['3/GO Rush','4/Teen patti','5/Teen patti joker','6/Rummy','7/Ludo quick','8/Andar Bahar','9/Teen patti 20-20','10/Dragon Tiger','11/7up7down','12/Baccarat','13/Crazy Time','14/Lightning Roulette','15/Big Baller','16/Funky Time','17/Teen patti','18/Dragon Tiger','19/ezugi_casino','22/Mega Fishing','23/Royal Fishing','24/Jackpot Fishing','39/jdb-slots','40/cai_shen_fishing','41/five_dragon_fishing','42/dragon_master_fishing','43/Aviator','44/EVO Live','89/Money Coming','91/Mines'];
  const conditions=[['vip','VIP等级','text',false],['registered','注册时间','datetime-local',true],['login','最后登录时间','datetime-local',true],['recentLoginDays','有登录的时间范围','days',true],['recentNoLoginDays','未登录的时间范围','days',true],['recharge','总充值','number',true],['withdraw','总提现','number',true],['package','包ID','text',false],['lastRecharge','最后充值时间','datetime-local',true],['lastWithdraw','最后提现时间','datetime-local',true],['agentCount','代理下级人数','number',true]];
  const style=document.createElement('style');style.textContent=`
  .pf{height:100%;overflow:auto;font-size:14px;color:#445164}.pf [hidden]{display:none!important}.pf-head{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #edf0f4}.pf-head h2{margin:0;font-size:17px;font-weight:500}.pf-tabs{display:flex;gap:32px;padding:0 20px;border-bottom:1px solid #edf0f4}.pf-tab{background:none;border:0;border-bottom:2px solid transparent;color:#657283;padding:15px 0;font:inherit;cursor:pointer}.pf-tab[aria-selected=true]{border-bottom-color:#cf5454;color:#25374c}.pf-panel{padding:20px}.pf-field{margin:0 0 18px;min-width:0}.pf-field>label,.pf-field>legend{display:block;margin-bottom:8px;line-height:1.5}.pf input:not([type=radio]):not([type=checkbox]),.pf select,.pf textarea{width:100%;min-width:0;border:1px solid #cfd8e5;border-radius:3px;background:white;padding:7px 10px;font:inherit;color:#445164;min-height:36px}.pf textarea{min-height:130px;resize:vertical}.pf input:focus,.pf textarea:focus,.pf select:focus{outline:2px solid #97c9ee;outline-offset:0;border-color:#4289c6}.pf .required:before{content:'* ';color:#dc4d4d}.pf fieldset{padding:0;border:0}.pf-radio{display:flex;flex-wrap:wrap;gap:18px;align-items:center}.pf-radio label{display:flex;gap:5px;align-items:center;cursor:pointer}.pf input[type=radio],.pf input[type=checkbox]{accent-color:#2589de;margin:0;width:15px;height:15px;flex-shrink:0}.pf-subtle{font-size:12px;color:#7b8796}.pf-notice{color:#e04d4d;line-height:1.7;margin:0 0 16px;font-size:13px}.pf-id-row{display:flex;align-items:center;gap:8px}.pf-id-row>input{flex:1}.pf .teal{background:#1aafa8;color:white;border-color:#1aafa8;white-space:nowrap}.pf-condition-table{width:100%;border-collapse:collapse;margin:18px 0 16px}.pf-condition-table td{padding:10px;border:1px solid #edf0f4}.pf-condition-table tr:nth-child(odd){background:#f8f9fb}.pf-condition-table td:first-child{width:42px;text-align:center}.pf-condition-table td:nth-child(2){width:180px}.pf-range{display:flex;gap:8px;align-items:center}.pf .pf-range input{width:0;flex:1}.pf-estimate{display:flex;align-items:center;gap:12px;margin-bottom:20px}.pf-trigger{border-top:1px solid #dce3ea;padding-top:20px;margin-top:20px}.pf-unit{display:flex;align-items:center;gap:8px}.pf-unit span{white-space:nowrap}.pf-submit{display:flex;justify-content:flex-end;align-items:center;gap:16px;padding:14px 20px;border-top:1px solid #edf0f4;position:sticky;bottom:0;background:white}.pf-status{color:#8b5a17;font-size:13px}.pf-error{color:#c33;margin:0 20px 12px;line-height:1.5}.pf [aria-invalid=true]{border-color:#cc5252!important}.pf-scheduled{max-width:320px}@media(max-width:700px){.pf-panel{padding:15px}.pf-id-row{flex-wrap:wrap}.pf-id-row>input{flex-basis:100%}.pf-condition-table td{padding:8px 5px}.pf-condition-table td:nth-child(2){width:92px}.pf-range{flex-direction:column;gap:4px}.pf .pf-range input{width:100%;flex:auto}.pf-unit{flex-wrap:wrap}.pf-submit{align-items:flex-start}.pf-tabs{gap:22px}}
  .pf-combo{position:relative}.pf-combo-button{width:100%;text-align:left;background:white;border:1px solid #cfd8e5;border-radius:3px;padding:8px 10px;min-height:36px;font:inherit;color:inherit;cursor:pointer}.pf-combo-button:after{content:'▾';float:right}.pf-combo-panel{position:absolute;top:100%;left:0;right:0;border:1px solid #cfd8e5;background:white;z-index:4;padding:5px;box-shadow:0 5px 15px #17243515}.pf-combo-panel button{display:block;width:100%;padding:8px;border:0;background:white;color:inherit;text-align:left;cursor:pointer}.pf-combo-panel button:hover,.pf-combo-panel button[aria-selected=true]{background:#eaf2f8}
  `;document.head.append(style);
  const queryDaysStyle=document.createElement('style');queryDaysStyle.textContent='.pf-query-days{display:inline-flex;align-items:center;gap:7px;margin-left:10px;white-space:nowrap}.pf-query-days label{margin:0;color:#596575}.pf .pf-query-days input{width:112px!important;min-height:36px;flex:none}@media(max-width:700px){.pf-query-days{margin:6px 0 0 0;white-space:normal}}';document.head.append(queryDaysStyle);
  window.renderPushForm=function(host,onSubmit,onBack){
    const input=(name,type='text',required=false)=>`<input id="pf-${name}" name="${name}" type="${type}" ${required?'required':''} ${type==='datetime-local'?'step="1"':''}>`;
    const field=(name,label,html,required=false)=>`<div class="pf-field"><label for="pf-${name}" class="${required?'required':''}">${label}</label>${html}</div>`;
    const select=(name,options,selected)=>`<select id="pf-${name}" name="${name}">${options.map(v=>`<option ${v===selected?'selected':''}>${v}</option>`).join('')}</select>`;
    const radios=(name,label,options,selected)=>`<fieldset class="pf-field"><legend>${label}</legend><div class="pf-radio">${options.map(v=>`<label><input type="radio" name="${name}" value="${v}" ${v===selected?'checked':''}>${v}</label>`).join('')}</div></fieldset>`;
    host.innerHTML=`<form class="pf" novalidate><header class="pf-head"><h2>创建</h2><button type="button" class="push-button" id="pf-back">▤ 列表</button></header><div class="pf-tabs" role="tablist" aria-label="推送配置"><button type="button" role="tab" aria-selected="true" aria-controls="pf-basic" id="pf-basic-tab" class="pf-tab">推送基本配置</button><button type="button" role="tab" aria-selected="false" aria-controls="pf-target" id="pf-target-tab" class="pf-tab" tabindex="-1">推送目标配置</button></div>
      <section role="tabpanel" aria-labelledby="pf-basic-tab" id="pf-basic" class="pf-panel">
      ${field('name','名称',input('name','text',true),true)}
      ${field('title','标题（如需携带参数，请按照“{参数名}”形式填写，支持的参数名有：app_id）',input('title','text',true),true)}
      ${field('content','内容','<textarea id="pf-content" name="content" required></textarea>',true)}
      ${field('image','图片',input('image'))}
      ${field('type','类型',select('type',['充值','提现','活动','一般'],'一般'))}
      ${radios('jump','跳转方式',['不跳转','内部页','游戏','外部页'],'内部页')}
      <div id="pf-internal-wrap">${field('internal','内部页',select('internal',internalPages,internalPages[0]))}</div>
      <div id="pf-game-wrap" hidden>${field('game','游戏',select('game',games,games[0]))}</div>
      <div id="pf-external-wrap">${field('external','外部页',input('external'))}</div>
      ${radios('sender','发送方',['Admin','API'],'Admin')}
      ${radios('mode','发送方式',['立即','定时','暂不发送'],'立即')}
      <div id="pf-schedule-wrap" hidden>${field('sendAt','发送时间',input('sendAt','datetime-local'))}${radios('cycle','循环方式',['不循环','每周','每日'],'不循环')}</div>
      ${field('remark','备注','<textarea id="pf-remark" name="remark"></textarea>')}
      </section>
      <section role="tabpanel" aria-labelledby="pf-target-tab" id="pf-target" class="pf-panel" hidden>
      <p class="pf-notice">温馨提示:目前支持Push的APPID如下，未在此APPID下的用户无法收到Push，请知悉！<br>101,102,103,104,199,9002,999991</p>
      ${radios('target','',['按照用户ID','通过条件筛选','全部'],'按照用户ID')}
      <div id="pf-ids-wrap">${field('ids','用户ID',`<div class="pf-id-row"><input id="pf-ids" name="ids" placeholder="ID(多个ID以;隔开)"><button type="button" class="push-button teal" disabled title="导入文件格式待提供">批量导入</button><button type="button" class="push-button teal" disabled title="原始导入模板待提供">导入模板</button></div>`,true)}</div>
      <div id="pf-conditions-wrap" hidden><table class="pf-condition-table" aria-label="目标筛选条件"><tbody>${conditions.map(([key,label,type,range])=>`<tr><td><input type="checkbox" name="use-${key}" aria-label="启用${label}"></td><td>${label}</td><td>${range?`<div class="pf-range"><input name="${key}-from" aria-label="${label}起始" type="${type==='days'?'number':type}" ${type==='days'?'min="0" step="1"':type==='datetime-local'?'step="1"':''}><span>至</span><input name="${key}-to" aria-label="${label}结束" type="${type==='days'?'number':type}" ${type==='days'?'min="0" step="1"':type==='datetime-local'?'step="1"':''}>${type==='days'?'<span>天</span>':''}</div>${type==='days'?`<div class="pf-subtle">${key==='recentLoginDays'?'0＝今天登录':'0＝今天未登录'}</div>`:''}`:`<input name="${key}" aria-label="${label}">`}</td></tr>`).join('')}</tbody></table><div class="pf-estimate"><button type="button" class="push-button teal" id="pf-estimate">预估</button><span role="status" id="pf-estimate-result">预估数量：</span></div></div>
      <div class="pf-trigger">${field('trigger','触发条件',`<div class="pf-combo"><input type="hidden" name="trigger" value="无"><button type="button" id="pf-trigger" class="pf-combo-button" aria-haspopup="listbox" aria-expanded="false" aria-controls="pf-trigger-options">无</button><div class="pf-combo-panel" hidden><input type="search" id="pf-trigger-search" placeholder="搜索" aria-label="搜索触发条件"><div id="pf-trigger-options" role="listbox" aria-label="触发条件选项">${['无','未登录','未充值'].map(v=>`<button type="button" role="option" aria-selected="${v==='无'}" data-trigger="${v}">${v}</button>`).join('')}</div></div></div>`)}${field('triggerDays','触发条件值',`<div class="pf-unit">${input('triggerDays','number')}<span>（单位:天）</span></div>`)}</div>
      </section><p class="pf-error" role="alert" id="pf-error" hidden></p><footer class="pf-submit"><span class="pf-status">本地原型，提交仅保存示例，不实际发送</span><button type="submit" class="push-button teal">提交</button></footer></form>`;
    const form=host.querySelector('form'),q=s=>form.querySelector(s),f=n=>form.elements.namedItem(n),value=n=>f(n).value;
    const unloggedRow=f('use-recentNoLoginDays').closest('tr'),unloggedRange=unloggedRow.querySelector('.pf-range'),queryDays=document.createElement('div');queryDays.className='pf-query-days';queryDays.innerHTML='<label for="pf-recentNoLoginDays-query">查询天数</label><input id="pf-recentNoLoginDays-query" name="recentNoLoginDays-query" type="number" min="1" step="1" placeholder="请输入" aria-label="未登录范围查询天数"><span>天</span>';unloggedRange.append(queryDays);
    const showTab=key=>{['basic','target'].forEach(k=>{q('#pf-'+k).hidden=k!==key;const tab=q('#pf-'+k+'-tab');tab.setAttribute('aria-selected',String(k===key));tab.tabIndex=k===key?0:-1;});};
    ['basic','target'].forEach(k=>{q('#pf-'+k+'-tab').onclick=()=>showTab(k);q('#pf-'+k+'-tab').onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'basic':e.key==='End'?'target':k==='basic'?'target':'basic';showTab(next);q('#pf-'+next+'-tab').focus();}};});
    q('#pf-back').onclick=onBack;
    const combo=q('#pf-trigger'),panel=q('.pf-combo-panel'),search=q('#pf-trigger-search');
    const closeCombo=()=>{panel.hidden=true;combo.setAttribute('aria-expanded','false');};
    combo.onclick=()=>{panel.hidden=!panel.hidden;combo.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden){search.value='';form.querySelectorAll('[data-trigger]').forEach(b=>b.hidden=false);search.focus();}};
    search.oninput=()=>form.querySelectorAll('[data-trigger]').forEach(b=>b.hidden=!b.dataset.trigger.includes(search.value.trim()));
    form.querySelectorAll('[data-trigger]').forEach(b=>b.onclick=()=>{f('trigger').value=b.dataset.trigger;combo.textContent=b.dataset.trigger;form.querySelectorAll('[data-trigger]').forEach(o=>o.setAttribute('aria-selected',String(o===b)));closeCombo();combo.focus();});
    panel.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();closeCombo();combo.focus();}};
    form.addEventListener('click',e=>{if(!e.target.closest('.pf-combo'))closeCombo();});

    function sync(){const jump=value('jump'),mode=value('mode'),target=value('target');q('#pf-internal-wrap').hidden=jump!=='内部页';q('#pf-game-wrap').hidden=jump!=='游戏';q('#pf-external-wrap').hidden=!['内部页','外部页'].includes(jump);q('#pf-schedule-wrap').hidden=mode!=='定时';q('#pf-ids-wrap').hidden=target!=='按照用户ID';q('#pf-conditions-wrap').hidden=target!=='通过条件筛选';}
    form.addEventListener('change',sync);
    form.addEventListener('input',e=>{q('#pf-estimate-result').textContent='预估数量：';if(e.target.hasAttribute('aria-invalid')){e.target.removeAttribute('aria-invalid');q('#pf-error').hidden=true;}});
    q('#pf-estimate').onclick=()=>{q('#pf-estimate-result').textContent='预估数量：未接入用户数据，暂无法计算';};
    function fail(message,el,tab){showTab(tab);q('#pf-error').hidden=false;q('#pf-error').textContent=message;el.setAttribute('aria-invalid','true');el.focus();return false;}
    const submitData=onSubmit;onSubmit=data=>{if(data.target==='通过条件筛选'&&f('use-recentNoLoginDays').checked){const raw=value('recentNoLoginDays-query'),field=f('recentNoLoginDays-query');if(raw===''||!Number.isSafeInteger(Number(raw))||Number(raw)<1){q('[type=submit]').disabled=false;return fail(raw===''?'请填写未登录范围查询天数':'查询天数请输入大于0的整数',field,'target');}data.conditions.recentNoLoginDays.queryDays=Number(raw);}return submitData(data);};
    form.onsubmit=e=>{e.preventDefault();form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));q('#pf-error').hidden=true;
      for(const [key,label] of [['name','名称'],['title','标题'],['content','内容']])if(!value(key).trim())return fail('请填写'+label,f(key),'basic');
      if(value('mode')==='定时'&&!value('sendAt'))return fail('请选择发送时间',f('sendAt'),'basic');
      if(value('jump')==='外部页'&&!value('external').trim())return fail('请填写外部页地址',f('external'),'basic');
      if(value('target')==='按照用户ID'&&!value('ids').trim())return fail('请填写用户ID',f('ids'),'target');
      const selectedConditions={};
      if(value('target')==='通过条件筛选')for(const [key,label,type,range] of conditions){if(!f('use-'+key).checked)continue;
        if(range){const from=value(key+'-from'),to=value(key+'-to');
          if(!from&&!to)return fail('请填写'+label+'范围',f(key+'-from'),'target');
          if(type==='days')for(const [suffix,raw] of [['from',from],['to',to]]){
            if(raw==='')return fail('请填写'+label+'完整范围',f(key+'-'+suffix),'target');
            if(!Number.isSafeInteger(Number(raw))||Number(raw)<0)return fail(label+'请输入大于或等于0的整数天数',f(key+'-'+suffix),'target');
          }
          if(from&&to&&(['number','days'].includes(type)?Number(from)>Number(to):from>to))return fail(label+'起始值不能大于结束值',f(key+'-from'),'target');
          selectedConditions[key]=type==='days'?{from:Number(from),to:Number(to)}:{from,to};}
        else{const raw=value(key).trim();if(raw==='')return fail('请填写'+label,f(key),'target');
          if(type==='days'&&(!Number.isSafeInteger(Number(raw))||Number(raw)<0))return fail(label+'请输入大于或等于0的整数天数',f(key),'target');
          selectedConditions[key]=type==='days'?Number(raw):raw;}
      }
      if(value('trigger')!=='无'&&!value('triggerDays'))return fail('请填写触发条件值',f('triggerDays'),'target');
      const data={};for(const key of ['name','title','content','image','type','jump','sender','mode','remark','target','trigger'])data[key]=value(key);
      data.internal=data.jump==='内部页'?value('internal'):'';data.game=data.jump==='游戏'?value('game'):'';data.external=data.jump==='外部页'?value('external'):'';
      data.sendAt=data.mode==='定时'?value('sendAt'):'';if(data.sendAt.length===16)data.sendAt+=':00';data.cycle=data.mode==='定时'?value('cycle'):'不循环';data.ids=data.target==='按照用户ID'?value('ids'):'';data.conditions=selectedConditions;data.triggerDays=data.trigger==='无'?'':value('triggerDays');
      q('[type=submit]').disabled=true;onSubmit(data);
    };
    sync();
  };
})();
