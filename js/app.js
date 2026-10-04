// Shiksha Line app: route map, journey planner, filters and saved courses. Data lives in courses.js.
// derived ids and codes
const trackById = Object.fromEntries(TRACKS.map(t=>[t.id,t]));
const counters = {};
COURSES.forEach((c,i)=>{ c.id='c'+i; counters[c.t]=(counters[c.t]||0)+1; c.code=trackById[c.t].code+'·'+String(counters[c.t]).padStart(2,'0'); });
const byLvGov = (a,b)=> a.lv-b.lv || (a.s==='gov'?-1:1)-(b.s==='gov'?-1:1);
const $ = id=>document.getElementById(id);
const esc = s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

// saved
let saved = new Set();
try{ saved = new Set(JSON.parse(localStorage.getItem('shiksha-saved')||'[]')); }catch(e){}
function persist(){ try{ localStorage.setItem('shiksha-saved',JSON.stringify([...saved])); }catch(e){} $('savedCount').textContent=saved.size; }

// stats
$('sTotal').textContent=COURSES.length;
$('sGov').textContent=COURSES.filter(c=>c.s==='gov').length;
$('sFree').textContent=COURSES.filter(c=>c.c==='free').length;
$('sPaid').textContent=COURSES.filter(c=>c.c==='paid').length;

// fare display
function fare(c){
  if(c.c==='free') return {amt:'₹0',note:c.cn==='Free'?'Free to learn':c.cn};
  if(c.c==='cert') return {amt:'₹0',note:'to learn · '+c.cn.toLowerCase()};
  if(c.c==='low')  return {amt:'₹',note:c.cn};
  return {amt:'+₹',note:c.cn+' paid to you',pay:true};
}

