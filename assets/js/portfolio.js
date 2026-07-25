"use strict";

/*==================================================
    LENIS SMOOTH SCROLL
==================================================*/
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1.2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/*==================================================
    GSAP TEXT REVEAL ON SCROLL
==================================================*/
const revealTexts = document.querySelectorAll('.reveal-text');

revealTexts.forEach((element) => {
    gsap.fromTo(element, 
        { opacity: 0, y: 100 }, 
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

/*==================================================
    HOVER REVEAL IMAGE LOGIC (The "Works" Section)
==================================================*/
const workItems = document.querySelectorAll('.work-item');
const hoverImg = document.querySelector('.hover-reveal-img');

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(hoverImg, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power2.out"
    });
});

workItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        const imgSrc = item.getAttribute('data-image');
        hoverImg.style.backgroundImage = `url(${imgSrc})`;
        
        gsap.to(hoverImg, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(hoverImg, {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

/*==================================================
    INTRO TEXT WORD-BY-WORD REVEAL & PROFILE
==================================================*/
const introText = document.querySelector('.intro-text');

if (introText) {
    const words = introText.innerText.split(' ');
    introText.innerHTML = ''; 
    
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        introText.appendChild(span);
    });

    gsap.to('.intro-text span', {
        scrollTrigger: {
            trigger: '.intro-section',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1
        },
        opacity: 1,
        stagger: 0.1,
        ease: "none"
    });

    gsap.to('.intro-profile', {
        scrollTrigger: {
            trigger: '.intro-section',
            start: 'top 60%',
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
}

/*==================================================
    TEMPLATE-STYLE ENTRANCE ANIMATION (Single Declaration)
==================================================*/
const entranceTimeline = gsap.timeline();

document.body.style.overflow = "hidden";

entranceTimeline
    .to('.intro-loader', {
        opacity: 1,
        duration: 0.8
    })
    .to('.intro-loader', {
        yPercent: -100, 
        duration: 1.2,
        ease: "power4.inOut"
    }, "+=0.3") 
    .from('.hero-title', {
        y: 100, 
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1.0")
    .from('.hero-portrait', {
        y: 80, 
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.9") 
    .from(['.hero-bottom-left', '.hero-bottom-right'], {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        onComplete: () => {
            document.body.style.overflow = "visible";
        }
    }, "-=0.7");

/*==================================================
    INTERACTIVE CUSTOM CURSOR LOGIC
==================================================*/
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
});

const interactives = document.querySelectorAll('.work-item, .service-pill');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-state');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-state');
    });
});