// ===================================
// CUSTOM CURSOR LOGIC
// ===================================

const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

// Smooth ring movement
function animateCursor() {
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  ringX = lerp(ringX, mouseX, 0.15);
  ringY = lerp(ringY, mouseY, 0.15);

  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover states
const interactiveElements = document.querySelectorAll(
  "a, button, .gallery-item, .tag, .spec-card, .tech-card, .magnetic-btn",
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hovering");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovering");
  });
});

// ===================================
// LOADING SCREEN
// ===================================

window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const progressEl = document.getElementById("loader-progress");
  const percentageEl = document.getElementById("loader-percentage");
  const mercedesStar = document.getElementById("mercedes-star");

  let progress = 0;
  const duration = 2500; // Total loading time
  const startTime = Date.now();

  function updateProgress() {
    const elapsed = Date.now() - startTime;
    progress = Math.min((elapsed / duration) * 100, 100);

    // Update progress bar
    progressEl.style.width = progress + "%";
    percentageEl.textContent = Math.round(progress) + "%";

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      // Loading complete - trigger blink effect
      percentageEl.textContent = "Ready";

      // Add blink class to trigger eye blink animation
      mercedesStar.classList.add("blink");

      // Wait for blink animation to complete, then hide loading screen
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        document.body.style.opacity = "1";
      }, 600);
    }
  }

  // Start progress after initial light-up animation
  setTimeout(() => {
    requestAnimationFrame(updateProgress);
  }, 300);
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

function updateScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress");
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
}

window.addEventListener("scroll", updateScrollProgress);

// ===================================
// NAVIGATION
// ===================================

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Smooth scroll for nav links
document.querySelectorAll(".nav-links a, .nav-logo").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        smoothScrollTo(href.substring(1));
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    }
  });
});

// ===================================
// PARTICLE EFFECTS
// ===================================

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

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
  const duration = 2000;
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

  const targetPosition = target.offsetTop - 80;
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
// MAGNETIC BUTTON EFFECT
// ===================================

const magneticBtns = document.querySelectorAll(".magnetic-btn");

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    // Use cursor position for magnetic effect locally but keep code clean
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// ===================================
// 3D TILT EFFECT
// ===================================

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

// ===================================
// LIGHTBOX GALLERY
// ===================================

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map((item) => {
  return item.querySelector("img").src;
});

// Open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = index;
    openLightbox(galleryImages[index]);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextImage);
lightboxPrev.addEventListener("click", prevImage);

// Close lightbox on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

// ===================================
// IMAGE LAZY LOADING ENHANCEMENT
// ===================================

// Images are set to opacity: 1 in CSS by default
// No additional JavaScript needed for lazy loading fade-in

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
      nextImage();
    } else {
      prevImage();
    }
  }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

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
// INITIAL PAGE LOAD ANIMATION
// ===================================

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease";
});

// ===================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ===================================

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
// SCROLL REVEAL FOR SECTION TITLES
// ===================================

const sectionTitles = document.querySelectorAll(".section-title");

const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.5 },
);

sectionTitles.forEach((title) => {
  titleObserver.observe(title);
});

// ===================================
// DYNAMIC AMBIENT LIGHT EFFECT
// ===================================

function createAmbientGlow() {
  const heroSection = document.querySelector(".hero-section");

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    heroSection.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201, 169, 98, 0.1), transparent 50%)`;
  });
}

createAmbientGlow();

// ===================================
// CONSOLE STATEMENT (Development)
// ===================================

console.log(
  "%c The S-Class - Excellence Refined ",
  "background: linear-gradient(90deg, #9a7b3c, #c9a962); color: #000; font-size: 16px; font-weight: bold; padding: 10px;",
);
console.log(
  "%c Powered by Mercedes-Benz Premium Experience ",
  "background: #000; color: #c9a962; font-size: 12px; padding: 5px;",
);
