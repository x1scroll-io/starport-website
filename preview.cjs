const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain','.mp4':'video/mp4','.zip':'application/zip'};
http.createServer((req,res) => {
  let relative;
  try {relative = decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400).end(); return;}
  const file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative));
  if (!file.startsWith(root + path.sep) || !types[path.extname(file)]) {res.writeHead(404).end(); return;}
  fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404).end();return;} const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||''); const start=match?Number(match[1]):0;const end=match&&match[2]?Math.min(Number(match[2]),stat.size-1):stat.size-1;if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':'bytes */'+stat.size}).end();return;}res.writeHead(match?206:200,{'Content-Type':types[path.extname(file)],'Accept-Ranges':'bytes','Content-Length':end-start+1,...(match?{'Content-Range':'bytes '+start+'-'+end+'/'+stat.size}:{}),'Cache-Control':'no-store'});fs.createReadStream(file,{start,end}).pipe(res);});
}).listen(4180,'127.0.0.1',() => console.log('Starport preview: http://127.0.0.1:4180'));
