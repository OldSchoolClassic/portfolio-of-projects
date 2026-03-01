// Buttons
const lightModeBtn = document.getElementById('light-mode');
const darkModeBtn = document.getElementById('dark-mode');
const colorModeBtn = document.getElementById('color-mode');
const portfolioTitle = document.querySelector('h1');
const portfolioTagline = document.querySelector('.header-tagline');
const body = document.body;
const projectCards = document.querySelectorAll('.project-card');

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Light Mode
lightModeBtn.addEventListener('click', () => {
  body.classList.remove('dark-mode', 'random-color-mode');
  body.style.background = '';
  body.style.color = '#333';

  portfolioTitle.style.color = '#000';
  portfolioTagline.style.color = '#555';

  projectCards.forEach(card => {
    card.style.background = '#fff';
    card.style.color = '#000';
  });
});

// Dark Mode
darkModeBtn.addEventListener('click', () => {
  body.classList.remove('random-color-mode');
  body.classList.add('dark-mode');
  body.style.background = '';
  body.style.color = '#f0f0f0';

  portfolioTitle.style.color = '#f0f0f0';
  portfolioTagline.style.color = '#f0f0f0';

  projectCards.forEach(card => {
    card.style.background = '#2a2a3c';
    card.style.color = '#f0f0f0';
  });
});

// Function to calculate brightness of a color
function getBrightness(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Random Color Mode
colorModeBtn.addEventListener('click', () => {
  body.classList.remove('dark-mode');
  body.classList.add('random-color-mode');

  const randomColor1 = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  const randomColor2 = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  body.style.background = `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;

  const averageBrightness = (getBrightness(randomColor1) + getBrightness(randomColor2)) / 2;
  const textColor = averageBrightness < 128 ? '#fff' : '#000';
  body.style.color = textColor;

  // Keep the header text black
  portfolioTitle.style.color = '#000';
  portfolioTagline.style.color = '#000';

  projectCards.forEach(card => {
    card.style.background = '#fff';
    card.style.color = '#000';
  });
});

// Tabs Functionality
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Hide all tab contents
    tabContents.forEach(content => content.classList.remove('active'));

    // Show the selected tab content
    const selectedTab = document.getElementById(btn.dataset.tab);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }
  });
});

// Ensure the initial "Projects" tab is displayed by default
document.querySelector('.tab-btn[data-tab="projects"]').classList.add('active');
document.getElementById('projects').classList.add('active');

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Get the selected category
    const category = button.dataset.category;

    // Filter project cards
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.style.position = 'relative';
      } else {
        card.style.visibility = 'hidden';
        card.style.opacity = '0';
        card.style.position = 'absolute';
      }
    });
  });
});

// Search Bar Functionality
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();

  projectCards.forEach(card => {
    const projectTitle = card.querySelector('h3').textContent.toLowerCase();
    const projectDescription = card.querySelector('p').textContent.toLowerCase();

    if (projectTitle.includes(searchTerm) || projectDescription.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Add glow effect on hover
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('glow');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('glow');
  });
});

const cursorSelect = document.getElementById('cursor-select');
let currentEffect = 'none';

// Event listener to detect dropdown changes
cursorSelect.addEventListener('change', e => {
  currentEffect = e.target.value;
});

// Utility function to throttle events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Neon Glow Trail
function neonGlowTrail(e) {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.pointerEvents = 'none';
  trail.style.width = '20px';
  trail.style.height = '20px';
  trail.style.background = 'radial-gradient(circle, #00ffea, transparent)';
  trail.style.borderRadius = '50%';
  trail.style.zIndex = '10000';
  trail.style.left = `${e.clientX - 10}px`;
  trail.style.top = `${e.clientY - 10}px`;
  trail.style.opacity = '1';
  trail.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease';

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transform = 'scale(2.5)';
  }, 50);

  setTimeout(() => {
    trail.remove();
  }, 600);
}

// Particle Burst Trail
function particleBurstTrail(e) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.borderRadius = '50%';
    particle.style.left = `${e.clientX + (Math.random() - 0.5) * 20}px`;
    particle.style.top = `${e.clientY + (Math.random() - 0.5) * 20}px`;
    particle.style.zIndex = '10000';
    particle.style.opacity = '1';
    particle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease';

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.opacity = '0';
      particle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(2)`;
    }, 50);

    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}

// Laser Trail
function laserTrail(e) {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.pointerEvents = 'none';
  trail.style.width = '3px';
  trail.style.height = '20px';
  trail.style.background = 'linear-gradient(to bottom, #ff0000, transparent)';
  trail.style.zIndex = '10000';
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.opacity = '0';
  }, 300);

  setTimeout(() => {
    trail.remove();
  }, 500);
}

// Matrix Code Trail
function matrixCodeTrail(e) {
  const trail = document.createElement('div');

  // Generate a random alphanumeric character (letters and numbers)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  trail.innerText = chars[Math.floor(Math.random() * chars.length)];

  trail.style.position = 'fixed';
  trail.style.pointerEvents = 'none';
  trail.style.color = '#00ff00';
  trail.style.fontSize = '16px';
  trail.style.zIndex = '10000';
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
  trail.style.opacity = '1';
  trail.style.transition = 'opacity 1s ease-out, transform 1s ease';

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transform = 'translateY(20px)';
  }, 300);

  setTimeout(() => {
    trail.remove();
  }, 1000);
}

// Ripple Effect Trail
function rippleEffectTrail(e) {
  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.pointerEvents = 'none';
  ripple.style.width = '30px';
  ripple.style.height = '30px';
  ripple.style.border = '2px solid rgba(0, 150, 255, 0.7)';
  ripple.style.borderRadius = '50%';
  ripple.style.zIndex = '10000';
  ripple.style.left = `${e.clientX - 15}px`;
  ripple.style.top = `${e.clientY - 15}px`;
  ripple.style.opacity = '1';
  ripple.style.transform = 'scale(0)';
  ripple.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.style.opacity = '0';
    ripple.style.transform = 'scale(3)';
  }, 50);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// Event listener for mouse movement with throttling to trigger the selected effect
document.addEventListener('mousemove', throttle(e => {
  if (currentEffect === 'neonGlow') neonGlowTrail(e);
  else if (currentEffect === 'particleBurst') particleBurstTrail(e);
  else if (currentEffect === 'laserTrail') laserTrail(e);
  else if (currentEffect === 'matrixCode') matrixCodeTrail(e);
  else if (currentEffect === 'rippleEffect') rippleEffectTrail(e);
}, 50));

// Open and Close Popup
const openPopupBtn = document.getElementById('open-popup-btn');
const closePopupBtn = document.getElementById('close-popup-btn');
const popupOverlay = document.getElementById('ai-tools-popup');

// Function to show the popup
openPopupBtn.addEventListener('click', () => {
  popupOverlay.classList.add('show');
});

// Function to hide the popup
closePopupBtn.addEventListener('click', () => {
  popupOverlay.classList.remove('show');
});

// Close popup when clicking outside the content
window.addEventListener('click', e => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('show');
  }
});
