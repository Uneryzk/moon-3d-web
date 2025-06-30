// 🌌 Three.js Sahne Kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 💡 Işıklandırma
const directionalLight = new THREE.DirectionalLight(0xffffff, 0,5);
directionalLight.position.set(3, 0, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// 🌕 Ay dokusu ve mesh oluşturma
const loader = new THREE.TextureLoader();
loader.load('moon-texture.jpg', function (texture) {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);

    // 📝 Yazı Yükleme ve Kıvrımlı Yapı
    const fontLoader = new THREE.FontLoader();
    let textGroup = new THREE.Group();
    let textGroup2 = new THREE.Group(); // ✅ İkinci yazı grubu
    scene.add(textGroup);
    scene.add(textGroup2);

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const text = 'TO THE MOON AGENCY';
        const radius = 1.2;
        const letterSpacing = (1 * Math.PI) / (text.length * 2);

        // 🔥 1. YAZI
        for (let i = 0; i < text.length; i++) {
            const charGeometry = new THREE.TextGeometry(text[i], {
                font: font,
                size: 0.09,
                height: 0.01,
            });

            const charMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const charMesh = new THREE.Mesh(charGeometry, charMaterial);

            const angle = (text.length - 1 - i) * letterSpacing;

            charMesh.position.x = Math.cos(angle) * radius;
            charMesh.position.z = Math.sin(angle) * radius;

            charMesh.lookAt(0, 0, 0);
            charMesh.scale.x = -1;

            textGroup.add(charMesh);
        }

        // 🔥 2. YAZI (aynı kod + 180 derece offset)
        for (let i = 0; i < text.length; i++) {
            const charGeometry = new THREE.TextGeometry(text[i], {
                font: font,
                size: 0.09,
                height: 0.01,
            });

            const charMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const charMesh = new THREE.Mesh(charGeometry, charMaterial);

            // 🔥 180 derece ileri başlasın
            const angle = (text.length - 1 - i) * letterSpacing + Math.PI;

            charMesh.position.x = Math.cos(angle) * radius;
            charMesh.position.z = Math.sin(angle) * radius;

            charMesh.lookAt(0, 0, 0);
            charMesh.scale.x = -1;

            textGroup2.add(charMesh);
        }
    });

    function animate() {
        requestAnimationFrame(animate);

        moon.rotation.y += 0.00001;

        textGroup.rotation.y += 0.004;
        textGroup2.rotation.y += 0.004; // ✅ Aynı hızda dönecek

        renderer.render(scene, camera);
    }

    animate();
});

// 📱 Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
