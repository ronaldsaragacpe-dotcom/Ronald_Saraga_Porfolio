// Professional Portfolio JavaScript - Mobile First
document.addEventListener('DOMContentLoaded', function() {
  initPortfolio();
});

function initPortfolio() {
  initMobileMenu();
  initSmoothScrolling();
  initContactForm();
  initDownloadCV();
  initScrollAnimations();
}

// ==============================
// MOBILE MENU FUNCTION
// ==============================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (menuToggle && navMenu) {
    // Toggle sidebar on button click
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update icon
      const icon = menuToggle.querySelector('i');
      icon.className = navMenu.classList.contains('active')
        ? 'ri-close-line'
        : 'ri-menu-line';
        
      // Toggle body scroll lock
      document.body.classList.toggle('menu-open');
    });

    // Close sidebar on link click (mobile only)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) { // Only on mobile
          navMenu.classList.remove('active');
          menuToggle.querySelector('i').className = 'ri-menu-line';
          document.body.classList.remove('menu-open');
        }
      });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 768 && 
          navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').className = 'ri-menu-line';
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').className = 'ri-menu-line';
        document.body.classList.remove('menu-open');
      }
    });

    // Reset menu on window resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 768) {
          // Reset mobile menu state on desktop
          navMenu.classList.remove('active');
          if (menuToggle.querySelector('i')) {
            menuToggle.querySelector('i').className = 'ri-menu-line';
          }
          document.body.classList.remove('menu-open');
        }
      }, 100);
    });
  }
}




document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const icon = menuToggle.querySelector("i");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");         // show/hide sidebar
      document.body.classList.toggle("menu-open"); // prevent scroll

      // Toggle icon class
      if (icon.classList.contains("ri-menu-line")) {
        icon.classList.remove("ri-menu-line");
        icon.classList.add("ri-close-line");
      } else {
        icon.classList.remove("ri-close-line");
        icon.classList.add("ri-menu-line");
      }
    });

    // Close sidebar when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
          icon.classList.remove("ri-close-line");
          icon.classList.add("ri-menu-line"); // revert to hamburger
        }
      });
    });
  }
});




// ==============================
// SMOOTH SCROLLING
// ==============================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==============================
// SCROLL ANIMATIONS
// ==============================
function initScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .repository-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  const elements = document.querySelectorAll('.skill-category, .project-card, .repository-card');
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  animateOnScroll();
}

// ==============================
// CONTACT FORM
// ==============================
document.addEventListener('DOMContentLoaded', initContactForm);

function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Validation
    if (!data.name || !data.email || !data.message) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Loading state
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
    submitBtn.disabled = true;

    // REAL Formspree submission
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showMessage("Message sent successfully! I'll get back to you soon.", 'success');
        contactForm.reset();
      } else {
        showMessage('Something went wrong. Please try again.', 'error');
      }
    })
    .catch(() => {
      showMessage('Network error. Please try again later.', 'error');
    })
    .finally(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });
}

function showMessage(text, type) {
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  const message = document.createElement('div');
  message.className = `form-message ${type}`;
  message.innerHTML = `
    <i class="ri-${type === 'success' ? 'checkbox-circle' : 'error-warning'}-line"></i>
    <span>${text}</span>
  `;

  if (!document.querySelector('#form-message-styles')) {
    const style = document.createElement('style');
    style.id = 'form-message-styles';
    style.textContent = `
      .form-message {
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
      }
      .form-message.success {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        color: #10b981;
      }
      .form-message.error {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
    `;
    document.head.appendChild(style);
  }

  const form = document.querySelector('.contact-form');
  form.insertBefore(message, form.firstChild);

  setTimeout(() => message.remove(), 5000);
}


// ==============================
// DOWNLOAD CV
// ==============================
function initDownloadCV() {
  const cvBtn = document.querySelector('.cv-btn');

  if (!cvBtn) return;

  cvBtn.addEventListener('click', function(e) {
    e.preventDefault(); // prevent the default # jump

    showMessage('CV download started', 'success');

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'RONALD_SARAGA.pdf'; // PDF path relative to index.html
      link.download = 'RONALD_SARAGA.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  });
}

// Call it when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initDownloadCV();
});


// ==============================
// INITIALIZE EVERYTHING
// ==============================
initPortfolio();

// Fix for mobile viewport height
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('load', setViewportHeight);
setViewportHeight();