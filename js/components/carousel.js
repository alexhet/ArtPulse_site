const carouselSlides = [
    {
        video: 'assets/videos/echoes-of-tomorrow.mp4',
        title: 'Эхо Завтра',
        artist: 'Джеймс Уилсон',
        description: 'Интерактивная инсталляция со звуком и светом, исследующая будущие возможности.',
        price: '1 500₽',
        medium: 'Анимированная инсталляция'
    },
    {
        video: 'assets/videos/neural-networks.mp4',
        title: 'Нейросети',
        artist: 'Аиша Патель',
        description: 'Сотрудничество между человеческим творчеством и искусственным интеллектом.',
        price: '5 000₽',
        medium: 'Генеративное ИИ-видео'
    },
    {
        video: 'assets/videos/celestial-bodies.mp4',
        title: 'Небесные Тела',
        artist: 'Тома Лоран',
        description: 'Астрономическое вдохновение встречается с классической техникой.',
        price: '3 000₽',
        medium: 'Анимированная живопись'
    }
];

let currentSlide = 0;
let isPlaying = true;
let intervalId = null;

function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const playButton = document.querySelector('.carousel-play');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    if (!carouselSlide || !indicatorsContainer || !playButton) return;

    // Создание индикаторов
    indicatorsContainer.innerHTML = carouselSlides.map((_, i) =>
        `<div class="indicator${i === 0 ? ' active' : ''}"></div>`
    ).join('');

    const indicators = document.querySelectorAll('.indicator');

    function updateCarousel() {
        const slide = carouselSlides[currentSlide];
        carouselSlide.innerHTML = `
      <video autoplay muted loop playsinline class="carousel-video">
        <source src="${slide.video}" type="video/mp4">
        Ваш браузер не поддерживает видео.
      </video>
      <div class="carousel-overlay"></div>
      <div class="carousel-content">
        <h3 class="carousel-title">${slide.title}</h3>
        <p class="carousel-artist">by ${slide.artist}</p>
        <p class="carousel-description">${slide.description}</p>
        <div class="carousel-meta">
          <span class="carousel-price">${slide.price}</span>
          <span class="carousel-medium">${slide.medium}</span>
        </div>
      </div>
    `;

        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    }

    function togglePlay() {
        isPlaying = !isPlaying;
        playButton.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
        if (isPlaying) startAutoPlay();
        else stopAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay();
        intervalId = setInterval(nextSlide, 6000); // немного дольше для видео
    }

    function stopAutoPlay() {
        if (intervalId) clearInterval(intervalId);
    }

    // События
    nextButton?.addEventListener('click', nextSlide);
    prevButton?.addEventListener('click', prevSlide);
    playButton?.addEventListener('click', togglePlay);

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
        });
    });

    // Инициализация
    updateCarousel();
    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', initCarousel);