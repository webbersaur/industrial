/* ============================================
   Industrial Flooring Technologies
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function openNav() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (navLinks.classList.contains('active')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close on nav link click
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
      closeLightbox();
    }
  });

  // --- Sticky Header ---
  var header = document.querySelector('.site-header');
  var scrollThreshold = 60;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Scroll Reveal Animations ---
  var reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --- Active Nav Link ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.btn)').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Gallery Filter ---
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = this.getAttribute('data-category');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Filter items
      galleryItems.forEach(function (item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Lightbox ---
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox-content img');
  var lightboxCaption = document.querySelector('.lightbox-caption');
  var lightboxClose = document.querySelector('.lightbox-close');
  var lightboxPrev = document.querySelector('.lightbox-prev');
  var lightboxNext = document.querySelector('.lightbox-next');
  var currentLightboxIndex = 0;

  function getVisibleGalleryItems() {
    return Array.from(galleryItems).filter(function (item) {
      return !item.classList.contains('hidden');
    });
  }

  function openLightbox(index) {
    var visible = getVisibleGalleryItems();
    if (!visible[index]) return;

    currentLightboxIndex = index;
    var img = visible[index].querySelector('img');
    var caption = visible[index].querySelector('.gallery-item-caption p');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption && caption) {
      lightboxCaption.textContent = caption.textContent;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    var visible = getVisibleGalleryItems();
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = visible.length - 1;
    if (currentLightboxIndex >= visible.length) currentLightboxIndex = 0;
    openLightbox(currentLightboxIndex);
  }

  if (lightbox) {
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var visible = getVisibleGalleryItems();
        var visibleIndex = visible.indexOf(item);
        openLightbox(visibleIndex);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function () { navigateLightbox(-1); });
    lightboxNext.addEventListener('click', function () { navigateLightbox(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  // --- Rate Us Modal ---
  var rateModal = document.getElementById('rateUsModal');
  var rateOpenBtn = document.getElementById('footerRateUsBtn');
  var rateCloseBtn = document.getElementById('closeRateUsModal');

  function openRateUsModal() {
    if (!rateModal) return;
    rateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeRateUsModal() {
    if (!rateModal) return;
    rateModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (rateOpenBtn) {
    rateOpenBtn.addEventListener('click', openRateUsModal);
  }

  document.querySelectorAll('.rate-us-trigger').forEach(function (btn) {
    btn.addEventListener('click', openRateUsModal);
  });

  if (rateCloseBtn) {
    rateCloseBtn.addEventListener('click', closeRateUsModal);
  }

  if (rateModal) {
    rateModal.addEventListener('click', function (e) {
      if (e.target === rateModal) closeRateUsModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeRateUsModal();
  });

})();
