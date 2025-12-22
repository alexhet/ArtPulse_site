document.addEventListener('DOMContentLoaded', () => {
    // Используем делегирование событий — чтобы работало даже с динамически созданными элементами
    document.addEventListener('click', function(e) {
        if (e.target.closest('.artwork-favorite')) {
            const button = e.target.closest('.artwork-favorite');
            toggleFavorite(button);
        }
    });

    // Загружаем избранные из localStorage
    let favorites = JSON.parse(localStorage.getItem('artpulse_favorites')) || [];

    // Функция обновления состояния сердечка
    function updateFavoriteState(button, isFavorited) {
        const icon = button.querySelector('i');
        button.classList.toggle('favorited', isFavorited);
        icon.className = isFavorited ? 'fas fa-heart' : 'far fa-heart';
    }

    // Функция переключения избранного
    function toggleFavorite(button) {
        const artworkCard = button.closest('.artwork-card');
        const artworkId = artworkCard.dataset.artworkId;

        if (!artworkId) {
            console.warn('❌ Нет data-artwork-id на карточке!');
            return;
        }

        const index = favorites.indexOf(artworkId);

        if (index === -1) {
            favorites.push(artworkId);
            updateFavoriteState(button, true);
        } else {
            favorites.splice(index, 1);
            updateFavoriteState(button, false);
        }

        // Сохраняем в localStorage
        localStorage.setItem('artpulse_favorites', JSON.stringify(favorites));
        console.log('✅ Избранное обновлено:', favorites);
    }

    // Инициализация: установка состояния при загрузке страницы
    function initFavorites() {
        const favoriteButtons = document.querySelectorAll('.artwork-favorite');

        favoriteButtons.forEach(button => {
            const artworkCard = button.closest('.artwork-card');
            const artworkId = artworkCard.dataset.artworkId;

            if (!artworkId) return;

            if (favorites.includes(artworkId)) {
                updateFavoriteState(button, true);
            }
        });
    }

    // Запускаем инициализацию
    initFavorites();
});