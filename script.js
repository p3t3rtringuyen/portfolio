(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle (remembered per browser)
  var themeBtn = document.querySelector('.theme');
  themeBtn.addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  // Project filter
  var pills = document.querySelectorAll('.pill');
  var projects = document.querySelectorAll('.project');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var f = pill.dataset.filter;
      pills.forEach(function (p) {
        var on = p === pill;
        p.classList.toggle('is-on', on);
        p.setAttribute('aria-pressed', String(on));
      });
      projects.forEach(function (card) { card.hidden = f !== 'all' && card.dataset.cat !== f; });
    });
  });

  // Reveal on scroll
  // Each block fades and rises into place as it scrolls in from the bottom;
  // siblings in the same row are staggered. The classes are removed afterwards
  // so hover styles are not held back by the reveal transition.
  var targets = document.querySelectorAll('.section__title, .section__intro, .filters, .stats li, .project, .card, .timeline li, .chips--values, .tile');
  targets.forEach(function (el) {
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', (idx % 3) * 0.1 + 's');
    el.classList.add('reveal');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 1400);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.remove('reveal'); });
  }

  // ---- Floating mini-browser windows -------------------------------------
  // A project with data-url is shown as the live site in an iframe. One without
  // (the site forbids framing, or it is an internal tool with no public URL)
  // shows its case study inside the same window frame instead.
  var layer = document.createElement('div');
  layer.className = 'win-layer';
  document.body.appendChild(layer);
  var closeAll = document.createElement('button');
  closeAll.className = 'win-closeall';
  closeAll.type = 'button';
  closeAll.textContent = 'Close all windows';
  document.body.appendChild(closeAll);

  var wins = [];
  var zTop = 1;
  var phone = window.matchMedia('(max-width: 720px)');

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function sync() { closeAll.classList.toggle('show', wins.length > 1); }

  function focusWin(w) {
    wins.forEach(function (o) { o.el.classList.toggle('is-active', o === w); });
    w.el.style.zIndex = ++zTop;
  }

  function closeWin(w) {
    w.el.remove();
    wins = wins.filter(function (o) { return o !== w; });
    if (wins.length) focusWin(wins[wins.length - 1]);
    sync();
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function buildPage(card, external) {
    var page = el('div', 'mock');
    var head = card.querySelector('header').cloneNode(true);
    var nameBtn = head.querySelector('.name');
    if (nameBtn) nameBtn.replaceWith(document.createTextNode(nameBtn.textContent + ' '));
    page.appendChild(head);
    ['.bullets', '.chips'].forEach(function (sel) {
      var part = card.querySelector(sel);
      if (part) page.appendChild(part.cloneNode(true));
    });
    var why = el('p', 'mock__why', external
      ? 'The live site does not allow being shown inside another page, so this window shows the case study instead.'
      : 'Internal tool: it has no public URL, so this window shows the case study instead.');
    page.insertBefore(why, page.children[1] || null);
    if (external) {
      var a = el('a', 'btn', 'Visit ' + external.replace(/^https?:\/\/(www\.)?/, '') + ' ↗');
      a.href = external; a.target = '_blank'; a.rel = 'noopener';
      page.appendChild(a);
      page.appendChild(el('p', 'mock__why', 'The public site may have changed since the project launched.'));
    }
    return page;
  }

  function openWin(opts) {
    // opts: { key, title, url?, card?, external? }
    var found = wins.filter(function (o) { return o.key === opts.key; })[0];
    if (found) { focusWin(found); return; }

    var n = wins.length;
    var vw = window.innerWidth, vh = window.innerHeight;
    var w = Math.min(920, vw - 40), h = Math.min(640, vh - 110);
    var el0 = el('div', 'win');
    el0.setAttribute('role', 'dialog');
    el0.setAttribute('aria-label', opts.title);
    el0.tabIndex = -1;
    el0.style.width = w + 'px';
    el0.style.height = h + 'px';
    el0.style.left = clamp(70 + (n % 7) * 30, 0, Math.max(0, vw - w)) + 'px';
    el0.style.top = clamp(84 + (n % 7) * 30, 0, Math.max(0, vh - h)) + 'px';

    var bar = el('div', 'win__bar');
    var lights = el('div', 'win__lights');
    var bClose = el('button', 'win__light win__light--close'); bClose.type = 'button'; bClose.setAttribute('aria-label', 'Close window');
    var bMax = el('button', 'win__light win__light--max'); bMax.type = 'button'; bMax.setAttribute('aria-label', 'Maximise window');
    lights.appendChild(bClose); lights.appendChild(bMax);
    var url = el('div', 'win__url', opts.url ? opts.url.replace(/^https?:\/\//, '') : 'case-study / ' + opts.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    bar.appendChild(lights); bar.appendChild(url);
    var target = opts.url || opts.external;
    if (target) {
      var ext = el('a', 'win__ext', '↗');
      ext.href = target; ext.target = '_blank'; ext.rel = 'noopener';
      ext.setAttribute('aria-label', 'Open in a new tab'); ext.title = 'Open in a new tab';
      bar.appendChild(ext);
    }

    var body = el('div', 'win__body');
    if (opts.url) {
      var f = document.createElement('iframe');
      f.src = opts.url;
      f.title = opts.title;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer';
      f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      body.appendChild(f);
    } else {
      body.appendChild(buildPage(opts.card, opts.external));
    }

    var grip = el('div', 'win__grip');
    el0.appendChild(bar); el0.appendChild(body);
    if (opts.url) el0.appendChild(el('div', 'win__note', 'Live site. If it looks blank, use ↗ to open it in a new tab.'));
    el0.appendChild(grip);
    layer.appendChild(el0);

    var win = { key: opts.key, el: el0 };
    wins.push(win);
    focusWin(win);
    sync();

    el0.addEventListener('pointerdown', function () { if (!el0.classList.contains('is-active')) focusWin(win); }, true);
    bClose.addEventListener('click', function () { closeWin(win); });
    bMax.addEventListener('click', function () { el0.classList.toggle('is-max'); });
    bar.addEventListener('dblclick', function (e) { if (!e.target.closest('button, a')) el0.classList.toggle('is-max'); });

    // Drag by the title bar
    bar.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button, a') || phone.matches || el0.classList.contains('is-max')) return;
      var ox = e.clientX - el0.offsetLeft, oy = e.clientY - el0.offsetTop;
      bar.setPointerCapture(e.pointerId);
      document.body.classList.add('is-dragging');
      function move(ev) {
        el0.style.left = clamp(ev.clientX - ox, 120 - el0.offsetWidth, window.innerWidth - 120) + 'px';
        el0.style.top = clamp(ev.clientY - oy, 0, window.innerHeight - 40) + 'px';
      }
      function up() {
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
        bar.removeEventListener('pointercancel', up);
        document.body.classList.remove('is-dragging');
      }
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
      bar.addEventListener('pointercancel', up);
    });

    // Resize from the bottom-right corner
    grip.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      var sx = e.clientX, sy = e.clientY, sw = el0.offsetWidth, sh = el0.offsetHeight;
      grip.setPointerCapture(e.pointerId);
      document.body.classList.add('is-dragging');
      function move(ev) {
        el0.style.width = Math.max(300, sw + ev.clientX - sx) + 'px';
        el0.style.height = Math.max(220, sh + ev.clientY - sy) + 'px';
      }
      function up() {
        grip.removeEventListener('pointermove', move);
        grip.removeEventListener('pointerup', up);
        grip.removeEventListener('pointercancel', up);
        document.body.classList.remove('is-dragging');
      }
      grip.addEventListener('pointermove', move);
      grip.addEventListener('pointerup', up);
      grip.addEventListener('pointercancel', up);
    });

    el0.focus({ preventScroll: true });
  }

  closeAll.addEventListener('click', function () { wins.slice().forEach(closeWin); });
  document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('lb-open')) return; // the photo viewer handles its own keys
    if (e.key === 'Escape' && zoom) { closeZoom(); return; }
    if (e.key === 'Escape' && wins.length) {
      var top = wins.filter(function (o) { return o.el.classList.contains('is-active'); })[0];
      if (top) closeWin(top);
    }
  });

  function titleOf(card) { return card.querySelector('h3').firstChild.textContent.trim(); }
  function openCard(card) {
    openWin({ key: titleOf(card), title: titleOf(card), url: card.dataset.url, external: card.dataset.external, card: card });
  }

  // ---- Tech stack chips: replace the names by brand logos (img/tech/*.svg).
  // The name stays in the DOM as hidden text and as the tooltip. A technology
  // without a logo in the icon set keeps its text chip.
  var TECH = {
    'Next.js': ['nextdotjs'], 'React': ['react'], 'TypeScript': ['typescript'], 'MUI': ['mui'],
    'TanStack Query': ['reactquery'], 'Keycloak': ['keycloak'], 'Storybook': ['storybook'],
    'Go': ['go'], 'Gin': ['gin'], 'PostgreSQL': ['postgresql'], 'Redis': ['redis'], 'Kafka': ['apachekafka'],
    'Swagger': ['swagger'], 'Prometheus': ['prometheus'], 'Zod': ['zod'], 'Swiper': ['swiper'],
    'Chart.js': ['chartdotjs'], 'Framer Motion': ['framer'], 'Turborepo': ['turborepo'], 'Remix': ['remix'],
    'Tailwind': ['tailwindcss'], 'Flutter': ['flutter'], 'Figma API': ['figma'], 'Slack API': ['slack'],
    'Strapi': ['strapi'], 'Nuxt': ['nuxtdotjs'], 'Vue': ['vuedotjs'], 'Express.js': ['express'],
    'React Hook Form + Zod': ['reacthookform', 'zod'], 'NestJS + AWS': ['nestjs', 'amazonwebservices']
  };
  document.querySelectorAll('.chips--sm li').forEach(function (li) {
    var name = li.textContent.trim();
    var m = name.match(/^(.*\S)\s+(\d+)$/); // "Next.js 15" -> name + version
    var slugs = TECH[name] || (m && TECH[m[1]]);
    if (!slugs) return;
    li.textContent = '';
    li.className = 'logo';
    li.title = name;
    slugs.forEach(function (s) {
      var img = document.createElement('img');
      img.src = 'img/tech/' + s + '.svg';
      img.alt = '';
      img.width = 20; img.height = 20;
      img.loading = 'lazy'; img.decoding = 'async'; img.draggable = false;
      li.appendChild(img);
    });
    if (m && TECH[m[1]]) li.appendChild(el('sup', '', m[2]));
    li.appendChild(el('span', 'sr', name));
  });

  // The project's name is a button that opens the mini-browser window.
  projects.forEach(function (card) {
    var h3 = card.querySelector('h3');
    var b = el('button', 'name', h3.firstChild.textContent.trim());
    b.type = 'button';
    b.title = 'Open in a mini-browser window';
    h3.replaceChild(b, h3.firstChild);
    card.tabIndex = 0;
  });

  // ---- Zoom + flip: the rest of the card zooms to the centre; a second click
  // turns it 180° around the vertical axis to show the website on its back.
  var zoom = null;

  function zoomRect() {
    var w = Math.min(780, window.innerWidth * 0.92), h = Math.min(580, window.innerHeight * 0.84);
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h };
  }
  function place(node, r) {
    node.style.left = r.left + 'px'; node.style.top = r.top + 'px';
    node.style.width = r.width + 'px'; node.style.height = r.height + 'px';
  }

  function closeZoom() {
    if (!zoom) return;
    var z = zoom;
    zoom = null;
    z.wrap.classList.remove('is-flipped');
    z.root.classList.remove('is-open');
    place(z.wrap, z.card.getBoundingClientRect());
    setTimeout(function () { z.root.remove(); z.card.style.visibility = ''; }, 520);
  }

  function openZoom(card) {
    if (zoom) return;
    var url = card.dataset.url, external = card.dataset.external;
    var root = el('div', 'zoom');
    var backdrop = el('div', 'zoom__backdrop');
    var wrap = el('div', 'zoom__card');
    var flip = el('div', 'zoom__flip');

    // Front: a copy of the card
    var front = el('div', 'zoom__face zoom__front project');
    front.tabIndex = 0;
    front.setAttribute('role', 'button');
    front.setAttribute('aria-label', 'Flip the card to see the website of ' + titleOf(card));
    var head = card.querySelector('header').cloneNode(true);
    var nm = head.querySelector('.name');
    if (nm) nm.replaceWith(document.createTextNode(nm.textContent + ' '));
    front.appendChild(head);
    ['.bullets', '.chips'].forEach(function (sel) {
      var part = card.querySelector(sel);
      if (part) front.appendChild(part.cloneNode(true));
    });
    front.appendChild(el('p', 'zoom__hint', 'Click the card to flip it and see the website ↻'));
    var x1 = el('button', 'zoom__x', '✕');
    x1.type = 'button'; x1.setAttribute('aria-label', 'Close');
    front.appendChild(x1);

    // Back: the website (loaded on the first flip) or the case study
    var back = el('div', 'zoom__face zoom__back');
    var bar = el('div', 'win__bar zoom__bar');
    var bFlip = el('button', 'win__ext', '↺');
    bFlip.type = 'button'; bFlip.title = 'Flip back'; bFlip.setAttribute('aria-label', 'Flip back');
    var urlText = url ? url.replace(/^https?:\/\//, '') : (external ? external.replace(/^https?:\/\//, '') : 'case-study');
    var urlBox = el('div', 'win__url', urlText);
    bar.appendChild(bFlip); bar.appendChild(urlBox);
    var target = url || external;
    if (target) {
      var ext = el('a', 'win__ext', '↗');
      ext.href = target; ext.target = '_blank'; ext.rel = 'noopener';
      ext.title = 'Open in a new tab'; ext.setAttribute('aria-label', 'Open in a new tab');
      bar.appendChild(ext);
    }
    var x2 = el('button', 'win__ext', '✕');
    x2.type = 'button'; x2.setAttribute('aria-label', 'Close');
    bar.appendChild(x2);
    var content = el('div', 'win__body');
    var frame = null;
    if (url) {
      frame = document.createElement('iframe');
      frame.title = titleOf(card);
      frame.referrerPolicy = 'no-referrer';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      content.appendChild(frame);
    } else {
      content.appendChild(buildPage(card, external));
    }
    back.appendChild(bar); back.appendChild(content);

    flip.appendChild(front); flip.appendChild(back);
    wrap.appendChild(flip);
    root.appendChild(backdrop); root.appendChild(wrap);

    card.style.visibility = 'hidden';
    place(wrap, card.getBoundingClientRect());
    document.body.appendChild(root);
    wrap.offsetWidth; // commit the start rect before animating to the centre
    root.classList.add('is-open');
    place(wrap, zoomRect());
    front.focus({ preventScroll: true });

    zoom = { root: root, wrap: wrap, card: card };

    function turn(on) {
      wrap.classList.toggle('is-flipped', on);
      if (on && frame && !frame.src) frame.src = url;
      (on ? bFlip : front).focus({ preventScroll: true });
    }
    front.addEventListener('click', function (e) { if (!e.target.closest('.zoom__x, a')) turn(true); });
    front.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target === front) { e.preventDefault(); turn(true); } });
    bFlip.addEventListener('click', function () { turn(false); });
    x1.addEventListener('click', closeZoom);
    x2.addEventListener('click', closeZoom);
    backdrop.addEventListener('click', closeZoom);
  }

  window.addEventListener('resize', function () { if (zoom) place(zoom.wrap, zoomRect()); });

  document.querySelector('.projects').addEventListener('click', function (e) {
    var card = e.target.closest('.project');
    if (e.target.closest('.name')) { openCard(card); return; }
    var link = e.target.closest('a[data-open-url]');
    if (link) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; // let "open in new tab" work normally
      e.preventDefault();
      openWin({ key: link.href, title: link.textContent.replace(/\s*↗$/, ''), url: link.href, card: card });
      return;
    }
    if (e.target.closest('a')) return;
    if (String(window.getSelection())) return; // the user is selecting text
    openZoom(card);
  });
  document.querySelector('.projects').addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project')) { e.preventDefault(); openZoom(e.target); }
  });

  // ---- Copy e-mail address (for visitors without Gmail) ------------------
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var label = b.textContent;
    b.addEventListener('click', function () {
      function done(ok) {
        b.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C: ' + b.dataset.copy;
        setTimeout(function () { b.textContent = label; }, 2200);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(b.dataset.copy).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  });

  // ---- Team gallery: tilt on hover + lightbox -----------------------------
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  var canTilt = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  if (canTilt) {
    tiles.forEach(function (t) {
      t.addEventListener('pointermove', function (e) {
        var r = t.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        t.style.transform = 'perspective(900px) rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg) translateY(-4px)';
      });
      t.addEventListener('pointerleave', function () { t.style.transform = ''; });
    });
  }

  var lb = el('div', 'lb');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Photo viewer');
  var lbBg = el('div', 'lb__bg');
  var lbFig = el('figure', 'lb__fig');
  var lbPic = el('picture');
  var lbSrcA = document.createElement('source'); lbSrcA.type = 'image/avif';
  var lbSrcW = document.createElement('source'); lbSrcW.type = 'image/webp';
  var lbImg = document.createElement('img'); lbImg.draggable = false;
  lbPic.appendChild(lbSrcA); lbPic.appendChild(lbSrcW); lbPic.appendChild(lbImg); lbPic.appendChild(el('span', 'lb__shield'));
  var lbCap = el('figcaption', 'lb__cap');
  lbFig.appendChild(lbPic); lbFig.appendChild(lbCap);
  var lbX = el('button', 'lb__x', '✕'); lbX.type = 'button'; lbX.setAttribute('aria-label', 'Close photo viewer');
  var lbPrev = el('button', 'lb__nav lb__prev', '‹'); lbPrev.type = 'button'; lbPrev.setAttribute('aria-label', 'Previous photo');
  var lbNext = el('button', 'lb__nav lb__next', '›'); lbNext.type = 'button'; lbNext.setAttribute('aria-label', 'Next photo');
  [lbBg, lbFig, lbPrev, lbNext, lbX].forEach(function (n) { lb.appendChild(n); });
  document.body.appendChild(lb);
  ['contextmenu', 'dragstart', 'selectstart'].forEach(function (t) {
    lb.addEventListener(t, function (e) { e.preventDefault(); });
    tiles.forEach(function (tile) { tile.addEventListener(t, function (e) { e.preventDefault(); }); });
  });

  var lbIndex = 0, lbOpener = null;
  function lbShow(i, animate) {
    lbIndex = (i + tiles.length) % tiles.length;
    var t = tiles[lbIndex], base = 'img/team/' + t.dataset.name + '-' + t.dataset.max;
    function paint() {
      lbSrcA.srcset = base + '.avif';
      lbSrcW.srcset = base + '.webp';
      lbImg.src = base + '.jpg';
      lbImg.width = +t.dataset.w; lbImg.height = +t.dataset.h;
      lbImg.alt = t.dataset.alt;
      lbCap.textContent = t.dataset.caption;
      var count = el('small', '', (lbIndex + 1) + ' / ' + tiles.length);
      lbCap.appendChild(count);
      lbFig.classList.remove('is-swap');
    }
    if (animate) { lbFig.classList.add('is-swap'); setTimeout(paint, 180); } else { paint(); }
  }
  function lbOpen(i, opener) {
    lbOpener = opener;
    lbShow(i, false);
    lb.classList.add('is-open');
    document.body.classList.add('lb-open');
    lbX.focus({ preventScroll: true });
  }
  function lbClose() {
    lb.classList.remove('is-open');
    document.body.classList.remove('lb-open');
    if (lbOpener) lbOpener.focus({ preventScroll: true });
  }
  tiles.forEach(function (t, i) { t.addEventListener('click', function () { lbOpen(i, t); }); });
  lbX.addEventListener('click', lbClose);
  lbBg.addEventListener('click', lbClose);
  lbPrev.addEventListener('click', function () { lbShow(lbIndex - 1, true); });
  lbNext.addEventListener('click', function () { lbShow(lbIndex + 1, true); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') lbClose();
    else if (e.key === 'ArrowLeft') lbShow(lbIndex - 1, true);
    else if (e.key === 'ArrowRight') lbShow(lbIndex + 1, true);
    else if (e.key === 'Tab') { // keep focus inside the viewer
      var ring = [lbPrev, lbNext, lbX], at = ring.indexOf(document.activeElement);
      e.preventDefault();
      ring[(at + (e.shiftKey ? ring.length - 1 : 1)) % ring.length].focus();
    }
  });
  var swipeX = null;
  lb.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') swipeX = e.clientX; });
  lb.addEventListener('pointerup', function (e) {
    if (swipeX === null) return;
    var dx = e.clientX - swipeX; swipeX = null;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1), true);
  });

  // Deterrents only: no web page can stop a screenshot, a screen recording or a
  // determined "save as". These remove the one-click ways to take the portrait.
  document.querySelectorAll('.hero__media, .hero__shield').forEach(function (n) {
    ['contextmenu', 'dragstart', 'selectstart'].forEach(function (t) {
      n.addEventListener(t, function (e) { e.preventDefault(); });
    });
  });

  // Floating back-to-top button: shown once the page is scrolled
  var toTop = document.querySelector('.totop');
  function toggleToTop() { toTop.classList.toggle('show', window.scrollY > 400); }
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();

  document.getElementById('year').textContent = new Date().getFullYear();
})();
