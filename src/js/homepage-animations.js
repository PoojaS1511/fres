/**
 * Homepage animations and effects
 * This file contains JavaScript to enhance the homepage with animations and interactive effects
 */

// Initialize animations when the module is imported
const initAnimations = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Function to set up all animations
  const setupAnimations = () => {
    // Navbar scroll effect - changes navbar appearance when scrolling down
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Add scroll reveal animation to elements with .scroll-reveal class
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add('active');
    };

    const hideScrollElement = (element) => {
      element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });

    // Initialize scroll animations
    handleScrollAnimation();
  };

  // If DOM is already loaded, set up animations immediately
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupAnimations();
  } else {
    // Otherwise wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', setupAnimations);
  }
};

// Run the initialization
initAnimations();

// Export for explicit imports
export default initAnimations;
