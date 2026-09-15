(() => {
  const columns=['ID','名称','标题','类型','图片','跳转方式','跳转参数','发送方','发送方式','循环方式','发送时间','触发条件','触发条件值','备注','任务状态','发送总数','发送成功数','发送跳过数','发送失败数','操作人','创建时间','Action'];
  // Public demo records are synthetic and do not reproduce source screenshots.
  const source=Array.from({length:20},(_,i)=>[
    String(1000-i),`演示推送任务 ${i+1}`,`演示通知 ${i+1}`,'2026-01-01 00:00:00',0,0,0,0
  ]);
  const rows=source.map((r,i)=>[r[0],r[1],r[2],'一般','',''+([13,16,17,18,19].includes(i)?'内部页':'不跳转'),[13,16,18,19].includes(i)?'1':i===17?'7':'','Admin','立即发送','不循环','','','','','已完成',r[4]||0,r[5]||0,r[6]||0,r[7]||0,'Administrator',r[3]]);
  const formData=new Map();
  const style=document.createElement('style');style.textContent=`
  .push-page{display:flex;flex-direction:column;height:100%;min-height:0;font-size:14px}
  .push-toolbar{display:flex;align-items:center;justify-content:space-between;padding:15px 16px;border-bottom:1px solid #edf0f4;gap:12px}.push-toolbar-left{display:flex;align-items:center;gap:12px}.push-note{color:#8994a3;font-size:12px}
  .push-button{border:1px solid #dce3ed;background:white;color:#526174;padding:7px 12px;border-radius:4px;font:inherit;cursor:pointer}.push-button.primary{background:#278de0;color:white;border-color:#278de0}.push-button:disabled{cursor:default;opacity:.55}.push-button:not(:disabled):hover{filter:brightness(.96)}
  .push-table-wrap{overflow:auto;flex:1;min-height:0}.push-table{width:100%;min-width:2300px;border-collapse:separate;border-spacing:0;text-align:left;font-size:13px}.push-table th{background:#fafbfd;color:#445164;font-weight:600;position:sticky;top:0;z-index:1;white-space:nowrap}.push-table th,.push-table td{padding:12px 14px;border-bottom:1px solid #edf0f4;white-space:nowrap;line-height:20px}.push-table td{color:#596575}.push-table tbody tr:hover td{background:#f6f9ff}.push-table td:nth-child(3){min-width:230px}.push-table th:last-child,.push-table td:last-child{position:sticky;right:0;background:white;box-shadow:-1px 0 #e8edf3;text-align:center}.push-table th:last-child{z-index:2;background:#fafbfd}.push-table td:nth-child(15){color:#55726a}.push-action{border:0;background:transparent;color:#2477c4;font:inherit;padding:4px 8px;cursor:pointer;border-radius:4px}.push-action:not(:disabled):hover{background:#eaf2ff}.push-action.danger{color:#c34d4d}.push-action:disabled{opacity:.5;cursor:default}.push-table td:last-child{min-width:184px}.push-footer{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;border-top:1px solid #e8edf3;color:#6d7887;font-size:13px}.push-pagination{display:flex;gap:6px;align-items:center}.push-pagination select{padding:6px;border:1px solid #dce3ed;border-radius:4px;background:white;color:#526174}.push-pagination .current{background:#317ab9;color:white;border-color:#317ab9}.push-column-picker{position:absolute;right:0;top:40px;background:white;border:1px solid #dce3ed;box-shadow:0 8px 30px #17243520;padding:12px;z-index:5;border-radius:6px;width:200px;max-height:360px;overflow:auto}.push-column-picker label{display:flex;align-items:center;gap:8px;padding:6px;white-space:nowrap}.push-column-anchor{position:relative}.push-dialog{border:0;border-radius:9px;width:min(680px,90vw);max-height:85vh;padding:24px;color:#334155;box-shadow:0 20px 80px #17243540}.push-dialog::backdrop{background:#0f172a55}.push-dialog h2{font-size:18px;margin:0}.push-dialog-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.push-detail{display:grid;grid-template-columns:120px 1fr;margin:0;font-size:14px}.push-detail dt,.push-detail dd{margin:0;padding:9px 0;border-bottom:1px solid #edf0f4;overflow-wrap:anywhere}.push-detail dt{color:#8893a0}.push-page [hidden]{display:none!important}
  .push-confirm{width:340px;text-align:center;padding:26px 24px 22px}.push-confirm .question{margin:0 auto 18px;border:2px solid #c7dfe9;width:54px;height:54px;border-radius:50%;display:grid;place-items:center;color:#88b4c6;font-size:30px}.push-confirm h2{margin:0 0 22px;font-size:18px;font-weight:500}.push-confirm-actions{display:flex;justify-content:center;gap:8px}.push-confirm .cancel{background:#a5a5a5;color:white;border-color:#a5a5a5}
  `;document.head.append(style);
  window.renderPushConfig=function(host){
    host.innerHTML='<div class="push-page"><div class="push-toolbar"><div class="push-toolbar-left"><button class="push-button primary" id="push-create">创建</button><span class="push-note">虚构演示数据 · 20 条记录</span></div><div class="push-column-anchor"><button class="push-button" id="push-columns" aria-expanded="false" aria-label="选择显示列">▦ ▾</button><div class="push-column-picker" id="push-picker" hidden></div></div></div><div class="push-table-wrap"><table class="push-table" aria-label="推送配置列表"><thead><tr></tr></thead><tbody></tbody></table></div><div class="push-footer"><span id="push-count"></span><div class="push-pagination"><label>每页 <select id="push-size" aria-label="每页条数"><option>10</option><option selected>20</option></select> 条</label><button class="push-button" id="push-prev" aria-label="上一页">‹</button><span id="push-pages"></span><button class="push-button" id="push-next" aria-label="下一页">›</button></div></div><dialog class="push-dialog"><div class="push-dialog-head"><h2>推送配置详情</h2><button class="push-button" id="push-close" aria-label="关闭详情">关闭</button></div><dl class="push-detail"></dl></dialog></div>';
    host.querySelector('#push-create').onclick=()=>{
      document.getElementById('title').textContent='创建';
      const back=()=>{document.getElementById('title').textContent='推送配置';window.renderPushConfig(host);};
      window.renderPushForm(host,data=>{
        const id=String(Math.max(...rows.map(r=>Number(r[0])))+1);
        const now=new Date(),pad=v=>String(v).padStart(2,'0');
        const created=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const jumpValue=data.jump==='内部页'?data.internal:data.jump==='游戏'?data.game:data.jump==='外部页'?data.external:'';
        rows.unshift([id,data.name,data.title,data.type,data.image,data.jump,jumpValue,data.sender,data.mode==='立即'?'立即发送':data.mode,data.cycle,data.sendAt.replace('T',' '),data.trigger==='无'?'':data.trigger,data.triggerDays,data.remark,'待发送',0,0,0,0,document.querySelector('.account>span')?.textContent.trim()||'admin',created]);
        formData.set(id,structuredClone(data));back();
      },back);
    };
    const confirm=document.createElement('dialog');confirm.className='push-dialog push-confirm';confirm.setAttribute('aria-labelledby','copy-title');confirm.innerHTML='<div class="question" aria-hidden="true">?</div><h2 id="copy-title">确认复制?</h2><div class="push-confirm-actions"><button class="push-button primary" id="copy-submit">Submit</button><button class="push-button cancel" id="copy-cancel">Cancel</button></div>';host.querySelector('.push-page').append(confirm);
    let pendingCopy=null,copyOrigin=null,submitting=false;
    let page=1,size=20;const visible=columns.map(()=>true),q=s=>host.querySelector(s),dialog=q('dialog');
    const cell=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
    function draw(){q('.push-table-wrap').scrollTop=0;const head=q('thead tr'),body=q('tbody');head.replaceChildren();body.replaceChildren();columns.forEach((c,i)=>{if(visible[i])head.append(cell('th',c));});rows.slice((page-1)*size,page*size).forEach(row=>{const tr=document.createElement('tr');columns.forEach((_,i)=>{if(!visible[i])return;const td=cell('td',row[i]??'');if(i===21){const del=cell('button','Delete');del.className='push-action danger';del.disabled=true;del.title='删除流程待确认';td.append(del);const editable=row[14]==='待发送';const b=cell('button',editable?'编辑':'查看');b.className='push-action';b.setAttribute('aria-label',(editable?'编辑配置 ':'查看配置 ')+row[0]);if(editable){b.disabled=true;b.title='编辑表单待补充';}b.onclick=()=>{const dl=q('dl');dl.replaceChildren();row.forEach((v,j)=>dl.append(cell('dt',columns[j]),cell('dd',v===''?'—':v)));dialog.showModal();};td.append(b);const copy=cell('button','复制');copy.className='push-action';copy.setAttribute('aria-label','复制配置 '+row[0]);copy.onclick=()=>{pendingCopy=row;copyOrigin=copy;confirm.showModal();};td.append(copy);}tr.append(td);});body.append(tr);});q('#push-count').textContent=`显示 ${(page-1)*size+1} 至 ${Math.min(page*size,rows.length)} 条，共 ${rows.length} 条`;q('#push-prev').disabled=page===1;q('#push-next').disabled=page===Math.ceil(rows.length/size);const pages=q('#push-pages');pages.replaceChildren();for(let i=1;i<=Math.ceil(rows.length/size);i++){const b=cell('button',i);b.className='push-button'+(i===page?' current':'');b.setAttribute('aria-label',`第 ${i} 页`);if(i===page)b.setAttribute('aria-current','page');b.onclick=()=>{page=i;draw();q('.push-table-wrap').scrollTop=0;};pages.append(b);}}
    columns.forEach((c,i)=>{const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=true;check.disabled=i===0||i===21;check.onchange=()=>{visible[i]=check.checked;draw();};label.append(check,document.createTextNode(c));q('#push-picker').append(label);});q('#push-columns').onclick=()=>{const p=q('#push-picker');p.hidden=!p.hidden;q('#push-columns').setAttribute('aria-expanded',String(!p.hidden));};q('#push-size').onchange=e=>{size=Number(e.target.value);page=1;draw();};q('#push-prev').onclick=()=>{page--;draw();};q('#push-next').onclick=()=>{page++;draw();};q('#push-close').onclick=()=>dialog.close();
    q('#copy-cancel').onclick=()=>confirm.close();
    confirm.addEventListener('close',()=>{pendingCopy=null;if(copyOrigin?.isConnected)copyOrigin.focus();});
    q('#copy-submit').onclick=()=>{
      if(!pendingCopy||submitting)return;
      submitting=true;q('#copy-submit').disabled=true;
      const duplicate=[...pendingCopy];
      duplicate[0]=String(Math.max(...rows.map(r=>Number(r[0])))+1);
      duplicate[8]='暂不发送';duplicate[10]='';duplicate[14]='待发送';
      for(let i=15;i<=18;i++)duplicate[i]=0;
      duplicate[19]=document.querySelector('.account>span')?.textContent.trim()||'admin';
      const now=new Date(),pad=v=>String(v).padStart(2,'0');
      duplicate[20]=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      if(formData.has(pendingCopy[0])){const fields=structuredClone(formData.get(pendingCopy[0]));fields.mode='暂不发送';fields.sendAt='';formData.set(duplicate[0],fields);}rows.unshift(duplicate);pendingCopy=null;confirm.close();page=1;draw();
      q('.push-note').textContent=`本地示例 · ${rows.length} 条记录`;
      q('tbody button[aria-label="复制配置 '+duplicate[0]+'"]').focus({preventScroll:true});
      submitting=false;q('#copy-submit').disabled=false;
    };
    q('.push-note').textContent=`本地示例 · ${rows.length} 条记录`;draw();
  };
})();
