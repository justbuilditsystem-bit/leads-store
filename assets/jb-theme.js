/* ============================================================
   Tienda de Leads — Theme JS
   Vanilla, no deps. Defer-loaded.
   ============================================================ */

(function() {
  'use strict';

  /* ----- Mobile menu toggle ----- */
  document.querySelectorAll('[data-jb-menu-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var nav = document.getElementById('jb-mobile-nav');
      if (!nav) return;
      var open = nav.hasAttribute('hidden') === false;
      if (open) {
        nav.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        nav.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----- FAQ accordion: cerrar otros al abrir uno (opcional, mejora UX) ----- */
  document.querySelectorAll('[data-jb-accordion]').forEach(function(container) {
    var items = container.querySelectorAll('details');
    items.forEach(function(item) {
      item.addEventListener('toggle', function() {
        if (item.open) {
          items.forEach(function(other) {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  });

  /* ----- Lazy video: click-to-load YouTube/Vimeo iframe ----- */
  document.querySelectorAll('[data-jb-video]').forEach(function(wrap) {
    var url = wrap.dataset.videoUrl;
    if (!url) return;

    var btn = wrap.querySelector('.jb-video__play');
    if (!btn) return;

    btn.addEventListener('click', function() {
      var embedUrl = toEmbedUrl(url);
      if (!embedUrl) {
        window.open(url, '_blank', 'noopener');
        return;
      }
      var iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = 'Video';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.setAttribute('allowfullscreen', '');
      wrap.appendChild(iframe);
      wrap.classList.add('is-playing');
    });
  });

  function toEmbedUrl(url) {
    try {
      var u = new URL(url);
      // YouTube
      if (u.hostname.includes('youtube.com')) {
        var id = u.searchParams.get('v');
        if (id) return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      }
      if (u.hostname === 'youtu.be') {
        return 'https://www.youtube-nocookie.com/embed' + u.pathname + '?autoplay=1&rel=0';
      }
      // Vimeo
      if (u.hostname.includes('vimeo.com')) {
        var path = u.pathname.split('/').filter(Boolean)[0];
        if (path) return 'https://player.vimeo.com/video/' + path + '?autoplay=1';
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  /* ----- Hero carousel: autoplay + dots + prev/next ----- */
  document.querySelectorAll('[data-jb-carousel]').forEach(function(carousel) {
    var track = carousel.querySelector('.jb-carousel__track');
    if (!track) return;
    var slides = track.children;
    if (slides.length === 0) return;

    var dots = carousel.querySelectorAll('.jb-carousel__dot');
    var prev = carousel.querySelector('.jb-carousel__nav--prev');
    var next = carousel.querySelector('.jb-carousel__nav--next');
    var autoplayMs = parseInt(carousel.dataset.autoplay, 10) || 0;

    var current = 0;
    var timer = null;
    var paused = false;

    function go(i) {
      current = ((i % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      for (var d = 0; d < dots.length; d++) {
        if (d === current) dots[d].classList.add('is-active');
        else dots[d].classList.remove('is-active');
      }
    }

    function start() {
      stop();
      if (autoplayMs && slides.length > 1 && !paused) {
        timer = setInterval(function() { go(current + 1); }, autoplayMs);
      }
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener('click', function() { go(current - 1); start(); });
    if (next) next.addEventListener('click', function() { go(current + 1); start(); });
    for (var i = 0; i < dots.length; i++) {
      (function(idx) {
        dots[idx].addEventListener('click', function() { go(idx); start(); });
      })(i);
    }

    carousel.addEventListener('mouseenter', function() { paused = true; stop(); });
    carousel.addEventListener('mouseleave', function() { paused = false; start(); });

    // Pause when tab not visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) stop();
      else start();
    });

    go(0);
    start();
  });

  /* ----- Variant select → update hidden input id ----- */
  document.querySelectorAll('[data-jb-variant-select]').forEach(function(select) {
    select.addEventListener('change', function() {
      var form = select.closest('form');
      if (!form) return;
      var variantInput = form.querySelector('[data-jb-variant-id]');
      if (!variantInput) return;
      // Construir el array de opciones seleccionadas
      var selects = form.querySelectorAll('[data-jb-variant-select]');
      var options = Array.prototype.map.call(selects, function(s) { return s.value; });
      // Lookup variant id desde un mapa global expuesto por la sección
      var productHandle = form.dataset.productHandle;
      if (window.JB_PRODUCT_VARIANTS && productHandle) {
        var found = window.JB_PRODUCT_VARIANTS[productHandle].find(function(v) {
          return v.options.every(function(o, i) { return o === options[i]; });
        });
        if (found) variantInput.value = found.id;
      }
    });
  });

})();
