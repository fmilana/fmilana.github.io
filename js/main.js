document.addEventListener('DOMContentLoaded', function () {
    // Load Bootstrap JS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);

    const navbar = document.getElementById('mainNav');
    const heroSection = document.querySelector('.hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarBrand = document.querySelector('.navbar-brand');

    // Scroll to top when clicking navbar name
    navbarBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navbarCollapse.classList.remove('show');
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > heroSection.offsetHeight) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Update navbar background on scroll and resize (for mobile)
    function updateNavbarBackground() {
        if (window.innerWidth <= 991) {
            navbar.style.backgroundColor = window.scrollY > 50 ? 'var(--bg-dark)' : 'transparent';
        }
    }
    window.addEventListener('scroll', updateNavbarBackground);
    window.addEventListener('resize', updateNavbarBackground);
    updateNavbarBackground();

    // Handle page switching
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all content sections
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected content
            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId + '-content');
            if (targetContent) {
                targetContent.classList.add('active'); // Add active class to the target content
            }
        });
    });
});
