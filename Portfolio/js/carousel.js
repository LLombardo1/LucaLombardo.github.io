document.addEventListener('DOMContentLoaded', () => {
  // Select elements
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(document.querySelectorAll('.carousel-indicator'));
  
  // Set initial slide
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Set initial active states
  function updateCarousel() {
    // Update slide visibility
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('current-slide');
      } else {
        slide.classList.remove('current-slide');
      }
    });
    
    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('current-slide');
      } else {
        dot.classList.remove('current-slide');
      }
    });
    
    // Update button states
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slideCount - 1;
  }
  
  // Move to next slide
  function nextSlide() {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
      updateCarousel();
    }
  }
  
  // Move to previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  }
  
  // Go to specific slide
  function goToSlide(index) {
    if (index >= 0 && index < slideCount) {
      currentSlide = index;
      updateCarousel();
    }
  }
  
  // Event listeners
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to trigger slide change
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > swipeThreshold) {
      prevSlide();
    } else if (swipeDistance < -swipeThreshold) {
      nextSlide();
    }
  }
  
  // Initialize carousel
  updateCarousel();
});
