document.addEventListener('DOMContentLoaded', () => {
    const artworksGrid = document.getElementById('artworks-grid');
    if (!artworksGrid) {
        console.error('❌ Контейнер #artworks-grid не найден!');
        return;
    }

    const artworks = [
        {
            img: 'assets/images/artworks/digital-dreamscape.jpg',
            title: 'Цифровой Сон',
            artist: 'Елена Родригес',
            medium: 'Цифровое искусство • 2024',
            price: '$12 500'
        },
        {
            img: 'assets/images/artworks/urban-fragments.jpg',
            title: 'Городские Фрагменты',
            artist: 'Маркус Чен',
            medium: 'Смешанная техника • 2023',
            price: '$8 200'
        },
        {
            img: 'assets/images/artworks/quantum-bloom.jpg',
            title: 'Квантовый Цветок',
            artist: 'София Накамура',
            medium: 'Акрил на холсте • 2024',
            price: '$15 800'
        }
    ];

    artworksGrid.innerHTML = artworks.map(work => `
    <div class="artwork-card" data-artwork-id="${work.id || work.title.replace(/\s+/g, '-').toLowerCase()}">
      <img src="${work.img}" alt="${work.title}" class="artwork-image">
      <div class="artwork-overlay"></div>
      <div class="artwork-favorite"><i class="far fa-heart"></i></div>
      <div class="artwork-info">
        <h3 class="artwork-title">${work.title}</h3>
        <p class="artwork-artist">${work.artist}</p>
        <div class="artwork-meta">
          <span class="artwork-medium">${work.medium}</span>
          <span class="artwork-price">${work.price}</span>
        </div>
      </div>
    </div>
  `).join('');
});