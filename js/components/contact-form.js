document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Пожалуйста, введите корректный email.');
            return;
        }

        // В демо-режиме — просто показываем успех
        alert(`Спасибо, ${name}!\nВаше сообщение отправлено.`);
        form.reset();
    });
});