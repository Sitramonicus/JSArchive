#!/usr/bin/env node
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url); const parser=require('/home/user/Active/engines/node_modules/@babel/parser');
const file=process.argv[2]; const src=fs.readFileSync(file,'utf8'); const ast=parser.parse(src,{sourceType:'script',allowReturnOutsideFunction:true});
const own=(n)=>n&&['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression','ObjectMethod','ClassMethod','ClassPrivateMethod','StaticBlock'].includes(n.type);
const kids=(n)=>Object.keys(n).filter(k=>!['loc','start','end','leadingComments','trailingComments'].includes(k)).flatMap(k=>{const v=n[k];return Array.isArray(v)?v.filter(x=>x&&x.type):v&&v.type?[v]:[]});
const rows=[];
function walk(n,parent){
 if(!n||!n.type)return;
 if((n.type==='FunctionExpression'||n.type==='ArrowFunctionExpression')&&n.body?.type==='BlockStatement'){
  const returns=[]; (function body(x,depth){if(!x||!x.type)return;if(depth>0&&own(x)){return;}if(x.type==='ReturnStatement')returns.push(x);for(const c of kids(x))body(c,depth+1)})(n.body,0);
  const call=parent?.type==='CallExpression'&&parent.callee===n?parent:null;
  if(call&&n.end-n.start>=100000) rows.push({fnStart:n.start,fnEnd:n.end,callStart:call.start,callEnd:call.end,bytes:n.end-n.start,returns:returns.map(r=>({start:r.start,end:r.end,argStart:r.argument?.start??null,argEnd:r.argument?.end??null}))});
 }
 for(const c of kids(n))walk(c,n);
}
walk(ast,null);
rows.sort((a,b)=>b.bytes-a.bytes); console.log(JSON.stringify({file,largeIIFEs:rows.length,rows:rows.slice(0,20)},null,2));
