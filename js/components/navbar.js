document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Закрывать меню при клике по ссылке
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Закрывать меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
            navLinks.classList.remove('active');
        }
    });
});