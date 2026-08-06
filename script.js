// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 4. Scroll Animation with Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 5. Experience Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const expCards = document.querySelectorAll('.exp-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            expCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Allow display block to apply before animating opacity
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Wait for transition to finish before hiding
                    setTimeout(() => {
                        if (!card.style.opacity || card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // 6. Contact Form Submission (Simulated)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            
            // Simulate sending message
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Mengirim...';
            lucide.createIcons();
            
            setTimeout(() => {
                alert(`Terima kasih, ${name}! Pesan Anda telah berhasil dikirim.`);
                contactForm.reset();
                btn.innerHTML = originalText;
                lucide.createIcons();
            }, 1500);
        });
    }
});
