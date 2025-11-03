// Navbar Hide/Show on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('navbar--hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('navbar--hidden')) {
        // Scrolling down
        navbar.classList.add('navbar--hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('navbar--hidden')) {
        // Scrolling up
        navbar.classList.remove('navbar--hidden');
    }
    
    lastScroll = currentScroll;
});

// Animated Text Logic
function setupAnimatedText() {
    const titles = ["Sponsorshop", "Marketing", "Consulting", "Technology", "Media Rights"];
    let currentIndex = 0;
    const textElement = document.getElementById('animated-text');

    function updateText() {
        textElement.classList.remove('active');
        
        setTimeout(() => {
            textElement.textContent = titles[currentIndex];
            textElement.classList.add('active');
            currentIndex = (currentIndex + 1) % titles.length;
        }, 500);
    }

    // Initial text
    textElement.textContent = titles[0];
    textElement.classList.add('active');

    // Start animation cycle
    setInterval(updateText, 2000);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAnimatedText();
});

// Smooth Scroll für alle Anker-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterText = document.querySelector('.typewriter-text');
    const texts = [
        { text: "We are the", highlight: "future", end: "of sports" },
        { text: "Shaping", highlight: "tomorrow's", end: "champions" },
        { text: "Join the", highlight: "revolution", end: "" }
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentPhase = 'text'; // 'text', 'highlight', or 'end'

    function type() {
        const currentTextObj = texts[textIndex];
        const fullText = currentTextObj.text + " " + currentTextObj.highlight + " " + currentTextObj.end;

        if (!isDeleting) {
            if (charIndex < fullText.length) {
                // Bestimme die aktuelle Position im Text
                let currentPosition = charIndex;
                let beforeHighlight = currentTextObj.text.length;
                let highlightEnd = beforeHighlight + currentTextObj.highlight.length + 1;

                if (currentPosition === beforeHighlight) {
                    // Füge Leerzeichen hinzu
                    typewriterText.innerHTML += " ";
                } else if (currentPosition > beforeHighlight && currentPosition <= highlightEnd) {
                    // Füge hervorgehobenen Text hinzu
                    if (currentPosition === beforeHighlight + 1) {
                        typewriterText.innerHTML += `<span class="highlight">${fullText.charAt(charIndex)}</span>`;
                    } else {
                        let highlightSpan = typewriterText.querySelector('.highlight');
                        highlightSpan.textContent += fullText.charAt(charIndex);
                    }
                } else {
                    // Füge normalen Text hinzu
                    typewriterText.innerHTML += fullText.charAt(charIndex);
                }
                charIndex++;
                setTimeout(type, 100);
            } else {
                isDeleting = true;
                setTimeout(type, 2000);
            }
        } else {
            if (charIndex > 0) {
                typewriterText.innerHTML = fullText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
    }

    type();
});



