const services = [
  { number: '01', title: 'Strategy', text: 'Audience, positioning, and growth planning.' },
  { number: '02', title: 'Content', text: 'Web copy, email, landing pages, and brand storytelling.' },
  { number: '03', title: 'Campaigns', text: 'Optimization, targeting, and performance focused execution.' },
  { number: '04', title: 'Growth', text: 'Retention, engagement, and steady momentum building.' }
];

const projects = [
  {
    id: 'brand-lift',
    label: 'Campaign',
    title: 'Brand Lift',
    text: 'Strategy and content direction for stronger audience engagement.',
    className: 'visual-one'
  },
  {
    id: 'seo-system',
    label: 'Content',
    title: 'SEO System',
    text: 'Organic reach supported by clearer messaging and performance copy.',
    className: 'visual-two'
  },
  {
    id: 'launch-flow',
    label: 'Funnel',
    title: 'Launch Flow',
    text: 'Landing pages and email systems designed to convert attention.',
    className: 'visual-three'
  }
];

const projectDetails = {
  'brand-lift': {
    title: 'Brand Lift',
    category: 'Campaign strategy',
    intro: 'A focused campaign system that gave a growing brand a clearer voice and stronger audience connection.',
    challenge: 'The brand had a strong offer, but its message shifted across channels. Visitors could not quickly understand what made it different or what to do next.',
    approach: 'We clarified the audience and positioning, then shaped one consistent campaign story across the landing page, social content, and email follow-up.',
    outcome: 'The result was a more recognizable message, stronger engagement, and a simpler route from first impression to inquiry.',
    metrics: [ ['Engagement lift', '+64%'], ['Landing page clicks', '+48%'], ['Message consistency', 'Across 4 channels'] ],
    visual: 'visual-one'
  },
  'seo-system': {
    title: 'SEO System',
    category: 'Content strategy',
    intro: 'An organic content framework built around real search intent and a distinct brand point of view.',
    challenge: 'Useful articles existed, but they were disconnected from one another and did not consistently guide readers toward the brand’s services.',
    approach: 'We organized topics into clear content clusters, aligned each page with search intent, and improved internal paths between education and conversion.',
    outcome: 'The new system made publishing more consistent and helped readers find relevant answers while discovering the brand’s expertise.',
    metrics: [ ['Organic traffic', '+118%'], ['New top-10 pages', '14'], ['Search click-through', '+27%'] ],
    visual: 'visual-two'
  },
  'launch-flow': {
    title: 'Launch Flow',
    category: 'Launch funnel',
    intro: 'A launch journey designed to take interested visitors from the first announcement to a confident next step.',
    challenge: 'The launch had multiple touchpoints, but the pages and follow-up emails did not feel like one connected experience.',
    approach: 'We mapped the audience journey, tightened the landing-page hierarchy, and aligned email messages with the questions people had at each stage.',
    outcome: 'The launch became easier to follow, sales conversations started with better-informed leads, and the team gained a repeatable campaign structure.',
    metrics: [ ['Qualified inquiries', '+39%'], ['Lead quality', '+52%'], ['Journey', '4 connected steps'] ],
    visual: 'visual-three'
  }
};

const testimonials = [
  {
    quote: 'The work felt strategic, polished, and deeply aligned with our goals. We saw stronger engagement almost immediately.',
    author: 'Maya R., Founder'
  },
  {
    quote: 'From campaign planning to copywriting, the process was thoughtful and conversion-focused without feeling salesy.',
    author: 'Daniel K., Marketing Lead'
  }
];

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');
const themeToggles = document.querySelectorAll('[data-theme-toggle]');

const setTheme = (theme, persist = true) => {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;

  themeToggles.forEach((toggle) => {
    toggle.textContent = nextTheme === 'dark' ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} mode`);
  });

  if (persist) {
    try {
      localStorage.setItem('alish-theme', nextTheme);
    } catch (error) {
      // Theme still applies for the current page when storage is unavailable.
    }
  }
};

let initialTheme = 'dark';
try {
  initialTheme = localStorage.getItem('alish-theme') || initialTheme;
} catch (error) {
  initialTheme = 'dark';
}
setTheme(initialTheme, false);

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const renderServices = () => {
  const container = document.getElementById('services-list');
  if (!container) return;

  container.innerHTML = services
    .map(
      (service, index) => `
        <article class="service-card reveal service-visual" style="animation-delay:${index * 120}ms">
          <span class="service-icon">${service.number}</span>
          <h3>${service.title}</h3>
          <p>${service.text}</p>
        </article>
      `
    )
    .join('');
};

const renderProjects = () => {
  const container = document.getElementById('work-list');
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal project-visual-card" style="animation-delay:${index * 150}ms">
            <a class="project-link" href="project.html?id=${project.id}" aria-label="View ${project.title} case study">
              <div class="project-visual ${project.className}" aria-hidden="true"></div>
              <div class="project-body">
                <span class="mini-label">${project.label}</span>
                <h3>${project.title}</h3>
                <p>${project.text}</p>
                <span class="project-cta">View case study <span aria-hidden="true">↗</span></span>
              </div>
            </a>
        </article>
      `
    )
    .join('');
};

const renderTestimonials = () => {
  const container = document.getElementById('testimonials-list');
  if (!container) return;

  container.innerHTML = testimonials
    .map(
      (item, index) => `
        <blockquote class="reveal" style="animation-delay:${index * 150}ms">
          “${item.quote}”
          <footer>— ${item.author}</footer>
        </blockquote>
      `
    )
    .join('');
};

const renderProjectDetail = () => {
  const page = document.querySelector('[data-project-detail]');
  if (!page) return;

  const projectId = new URLSearchParams(window.location.search).get('id');
  const project = projectDetails[projectId] || projectDetails['brand-lift'];

  document.title = `${project.title} Case Study | Alish`;
  page.querySelector('[data-project-category]').textContent = project.category;
  page.querySelector('[data-project-title]').textContent = project.title;
  page.querySelector('[data-project-intro]').textContent = project.intro;
  page.querySelector('[data-project-challenge]').textContent = project.challenge;
  page.querySelector('[data-project-approach]').textContent = project.approach;
  page.querySelector('[data-project-outcome]').textContent = project.outcome;
  page.querySelector('[data-project-visual]').classList.add(project.visual);
  page.querySelector('[data-project-metrics]').innerHTML = project.metrics
    .map(([label, value]) => `<article class="detail-metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join('');
};

const observeReveals = () => {
  const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
  if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
};

if (menuToggle && mainNav) {
  const setMenuOpen = (isOpen, restoreFocus = false) => {
    mainNav.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    if (isOpen) {
      mainNav.querySelector('a')?.focus();
    } else if (restoreFocus) {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });
}

renderServices();
renderProjects();
renderTestimonials();
renderProjectDetail();
observeReveals();
