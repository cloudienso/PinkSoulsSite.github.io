history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {

    // Мобильное меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav--open');
        });

        // Закрываем меню при клике на любую ссылку внутри навигации
        const navLinks = nav.querySelectorAll('a, .nav__dropdown-toggle');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (this.id === 'projectsDropdown') return;
                nav.classList.remove('nav--open');
            });
        });

        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('nav--open');
            }
        });
    }

    // Кнопка поиска
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = prompt('🔍 Поиск по сайту\nВведите запрос:');
            if (query && query.trim() !== '') {
                showModal('🔍 Результаты поиска', 'Вы искали: «' + query + '»\nПоисковая система в разработке.');
            } else if (query !== null) {
                alert('🕹️ Введите что-нибудь для поиска.');
            }
        });
    }

    // Модальное окно
    function showModal(title, text) {
        const existing = document.querySelector('.modal-overlay');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <h2 class="modal__title">${title}</h2>
            <p class="modal__text">${text.replace(/\n/g, '<br>')}</p>
            <button class="btn btn--primary modal__close-btn">✕ ЗАКРЫТЬ</button>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        modal.querySelector('.modal__close-btn').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', closeOnEsc); }
        });
    }

    // Все кнопки поддержки
    const allSupportButtons = document.querySelectorAll('.btn--support-action');
    allSupportButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.support-card');
            const title = card ? card.querySelector('h2').textContent : '';
            if (title === 'Рассказать друзьям') {
                const url = 'https://pinksouls.ru';
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        showModal('📢 Ссылка скопирована!', 'Отправьте её друзьям: ' + url);
                    });
                } else {
                    showModal('📢 Поделитесь ссылкой', url);
                }
                return;
            }
            if (title === 'Обратная связь') {
                showModal('📝 Обратная связь', 'Пишите на: pionirobibka@gmail.com\nИли в наш Discord!');
                return;
            }
            showModal('💗 ' + title, 'Спасибо за вашу поддержку!');
        });
    });

    // Выпадающее меню "Проекты"
    const projectsDropdown = document.getElementById('projectsDropdown');
    const projectsDropdownMenu = document.getElementById('projectsDropdownMenu');

    if (projectsDropdown && projectsDropdownMenu) {
        projectsDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = projectsDropdownMenu.classList.toggle('dropdown-menu--visible');
            this.classList.toggle('is-open', isOpen);
            if (isOpen) {
                projectsDropdownMenu.style.width = projectsDropdown.offsetWidth + 'px';
            }
        });

        document.addEventListener('click', function(e) {
            if (!projectsDropdown.contains(e.target) && !projectsDropdownMenu.contains(e.target)) {
                projectsDropdownMenu.classList.remove('dropdown-menu--visible');
                projectsDropdown.classList.remove('is-open');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                projectsDropdownMenu.classList.remove('dropdown-menu--visible');
                projectsDropdown.classList.remove('is-open');
            }
        });

        window.addEventListener('resize', function() {
            projectsDropdownMenu.classList.remove('dropdown-menu--visible');
            projectsDropdown.classList.remove('is-open');
        });
    }

    // Кнопка "Наверх"
    (function() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Наверх');
        document.body.appendChild(scrollBtn);

        function toggleVisibility() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('scroll-to-top--visible');
            } else {
                scrollBtn.classList.remove('scroll-to-top--visible');
            }
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        toggleVisibility();
    })();

    // Анимация появления при скролле
    (function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll(`
            .section,
            .feature-card,
            .news-card,
            .shop-item,
            .support-card,
            .about-block,
            .game-info__block,
            .hero__content,
            .hero__subtitle,
            .hero__description,
            .hero__buttons,
            .team-member,
            .footer__grid
        `);

        targets.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    })();

    console.log('💖 Pink Soul\'s — сайт загружен!');
});