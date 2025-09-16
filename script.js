// Enhanced Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality with enhanced touch support
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const html = document.documentElement;
    const body = document.body;

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
        let isMenuOpen = false;
        let touchStartX = 0;
        let touchStartY = 0;

        const toggleMenu = (open) => {
            isMenuOpen = open;
            
            if (open) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                body.classList.add('no-scroll');
                
                // Add touch event listeners for swipe to close
                document.addEventListener('touchstart', handleTouchStart, { passive: true });
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
                
                // Add click outside listener with small delay to prevent immediate close
                setTimeout(() => {
                    document.addEventListener('click', handleOutsideClick, true);
                }, 10);
                
                // Add keyboard event listener for escape key
                document.addEventListener('keydown', handleEscapeKey);
                
                // Focus management for better accessibility
                mobileMenu.setAttribute('aria-hidden', 'false');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
                
                // Focus on first focusable element when menu opens
                const firstFocusable = mobileMenu.querySelector('a, button, [tabindex="0"]');
                if (firstFocusable) firstFocusable.focus();
                
            } else {
                // Close menu
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                body.classList.remove('no-scroll');
                
                // Remove event listeners
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('click', handleOutsideClick, true);
                document.removeEventListener('keydown', handleEscapeKey);
                
                // Update ARIA attributes
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                
                // Return focus to menu button when menu closes
                mobileMenuButton.focus();
            }
        };

        // Handle touch start for swipe gestures
        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        // Handle touch move for swipe gestures
        const handleTouchMove = (e) => {
            if (!isMenuOpen) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = Math.abs(touchStartY - touchY);
            
            // If horizontal swipe is more significant than vertical swipe
            if (deltaX > 50 && deltaY < 100) {
                // Prevent scrolling when swiping to close
                e.preventDefault();
                toggleMenu(false);
            }
        };

        // Handle clicks outside the menu
        const handleOutsideClick = (e) => {
            if (isMenuOpen && !mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu(false);
            }
        };

        // Handle escape key press
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
                toggleMenu(false);
            }
        };

        // Toggle menu on button click
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(!isMenuOpen);
        });

        // Close menu when clicking on a menu link
        const menuLinks = mobileMenu.querySelectorAll('a, button');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu on window resize (desktop breakpoint)
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                toggleMenu(false);
            }
        };

        // Use passive event listeners for better performance
        const passiveOptions = { passive: true };
        window.addEventListener('resize', handleResize, passiveOptions);
        
        // Initialize ARIA attributes
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.setAttribute('role', 'dialog');
        mobileMenu.setAttribute('aria-modal', 'true');
        
        // Clean up event listeners when the page is unloaded
        window.addEventListener('beforeunload', () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('click', handleOutsideClick, true);
            document.removeEventListener('keydown', handleEscapeKey);
            window.removeEventListener('resize', handleResize);
        });
    }

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Form validation helper
function validateForm(form) {
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        const isEmpty = !input.value.trim();
        const isEmailInvalid = input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        
        if (isEmpty || isEmailInvalid) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Legal modal functionality
function setupLegalModal() {
    const modal = document.getElementById('legalModal');
    if (!modal) return;

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
    };

    // Close buttons
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Open modal handlers
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-open-modal');
            const modalContent = document.getElementById('legalContent');
            const title = document.getElementById('legalTitle');
            
            if (!modalContent || !title) return;
            
            // Set content based on type
            const content = {
                'terms': {
                    title: 'Terms of Service',
                    content: `
                        <h3 class="text-xl font-bold mb-4">1. Terms</h3>
                        <p class="mb-4">By accessing this website, you agree to be bound by these terms of service.</p>
                        <h3 class="text-xl font-bold mb-4">2. Use License</h3>
                        <p class="mb-4">Permission is granted to temporarily download materials for personal, non-commercial use only.</p>
                    `
                },
                'privacy': {
                    title: 'Privacy Policy',
                    content: `
                        <h3 class="text-xl font-bold mb-4">1. Information Collection</h3>
                        <p class="mb-4">We collect information that you provide directly to us.</p>
                    `
                },
                'refund': {
                    title: 'Refund Policy',
                    content: `
                        <h3 class="text-xl font-bold mb-4">1. Refund Eligibility</h3>
                        <p class="mb-4">Refunds are available within 30 days of purchase.</p>
                    `
                }
            }[type] || { title: 'Legal Information', content: 'Content not available.' };
            
            title.textContent = content.title;
            modalContent.innerHTML = content.content;
            
            // Show modal
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        });
    });
}

// Initialize legal modal when DOM is loaded
document.addEventListener('DOMContentLoaded', setupLegalModal);

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('legalModal');
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('legalModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
});