// Scroll Progress Bar
window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (scrollTop / docHeight) * 100;
    document.querySelector(".progress").style.width = progress + "%";
});

// Reveal Animation
function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        let top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", reveal);

// 3D Shoe Rotation
const shoe = document.getElementById("shoe");
const container = document.querySelector(".shoe-container");

container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 20;
    const rotateY = (x - rect.width / 2) / 20;

    shoe.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener("mouseleave", () => {
    shoe.style.transform = "rotateX(0) rotateY(0)";
});

const images = [
    "shoe.jpg",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1584735175315-9d5df23be620"
];

let currentIndex = 0;

function autoChange() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    shoe.style.opacity = 0;

    setTimeout(() => {
        shoe.src = images[currentIndex];
        shoe.style.opacity = 1;
    }, 300);
}

setInterval(autoChange, 3000);

document.querySelectorAll(".color").forEach(btn => {
    btn.addEventListener("click", () => {
        const img = btn.getAttribute("data-img");

        shoe.style.opacity = 0;

        setTimeout(() => {
            shoe.src = img;
            shoe.style.opacity = 1;
        }, 300);
    });
});

// Particle Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});