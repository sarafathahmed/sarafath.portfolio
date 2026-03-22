// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        localStorage.setItem('theme', 'light');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Skills Accordion
const skillHeaders = document.querySelectorAll('.skill-header');

skillHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const category = header.parentElement;
        const skillList = category.querySelector('.skill-list');
        
        // Close all other categories
        document.querySelectorAll('.skill-category').forEach(cat => {
            if (cat !== category) {
                cat.classList.remove('active');
                cat.querySelector('.skill-list').classList.remove('active');
            }
        });
        
        // Toggle current category
        category.classList.toggle('active');
        skillList.classList.toggle('active');
    });
});

// Portfolio Carousel
const projects = [
    {
        title: "Modern Website",
        description: "Website adaptable to all devices, with UI components and animated interactions.",
        image: "https://images.unsplash.com/photo-1661493818244-8737239f7e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
        title: "E-Commerce Platform",
        description: "Full-featured online store with shopping cart, payment integration, and admin panel.",
        image: "https://images.unsplash.com/photo-1661493818244-8737239f7e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
        title: "Dashboard Analytics",
        description: "Interactive dashboard with real-time data visualization and reporting tools.",
        image: "https://images.unsplash.com/photo-1661493818244-8737239f7e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    }
];

let currentProjectIndex = 0;

const portfolioImage = document.querySelector('.portfolio-image img');
const portfolioTitle = document.querySelector('.portfolio-title');
const portfolioDescription = document.querySelector('.portfolio-description');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

function updateProject(index) {
    currentProjectIndex = index;
    
    // Update content
    portfolioImage.src = projects[index].image;
    portfolioTitle.textContent = projects[index].title;
    portfolioDescription.textContent = projects[index].description;
    
    // Update dots
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    updateProject(currentProjectIndex);
});

nextBtn.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    updateProject(currentProjectIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateProject(index);
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// CTA Link Smooth Scroll
const ctaLinks = document.querySelectorAll('.cta-banner a, .home-content a');

ctaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animate skill progress bars when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}
