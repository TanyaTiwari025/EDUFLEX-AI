let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    slides[currentSlide].classList.remove('active'); // Hide current slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length; // Update current slide
    slides[currentSlide].classList.add('active'); // Show new slide
}
