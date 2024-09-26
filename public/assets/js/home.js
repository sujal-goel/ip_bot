document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate');

    const checkScroll = () => {
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) { // 100 pixels from the bottom
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check in case elements are already in view
  });