export function applyOperation(items, operation) {
  const next = items.map(item => ({...item}));
  if (operation.type === 'add') next.push(operation.item);
  if (operation.type === 'move') { const item=next.find(value=>value.id===operation.id); if(item){item.x=operation.x;item.y=operation.y;} }
  if (operation.type === 'remove') return next.filter(item=>item.id!==operation.id);
  return next;
}
export function inverseOperation(operation, previous) {
  if (operation.type==='add') return {type:'remove',id:operation.item.id};
  if (operation.type==='remove') return {type:'add',item:previous};
  return {type:'move',id:operation.id,x:operation.previousX,y:operation.previousY};
}
