// Fungsi untuk mengacak array menggunakan algoritma Fisher-Yates Shuffle
function shuffleArray(array) {
    // Membuat salinan array untuk menghindari modifikasi array asli
    const shuffled = [...array];

    // Implementasi Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// Fungsi untuk memilih 10 kalimat acak dari daftar
function getRandomSentences() {
    const shuffled = shuffleArray(sentences);
    return shuffled.slice(0, 10);
}

// Fungsi untuk menampilkan kalimat di halaman
function displaySentences(sentencesToDisplay) {
    const container = document.getElementById('sentences-container');
    container.innerHTML = '';

    sentencesToDisplay.forEach((sentence, index) => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';

        const arabicText = document.createElement('div');
        arabicText.className = 'arabic-text';
        arabicText.textContent = sentence.arab;

        const translation = document.createElement('div');
        translation.className = 'translation';
        translation.textContent = `${index + 1}. ${sentence.indo}`;

        sentenceItem.appendChild(arabicText);
        sentenceItem.appendChild(translation);
        container.appendChild(sentenceItem);
    });
}

// Fungsi untuk mengacak ulang dan menampilkan kalimat baru
function shuffleAndDisplay() {
    scrollTo(0, 0)
    const randomSentences = getRandomSentences();
    displaySentences(randomSentences);

    // Animasi tombol saat diklik
    const button = document.getElementById('shuffle-button');
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 200);
}

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan kalimat acak saat halaman dimuat
    shuffleAndDisplay();

    // Tambahkan event listener untuk tombol acak ulang
    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', shuffleAndDisplay);
});