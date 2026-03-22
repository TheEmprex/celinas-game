const CACHE='celina-puzzle-v7';
const ASSETS=['./', './index.html','./style.css','./game.js','./manifest.json','./favicon.svg','./icon.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);

  // Cache Google Fonts and other external resources with stale-while-revalidate
  if(url.origin!==location.origin){
    e.respondWith(
      caches.match(e.request).then(cached=>{
        const fetchPromise=fetch(e.request).then(resp=>{
          if(resp&&resp.ok){
            const clone=resp.clone();
            caches.open(CACHE).then(c=>c.put(e.request,clone));
          }
          return resp;
        }).catch(()=>cached);
        return cached||fetchPromise;
      })
    );
    return;
  }

  // Local assets: cache-first, then network with cache update
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const clone=resp.clone();
    caches.open(CACHE).then(c=>c.put(e.request,clone));
    return resp;
  })));
});
