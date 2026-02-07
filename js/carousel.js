// YouTube Video Carousel with Loading States and Enhanced Error Handling
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const prevButton = document.querySelector('.carousel-arrow-left');
    const nextButton = document.querySelector('.carousel-arrow-right');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let players = [];
    let apiReady = false;
    let retryAttempts = 0;
    const maxRetries = 3;

    // Disable navigation until API is ready
    if (prevButton) prevButton.disabled = true;
    if (nextButton) nextButton.disabled = true;

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube players when API is ready
    window.onYouTubeIframeAPIReady = function() {
        slides.forEach((slide, index) => {
            const iframe = slide.querySelector('iframe');
            if (iframe) {
                const videoId = iframe.src.match(/embed\/([^?]+)/)[1];
                const playerDiv = document.createElement('div');
                playerDiv.id = `player-${index}`;
                iframe.parentNode.replaceChild(playerDiv, iframe);
                
                try {
                    players[index] = new YT.Player(`player-${index}`, {
                        videoId: videoId,
                        width: '100%',
                        height: '100%',
                        playerVars: {
                            'modestbranding': 1,
                            'rel': 0
                        },
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                } catch (error) {
                    console.error('Error creating YouTube player:', error);
                }
            }
        });
        apiReady = true;
        
        // Enable navigation once API is ready
        if (prevButton) prevButton.disabled = false;
        if (nextButton) nextButton.disabled = false;
    };

    // Player ready callback
    function onPlayerReady(event) {
        // Optional: Auto-play first video or other setup
        // event.target.playVideo();
    }

    // Pause all videos with retry logic
    function pauseAllVideos() {
        if (!apiReady) {
            // If API not ready, retry after delay
            if (retryAttempts < maxRetries) {
                retryAttempts++;
                setTimeout(pauseAllVideos, 100);
            }
            return;
        }
        
        retryAttempts = 0; // Reset retry counter
        
        players.forEach((player, index) => {
            if (player && player.pauseVideo) {
                try {
                    player.pauseVideo();
                } catch (e) {
                    console.warn(`Could not pause player ${index}:`, e);
                }
            }
        });
    }

    // Update carousel to show specific slide
    function updateCarousel(index) {
        pauseAllVideos();
        
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Next slide
    function nextSlide(event) {
        event.preventDefault();
        event.stopPropagation();
        
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(currentSlide);
        
        return false;
    }

    // Previous slide
    function prevSlide(event) {
        event.preventDefault();
        event.stopPropagation();
        
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(currentSlide);
        
        return false;
    }

    // Event listeners for arrows
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide, true);
        nextButton.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide, true);
        prevButton.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSlide = index;
            updateCarousel(currentSlide);
        }, true);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide(e);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide(e);
        }
    });

    // Set initial slide on page load
    updateCarousel(currentSlide);
});
