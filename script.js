// CURTAIN FUNCTIONALITY - Add this at the beginning of your script.js
const curtainOverlay = document.getElementById('curtainOverlay');
const mainContent = document.getElementById('mainContent');
const openBtn = document.getElementById('openCurtainBtn');
const music = document.getElementById('bgMusic');

function openCurtain() {
    // Add open class to trigger curtain animation
    curtainOverlay.classList.add('open');

    // Show main content after curtain starts opening
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 800);

    // Hide curtain overlay completely after animation
    setTimeout(() => {
        curtainOverlay.style.display = 'none';
    }, 1800);

    // Start background music
    if (music) {
        music.volume = 0.5;
        music.loop = true;
        music.play().catch(e => console.log("Audio play requires user interaction"));
    }
}

// Open curtain on button click
if (openBtn) {
    openBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openCurtain();
    });
}

// Also open on click anywhere on curtain (optional)
if (curtainOverlay) {
    curtainOverlay.addEventListener('click', function(e) {
        // Don't open if clicking on the button (button has its own handler)
        if (e.target === openBtn || (openBtn && openBtn.contains(e.target))) {
            return;
        }
        openCurtain();
    });
}

// Set the wedding date and time
const weddingDate = new Date("August 20, 2026 12:00:00").getTime();

// Function to update countdown display
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const countdownContainer = document.getElementById("countdown");

    if (distance < 0) {
        if (countdownContainer) {
            countdownContainer.innerHTML = `
                <div class="countdown-unit" style="background:#f4d1ce;">
                    <div class="countdown-number">✨</div>
                    <div class="countdown-label">Happily Ever After</div>
                </div>
            `;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="countdown-unit">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-unit">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-unit">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-unit">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const fadeElements = document.querySelectorAll('.detail-card, .countdown-card, .hero-content, .parent-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

fadeElements.forEach(el => {
    observer.observe(el);
});

// Remove the old music autoplay code since it's now handled in curtain function
// Keep only this for fallback
function enableAudioOnInteraction() {
    if (music && music.paused && !curtainOverlay.style.display === 'none') {
        music.play().catch(e => console.log("Audio play requires user interaction"));
    }
    document.removeEventListener('click', enableAudioOnInteraction);
    document.removeEventListener('touchstart', enableAudioOnInteraction);
}

// Only add fallback if music hasn't started
if (music && !curtainOverlay.style.display === 'none') {
    document.addEventListener('click', enableAudioOnInteraction);
    document.addEventListener('touchstart', enableAudioOnInteraction);
}

console.log("💖 Wedding Invitation Loaded | Khadeeja & Hamdan | August 20, 2026");