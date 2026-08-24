document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const screenPassword = document.getElementById('screen-password');
    const screenGift = document.getElementById('screen-gift');
    const screenMenu = document.getElementById('screen-menu');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const passwordCard = document.querySelector('.password-card');
    const giftBox = document.getElementById('gift-box');
    
    // Audio Player
    const bgMusic = document.getElementById('bg-music');
    const btnPlayPause = document.getElementById('btn-play-pause');

    // 1. Password Screen Logic
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passwordInput.value.trim() === "26082009") {
            errorMessage.textContent = "";
            passwordCard.classList.add('card-glow-success');
            spawnFlowerBurst();
            setTimeout(() => {
                screenPassword.classList.remove('active');
                screenGift.classList.add('active');
            }, 1200);
        } else {
            passwordCard.classList.add('shake');
            errorMessage.textContent = "Password Salah";
            passwordInput.value = "";
            setTimeout(() => passwordCard.classList.remove('shake'), 500);
        }
    });

    // 2. Gift Box Screen Logic
    let giftOpened = false;
    giftBox.addEventListener('click', () => {
        if (giftOpened) return;
        giftOpened = true;
        giftBox.classList.add('gift-opening');
        spawnGiftBurst();
        setTimeout(() => {
            screenGift.classList.remove('active');
            screenMenu.classList.add('active');
        }, 1600);
    });

    // Navigation Handler (Menu Grid -> Sub Screens)
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            screenMenu.classList.remove('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Back Buttons Handler
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-back');
            btn.closest('.screen').classList.remove('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 3. Render 17 Polaroid Photos
    const gallery = document.getElementById('gallery');
    for (let i = 1; i <= 17; i++) {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        const randomRot = (Math.random() * 8 - 4).toFixed(1);
        polaroid.style.setProperty('--r', randomRot);
        polaroid.innerHTML = `<img src="assets/photo${i}.jpg" alt="Memory ${i}" onerror="this.src='https://via.placeholder.com/150/f472b6/ffffff?text=Putri+Photo+${i}'">`;
        
        polaroid.addEventListener('click', () => {
            document.getElementById('modal-img').src = polaroid.querySelector('img').src;
            document.getElementById('modal-caption').textContent = `Momen Indah #${i} Bersamamu ✨`;
            document.getElementById('photo-modal').classList.add('active');
        });
        gallery.appendChild(polaroid);
    }

    document.querySelector('.btn-close-modal').addEventListener('click', () => {
        document.getElementById('photo-modal').classList.remove('active');
    });

    // 4. Envelope Letter Typing Animation
    const envelope = document.getElementById('envelope');
    const typedText = document.getElementById('typed-text');
    const message = "Selamat ulang tahun yang ke-17, Putri tercinta. Terima kasih sudah selalu mengisi hari-hariku dengan tawa dan kebahagiaan. Aku berharap di usiamu yang baru ini, kamu semakin bahagia, sehat, dan semua cita-citamu tercapai. Aku akan selalu ada mendukungmu. I Love You!";
    let isTyped = false;

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        if (!isTyped) {
            isTyped = true;
            let index = 0;
            function typeNextChar() {
                if (index < message.length) {
                    typedText.textContent += message.charAt(index);
                    index++;
                    setTimeout(typeNextChar, 35);
                }
            }
            setTimeout(typeNextChar, 400);
        }
    });

    // 5. Interactive Cake Screen
    const cakeBox = document.getElementById('cake-box');
    const flame = document.getElementById('flame');
    const cakeStatusText = document.getElementById('cake-status-text');
    let cakeStep = 0;

    cakeBox.addEventListener('click', () => {
        if (cakeStep === 0) {
            flame.style.display = 'none';
            cakeStatusText.textContent = "Lilin padam! Ketuk cake untuk memakannya ✨";
            cakeStep = 1;
        } else if (cakeStep === 1) {
            document.getElementById('cake-top').style.opacity = '0.4';
            cakeStatusText.textContent = "Nyam! Sekali lagi...";
            cakeStep = 2;
        } else if (cakeStep === 2) {
            document.getElementById('svg-cake').style.opacity = '0';
            cakeStatusText.textContent = "Cake habis! Bersiap meluncur ke luar angkasa...";
            setTimeout(() => {
                document.getElementById('screen-cake').classList.remove('active');
                document.getElementById('screen-saturn').classList.add('active');
            }, 1500);
        }
    });

    // 6. Saturn Drag Logic & Music Player
    const saturn = document.getElementById('saturn-planet');
    let isDragging = false, startX, currentRot = 0;

    saturn.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });
    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        currentRot += deltaX * 0.5;
        saturn.style.transform = `rotate(${currentRot}deg)`;
        startX = e.clientX;
    });
    window.addEventListener('pointerup', () => isDragging = false);

    btnPlayPause.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            btnPlayPause.textContent = "Pause";
        } else {
            bgMusic.pause();
            btnPlayPause.textContent = "Play";
        }
    });

    document.getElementById('btn-to-thanks').addEventListener('click', () => {
        document.getElementById('screen-saturn').classList.remove('active');
        document.getElementById('screen-thanks').classList.add('active');
    });

    // WhatsApp Redirect
    document.getElementById('btn-whatsapp').addEventListener('click', () => {
        const msg = encodeURIComponent("Makasih ya Haikal hadiah ulang tahunnya, aku terharu banget! ❤️");
        window.open(`https://wa.me/6283832331077?text=${msg}`, '_blank');
    });

    // Helper Animation Functions
    function spawnFlowerBurst() {
        const container = document.getElementById('particle-container');
        for (let i = 0; i < 20; i++) {
            const flower = document.createElement('div');
            flower.innerHTML = `<svg viewBox="0 0 50 50" width="30" height="30"><circle cx="25" cy="25" r="7" fill="#fde047" /><circle cx="25" cy="12" r="8" fill="#f472b6"/><circle cx="25" cy="38" r="8" fill="#f472b6"/><circle cx="12" cy="25" r="8" fill="#f472b6"/><circle cx="38" cy="25" r="8" fill="#f472b6"/></svg>`;
            flower.style.cssText = `position: fixed; bottom: -40px; left: ${Math.random() * 100}vw; z-index: 99; pointer-events: none; animation: flowerRise 2s ease-out forwards;`;
            container.appendChild(flower);
            setTimeout(() => flower.remove(), 2000);
        }
    }

    function spawnGiftBurst() {
        const container = document.getElementById('particle-container');
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.style.cssText = `position: fixed; top: 50%; left: 50%; width: 8px; height: 8px; background: #ffffff; border-radius: 50%; z-index: 100; pointer-events: none; transition: transform 1s ease, opacity 1s ease;`;
            container.appendChild(p);
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 200 + 50;
            requestAnimationFrame(() => {
                p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`;
                p.style.opacity = '0';
            });
            setTimeout(() => p.remove(), 1000);
        }
    }
});
