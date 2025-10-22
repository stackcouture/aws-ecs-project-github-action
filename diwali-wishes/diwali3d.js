// 3D Diwali Crackers and Blasts using Three.js
let scene, camera, renderer, crackerGroup = [], blastParticles = [];

function initDiwali3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize3D);
    animate3D();
    // Increase cracker frequency for more vibrant effect
    setInterval(launchCracker, 500);
    // Launch a few crackers immediately for instant effect
    for (let i = 0; i < 4; i++) launchCracker();
}

function onWindowResize3D() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function launchCracker() {
    // Vibrant cracker body
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
    // Vibrant color palette
    const vibrantColors = [
        0xffec00, 0xff0080, 0x00ffe7, 0xff6f00, 0x00ff00, 0xff0000, 0x00aaff, 0xfffbe7, 0xffffff, 0xffb6c1, 0xadd8e6
    ];
    const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.85 });
    const cracker = new THREE.Mesh(geometry, material);
    // Launch from random X across the full width, and random Z for depth
    const aspect = window.innerWidth / window.innerHeight;
    cracker.position.x = (Math.random() - 0.5) * 60 * aspect;
    cracker.position.y = -18 + Math.random() * 6; // randomize Y start a bit
    cracker.position.z = (Math.random() - 0.5) * 30;
    cracker.userData = {
        speed: 0.4 + Math.random() * 0.3,
        exploded: false,
        targetY: 5 + Math.random() * 18, // allow higher blasts
        color: color
    };
    scene.add(cracker);
    crackerGroup.push(cracker);
}

function createBlast(x, y, z, color) {
    // Even more vibrant, multi-color, sparkly blast
    const sparkColors = [
        0xffec00, 0xff0080, 0x00ffe7, 0xff6f00, 0x00ff00, 0xff0000, 0x00aaff, 0xfffbe7, 0xffffff, 0xffb6c1, 0xadd8e6,
        0x00ffea, 0xffe600, 0xff00e6, 0x00e6ff, 0xe600ff, 0x00e600
    ];
    // Occasionally make a very big blast
    const isBigBlast = Math.random() < 0.25;
    const numParticles = isBigBlast ? 220 : 90;
    const blastRadius = isBigBlast ? 3.5 : 1.7;
    for (let i = 0; i < numParticles; i++) {
        const geometry = new THREE.SphereGeometry(0.15 + Math.random()*0.09, 12, 12);
        // Random color for each spark
        const sparkColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        const material = new THREE.MeshStandardMaterial({ color: sparkColor, emissive: sparkColor, emissiveIntensity: 1 });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(x, y, z);
        const angle = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const speed = blastRadius + Math.random() * (isBigBlast ? 2.5 : 1.7);
        particle.userData = {
            vx: Math.sin(phi) * Math.cos(angle) * speed,
            vy: Math.cos(phi) * speed,
            vz: Math.sin(phi) * Math.sin(angle) * speed,
            life: (isBigBlast ? 3.2 : 2.1) + Math.random() * (isBigBlast ? 1.8 : 1.2)
        };
        scene.add(particle);
        blastParticles.push(particle);
    }
    // Occasionally add a smiley face to the blast
    if (Math.random() < 0.5) {
        addSmileyBlast(x, y, z, isBigBlast ? 2.5 : 1.1);
    }
}

// Add a smiley face made of yellow spheres
function addSmileyBlast(x, y, z, radius) {
    const yellow = 0xffec00;
    // Face outline (circle)
    for (let i = 0; i < 24; i++) {
        const theta = (i / 24) * 2 * Math.PI;
        const px = x + Math.cos(theta) * radius;
        const py = y + Math.sin(theta) * radius;
        const geometry = new THREE.SphereGeometry(0.18, 10, 10);
        const material = new THREE.MeshStandardMaterial({ color: yellow, emissive: yellow, emissiveIntensity: 1 });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(px, py, z);
        particle.userData = {
            vx: (px - x) * 0.04,
            vy: (py - y) * 0.04,
            vz: 0,
            life: 2.5 + Math.random() * 1.2
        };
        scene.add(particle);
        blastParticles.push(particle);
    }
    // Eyes
    for (let i = 0; i < 2; i++) {
        const ex = x + (i === 0 ? -radius * 0.4 : radius * 0.4);
        const ey = y + radius * 0.4;
        const geometry = new THREE.SphereGeometry(0.13, 10, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0x222222, emissiveIntensity: 0.7 });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(ex, ey, z + 0.1);
        particle.userData = {
            vx: (ex - x) * 0.04,
            vy: (ey - y) * 0.04,
            vz: 0,
            life: 2.5 + Math.random() * 1.2
        };
        scene.add(particle);
        blastParticles.push(particle);
    }
    // Smile (arc)
    for (let i = 0; i < 12; i++) {
        const theta = Math.PI * (0.25 + 0.5 * (i / 11));
        const px = x + Math.cos(theta) * radius * 0.55;
        const py = y - Math.sin(theta) * radius * 0.55 * 0.7;
        const geometry = new THREE.SphereGeometry(0.11, 10, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0x222222, emissiveIntensity: 0.7 });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(px, py, z + 0.1);
        particle.userData = {
            vx: (px - x) * 0.04,
            vy: (py - y) * 0.04,
            vz: 0,
            life: 2.5 + Math.random() * 1.2
        };
        scene.add(particle);
        blastParticles.push(particle);
    }
}

function animate3D() {
    // Animate crackers
    for (let i = crackerGroup.length - 1; i >= 0; i--) {
        const cracker = crackerGroup[i];
        if (!cracker.userData.exploded) {
            cracker.position.y += cracker.userData.speed;
            if (cracker.position.y >= cracker.userData.targetY) {
                cracker.userData.exploded = true;
                createBlast(cracker.position.x, cracker.position.y, cracker.position.z, cracker.userData.color);
                scene.remove(cracker);
                crackerGroup.splice(i, 1);
            }
        }
    }
    // Animate blast particles
    for (let i = blastParticles.length - 1; i >= 0; i--) {
        const p = blastParticles[i];
        p.position.x += p.userData.vx;
        p.position.y += p.userData.vy;
        p.position.z += p.userData.vz;
        p.userData.vy -= 0.01; // gravity
        p.userData.life -= 0.02;
        p.material.opacity = Math.max(0, p.userData.life);
        p.material.transparent = true;
        if (p.userData.life <= 0) {
            scene.remove(p);
            blastParticles.splice(i, 1);
        }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate3D);
}

// Lighting
const light1 = new THREE.PointLight(0xffffff, 1, 100);
light1.position.set(0, 20, 20);
const light2 = new THREE.AmbientLight(0xffffff, 0.7);

if (typeof THREE !== 'undefined') {
    scene && scene.add(light1);
    scene && scene.add(light2);
}

// Expose init function
document.addEventListener('DOMContentLoaded', function() {
    if (typeof THREE !== 'undefined') {
        initDiwali3D();
    }
});
