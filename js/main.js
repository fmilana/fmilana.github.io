document.addEventListener('DOMContentLoaded', function () {
    // Load Bootstrap JS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);

    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarBrand = document.querySelector('.navbar-brand');

    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0; // Index of the currently displayed image

    let touchStartX = 0;
    let touchEndX = 0;

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

        // Attach event listeners to buttons
        carousel.querySelector('.carousel-button.next').addEventListener('click', nextImage);
        carousel.querySelector('.carousel-button.prev').addEventListener('click', prevImage);

        // Initialize the first image and dot
        showImage(currentIndex);
    }

    // Initialize all carousels on the page
    document.querySelectorAll('.carousel').forEach(initCarousel);

    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
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

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });   
    
});
