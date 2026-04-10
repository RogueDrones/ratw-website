document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const prevButton = document.querySelector('.carousel-arrow-left');
    const nextButton = document.querySelector('.carousel-arrow-right');

    if (!track || slides.length === 0 || indicators.length === 0 || !prevButton || !nextButton) {
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    function stopInactiveVideos(activeIndex) {
        slides.forEach((slide, index) => {
            const iframe = slide.querySelector('iframe');
            if (!iframe) {
                return;
            }

            const videoSrc = iframe.dataset.videoSrc || iframe.getAttribute('src');
            if (!videoSrc) {
                return;
            }

            iframe.dataset.videoSrc = videoSrc;

            if (index === activeIndex) {
                if (iframe.getAttribute('src') !== videoSrc) {
                    iframe.setAttribute('src', videoSrc);
                }
                return;
            }

            if (iframe.getAttribute('src')) {
                iframe.removeAttribute('src');
            }
        });
    }

    function updateCarousel(index) {
        currentSlide = index;
        stopInactiveVideos(index);

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === index);
        });

        indicators.forEach((indicator, indicatorIndex) => {
            indicator.classList.toggle('active', indicatorIndex === index);
        });

        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide(event) {
        event.preventDefault();
        event.stopPropagation();
        updateCarousel((currentSlide + 1) % totalSlides);
    }

    function prevSlide(event) {
        event.preventDefault();
        event.stopPropagation();
        updateCarousel((currentSlide - 1 + totalSlides) % totalSlides);
    }

    nextButton.addEventListener('click', nextSlide, true);
    prevButton.addEventListener('click', prevSlide, true);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            updateCarousel(index);
        }, true);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            prevSlide(event);
        }

        if (event.key === 'ArrowRight') {
            nextSlide(event);
        }
    });

    updateCarousel(currentSlide);
});
