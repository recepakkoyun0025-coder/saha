const C="lezjet-saha-v2";
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "img/s3.jpg", "img/s4.jpg", "img/s5.jpg", "img/s6.jpg", "img/s7.jpg", "img/s9.jpg", "img/s10.jpg", "img/s12.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match("index.html"))))});
