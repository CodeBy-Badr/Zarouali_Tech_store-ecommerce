// ===================== NAVBAR FUNCTIONALITY =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateActiveLink(link);
    });
});

// Update active link
function updateActiveLink(clickedLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Update active link based on current page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setActiveLink);

// ===================== AOS INITIALIZATION =====================
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = getAnimationName(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with aos attributes
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '0';
        element.style.animationDuration = element.getAttribute('data-aos-duration') || '0.6s';
        element.style.animationFillMode = 'forwards';
        observer.observe(element);
    });
}

function getAnimationName(element) {
    const aosType = element.getAttribute('data-aos');
    const animations = {
        'fade-up': 'slideInUp 0.6s ease-out forwards',
        'fade-left': 'slideInLeft 0.6s ease-out forwards',
        'fade-right': 'slideInRight 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'zoom-in': 'zoomIn 0.6s ease-out forwards'
    };
    return animations[aosType] || 'fadeIn 0.6s ease-out forwards';
}

// Initialize AOS on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
} else {
    initAOS();
}

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================== MODAL FOR PRODUCT DETAILS =====================
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-btn');
const openModalBtns = document.querySelectorAll('.btn-product-detail');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productName = e.target.closest('.product-card').querySelector('.product-name').textContent;
        const productPrice = e.target.closest('.product-card').querySelector('.product-price').textContent;
        const modalTitle = document.getElementById('modalProductName');
        const modalPrice = document.getElementById('modalProductPrice');
        
        if (modalTitle) modalTitle.textContent = productName;
        if (modalPrice) modalPrice.textContent = productPrice;
        
        modal?.classList.add('active');
    });
});

closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal?.classList.remove('active');
    }
});

// ===================== FORM SUBMISSION =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (name && email && message) {
            // Simulate form submission
            console.log('Form Data:', { name, email, message });
            alert('Merci pour votre message! Nous vous répondrons bientôt.');
            contactForm.reset();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
}

// ===================== SEARCH FUNCTIONALITY =====================
const searchInput = document.getElementById('searchProducts');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===================== PRODUCT FILTER =====================
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===================== SCROLL TO TOP =====================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn?.classList.add('show');
    } else {
        scrollTopBtn?.classList.remove('show');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================== COUNTER ANIMATION =====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Trigger counter animation when section is visible
if (document.querySelector('.stats-section')) {
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry);
            }
        });
    });
    observer.observe(statsSection);
}