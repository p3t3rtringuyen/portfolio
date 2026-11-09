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
  var targets = document.querySelectorAll('.section, .stats li, .project, .card');
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
