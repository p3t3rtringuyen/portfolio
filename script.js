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
  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  // A tap outside the open menu (or Escape) closes it.
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); }
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
  var targets = document.querySelectorAll('.section__title, .section__intro, .filters, .stats li, .project, .card, .chips--values, .tile');
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

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('lb-open')) return; // the photo viewer handles its own keys
    if (e.key === 'Escape' && zoom) closeZoom();
  });

  function titleOf(card) { return card.querySelector('h3').firstChild.textContent.trim(); }

  // ---- Tech stack chips: replace the names by brand logos (img/tech/*.svg).
  // The name stays in the DOM as hidden text and as the tooltip. A technology
  // without a logo in the icon set keeps its text chip.
  var TECH = {
    'Next.js': ['nextdotjs'], 'React': ['react'], 'TypeScript': ['typescript'], 'MUI': ['mui'],
    'TanStack Query': ['reactquery'], 'Keycloak': ['keycloak'], 'Storybook': ['storybook'],
    'Zod': ['zod'], 'Swiper': ['swiper'],
    'Chart.js': ['chartdotjs'], 'Framer Motion': ['framer'], 'Turborepo': ['turborepo'], 'Remix': ['remix'],
    'Tailwind': ['tailwindcss'], 'Flutter': ['flutter'], 'Figma API': ['figma'], 'Slack API': ['slack'],
    'Strapi': ['strapi'], 'Nuxt': ['nuxtdotjs'], 'Vue': ['vuedotjs'], 'Express.js': ['express'],
    'React Hook Form + Zod': ['reacthookform', 'zod'], 'NestJS + AWS': ['nestjs', 'amazonwebservices'],
    // logos taken from each project's own site (not in the icon set)
    'Zustand': ['zustand.png'], 'material-react-table': ['mrt.png'], 'react-window': ['reactwindow.svg']
  };
  document.querySelectorAll('.chips--sm li').forEach(function (li) {
    var name = li.textContent.trim();
    var m = name.match(/^(.*\S)\s+(\d+)$/); // "Next.js 15" -> name + version
    var slugs = TECH[name] || (m && TECH[m[1]]);
    if (!slugs) return;
    li.textContent = '';
    li.className = 'logo';
    slugs.forEach(function (s) {
      var img = document.createElement('img');
      img.src = 'img/tech/' + (s.indexOf('.') > -1 ? s : s + '.svg');
      img.alt = '';
      img.width = 20; img.height = 20;
      img.loading = 'lazy'; img.decoding = 'async'; img.draggable = false;
      li.appendChild(img);
    });
    if (m && TECH[m[1]]) li.appendChild(el('sup', '', m[2]));
    // the slide-out shows the plain name; the version is already beside the logo
    var nameBox = el('span', 'chip__name'); // an outer grid track animates 0fr -> 1fr, so the width follows the real text width
    nameBox.appendChild(el('span', '', m && TECH[m[1]] ? m[1] : name));
    li.appendChild(nameBox); // always in the DOM for screen readers
  });

  // ---- Skills: a logo tile in front of the name (the name stays visible).
  var SKILL = {
    'React 18/19': ['react'], 'Next.js (Pages & App Router)': ['nextdotjs'], 'TypeScript': ['typescript'],
    'Remix': ['remix'], 'Vue / Nuxt': ['vuedotjs', 'nuxtdotjs'], 'Angular': ['angular'], 'HTML5 / CSS3': ['html5', 'css3'],
    'MUI 5–7': ['mui'], 'Tailwind CSS': ['tailwindcss'], 'Headless UI': ['headlessui'], 'Storybook': ['storybook'],
    'Figma → code': ['figma'], 'TanStack Query': ['reactquery'], 'Redux → hooks': ['redux'],
    'React Hook Form': ['reacthookform'], 'Zod / Yup': ['zod'], 'Formik': ['formik'], 'TanStack Table': ['reacttable'],
    'Charts (Recharts, Chart.js)': ['chartdotjs'], 'Keycloak / OIDC': ['keycloak', 'openid'],
    'NestJS': ['nestjs'], 'Node / Express': ['nodedotjs', 'express'],
    'AWS': ['amazonwebservices'],
    'Strapi CMS': ['strapi'], 'ESLint / Prettier': ['eslint', 'prettier'], 'Conventional Commits': ['conventionalcommits'],
    'GitLab CI': ['gitlab'], 'Docker': ['docker'], 'Asana · Trello · GitLab': ['asana', 'trello', 'gitlab'],
    'Zustand': ['zustand.png'], 'material-react-table': ['mrt.png']
  };
  document.querySelectorAll('#skills .chips li').forEach(function (li) {
    var slugs = SKILL[li.textContent.trim()];
    if (!slugs) return;
    li.classList.add('has-ico');
    slugs.slice().reverse().forEach(function (s) {
      var tile = el('span', 'chip__ico');
      var img = document.createElement('img');
      img.src = 'img/tech/' + (s.indexOf('.') > -1 ? s : s + '.svg');
      img.alt = ''; img.width = 15; img.height = 15;
      img.loading = 'lazy'; img.decoding = 'async'; img.draggable = false;
      tile.appendChild(img);
      li.insertBefore(tile, li.firstChild);
    });
  });

  // Every card is focusable and clickable: it zooms. (A project's name is plain text.)
  projects.forEach(function (card) {
    card.tabIndex = 0;
    // Corner icon: tells the visitor the card can be clicked to enlarge it.
    var hint = el('span', 'project__expand');
    hint.setAttribute('aria-hidden', 'true');
    hint.title = window.t('Click the card to enlarge it');
    hint.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7.5 7.5M3 21l7.5-7.5"/></svg>';
    card.appendChild(hint);
  });

  // ---- Zoom + flip: the rest of the card zooms to the centre; a second click
  // turns it 180° around the vertical axis to show the website on its back.
  var zoom = null;

  function centred(w, h) {
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h };
  }
  // The back (a website) wants room; the front is exactly as tall as its content.
  function backRect() {
    return centred(Math.min(900, window.innerWidth * 0.94), Math.min(640, window.innerHeight * 0.86));
  }
  function frontRect(front) {
    var w = Math.min(780, window.innerWidth * 0.92);
    var probe = front.cloneNode(true); // measure an unconstrained copy at the target width
    probe.removeAttribute('tabindex');
    probe.style.cssText = 'position:absolute;inset:auto;left:-9999px;top:0;height:auto;visibility:hidden;pointer-events:none;width:' + w + 'px;';
    document.body.appendChild(probe);
    var h = probe.offsetHeight;
    probe.remove();
    return centred(w, Math.min(Math.max(h, 220), window.innerHeight * 0.9));
  }
  function place(node, r) {
    node.style.left = r.left + 'px'; node.style.top = r.top + 'px';
    node.style.width = r.width + 'px'; node.style.height = r.height + 'px';
    if (node.classList.contains('zoom__card')) {
      // While the card is growing, shrinking or turning, its content is briefly bigger than its box: hide the scrollbars until it settles.
      node.classList.add('is-moving');
      clearTimeout(node._moving);
      node._moving = setTimeout(function () { node.classList.remove('is-moving'); }, 950);
    }
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
    var url = card.dataset.url;
    var canFlip = !!url; // only a site that allows being embedded has a back to turn to
    var root = el('div', 'zoom');
    var backdrop = el('div', 'zoom__backdrop');
    var wrap = el('div', 'zoom__card');
    var flip = el('div', 'zoom__flip');

    // Front: a copy of the card
    var front = el('div', 'zoom__face zoom__front project');
    front.tabIndex = 0;
    if (canFlip) {
      front.classList.add('is-flippable');
      front.setAttribute('role', 'button');
      front.setAttribute('aria-label', window.t('Flip the card to see the website of ') + titleOf(card));
    } else {
      front.setAttribute('role', 'dialog');
      front.setAttribute('aria-label', titleOf(card));
    }
    var head = card.querySelector('header').cloneNode(true);
    front.appendChild(head);
    ['.bullets', '.chips'].forEach(function (sel) {
      var part = card.querySelector(sel);
      if (part) front.appendChild(part.cloneNode(true));
    });
    // The Flip button is the last chip of the row of technology chips, so it lines up with them (and sits at the right end).
    if (canFlip) {
      var badge = el('li', 'zoom__badge', window.t('Flip') + ' ');
      badge.setAttribute('aria-hidden', 'true');
      badge.appendChild(el('i', '', '↻'));
      var chipRow = front.querySelector('.chips');
      if (!chipRow) { chipRow = el('ul', 'chips chips--sm'); front.appendChild(chipRow); }
      chipRow.appendChild(badge);
    }
    var x1 = el('button', 'zoom__x', '✕');
    x1.type = 'button'; x1.setAttribute('aria-label', window.t('Close'));
    front.appendChild(x1);

    // Back: the website (loaded on the first flip) or the case study
    var back = el('div', 'zoom__face zoom__back');
    var bar = el('div', 'win__bar zoom__bar');
    var bFlip = el('button', 'win__ext', '↺');
    bFlip.type = 'button'; bFlip.title = window.t('Flip back'); bFlip.setAttribute('aria-label', window.t('Flip back'));
    var urlText = url ? url.replace(/^https?:\/\//, '') : '';
    var urlBox = el('div', 'win__url', urlText);
    bar.appendChild(bFlip); bar.appendChild(urlBox);
    if (url) {
      var ext = el('a', 'win__ext', '↗');
      ext.href = url; ext.target = '_blank'; ext.rel = 'noopener';
      ext.title = window.t('Open in a new tab'); ext.setAttribute('aria-label', window.t('Open in a new tab'));
      bar.appendChild(ext);
    }
    var x2 = el('button', 'win__ext', '✕');
    x2.type = 'button'; x2.setAttribute('aria-label', window.t('Close'));
    bar.appendChild(x2);
    var content = el('div', 'win__body');
    var frame = null;
    if (url) {
      frame = document.createElement('iframe');
      frame.title = titleOf(card);
      frame.referrerPolicy = 'no-referrer';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      content.appendChild(frame);
    }
    back.appendChild(bar); back.appendChild(content);

    flip.appendChild(front);
    if (canFlip) flip.appendChild(back);
    wrap.appendChild(flip);
    root.appendChild(backdrop); root.appendChild(wrap);

    card.style.visibility = 'hidden';
    place(wrap, card.getBoundingClientRect());
    document.body.appendChild(root);
    wrap.offsetWidth; // commit the start rect before animating to the centre
    root.classList.add('is-open');
    place(wrap, frontRect(front));
    front.focus({ preventScroll: true });

    zoom = { root: root, wrap: wrap, card: card, front: front, flipped: false };

    function turn(on) {
      zoom.flipped = on;
      wrap.classList.toggle('is-flipped', on);
      place(wrap, on ? backRect() : frontRect(front)); // grows for the website, shrinks back to the content

      if (on && frame && !frame.src) frame.src = url;
      (on ? bFlip : front).focus({ preventScroll: true });
    }
    front.addEventListener('click', function (e) { if (canFlip && !e.target.closest('.zoom__x, a')) turn(true); });
    front.addEventListener('keydown', function (e) { if (canFlip && (e.key === 'Enter' || e.key === ' ') && e.target === front) { e.preventDefault(); turn(true); } });
    bFlip.addEventListener('click', function () { turn(false); });
    x1.addEventListener('click', closeZoom);
    x2.addEventListener('click', closeZoom);
    backdrop.addEventListener('click', closeZoom);
  }

  window.addEventListener('resize', function () {
    if (zoom) place(zoom.wrap, zoom.flipped ? backRect() : frontRect(zoom.front));
  });

  document.querySelector('.projects').addEventListener('click', function (e) {
    var card = e.target.closest('.project');
    if (e.target.closest('a')) return;
    if (String(window.getSelection())) return; // the user is selecting text
    openZoom(card);
  });
  document.querySelector('.projects').addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project')) { e.preventDefault(); openZoom(e.target); }
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
  lb.setAttribute('aria-label', window.t('Photo viewer'));
  var lbBg = el('div', 'lb__bg');
  var lbFig = el('figure', 'lb__fig');
  var lbPic = el('picture');
  var lbSrcA = document.createElement('source'); lbSrcA.type = 'image/avif';
  var lbSrcW = document.createElement('source'); lbSrcW.type = 'image/webp';
  var lbImg = document.createElement('img'); lbImg.draggable = false;
  lbPic.appendChild(lbSrcA); lbPic.appendChild(lbSrcW); lbPic.appendChild(lbImg); lbPic.appendChild(el('span', 'lb__shield'));
  var lbCap = el('figcaption', 'lb__cap');
  lbFig.appendChild(lbPic); lbFig.appendChild(lbCap);
  var lbX = el('button', 'lb__x'); lbX.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'; lbX.type = 'button'; lbX.setAttribute('aria-label', window.t('Close photo viewer'));
  var lbPrev = el('button', 'lb__nav lb__prev'); lbPrev.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'; lbPrev.type = 'button'; lbPrev.setAttribute('aria-label', window.t('Previous photo'));
  var lbNext = el('button', 'lb__nav lb__next'); lbNext.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'; lbNext.type = 'button'; lbNext.setAttribute('aria-label', window.t('Next photo'));
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

  // ---- Cards with a site screenshot: measure how far the URL can slide, and let a glow follow the pointer.
  function measureCard(card) {
    // On hover the URL under the title slides sideways to the right end of the title row.
    var title = card.querySelector('h3'), url = title && title.querySelector('small');
    if (url) card.style.setProperty('--url-dx', Math.max(0, title.clientWidth - url.offsetWidth) + 'px');
  }
  document.querySelectorAll('.project--glass').forEach(function (card) {
    measureCard(card);
    if (window.ResizeObserver) new ResizeObserver(function () { measureCard(card); }).observe(card);
    var frame = 0;
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      });
    });
  });

  // Deterrents only: no web page can stop a screenshot, a screen recording or a
  // determined "save as". These remove the one-click ways to take the portrait.
  document.querySelectorAll('.hero__media, .hero__shield').forEach(function (n) {
    ['contextmenu', 'dragstart', 'selectstart'].forEach(function (t) {
      n.addEventListener(t, function (e) { e.preventDefault(); });
    });
  });

  // ---- Experience timeline: the line grows with the scroll, and a milestone appears when the line reaches its dot.
  // The line's tip follows the bottom of the screen (60px in), so every milestone that is on screen is already shown.
  var timeline = document.querySelector('.timeline');
  if (timeline) {
    var steps = Array.prototype.slice.call(timeline.querySelectorAll('li'));
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // no animation: show everything
    var pending = false;
    var updateTimeline = function () {
      pending = false;
      var rect = timeline.getBoundingClientRect();
      var progress = still ? rect.height : Math.max(0, Math.min(rect.height, window.innerHeight - 60 - rect.top));
      timeline.style.setProperty('--tl-progress', progress.toFixed(1) + 'px');
      steps.forEach(function (li) { li.classList.toggle('is-on', progress >= li.offsetTop + 13); }); // 13px = centre of the dot
    };
    var queueTimeline = function () { if (!pending) { pending = true; requestAnimationFrame(updateTimeline); } };
    window.addEventListener('scroll', queueTimeline, { passive: true });
    window.addEventListener('resize', queueTimeline);
    updateTimeline();
  }

  // ---- Copy the e-mail address: tooltip says "Click to copy", then "Copied".
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var tip = b.querySelector('.copy__tip'), status = document.getElementById('copy-status'), timer;
    function legacyCopy(text) { // plain-http fallback
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      return ok;
    }
    function show(ok) {
      tip.textContent = window.t(ok ? 'Copied ✓' : 'Press Ctrl+C to copy');
      if (status) status.textContent = ok ? window.t('Email address copied') : '';
      b.classList.add('is-copied');
      clearTimeout(timer);
      timer = setTimeout(function () { b.classList.remove('is-copied'); tip.textContent = window.t('Click to copy'); }, 1800);
    }
    b.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(b.dataset.copy).then(function () { show(true); }, function () { show(legacyCopy(b.dataset.copy)); });
      } else { show(legacyCopy(b.dataset.copy)); }
    });
  });

  // ---- Section number badges: centre the digits' ink, not the font's line box.
  // Browsers with `text-box` do this in CSS; this is the fallback for the rest.
  // Fonts put digits above or below the middle of their line box (it differs by
  // system font). Draw the digits at 8x on a canvas, find the real top and bottom
  // of the ink, and nudge the text so that ink sits in the middle of the circle.
  function centreBadgeDigits() {
    if (window.CSS && CSS.supports('text-box', 'trim-both cap alphabetic')) return; // the stylesheet already centres the glyphs
    var K = 8, cv = document.createElement('canvas'), ctx = cv.getContext('2d', { willReadFrequently: true });
    document.querySelectorAll('.section__title span').forEach(function (badge) {
      var cs = getComputedStyle(badge), text = badge.textContent.trim();
      ctx.font = cs.fontWeight + ' ' + parseFloat(cs.fontSize) * K + 'px ' + cs.fontFamily;
      var m = ctx.measureText(text);
      if (m.fontBoundingBoxAscent === undefined) return; // old browser: leave as is
      var pad = 12, base = Math.ceil(m.fontBoundingBoxAscent) + pad;
      cv.width = Math.ceil(m.width) + pad * 2; cv.height = base + Math.ceil(m.fontBoundingBoxDescent) + pad;
      ctx.font = cs.fontWeight + ' ' + parseFloat(cs.fontSize) * K + 'px ' + cs.fontFamily; // resizing resets the context
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#000';
      ctx.fillText(text, pad, base);
      var px = ctx.getImageData(0, 0, cv.width, cv.height).data, top = -1, bottom = -1;
      for (var y = 0; y < cv.height; y++) {
        for (var x = 0; x < cv.width; x++) {
          if (px[(y * cv.width + x) * 4 + 3] > 127) { if (top < 0) top = y; bottom = y; break; }
        }
      }
      if (top < 0) return;
      var inkAscent = base - top, inkDescent = bottom + 1 - base;
      var inkBelowCentre = ((m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) - (inkAscent - inkDescent)) / 2 / K;
      badge.style.setProperty('--dy', (-inkBelowCentre).toFixed(2) + 'px'); // + = move down
    });
  }
  centreBadgeDigits();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(centreBadgeDigits);

  // Floating back-to-top button: shown once the page is scrolled
  var toTop = document.querySelector('.totop');
  function toggleToTop() { toTop.classList.toggle('show', window.scrollY > 400); }
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();

  document.getElementById('year').textContent = new Date().getFullYear();
})();
