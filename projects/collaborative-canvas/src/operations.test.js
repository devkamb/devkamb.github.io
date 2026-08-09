import test from 'node:test';
import assert from 'node:assert/strict';
import {applyOperation} from './operations.js';
test('operations update canvas state predictably',()=>{const items=applyOperation([], {type:'add',item:{id:'1',x:1,y:2,label:'A'}});assert.equal(items[0].label,'A');assert.equal(applyOperation(items,{type:'move',id:'1',x:4,y:5})[0].x,4);});
