document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // MOBILE MENU TOGGLE
    // ======================
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    menuBtn.addEventListener('click', () => {
        const isActive = mainNav.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive);
    });

    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ======================
    // STICKY HEADER SHADOW
    // ======================
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const header = document.querySelector('header');
                header.style.boxShadow = window.scrollY > 50
                    ? '0 2px 20px rgba(0, 0, 0, 0.1)'
                    : '0 2px 10px rgba(0, 0, 0, 0.05)';
                ticking = false;
            });
            ticking = true;
        }
    });

    // ======================
    // DARK MODE TOGGLE
    // ======================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
        themeIcon.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
        localStorage.setItem('theme', newTheme);
    });

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const isDark = e.matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
            themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        }
    });

// ======================
// PROJECT MODAL SYSTEM
// ======================
const modal = document.getElementById('project-modal');
const modalBody = document.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-btn'); // Correct selector for the close button

// Project details
const projects = [
  {
    title: "Student Management System",
    image: "pp/2463ce69-86ec-4d91-a77b-896de515af8d.jpg",
    description: "A database application to manage student records...",
    features: [
      "Secure login system",
      "Student profile management",
      "Grade tracking",
      "Attendance monitoring",
      "Customizable dashboard"
    ],
    tags: ["MySQL", "Java", "Swing"]
  },
  {
    title: "E-commerce Website",
    image: "pp/Picture1.png",
    description: "A fully functional e-commerce platform with product listings, shopping cart, and secure checkout process.",
    features: [
      "User registration system",
      "Product catalog management",
      "Shopping cart functionality",
      "Secure payment processing",
      "Order history tracking"
    ],
    tags: ["SQL Server", "C#"]
  },
  {
    title: "RevWord: Reverse Word Guessing Game",
    image: "pp/mbapp.png",
    description: "An Android game where players guess words from their reversed form. Includes scoring, timer, retry mechanics, and settings.",
    features: [
      "Multiple difficulty levels",
      "Score tracking system",
      "Countdown timer",
      "Second chance mechanics",
      "Customizable game settings"
    ],
    tags: ["Android Studio", "Java", "XML"]
  }
];

// Attach modal open events
document.querySelectorAll('.project-card .btn:not(#github-btn)').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const project = projects[index];

    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="modal-image">
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-description">${project.description}</p>
      <div class="modal-features">
        <h4>Key Features:</h4>
        <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="modal-tags">
        ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
      </div>
    `;

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal when clicking "X"
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
});

// Close when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
});
});
