// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

// Create observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Trigger counter animations for spec cards
      if (entry.target.classList.contains("spec-card")) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all animated elements
window.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .slide-up, " +
      ".float-in, .reveal-scale, .clip-reveal",
  );

  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
});

// ===================================
// PARALLAX SCROLLING EFFECTS
// ===================================

let ticking = false;

function handleParallax() {
  const scrolled = window.scrollY;

  // Hero parallax
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    const parallaxSpeed = 0.5;
    heroImage.style.transform = `scale(1.1) translateY(${scrolled * parallaxSpeed}px)`;
  }

  // Other parallax elements
  const parallaxElements = document.querySelectorAll(".parallax-element");
  parallaxElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const scrollProgress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

    if (scrollProgress > 0 && scrollProgress < 1) {
      const movement = (scrollProgress - 0.5) * 50;
      element.style.transform = `translateY(${movement}px)`;
    }
  });

  // Interior section zoom effect
  const interiorSection = document.querySelector(".interior-section");
  const zoomElement = document.querySelector(".zoom-on-scroll");

  if (interiorSection && zoomElement) {
    const rect = interiorSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight && rect.bottom > 0) {
      zoomElement.classList.add("zooming");
    } else {
      zoomElement.classList.remove("zooming");
    }
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// ===================================
// COUNTER ANIMATIONS
// ===================================

function animateCounter(card) {
  const valueElement = card.querySelector(".spec-value");
  if (!valueElement || valueElement.dataset.animated) return;

  const target = parseFloat(valueElement.dataset.target);
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  const stepDuration = duration / steps;

  let current = 0;
  const isDecimal = target % 1 !== 0;

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      valueElement.textContent = isDecimal
        ? target.toFixed(1)
        : Math.round(target);
      clearInterval(counter);
      valueElement.dataset.animated = "true";
    } else {
      valueElement.textContent = isDecimal
        ? current.toFixed(1)
        : Math.round(current);
    }
  }, stepDuration);
}

// ===================================
// SMOOTH SCROLL FUNCTION
// ===================================

function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.offsetTop;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1200;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out)
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ===================================
// IMAGE LAZY LOADING ENHANCEMENT
// ===================================

// Add loading states for images
window.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.5s ease";
    });

    img.style.opacity = "0";
  });
});

// ===================================
// TOUCH GESTURES FOR MOBILE GALLERY
// ===================================

let touchStartX = 0;
let touchEndX = 0;

const gallery = document.querySelector(".gallery-grid");

if (gallery && window.innerWidth <= 768) {
  gallery.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  gallery.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGallerySwipe();
    },
    { passive: true },
  );
}

function handleGallerySwipe() {
  const swipeThreshold = 50;
  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) > swipeThreshold) {
    if (difference > 0) {
      // Swipe left - could be used for gallery navigation
      console.log("Swiped left on gallery");
    } else {
      // Swipe right
      console.log("Swiped right on gallery");
    }
  }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
const handleResize = debounce(() => {
  // Recalculate positions or reset animations if needed
  console.log("Window resized");
}, 250);

window.addEventListener("resize", handleResize);

// ===================================
// SCROLL PROGRESS INDICATOR (Optional Enhancement)
// ===================================

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // You can add a progress bar element if desired
  // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener("scroll", debounce(updateScrollProgress, 10));

// ===================================
// INITIAL PAGE LOAD ANIMATION
// ===================================

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease";
});

// ===================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ===================================

// Add keyboard navigation for CTA button
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctaButton.click();
    }
  });
}

// ===================================
// PRELOAD CRITICAL IMAGES
// ===================================

window.addEventListener("DOMContentLoaded", () => {
  const heroImg = document.querySelector(".hero-image");
  if (heroImg && heroImg.complete) {
    heroImg.style.opacity = "1";
  }
});

// ===================================
// CONSOLE STATEMENT (Development)
// ===================================

console.log(
  "%c The S-Class - Excellence Refined ",
  "background: #000; color: #fff; font-size: 16px; font-weight: bold; padding: 10px;",
);
console.log(
  "%c Powered by Mercedes-Benz Premium Experience ",
  "background: #C0C0C0; color: #000; font-size: 12px; padding: 5px;",
);
