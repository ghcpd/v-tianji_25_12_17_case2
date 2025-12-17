const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 5000

const root = process.cwd()

const mime = {
  '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.jsx':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.mp4':'video/mp4'
}

http.createServer((req,res)=>{
  let url = req.url.split('?')[0]
  if(url === '/') url = '/index.html'
  const p = path.join(root, url.replace(/^\//,''))
  if(!p.startsWith(root)) return res.writeHead(403).end('forbidden')
  fs.stat(p, (err,st)=>{
    if(err) return res.writeHead(404).end('not found')
    const ext = path.extname(p)
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'})
    fs.createReadStream(p).pipe(res)
  })
}).listen(port, ()=> console.log(`Static server running at http://localhost:${port} (serving ${root})`))
