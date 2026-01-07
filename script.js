document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenu.classList.add('hidden'); // Fecha menu mobile ao clicar
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });

    // Contador de estatísticas simulado
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const inc = target / 50;
                    let current = 0;
                    
                    const updateCount = () => {
                        current += inc;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            setTimeout(updateCount, 40);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, observerOptions);

    const statsSection = document.getElementById('benefits');
    if(statsSection) statsObserver.observe(statsSection);
});
