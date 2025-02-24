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
        e.preventDefault();http://127.0.0.1:3000/index.html#page-top
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

    // Add event listeners to buttons
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });   
    
});
