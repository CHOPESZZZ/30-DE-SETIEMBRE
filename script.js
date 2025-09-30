document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('reveal-button');
    const title = document.getElementById('main-title');
    const finalMessage = document.getElementById('final-message');
    const canvas = document.getElementById('constellation-canvas');
    const ctx = canvas.getContext('2d');
    const shootingStarsContainer = document.querySelector('.shooting-stars-container');
    const brilliantStarsContainer = document.getElementById('brilliant-stars');
    const nightSky = document.getElementById('night-sky');

    function createBrilliantStars(count) { for (let i = 0; i < count; i++) { const star = document.createElement('div'); star.classList.add('brilliant-star'); const size = Math.random() * 2 + 1; star.style.width = `${size}px`; star.style.height = `${size}px`; star.style.top = `${Math.random() * 100}%`; star.style.left = `${Math.random() * 100}%`; star.style.animationDelay = `${Math.random() * 4}s`; star.style.animationDuration = `${Math.random() * 2 + 3}s`; brilliantStarsContainer.appendChild(star); } }
    function createShootingStar() { const star = document.createElement('div'); star.classList.add('shooting-star'); const startX = Math.random() * window.innerWidth; const startY = Math.random() * window.innerHeight; const angle = Math.random() * 360; const distance = Math.random() * 200 + 200; const endX = startX + distance * Math.cos(angle * Math.PI / 180); const endY = startY + distance * Math.sin(angle * Math.PI / 180); star.style.setProperty('--transform-start', `translate(${startX}px, ${startY}px) rotate(${angle}deg)`); star.style.setProperty('--transform-end', `translate(${endX}px, ${endY}px) rotate(${angle}deg)`); shootingStarsContainer.appendChild(star); setTimeout(() => star.remove(), 2000); }
    function createBackgroundHeartConstellation() { const constellation = document.createElement('div'); constellation.classList.add('heart-constellation'); for (let i = 0; i < 8; i++) { constellation.appendChild(document.createElement('div')).classList.add('star'); } const size = Math.random() * 40 + 40; constellation.style.width = `${size}px`; constellation.style.height = `${size}px`; constellation.style.top = `${Math.random() * 80}%`; constellation.style.left = `${Math.random() * 80}%`; constellation.style.animationDuration = `${Math.random() * 4 + 5}s`; nightSky.appendChild(constellation); setTimeout(() => constellation.remove(), 9000); }

    createBrilliantStars(100);
    setInterval(createShootingStar, 250);
    button.addEventListener('click', () => {
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.display = 'none';
            button.style.display = 'none';
            drawHeartConstellation();
            const heartInterval = setInterval(createBackgroundHeartConstellation, 2000);
            setTimeout(() => clearInterval(heartInterval), 15000);
        }, 1500);
    });

    function drawHeartConstellation() {
        const width = 450, height = 350;
        canvas.width = width;
        canvas.height = height;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff4da6';

        const points = [];
        for (let t = 0; t <= 2 * Math.PI; t += 0.15) {
            const x = width / 2 - 16 * Math.pow(Math.sin(t), 3) * 8;
            const y = height * 0.55 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 8;
            points.push({ x, y });
        }
        points.push(points[0]);

        function connectPoints(index = 1) {
            if (index >= points.length) {
                triggerFinalAnimation();
                return;
            }
            drawStar(points[index - 1]);
            drawLine(points[index - 1], points[index]);
            setTimeout(() => connectPoints(index + 1), 50);
        }

        function drawStar(point) { /*...*/ ctx.fillStyle = 'white'; ctx.shadowColor = '#ff99cc'; ctx.shadowBlur = 20; ctx.beginPath(); ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); ctx.fill(); ctx.shadowColor = '#ff4da6'; ctx.shadowBlur = 10; }
        function drawLine(p1, p2) { /*...*/ ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        
        function triggerFinalAnimation() {
            canvas.classList.add('heart-flash-effect');

            canvas.addEventListener('animationend', () => {
                canvas.classList.remove('heart-flash-effect');
                canvas.classList.add('heartbeat-effect');
            }, { once: true }); 

            showFinalMessage();
        }

        function showFinalMessage() {
            const text = "Mi sueño y deseo es siempre estar contigo  ❤️ ❤️";
            finalMessage.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                finalMessage.appendChild(span);

                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) scale(1)';
                }, 100 + index * 70); 
            });
            const secondMessage = document.getElementById('second-message');
            secondMessage.innerHTML = ''; 
            const text2 = "Feliz 30 de setiembre, mi Marysita hermosa 💖";

            setTimeout(() => {
            secondMessage.innerHTML = text2; // aparece completo
            secondMessage.style.opacity = "0";
            secondMessage.style.transition = "opacity 1.5s ease"; // fade-in suave
            setTimeout(() => {
            secondMessage.style.opacity = "1";
            }, 50);
            }, text.length * 70 + 800); 
}

        

        connectPoints();
    }
});