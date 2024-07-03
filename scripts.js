const links = document.querySelectorAll('.links a');
const cards = document.querySelector('.cards');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

links.forEach(a => {
    a.addEventListener('mouseover', () => {
        currentIndex = parseInt(a.getAttribute('data-index'));
        updateSlider();
    });
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < links.length - 1) {
        currentIndex++;
        updateSlider();
    }
});

function updateSlider() {
    cards.style.transform = `translateX(-${currentIndex * 500}px)`;
}
