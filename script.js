// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const bars = document.querySelectorAll('.menu-bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const bars = document.querySelectorAll('.menu-bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // In a real implementation, you would use fetch() to send data to a server
            console.log('Form submitted with data:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Project modal functionality
const projectViewBtns = document.querySelectorAll('.project-view-btn');
const projectModal = document.getElementById('projectModal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalContent = document.querySelector('.modal-content');

// Project data
const projects = {
    1: {
        title: 'Advanced Circuit Design',
        description: 'Custom PCB design with integrated microcontroller and sensor array for environmental monitoring. This project involved designing a multi-layer PCB with temperature, humidity, and air quality sensors, along with wireless communication capabilities.',
        details: 'The system features real-time data collection and transmission to a cloud dashboard. Key challenges included managing power consumption and ensuring reliable sensor readings in various environmental conditions.',
        technologies: ['KiCad', 'Proteus', 'Soldering', 'ESP32', 'C++'],
        image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
    },
    2: {
        title: 'Control Systems Simulation',
        description: 'MATLAB-based simulation of industrial control systems with real-time monitoring capabilities. This project simulated a PID controller for temperature regulation in an industrial furnace.',
        details: 'The simulation included system modeling, controller design, and performance analysis under various disturbance conditions. Results showed a 15% improvement in temperature stability compared to traditional control methods.',
        technologies: ['MATLAB', 'LTSpice', 'SolidWorks', 'Simulink', 'Control Theory'],
        image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    }
};

// Open modal with project details
projectViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
            modalContent.innerHTML = `
                <div class="modal-project">
                    <img src="${project.image}" alt="${project.title}" class="modal-image" onerror="this.src='https://placehold.co/800x400.png?text=Image+Unavailable'">
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-description">${project.description}</p>
                    <div class="modal-details">
                        <h3>Project Details</h3>
                        <p>${project.details}</p>
                    </div>
                    <div class="modal-tech">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-project {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .modal-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .modal-title {
        font-size: 2rem;
        color: #2563eb;
        margin-bottom: 0.5rem;
    }
    
    .modal-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
    }
    
    .modal-details h3, .modal-tech h3 {
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        color: #333;
    }
    
    .modal-details p {
        color: #666;
        line-height: 1.6;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .modal-project .tech-tag {
        background: #2563eb;
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = '#fff';
        nav.style.backdropFilter = 'none';
    }
});

// Image error handling (fallback for existing onerror attributes)
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        if (!this.src.includes('placehold.co')) {
            this.src = 'https://placehold.co/800x600.png?text=Image+Unavailable';
        }
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation to hero
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
});