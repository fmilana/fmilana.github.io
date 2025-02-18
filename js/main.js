document.addEventListener('DOMContentLoaded', function() {
    // Add Bootstrap JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);

    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbarHeight = 76;
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarBrand = document.querySelector('.navbar-brand');
    let menuOpen = false;

    // Toggle navbar when burger is clicked
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });

    // Close navbar when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Close navbar when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Add scroll to top for navbar brand
    navbarBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (menuOpen) {
            menuOpen = false;
            navbarCollapse.classList.remove('show');
        }
    });

    // Function to update active section
    function updateActiveSection() {
        const scrollPosition = window.scrollY + (window.innerHeight/2);

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                correspondingLink?.classList.add('active');
                correspondingLink?.setAttribute('data-active', 'true');
            } else {
                correspondingLink?.classList.remove('active');
                correspondingLink?.removeAttribute('data-active');
            }
        });
    }

    // Update navbar background and active section on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveSection();
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial call to set active section on page load
    updateActiveSection();
});