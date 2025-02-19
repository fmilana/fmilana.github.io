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
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isAtBottom = (windowHeight + scrollPosition) >= documentHeight - 50;

        // First, remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('data-active');
        });

        // If we're at the bottom, only highlight the last section
        if (isAtBottom) {
            const lastSection = sections[sections.length - 1];
            const lastSectionLink = document.querySelector(`a[href="#${lastSection.getAttribute('id')}"]`);
            if (lastSectionLink) {
                lastSectionLink.classList.add('active');
                lastSectionLink.setAttribute('data-active', 'true');
            }
            return;
        }

        // Otherwise, check each section normally
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                correspondingLink?.classList.add('active');
                correspondingLink?.setAttribute('data-active', 'true');
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

    // Handle mobile menu
    const menuButton = document.querySelector('.navbar-toggler');
    const body = document.body;

    menuButton.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                menuButton.click();  // Close the menu
            }
        });
    });

    // Handle navbar background on mobile
    function updateNavbarBackground() {
        if (window.innerWidth <= 768) {  // Only on mobile
            if (window.scrollY > 50) {  // When scrolled
                navbar.style.backgroundColor = 'var(--bg-dark)';
                navbar.style.transition = 'background-color 0.3s ease';
            } else {  // At top
                navbar.style.backgroundColor = 'transparent';
                navbar.style.transition = 'background-color 0.3s ease';
            }
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateNavbarBackground);
    window.addEventListener('resize', updateNavbarBackground);

    // Initial call
    updateNavbarBackground();
});