/* ---------- route map ---------- */
function buildMap(){
  let s='';
  TRACKS.forEach((t,i)=>{
    const y0=186+i*9, y=40+i*70, dy=Math.abs(y-y0), col=`var(--t-${t.id})`;
    const d=`M40 ${y0} H170 L${170+dy} ${y} H880`;
    const stops=COURSES.filter(c=>c.t===t.id).sort(byLvGov);
    const pick=[]; [1,2,3].forEach(lv=>{const f=stops.find(c=>c.lv===lv); if(f) pick.push(f);});
    stops.forEach(c=>{ if(pick.length<4 && !pick.includes(c)) pick.push(c); });
    pick.sort(byLvGov);
    s+=`<g class="line" data-track="${t.id}" tabindex="0" role="button" aria-label="Show ${esc(t.name)} courses">`;
    s+=`<path class="track" d="${d}" style="stroke:${col}"/><path class="hit" d="${d}"/>`;
    pick.forEach((c,j)=>{
      const x=400+j*130;
      s+=`<circle class="stn" cx="${x}" cy="${y}" r="8" style="stroke:${col}" data-id="${c.id}"><title>${esc(c.n)}</title></circle>`;
      s+=`<text class="stn-label" x="${x}" y="${y-15}">${esc(c.k)}</text>`;
    });
    s+=`<circle cx="880" cy="${y}" r="12" style="fill:${col}"/><circle cx="880" cy="${y}" r="5" style="fill:var(--card)"/>`;
    s+=`<text class="dest" x="900" y="${y+6}">${esc(t.dest)}</text></g>`;
  });
  s+=`<rect class="ix" x="48" y="176" width="30" height="66" rx="15"/>`;
  s+=`<text class="ix-label" x="34" y="264">YOU ARE HERE</text>`;
  s+=`<text class="ix-label" x="40" y="280" style="font-family:var(--f-body);font-size:12px">आप यहाँ हैं</text>`;
  const svg=$('mapSvg'); svg.innerHTML=s;
  svg.querySelectorAll('.line').forEach(g=>{
    g.addEventListener('mouseenter',()=>highlight(g.dataset.track));
    g.addEventListener('mouseleave',()=>highlight(null));
    g.addEventListener('focus',()=>highlight(g.dataset.track));
    g.addEventListener('blur',()=>highlight(null));
    g.addEventListener('click',e=>{
      const stn=e.target.closest('.stn');
      if(stn) jumpTo(stn.dataset.id); else showTrack(g.dataset.track);
    });
    g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault(); showTrack(g.dataset.track);} });
  });
  $('legend').innerHTML=TRACKS.map(t=>`<button type="button" data-track="${t.id}"><span class="swatch" style="background:var(--t-${t.id})"></span>${esc(t.name)} <span lang="hi" style="color:var(--muted)">${t.hi}</span></button>`).join('');
  $('legend').querySelectorAll('button').forEach(b=>{
    b.addEventListener('click',()=>showTrack(b.dataset.track));
    b.addEventListener('mouseenter',()=>highlight(b.dataset.track));
    b.addEventListener('mouseleave',()=>highlight(null));
  });
}
function highlight(id){
  const svg=$('mapSvg');
  svg.classList.toggle('map-dim',!!id);
  svg.querySelectorAll('.line').forEach(g=>g.classList.toggle('on',g.dataset.track===id));
}
function showTrack(id){
  Object.assign(state,{track:id,q:'',saved:false}); $('q').value='';
  renderFilters(); renderRack();
  $('courses').scrollIntoView();
}
function jumpTo(cid){
  Object.assign(state,{track:'all',sector:'all',fare:'all',lang:false,offline:false,cert:false,saved:false,q:''}); $('q').value='';
  renderFilters(); renderRack();
  const el=document.querySelector(`.ticket[data-id="${cid}"]`);
  if(el){ el.scrollIntoView({block:'center'}); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
}

/* ---------- planner ---------- */
const plan={start:'s12',track:'tech'};
function renderPlannerControls(){
  $('pStart').innerHTML=STARTS.map(s=>`<button type="button" data-v="${s.id}" aria-pressed="${plan.start===s.id}">${esc(s.name)}</button>`).join('');
  $('pTrack').innerHTML=TRACKS.map(t=>`<button type="button" data-v="${t.id}" aria-pressed="${plan.track===t.id}"><span class="swatch" style="background:var(--t-${t.id})"></span>${esc(t.dest)}</button>`).join('');
  $('pStart').querySelectorAll('button').forEach(b=>b.onclick=()=>{plan.start=b.dataset.v; renderPlannerControls(); renderRoute();});
  $('pTrack').querySelectorAll('button').forEach(b=>b.onclick=()=>{plan.track=b.dataset.v; renderPlannerControls(); renderRoute();});
}
const KIND={1:'Stop 1 · Start here',2:'Stop 2 · Build the skill',3:'Stop 3 · Credential or job step'};
function renderRoute(){
  const t=trackById[plan.track];
  const pool=COURSES.filter(c=>c.t===t.id && c.w.includes(plan.start)).sort(byLvGov);
  const stops=[];
  [1,2,3].forEach(lv=>{ const f=pool.find(c=>c.lv===lv && !stops.includes(c)); if(f) stops.push(f); });
  pool.forEach(c=>{ if(stops.length<3 && !stops.includes(c)) stops.push(c); });
  stops.sort(byLvGov);
  const kinds=new Set(stops.map(c=>c.c));
  let total='Total fare: ₹0';
  if(kinds.has('low')) total='Total fare: low fees on some stops';
  else if(kinds.has('cert')) total='₹0 to learn · pay only for exams you choose';
  if(kinds.has('paid')) total+=' · one stop pays you';
  const startName=STARTS.find(s=>s.id===plan.start).name;
  let html=`<div class="route-head"><h3>${esc(startName)} → ${esc(t.dest)}</h3><span class="total">${esc(total)}</span></div>`;
  if(!stops.length){ html+=`<p class="lede">No direct route yet for this start. Try the Degrees &amp; School line first, then come back.</p>`; }
  else{
    html+=`<ol class="stops" style="--tc:var(--t-${t.id})">`+stops.map((c,i)=>{
      const f=fare(c);
      const kind=(i===stops.length-1 && stops.length>1)?KIND[3]:KIND[Math.min(i+1,3)];
      return `<li class="stop"><span class="dot" aria-hidden="true"></span><div>
        <div class="kind">${kind.replace(/^Stop \d/,'Stop '+(i+1))}</div>
        <a class="sname" href="${esc(c.u)}" target="_blank" rel="noopener">${esc(c.n)} ↗</a>
        <p>${esc(c.d)}</p>
        <div class="sfare">${esc(f.amt)} · ${esc(f.note)} · ${c.s==='gov'?'Government':'Private'}</div>
      </div></li>`;
    }).join('')+`</ol>`;
  }
  $('route').innerHTML=html;
}

/* ---------- filters + rack ---------- */
const state={q:'',track:'all',sector:'all',fare:'all',lang:false,offline:false,cert:false,saved:false};
const FARES=[['all','Any'],['free','₹0'],['cert','₹0 + exam fee'],['low','Low fee'],['paid','Stipend']];
const SECTORS=[['all','All'],['gov','Government'],['pvt','Private']];
const NEEDS=[['lang','Hindi / Indian languages'],['offline','Centre or offline'],['cert','Gives certificate'],['saved','Saved only']];
function chipRow(el,items,key){
  el.innerHTML=items.map(([v,l])=>`<button type="button" class="chip" data-v="${v}" aria-pressed="${state[key]===v}">${v!=='all'&&key==='track'?`<span class="swatch" style="background:var(--t-${v})"></span>`:''}${esc(l)}</button>`).join('');
  el.querySelectorAll('button').forEach(b=>b.onclick=()=>{state[key]=b.dataset.v; renderFilters(); renderRack();});
}
function renderFilters(){
  chipRow($('fTrack'),[['all','All lines'],...TRACKS.map(t=>[t.id,t.name])],'track');
  chipRow($('fSector'),SECTORS,'sector');
  chipRow($('fFare'),FARES,'fare');
  $('fNeeds').innerHTML=NEEDS.map(([k,l])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${state[k]}">${esc(l)}</button>`).join('');
  $('fNeeds').querySelectorAll('button').forEach(b=>b.onclick=()=>{state[b.dataset.k]=!state[b.dataset.k]; renderFilters(); renderRack();});
}
function matches(c){
  if(state.track!=='all' && c.t!==state.track) return false;
  if(state.sector!=='all' && c.s!==state.sector) return false;
  if(state.fare!=='all' && c.c!==state.fare) return false;
  if(state.lang && !/hindi|indian|regional|local|urdu/i.test(c.l)) return false;
  if(state.offline && !c.off) return false;
  if(state.cert && !c.cert) return false;
  if(state.saved && !saved.has(c.id)) return false;
  if(state.q){
    const hay=[c.n,c.o,c.d,c.l,c.k,trackById[c.t].name,c.s==='gov'?'government sarkari':'private'].join(' ').toLowerCase();
    if(!state.q.toLowerCase().split(/\s+/).filter(Boolean).every(w=>hay.includes(w))) return false;
  }
  return true;
}
function ticket(c){
  const t=trackById[c.t], f=fare(c), on=saved.has(c.id);
  const tags=[c.l];
  if(c.cert) tags.push('Certificate');
  if(c.off) tags.push('Centre / offline');
  return `<article class="ticket" data-id="${c.id}" style="--tc:var(--t-${c.t})">
    <div class="tmain">
      <div class="thead"><span class="lmark" aria-hidden="true"></span><span class="code">${c.code}</span><span>${esc(t.name)}</span><span class="sector ${c.s}">${c.s==='gov'?'GOVT':'PVT'}</span></div>
      <h3>${esc(c.n)}</h3>
      <div class="org">${esc(c.o)}</div>
      <p class="desc">${esc(c.d)}</p>
      <div class="tags">${tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
      <div class="tactions">
        <a class="go" href="${esc(c.u)}" target="_blank" rel="noopener">Open site ↗</a>
        <button type="button" class="save" data-id="${c.id}" aria-pressed="${on}">${on?'Saved ✓':'Save'}</button>
      </div>
    </div>
    <div class="stub"><span class="flabel">FARE</span><span class="famt${f.pay?' pay':''}">${f.amt}</span><span class="fnote">${esc(f.note)}</span></div>
  </article>`;
}
function renderRack(){
  const list=COURSES.filter(matches).sort((a,b)=>TRACKS.findIndex(t=>t.id===a.t)-TRACKS.findIndex(t=>t.id===b.t)||byLvGov(a,b));
  $('count').textContent=`${list.length} of ${COURSES.length} courses`;
  $('rack').innerHTML=list.length?list.map(ticket).join(''):
    `<div class="empty">${state.saved&&!saved.size?'You have not saved any courses yet. Tap <b>Save</b> on a ticket to keep it here.':'No courses match these filters. Try removing one, or <button class="linkbtn" type="button" data-reset>clear all filters</button>.'}</div>`;
  $('rack').querySelectorAll('.save').forEach(b=>b.onclick=()=>{
    const id=b.dataset.id; saved.has(id)?saved.delete(id):saved.add(id); persist();
    if(state.saved) renderRack(); else { const on=saved.has(id); b.setAttribute('aria-pressed',on); b.textContent=on?'Saved ✓':'Save'; }
  });
  const r=$('rack').querySelector('[data-reset]'); if(r) r.onclick=resetAll;
}
function resetAll(){ Object.assign(state,{q:'',track:'all',sector:'all',fare:'all',lang:false,offline:false,cert:false,saved:false}); $('q').value=''; renderFilters(); renderRack(); }

$('q').addEventListener('input',e=>{state.q=e.target.value.trim(); renderRack();});
$('reset').onclick=resetAll;
$('savedBtn').onclick=()=>{ Object.assign(state,{saved:true,track:'all',sector:'all',fare:'all',lang:false,offline:false,cert:false,q:''}); $('q').value=''; renderFilters(); renderRack(); $('courses').scrollIntoView(); };

buildMap(); renderPlannerControls(); renderRoute(); renderFilters(); renderRack(); persist();
