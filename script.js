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
  var targets = document.querySelectorAll('.section__title, .section__intro, .filters, .stats li, .project, .card, .timeline li');
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
    var openBtn = head.querySelector('.open');
    if (openBtn) openBtn.remove();
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
    if (e.key === 'Escape' && wins.length) {
      var top = wins.filter(function (o) { return o.el.classList.contains('is-active'); })[0];
      if (top) closeWin(top);
    }
  });

  function titleOf(card) { return card.querySelector('h3').firstChild.textContent.trim(); }
  function openCard(card) {
    openWin({ key: titleOf(card), title: titleOf(card), url: card.dataset.url, external: card.dataset.external, card: card });
  }

  projects.forEach(function (card) {
    var b = el('button', 'open', 'Open ↗');
    b.type = 'button';
    b.setAttribute('aria-label', 'Open ' + titleOf(card) + ' in a window');
    card.querySelector('header').appendChild(b);
  });

  document.querySelector('.projects').addEventListener('click', function (e) {
    var link = e.target.closest('a[data-open-url]');
    if (link) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; // let "open in new tab" work normally
      e.preventDefault();
      var card = link.closest('.project');
      openWin({ key: link.href, title: link.textContent.replace(/\s*↗$/, ''), url: link.href, card: card });
      return;
    }
    if (e.target.closest('a')) return;
    if (!e.target.closest('.open') && String(window.getSelection())) return; // user is selecting text
    openCard(e.target.closest('.project'));
  });

  // Floating back-to-top button: shown once the page is scrolled
  var toTop = document.querySelector('.totop');
  function toggleToTop() { toTop.classList.toggle('show', window.scrollY > 400); }
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();

  document.getElementById('year').textContent = new Date().getFullYear();
})();
