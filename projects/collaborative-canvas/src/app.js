import {applyOperation,inverseOperation} from './operations.js';
const canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d'),state={items:[],zoom:1,selected:null,undo:[],redo:[]};
function commit(operation){state.undo.push(inverseOperation(operation, state.items.find(item=>item.id===operation.id)));state.redo=[];state.items=applyOperation(state.items,operation);draw();buttons();}
function add(kind){commit({type:'add',item:{id:crypto.randomUUID(),kind,x:220+state.items.length*70,y:180+state.items.length*45,label:kind==='note'?'Idea':kind==='shape'?'Step':'→'}});}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.save();ctx.scale(state.zoom,state.zoom);for(const item of state.items){ctx.fillStyle=item.kind==='note'?'#fff0b8':item.kind==='shape'?'#dceafe':'#e8ebf1';ctx.strokeStyle='#8c9bb3';ctx.lineWidth=2;if(item.kind==='connector'){ctx.beginPath();ctx.moveTo(item.x-48,item.y);ctx.lineTo(item.x+48,item.y);ctx.stroke();}else{ctx.beginPath();item.kind==='shape'?ctx.roundRect(item.x-48,item.y-28,96,56,10):ctx.roundRect(item.x-58,item.y-32,116,64,5);ctx.fill();ctx.stroke();}ctx.fillStyle='#24334b';ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText(item.label,item.x,item.y+5);}ctx.restore();}
function buttons(){document.querySelector('#undo').disabled=!state.undo.length;document.querySelector('#redo').disabled=!state.redo.length;}
document.querySelectorAll('[data-tool]').forEach(button=>button.onclick=()=>add(button.dataset.tool));
document.querySelector('#zoom').oninput=e=>{state.zoom=Number(e.target.value)/100;draw()};
document.querySelector('#undo').onclick=()=>{const op=state.undo.pop();if(op){state.redo.push(op);state.items=applyOperation(state.items,op);draw();buttons();}};
document.querySelector('#redo').onclick=()=>{const op=state.redo.pop();if(op){state.undo.push(op);state.items=applyOperation(state.items,op);draw();buttons();}};
draw();buttons();
