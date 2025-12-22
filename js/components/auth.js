document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.querySelector('.nav-icons .fa-user');
    const modal = document.getElementById('authModal');
    const closeModal = document.querySelector('.modal .close');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // === Восстановление сессии при загрузке ===
    const currentUserEmail = localStorage.getItem('artpulse_current_user');
    if (currentUserEmail) {
        updateUserUI(currentUserEmail);
    }

    // === Открытие модального окна ===
    userIcon?.addEventListener('click', () => {
        if (currentUserEmail) {
            // Если уже вошёл — показываем профиль или выход
            alert('Вы уже вошли в систему!');
            return;
        }
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // === Закрытие модального окна ===
    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal?.addEventListener('click', closeModalHandler);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // === Переключение табов ===
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loginForm.style.display = btn.dataset.tab === 'login' ? 'flex' : 'none';
            registerForm.style.display = btn.dataset.tab === 'register' ? 'flex' : 'none';
        });
    });

    // === Регистрация ===
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = registerForm.querySelectorAll('input');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim().toLowerCase();
        const password = inputs[2].value;
        const passwordConfirm = inputs[3].value;

        if (password !== passwordConfirm) {
            alert('Пароли не совпадают');
            return;
        }
        if (password.length < 6) {
            alert('Пароль должен быть не короче 6 символов');
            return;
        }

        const users = JSON.parse(localStorage.getItem('artpulse_users')) || {};
        if (users[email]) {
            alert('Пользователь с таким email уже существует');
            return;
        }

        // Сохраняем пользователя
        users[email] = {
            name,
            password, // Только для демо!
            favorites: JSON.parse(localStorage.getItem('artpulse_favorites')) || []
        };

        localStorage.setItem('artpulse_users', JSON.stringify(users));
        localStorage.setItem('artpulse_current_user', email);

        alert(`Регистрация успешна! Добро пожаловать, ${name}!`);
        closeModalHandler();
        updateUserUI(email);
    });

    // === Вход ===
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value.trim().toLowerCase();
        const password = loginForm.querySelector('input[type="password"]').value;

        const users = JSON.parse(localStorage.getItem('artpulse_users')) || {};
        const user = users[email];

        if (user && user.password === password) {
            // Сохраняем текущего пользователя
            localStorage.setItem('artpulse_current_user', email);
            // Загружаем его избранное
            localStorage.setItem('artpulse_favorites', JSON.stringify(user.favorites || []));
            alert(`С возвращением, ${user.name}!`);
            closeModalHandler();
            updateUserUI(email);
        } else {
            alert('Неверный email или пароль');
        }
    });

    // === Обновление интерфейса после входа ===
    function updateUserUI(email) {
        const users = JSON.parse(localStorage.getItem('artpulse_users')) || {};
        const user = users[email];
        if (!user) return;

        // Меняем иконку пользователя на инициал
        const userIconEl = document.querySelector('.nav-icons .fa-user');
        if (userIconEl) {
            const initial = user.name.charAt(0).toUpperCase();
            const span = document.createElement('span');
            span.className = 'user-initial';
            span.textContent = initial;
            span.style.cssText = `
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(90deg, var(--purple-secondary), var(--cyan-secondary));
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.875rem;
                cursor: pointer;
            `;
            userIconEl.replaceWith(span);

            // Добавляем выход с красивым модальным окном
            span.addEventListener('click', () => {
                const logoutModal = document.getElementById('logoutModal');
                if (!logoutModal) return;

                // Показываем модалку
                logoutModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Обработчики кнопок
                const cancelBtn = document.getElementById('cancelLogout');
                const confirmBtn = document.getElementById('confirmLogout');

                const closeModal = () => {
                    const modalContent = logoutModal.querySelector('.logout-modal');
                    if (modalContent) {
                        modalContent.classList.add('close-animation');
                        setTimeout(() => {
                            logoutModal.style.display = 'none';
                            modalContent.classList.remove('close-animation');
                            document.body.style.overflow = 'auto';
                        }, 300);
                    } else {
                        // fallback, если анимация не поддерживается
                        logoutModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                };

                cancelBtn?.addEventListener('click', closeModal);
                confirmBtn?.addEventListener('click', () => {
                    // Сохраняем избранное текущего пользователя
                    const favorites = JSON.parse(localStorage.getItem('artpulse_favorites')) || [];
                    const users = JSON.parse(localStorage.getItem('artpulse_users')) || {};
                    const currentUserEmail = localStorage.getItem('artpulse_current_user');
                    if (currentUserEmail && users[currentUserEmail]) {
                        users[currentUserEmail].favorites = favorites;
                        localStorage.setItem('artpulse_users', JSON.stringify(users));
                    }

                    // Очищаем сессию
                    localStorage.removeItem('artpulse_current_user');
                    localStorage.removeItem('artpulse_favorites');

                    // Возвращаем иконку пользователя
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-user';
                    span.replaceWith(icon);

                    // Восстанавливаем обработчик открытия формы входа
                    icon.addEventListener('click', () => {
                        const authModal = document.getElementById('authModal');
                        if (authModal) {
                            authModal.style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                        }
                    });

                    closeModal();
                    alert('Вы успешно вышли из аккаунта.');
                });

                // Закрытие по клику вне окна
                logoutModal.addEventListener('click', (e) => {
                    if (e.target === logoutModal) closeModal();
                });
            });
        }

        // Обновляем состояние сердечек на странице
        document.dispatchEvent(new Event('favoritesLoaded'));
    }
});