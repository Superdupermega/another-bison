// Shared helpers. Loaded in <head> so tools can call these immediately.
window.bisonTrack=function(ev,data){ try{ (window.dataLayer=window.dataLayer||[]).push({event:ev,data:data||{}}); }catch(e){} };
// Post a lead (email + context) to the configured endpoint. Never blocks the user; resolves true on success.
window.bisonLead=function(payload){
  var C=window.BISON||{}, ep=C.NEWSLETTER_ENDPOINT||C.FORM_ENDPOINT;
  bisonTrack('lead',{source:payload.source});
  try{ var q=JSON.parse(localStorage.getItem('bison-leads')||'[]'); q.push(Object.assign({ts:Date.now()},payload)); localStorage.setItem('bison-leads',JSON.stringify(q.slice(-20))); }catch(e){}
  if(!ep) return Promise.resolve(false);
  return fetch(ep,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)}).then(function(r){return r.ok}).catch(function(){return false});
};
// Optional, non-blocking email capture used by the tools. cb() always runs.
window.bisonCapture=function(source,context,cb){
  var known=null; try{known=localStorage.getItem('bison-email')}catch(e){}
  if(known){ bisonLead({email:known,source:source,context:context}); cb(); return; }
  var m=document.createElement('div');
  m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:50;padding:20px';
  m.innerHTML='<form class="card" style="max-width:420px;width:100%"><div class="tag">Optional</div><h3>Want the spec-defect digest?</h3><p class="muted" style="font-size:.9rem">Once a fortnight: the clarifying questions agents asked, the spec sections they exposed, and the fix. Leave blank to skip.</p><label>Work email</label><input type="email" name="email" placeholder="you@company.com"><div style="display:flex;gap:10px;margin-top:16px"><button class="btn primary" type="submit">Continue</button><button class="btn" type="button" data-skip>Skip</button></div></form>';
  document.body.appendChild(m);
  function done(){ m.remove(); cb(); }
  m.querySelector('[data-skip]').onclick=done;
  m.querySelector('form').onsubmit=function(e){ e.preventDefault(); var em=m.querySelector('input').value.trim(); if(em){ try{localStorage.setItem('bison-email',em)}catch(x){} bisonLead({email:em,source:source,context:context}); } done(); };
};
document.addEventListener('DOMContentLoaded',function(){
  var path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/index';
  document.querySelectorAll('nav a').forEach(function(a){
    var href=a.getAttribute('href').replace(/^(\.\.\/)+/,'').replace(/\.html$/,'');
    if(href && href!=='index' && path.endsWith('/'+href)) a.classList.add('active');
  });
  // Calendar links: any element with data-book opens the calendar when configured, else goes to contact page.
  var C=window.BISON||{};
  document.querySelectorAll('[data-book]').forEach(function(a){ if(C.CALENDAR_URL){ a.setAttribute('href',C.CALENDAR_URL); a.setAttribute('target','_blank'); a.setAttribute('rel','noopener'); } });
});
