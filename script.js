// Current layer tracking
let currentLayer = 1;
const totalLayers = 7;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    setupNoButton();
});

// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💝', '❤️', '💘', '💜', '🩷'];
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 500);
    }
    
    // Continue creating hearts
    setInterval(() => {
        createHeart(container, hearts);
    }, 1000);
}

function createHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'floating-bg-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Navigate to next layer
function nextLayer() {
    const current = document.getElementById('layer' + currentLayer);
    currentLayer++;
    const next = document.getElementById('layer' + currentLayer);
    
    if (current && next) {
        current.classList.remove('active');
        setTimeout(() => {
            next.classList.add('active');
        }, 400);
    }
}

// Handle quiz answer selection
function selectAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');
    
    if (isCorrect) {
        button.classList.add('correct');
    }
    
    // Auto advance after a short delay
    setTimeout(() => {
        nextLayer();
    }, 1000);
}

// Setup the "No" button behavior - it runs away!
function setupNoButton() {
    const noBtn = document.getElementById('noBtn');
    let clickCount = 0;
    
    noBtn.addEventListener('mouseover', function() {
        moveNoButton();
    });
    
    noBtn.addEventListener('click', function() {
        clickCount++;
        if (clickCount < 3) {
            moveNoButton();
            showMessage(clickCount);
        } else {
            // After 3 attempts, just say yes
            sayYes();
        }
    });
    
    // For touch devices
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const letter = noBtn.closest('.letter');
    const letterRect = letter.getBoundingClientRect();
    
    // Random position within the letter area
    const maxX = letterRect.width - noBtn.offsetWidth - 20;
    const maxY = letterRect.height - noBtn.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.2s ease';
    
    // Change text based on attempts
    const texts = ["No? 🥺", "Please? 💔", "Pretty please? 😢", "🥹"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    noBtn.textContent = randomText;
}

function showMessage(count) {
    const messages = [
        "Are you sure? 🥺",
        "Think again! 💕",
        "Okay, I'll take that as a yes! 😊"
    ];
    
    // Could add toast notifications here
    console.log(messages[count - 1]);
}

// Yes button clicked - celebration time!
function sayYes() {
    const current = document.getElementById('layer6');
    const celebration = document.getElementById('layer7');
    
    current.classList.remove('active');
    setTimeout(() => {
        celebration.classList.add('active');
        createConfetti();
        playHeartExplosion();
    }, 400);
}

// Create confetti celebration
function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#ff4081', '#ff6090', '#e91e63', '#f8bbd9', '#fce4ec', '#ff80ab', '#f50057', '#c51162'];
    const shapes = ['❤️', '💕', '💖', '💗', '✨', '🎉', '💐', '🌹'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Mix of shapes and colored squares
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }, i * 50);
    }
    
    // Continue confetti for a while
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                container.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 6000);
            }, i * 100);
        }
    }, 3000);
}

// Heart explosion effect
function playHeartExplosion() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💝'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-bg-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 10000);
        }, i * 100);
    }
}

// Add some magic sparkle cursor effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) { // Only occasionally
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '15px';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleOut 1s forwards';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleOut {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
