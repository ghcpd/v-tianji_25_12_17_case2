// Lightweight ES module bundle that runs in browsers without build step
// Builds the UI from src/styles.css and src/data/videos.json

function el(tag, props = {}, children = []){
  const n = document.createElement(tag)
  for(const k in props){
    if(k === 'class') n.className = props[k]
    else if(k === 'html') n.innerHTML = props[k]
    else if(k.startsWith('on') && typeof props[k] === 'function') n.addEventListener(k.substring(2).toLowerCase(), props[k])
    else n.setAttribute(k, props[k])
  }
  children.forEach(c => { if(c == null) return; n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c) })
  return n
}

async function loadVideos(){
  try{
    const res = await fetch('/src/data/videos.json')
    if(!res.ok) throw new Error('failed to fetch videos')
    return await res.json()
  } catch(e){ console.error(e); return [] }
}

function buildHeader(){
  const logo = el('div',{class:'logo'}, ['SV'])
  const title = el('div',{}, [el('div',{class:'title', html:'Shorts Studio'}), el('div',{class:'subtitle', html:'Smooth short-video browsing • Mock data'})])
  const header = el('div',{class:'header'}, [logo, title])
  return header
}

function buildCard(item){
  const video = el('video',{src:item.src, muted:true, loop:true, playsinline:true, 'data-testid':`video-${item.id}`})
  video.style.width = '100%'; video.style.height = '100%'; video.style.objectFit = 'cover'
  const playOverlay = el('div',{class:'playOverlay', role:'button', 'aria-label':'toggle-play'})
  const playIcon = el('div',{class:'playIcon'}, [' '])
  playOverlay.appendChild(playIcon)
  const frame = el('div',{class:'videoFrame'}, [video, playOverlay])

  const avatar = el('div',{class:'avatar'}, [item.avatar])
  const userCol = el('div',{}, [el('div',{class:'username', html:item.user}), el('div',{class:'handle', html:item.handle})])
  const follow = el('button',{class:'follow', onclick: ()=>{
    item.followed = !item.followed
    follow.textContent = item.followed ? 'Following' : 'Follow'
  }}, [item.followed ? 'Following' : 'Follow'])

  const userRow = el('div',{class:'user'}, [avatar, userCol, follow])
  const desc = el('div',{class:'desc', html:item.desc})
  const tags = el('div',{class:'tags', html:item.tags})

  const likeBtn = el('button',{class:'btn', 'aria-label':'like'}, ['♡'])
  const likeCount = el('div',{class:'count', html:String(item.likes)})
  const likeCol = el('div',{}, [likeBtn, likeCount, el('div',{class:'badge', html:'Likes'})])
  likeBtn.addEventListener('click', ()=>{
    if(likeBtn.classList.contains('liked')){ likeBtn.classList.remove('liked'); likeBtn.textContent = '♡'; likeCount.textContent = String(Number(likeCount.textContent)-1) }
    else { likeBtn.classList.add('liked'); likeBtn.textContent = '❤'; likeCount.textContent = String(Number(likeCount.textContent)+1) }
  })

  const commentCol = el('div',{}, [el('div',{class:'btn small', html:'💬'}), el('div',{class:'count', html:String(item.comments)}), el('div',{class:'badge', html:'Comments'})])

  const meta = el('div',{class:'meta'}, [userRow, desc, tags, el('div',{style:'display:flex;gap:12px;align-items:center;margin-top:12px'}, [likeCol, commentCol]), el('div',{class:'small', style:'margin-top:18px'}, [el('div',{}, ['Video ID: ', el('strong',{style:'color:#cfe7ff', html:item.id})]), el('div',{style:'marginTop:8px', html:`Status: <span style="color:var(--muted)">Paused</span>`})])])

  const card = el('div',{class:'card', 'data-id':item.id}, [frame, meta])
  // attach behavior
  playOverlay.addEventListener('click', ()=>{
    if(video.paused){ video.play().catch(()=>{}); playIcon.textContent = ' ' ; playIcon.style.opacity = 0 }
    else { video.pause(); playIcon.textContent = '▶'; playIcon.style.opacity = 1 }
  })
  return {card, video, playIcon}
}

async function mount(){
  const root = document.getElementById('root')
  root.innerHTML = ''
  const app = el('div',{class:'app', role:'application'})
  app.appendChild(buildHeader())
  const feedWrap = el('div',{})
  const feed = el('div',{class:'feed', 'data-testid':'feed'})
  feedWrap.appendChild(feed)
  app.appendChild(feedWrap)
  app.appendChild(el('div',{class:'footerNote', html:'Built for test: Short-Video Browsing UI • Demo mock'}))
  root.appendChild(app)

  const videos = await loadVideos()
  const nodes = videos.map(v=> buildCard(v))
  nodes.forEach(n=> feed.appendChild(n.card))

  // intersection observer to auto-play when majority visible
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      const id = en.target.getAttribute('data-id')
      const found = nodes.find(x=> x.card.getAttribute('data-id') === id)
      if(!found) return
      const span = found.card.querySelector('.small div span')
      if(en.isIntersecting){
        found.video.play().catch(()=>{})
        if(span) span.style.color = 'var(--accent)';
        const pi = found.playIcon; if(pi){ pi.textContent = ' '; pi.style.opacity = 0 }
      } else {
        found.video.pause(); if(span) span.style.color = 'var(--muted)';
        const pi = found.playIcon; if(pi){ pi.textContent = '▶'; pi.style.opacity = 1 }
      }
    })
  }, {threshold: 0.6})

  nodes.forEach(n=> io.observe(n.card))

  // small UX: click on feed to scroll next
  feed.addEventListener('click', (e)=>{
    // if clicking outside button area, scroll to next snap
    if(e.target.closest('button')) return
    const rects = Array.from(feed.children).map(c=> ({c, top:c.getBoundingClientRect().top}))
    const current = rects.find(r=> r.top >= 0 && r.top < 200) || rects[0]
    const idx = rects.indexOf(current)
    const next = rects[idx+1] || rects[idx]
    next.c.scrollIntoView({behavior:'smooth'})
  })
}

// start
mount()
