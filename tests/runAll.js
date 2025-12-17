const fs = require('fs')
const path = require('path')

function ok(msg){ console.log('\x1b[32m[PASS]\x1b[0m', msg) }
function fail(msg){ console.error('\x1b[31m[FAIL]\x1b[0m', msg); process.exitCode = 2 }

console.log('Running lightweight project checks (no dev deps required)')

const root = path.resolve(__dirname, '..')
const expectFiles = [
  'index.html',
  'src/App.jsx',
  'src/components/VideoFeed.jsx',
  'src/components/VideoCard.jsx',
  'src/data/videos.js',
  'src/styles.css'
]

let allGood = true
expectFiles.forEach(f=>{
  const p = path.join(root, f)
  if(!fs.existsSync(p)){
    fail(`Missing expected file: ${f}`)
    allGood = false
  } else {
    ok(`Found ${f}`)
  }
})

// Basic check: videos data shape
try{
  const dv = fs.readFileSync(path.join(root, 'src', 'data', 'videos.js'),'utf8')
  if(/export default/.test(dv) && /likes/.test(dv) && /comments/.test(dv)){
    ok('videos.js exports mock data and contains likes/comments')
  } else { fail('videos.js content seems incorrect'); allGood=false }
} catch(e){ fail('Could not read videos.js'); allGood=false }

// Basic component checks: ensure App contains "Shorts Studio"
const appTxt = fs.readFileSync(path.join(root,'src','App.jsx'),'utf8')
if(/Shorts Studio/.test(appTxt)) ok('App contains title string')
else { fail('App title not found'); allGood=false }

if(allGood){
  console.log('\nAll lightweight checks passed — tests OK.')
  process.exit(0)
} else {
  console.error('\nOne or more checks failed.')
  process.exit(2)
}
