// script.js
gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
// Added safe checks to ensure null variables don't halt execution
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay using animate for smoothness
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Hover Effects for Links/Buttons
    const hovers = document.querySelectorAll('a, .btn, .hamburger');
    if (hovers.length > 0) {
        hovers.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
}

// --- Dynamic Particle Background ---
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        particles = [];

        const numParticles = Math.floor((width * height) / 15000); // Responsive particle count

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                baseAlpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${p.baseAlpha})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateParticles();
}

// --- Navbar Scroll Effect ---
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Typewriter Effect ---
const words = ["A Backend Developer.", "A Frontend Developer.", "An Automation Tester.", "A Problem Solver."];
let i = 0;
let timer;

function typingEffect() {
    let typeWriterEl = document.getElementById('typewriter');
    if (!typeWriterEl) return;
    
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            typeWriterEl.innerHTML += word.shift();
        } else {
            deletingEffect();
            return false;
        }
        timer = setTimeout(loopTyping, 120);
    };
    loopTyping();
}

function deletingEffect() {
    let typeWriterEl = document.getElementById('typewriter');
    if (!typeWriterEl) return;

    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            typeWriterEl.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 60);
    };
    setTimeout(loopDeleting, 2000); // wait before deleting
}

if (document.getElementById('typewriter')) {
    setTimeout(typingEffect, 1000); // Initial start
}

// --- GSAP Animations ---

// Hero load animation
if (document.querySelector(".navbar")) {
    var tl = gsap.timeline();
    tl.fromTo(".navbar", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".greeting", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
      .fromTo(".name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".hero-visual", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.2")
      .fromTo(".scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
}

// Section Headings Reveal
if (document.querySelectorAll('.gsap-rev').length > 0) {
    gsap.utils.toArray('.gsap-rev').forEach(title => {
        gsap.fromTo(title, 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    });
}

if (document.querySelectorAll('.section-heading .line').length > 0) {
    gsap.utils.toArray('.section-heading .line').forEach(line => {
        gsap.fromTo(line, 
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            {
                scrollTrigger: {
                    trigger: line,
                    start: "top 85%"
                },
                opacity: 1,
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                clearProps: "transform" // Clean up safely
            }
        );
    });
}

// About section items
if (document.querySelector(".about-container")) {
    gsap.fromTo(".gsap-left", 
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-container",
                start: "top 80%"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".gsap-right", 
        { x: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-container",
                start: "top 80%"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
        }
    );
}

// Projects Reveal Stagger
const projectsGrid = document.querySelector(".projects-grid");
if (projectsGrid && document.querySelectorAll(".proj-anim").length > 0) {
    gsap.fromTo(".proj-anim", 
        { y: 50, opacity: 0 }, 
        {
            scrollTrigger: {
                trigger: projectsGrid,
                start: "top 85%"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all" // Cleans up inline properties like opacity/transform after completion
        }
    );
}

// Contact Reveal
const contactContent = document.querySelector(".contact-content");
if (contactContent) {
    gsap.fromTo(".gsap-up", 
        { y: 40, opacity: 0 },
        {
            scrollTrigger: {
                trigger: contactContent,
                start: "top 85%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );
}

// --- Mobile Navbar Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

}
