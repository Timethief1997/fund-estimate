// 极简 Service Worker：让 Pages 站点可安装到桌面/主屏幕，并缓存应用外壳实现离线可用
// 外部实时数据接口（行情/净值/K线等）一律只走网络，不做缓存，保证实时
const SHELL = ['./', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './images/icon.svg'];
const CACHE = 'fe-shell-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // 仅处理同源的文档/静态资源导航；外部数据接口走网络
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;       // 外部实时数据：不缓存
  if (req.mode === 'navigate') {
    // 应用外壳：网络优先，失败回退缓存（离线可用）
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./', copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./'))
    );
    return;
  }
  // 其它同源静态资源：缓存优先，回退网络
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {}); }
      return res;
    }))
  );
});