document.addEventListener('DOMContentLoaded', function() {
    // Select navigation elements
    const navLinks = document.querySelectorAll('.nav-menu li a, .footer-links a');
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const headerHeight = header ? header.offsetHeight : 80;
    
    // Function to handle navigation clicks
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Scroll to section
        if (targetId === '#contact') {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // Add click events to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Add loaded class for transitions
    document.body.classList.add('loaded');
});
