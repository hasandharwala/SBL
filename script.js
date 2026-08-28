/**
 * SBL Skin & Hair Clinic — Salonix Interactions & Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Hero editorial — staggered fade-up on load
  const heroAnimEls = document.querySelectorAll('[data-animate="fade-up"]');
  if (heroAnimEls.length) {
    // One rAF to allow paint, then trigger all (CSS delay handles stagger)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroAnimEls.forEach(el => el.classList.add('is-visible'));
      });
    });
  }

  // 2. Mobile Menu Toggle
  const burger = document.querySelector('.burger');
  const mobilePanel = document.querySelector('.mobile-panel');
  if (burger && mobilePanel) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobilePanel.classList.toggle('open');
      document.body.style.overflow = mobilePanel.classList.contains('open') ? 'hidden' : '';
    });

    mobilePanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobilePanel.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Interactive Services Accordion
  const serviceRows = document.querySelectorAll('.service-row-item');
  serviceRows.forEach(row => {
    const summary = row.querySelector('.service-row-summary');
    const toggleBtn = row.querySelector('.srv-toggle-btn');
    
    if (summary) {
      summary.addEventListener('click', (e) => {
        // If clicking inside, toggle this row
        const isCurrentlyExpanded = row.classList.contains('expanded');
        
        // Optional: close other rows if needed (accordion behavior)
        serviceRows.forEach(otherRow => {
          if (otherRow !== row) {
            otherRow.classList.remove('expanded');
            const otherBtn = otherRow.querySelector('.srv-toggle-btn');
            if (otherBtn) otherBtn.textContent = '+';
          }
        });

        if (isCurrentlyExpanded) {
          row.classList.remove('expanded');
          if (toggleBtn) toggleBtn.textContent = '+';
        } else {
          row.classList.add('expanded');
          if (toggleBtn) toggleBtn.textContent = '−';
        }
      });
    }
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const btn = item.querySelector('.faq-icon-btn');
    
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-icon-btn');
          if (otherBtn) otherBtn.textContent = '+';
        });

        if (!isOpen) {
          item.classList.add('open');
          if (btn) btn.textContent = '−';
        }
      });
    }
  });

  // 5. Booking Form Submission Handling
  const bookingForm = document.getElementById('clinicBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.btn-submit-booking');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>Booking Confirmed! We will call you.</span>`;
      submitBtn.style.background = '#2E7D32';

      setTimeout(() => {
        bookingForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  // 6. Ambient Video Play/Pause Animation
  const playBtn = document.querySelector('.ambient-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.style.transform = 'translate(-50%, -50%) scale(0.9)';
      setTimeout(() => {
        playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 150);
    });
  }

  // 7. Haute-Dermatology Storytelling Chapter Switcher
  const storyTabs = document.querySelectorAll('.story-tab');
  const heroPrimaryTitle = document.getElementById('heroPrimaryTitle');
  const heroItalicTitle = document.getElementById('heroItalicTitle');
  const heroStoryParagraph = document.getElementById('heroStoryParagraph');
  const triptychPortals = document.querySelectorAll('.triptych-portal');

  const storyData = {
    'glass-skin': {
      primary: 'Where Clinical Dermatology',
      italic: 'Transforms Into Living Art.',
      paragraph: 'Your skin does not need another temporary fix. It deserves bespoke Korean cellular protocols and FDA-cleared laser precision calibrated to your unique biological architecture for genuine glass-like luminosity.',
      activePortal: 2
    },
    'pigmentation': {
      primary: 'Targeting Dermal Melasma',
      italic: 'With Absolute Cellular Clarity.',
      paragraph: 'Melanin deep within the dermis is mapped with high-definition digital dermatoscopes and shattered using nano-pulsed Q-switched wavelengths, preventing post-inflammatory rebound without heat trauma.',
      activePortal: 3
    },
    'scar-repair': {
      primary: 'Restoring Skin Architecture',
      italic: 'Through Cellular Matrix Renewal.',
      paragraph: 'Pitted scars, ice-pick depressions, and uneven texture are addressed from the subterranean matrix upward using subcision, RF fractional microneedling, and authentic Korean exosome biological scaffolding.',
      activePortal: 1
    }
  };

  if (storyTabs.length > 0) {
    storyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const storyKey = tab.getAttribute('data-story');
        if (!storyData[storyKey]) return;

        storyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Smooth text transition
        if (heroPrimaryTitle && heroItalicTitle && heroStoryParagraph) {
          heroPrimaryTitle.style.opacity = '0';
          heroItalicTitle.style.opacity = '0';
          heroStoryParagraph.style.opacity = '0';

          setTimeout(() => {
            heroPrimaryTitle.textContent = storyData[storyKey].primary;
            heroItalicTitle.textContent = storyData[storyKey].italic;
            heroStoryParagraph.textContent = storyData[storyKey].paragraph;

            heroPrimaryTitle.style.opacity = '1';
            heroItalicTitle.style.opacity = '1';
            heroStoryParagraph.style.opacity = '1';
          }, 200);
        }

        // Highlight corresponding portal
        triptychPortals.forEach(portal => {
          portal.classList.remove('featured');
          if (portal.getAttribute('data-portal') == storyData[storyKey].activePortal) {
            portal.classList.add('featured');
          }
        });
      });
    });
  }

  // 8. Ambient Lighting & Mouse Spotlight Follower
  const heroSection = document.querySelector('.hero-haute-story');
  const spot1 = document.querySelector('.spot-1');
  const spot2 = document.querySelector('.spot-2');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spot1) {
        spot1.style.transform = `translate(${(x - rect.width / 2) * 0.05}px, ${(y - rect.height / 2) * 0.05}px)`;
      }
      if (spot2) {
        spot2.style.transform = `translate(${(x - rect.width / 2) * -0.04}px, ${(y - rect.height / 2) * -0.04}px)`;
      }
    });

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 700) {
        if (spot1) spot1.style.transform = `translateY(${scrollPos * 0.2}px)`;
        if (spot2) spot2.style.transform = `translateY(${scrollPos * -0.15}px)`;
      }
    }, { passive: true });
  }
});
