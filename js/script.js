document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    if (preloader) {
      preloader.style.opacity = "0";
      window.setTimeout(() => { preloader.style.display = "none"; }, 400);
    }
  });

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (hamburger) {
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
    }
    if (mobileMenu) mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      document.body.classList.toggle("menu-open", isOpen);
    });
    document.querySelectorAll(".mobile-link").forEach(link => link.addEventListener("click", closeMenu));
  }

  const canvas = document.getElementById("bgCanvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: Math.min(55, Math.floor(canvas.width / 22)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
      }));
    }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = "rgba(0,242,254,0.35)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(0,242,254,${0.12 * (1 - distance / 120)})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(item => observer.observe(item));
  } else {
    reveals.forEach(item => item.classList.add("active"));
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:adilalihingoro7@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLightbox();
    });
  }
});

function openLightbox(src, caption) {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImg");
  const text = document.getElementById("lightboxCaption");
  if (!lightbox || !image) return;
  image.src = src;
  image.alt = caption || "Certificate preview";
  if (text) text.textContent = caption || "";
  lightbox.classList.add("active");
  document.body.classList.add("menu-open");
  lightbox.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.classList.remove("active");
  document.body.classList.remove("menu-open");
}
