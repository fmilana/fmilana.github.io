document.addEventListener('DOMContentLoaded', function () {
    // Load Bootstrap JS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);

    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarBrand = document.querySelector('.navbar-brand');

    // Scroll to top when clicking navbar name
    navbarBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navbarCollapse.classList.remove('show');
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
            targetContent.classList.add('active'); // Add active class to the target content

            // Scroll to top of the target content
            const navabarHeight = navbar.offsetHeight;
            const targetPosition = targetContent.offsetTop - navabarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });

    // Carousel functionality
    function initCarousel(carousel) {
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;

        function showImage(index) {
            images.forEach(image => image.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            images[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            const minSwipeDistance = 50;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }
        }

        // Touch events for this carousel
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        // Attach event listeners to buttons
        carousel.querySelector('.carousel-button.next').addEventListener('click', nextImage);
        carousel.querySelector('.carousel-button.prev').addEventListener('click', prevImage);

        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Initialize the first image and dot
        showImage(currentIndex);
    }

    // Initialize all carousels on the page
    document.querySelectorAll('.carousel').forEach(initCarousel);

    // Toggle other projects section
    const btn = document.getElementById('toggle-other-projects');
    const target = document.getElementById('other-projects');
    if (!btn || !target) return;

    // Wait until Bootstrap is available
    const initWhenReady = () => {
        if (!window.bootstrap || !window.bootstrap.Collapse) return false;

        const cs = new bootstrap.Collapse(target, { toggle: false });
        btn.addEventListener('click', () => cs.toggle());

        const icon = document.getElementById('toggle-icon');
        const text = document.getElementById('toggle-text');

        // helper: scroll the toggle button to the top (account for mobile navbar height)
        const scrollToggleIntoView = () => {
            const isMobile = window.innerWidth < 768;          // your mobile breakpoint
            const offset = isMobile ? navbar.offsetHeight : 0; // sticky top bar height
            const y = btn.getBoundingClientRect().top + window.pageYOffset - offset - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
        };

        // when it opens, scroll so the button sits right under the navbar
        target.addEventListener('shown.bs.collapse', () => {
            text.textContent = 'Hide other projects';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            btn.setAttribute('aria-expanded', 'true');
            scrollToggleIntoView();
        });

        // optional: when it closes, keep the button visible too
        target.addEventListener('hidden.bs.collapse', () => {
            text.textContent = 'Show other projects';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            btn.setAttribute('aria-expanded', 'false');
            scrollToggleIntoView();
        });

        return true;
    };

    if (!initWhenReady()) {
        const iv = setInterval(() => initWhenReady() && clearInterval(iv), 50);
        setTimeout(() => clearInterval(iv), 5000);
    }
});
