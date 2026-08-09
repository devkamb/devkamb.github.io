import test from 'node:test';
import assert from 'node:assert/strict';
import {virtualSlice} from './components.js';
test('virtualSlice renders only a bounded visible window',()=>{const items=Array.from({length:100000},(_,i)=>i);const result=virtualSlice(items,5000,40,800);assert.equal(result.start,123);assert.equal(result.end,147);assert.equal(result.items.length,24);});
