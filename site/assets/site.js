// Shared helpers. Loaded in <head> so tools can call bisonTrack immediately.
window.bisonTrack=function(ev,data){ try{ (window.dataLayer=window.dataLayer||[]).push({event:ev,data:data||{}}); }catch(e){} };
document.addEventListener('DOMContentLoaded',function(){
  var path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/index';
  document.querySelectorAll('nav a').forEach(function(a){
    var href=a.getAttribute('href').replace(/^(\.\.\/)+/,'').replace(/\.html$/,'');
    if(href && href!=='index' && path.endsWith('/'+href)) a.classList.add('active');
  });
});
