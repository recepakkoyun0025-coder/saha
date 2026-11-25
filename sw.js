const C="lezjet-saha-v4";
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "img/s3.jpg", "img/s4.jpg", "img/s5.jpg", "img/s6.jpg", "img/s7.jpg", "img/s9.jpg", "img/s10.jpg", "img/s12.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const req=e.request,url=new URL(req.url);
 if(req.method!=="GET"||url.hostname.endsWith("google.com")||url.hostname.endsWith("googleusercontent.com"))return;
 if(req.mode==="navigate"){e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put("index.html",cp));return r}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(req,cp));return res})));
});
