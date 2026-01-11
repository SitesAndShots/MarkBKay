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

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send data to Formspree
        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show thank you message
                this.innerHTML = '<p style="color:green;font-weight:bold;">Thank you! Your message has been sent.</p>';
            } else {
                // Show error message
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('There was a problem sending your message. Please try again.');
            }
        })
        .catch(error => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('There was a problem sending your message. Please try again.');
        });
    });
}
        
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
document.addEventListener('DOMContentLoaded', function() {
    const projectViewBtns = document.querySelectorAll('.project-view-btn');
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalContent = document.querySelector('.modal-content');

    // Project data
    const projects = {
        1: {
            title: 'Discrete Low-Noise Amplifier (LNA) Design and Characterization',
            description: `
                <p>Designed, simulated, built, and tested a low-noise amplifier using discrete transistors (BJTs/MOSFETs). Simulated in LTspice, then built on PCB. Measured noise, gain, and bandwidth with lab equipment.</p>
                <ul>
                    <li><strong>Simulation:</strong> Biasing, frequency response, and noise analysis in LTspice.</li>
                    <li><strong>Build:</strong> PCB layout in KiCad, soldering, and assembly.</li>
                    <li><strong>Test:</strong> Measured gain and noise with oscilloscope and signal generator.</li>
                </ul>
                <p><strong>What I learned:</strong> Analog fundamentals, practical noise sources, and measurement techniques.</p>
            `,
            technologies: ['LTspice', 'KiCad', 'PCB', 'Oscilloscope'],
            image: 'images/lna.jpg'
        },
        2: {
            title: 'Bandgap Reference Circuit (Simulation & PCB)',
            description: `
                <p>Designed and simulated a temperature-independent bandgap voltage reference. (Optional: Built a discrete version on PCB.)</p>
                <ul>
                    <li><strong>Simulation:</strong> Bandgap reference theory, temperature compensation, and PVT analysis in LTspice.</li>
                    <li><strong>Build:</strong> Discrete implementation on PCB to demonstrate temperature stability.</li>
                </ul>
                <p><strong>What I learned:</strong> Core analog IC building blocks, temperature effects, and layout considerations.</p>
            `,
            technologies: ['LTspice', 'KiCad', 'PCB', 'Temperature Compensation'],
            image: 'images/bandgap.jpg'
        },
        3: {
            title: 'Analog Sensor Interface Board with Signal Conditioning',
            description: `
                <p>Designed a PCB to interface analog sensors (e.g., thermistor, photodiode, or microphone) to a microcontroller, including op-amp signal conditioning.</p>
                <ul>
                    <li><strong>Design:</strong> Analog front-end with op-amp buffer/amplifier and filter.</li>
                    <li><strong>Build:</strong> PCB layout, soldering, and assembly.</li>
                    <li><strong>Test:</strong> Validated sensor readings and signal integrity with lab measurements.</li>
                </ul>
                <p><strong>What I learned:</strong> Real-world analog design, noise reduction, and microcontroller interfacing.</p>
            `,
            technologies: ['KiCad', 'Op-Amp', 'Microcontroller', 'Signal Conditioning'],
            image: 'images/sensor-interface.jpg'
        }
    };

    // Open modal and load project details
    projectViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            if (project) {
                modalContent.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:10px;margin-bottom:1rem;">
                    <h2 style="color:#2563eb;">${project.title}</h2>
                    ${project.description}
                    <strong>Technologies Used:</strong>
                    <div style="margin-bottom:1rem;">
                        ${project.technologies.map(tech => `<span class="tech-tag" style="margin-right:0.5rem;">${tech}</span>`).join('')}
                    </div>
                `;
                projectModal.classList.add('active');
            } else {
                modalContent.innerHTML = "<p>Project details not found.</p>";
                projectModal.classList.add('active');
            }
        });
    });

    // Close modal
    modalCloseBtn.addEventListener('click', function() {
        projectModal.classList.remove('active');
        modalContent.innerHTML = '';
    });
    projectModal.addEventListener('click', function(e) {
        if (e.target === this) {
            projectModal.classList.remove('active');
            modalContent.innerHTML = '';
        }
    });
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
