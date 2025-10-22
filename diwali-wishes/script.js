// Modal logic
const modal = document.getElementById('name-modal');
const mainContent = document.getElementById('main-content');
const greeting = document.getElementById('greeting');
const wishes = document.getElementById('wishes');
const usernameInput = document.getElementById('username');
const submitBtn = document.getElementById('submit-name');

submitBtn.addEventListener('click', showWishes);
usernameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') showWishes();
});

function showWishes() {
    const name = usernameInput.value.trim();
    if (!name) {
        usernameInput.focus();
        return;
    }
    modal.style.display = 'none';
    mainContent.classList.remove('hidden');
    greeting.textContent = `Happy Diwali, ${name}!`;
    // Array of random good wishes
    const wishesList = [
        'May your life be as colorful, shimmering, and magical as the Diwali lights!',
        'Wishing you a festival full of sweet memories, fun, and laughter!',
        'May the festival of lights brighten every corner of your world!',
        'May your home be filled with happiness and prosperity!',
        'Wishing you success, health, and endless joy this Diwali!',
        'May the divine light of Diwali bring peace and harmony to your life!',
        'May your dreams come true and your days be filled with light!',
        'Wishing you and your family a sparkling Diwali and a prosperous New Year!',
        'May the beauty of Diwali fill your heart with joy and love!',
        'Let this Diwali burn all your bad times and enter you in good times!'
    ];
    const randomWish = wishesList[Math.floor(Math.random() * wishesList.length)];
    wishes.textContent = randomWish;
    startFireworks();
}

// Fireworks animation
function randomColor() {
    const colors = ['#ffec00', '#ff0080', '#00ffe7', '#ff6f00', '#00ff00', '#ff0000', '#00aaff', '#fffbe7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let fireworks = [];
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function Firework() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = 150 + Math.random() * (canvas.height / 2 - 150);
        this.color = randomColor();
        this.speed = 6 + Math.random() * 2;
        this.exploded = false;
    }
    Firework.prototype.update = function() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.exploded = true;
                explode(this.x, this.y, this.color);
            }
        }
    };
    Firework.prototype.draw = function() {
        if (!this.exploded) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
        }
    };

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 2 + Math.random() * 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = 2 + Math.random() * 4;
        this.alpha = 1;
        this.decay = 0.01 + Math.random() * 0.015;
    }
    Particle.prototype.update = function() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + 0.5; // gravity
        this.speed *= 0.98;
        this.alpha -= this.decay;
    };
    Particle.prototype.draw = function() {
        if (this.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
        }
    };

    function explode(x, y, color) {
        for (let i = 0; i < 40 + Math.random() * 20; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.07) {
            fireworks.push(new Firework());
        }
        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.exploded) fireworks.splice(i, 1);
        });
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();
}
