document.addEventListener('DOMContentLoaded', () => {
    // !!! ВАЖЛИВО: Вставте сюди своє посилання з Google Таблиці (Крок 1)
    const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPAjZl-CBFuc_guS5zowVwcV0q0xZbExiBMh5PceCYFHV2_X1EG-50TsJQV1PCiz_iQhDT_UCKzSvr/pub?output=csv';

    const newsContainer = document.getElementById('news-container');
    const loadingMessage = document.getElementById('loading');

    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            loadingMessage.style.display = 'none'; // Ховаємо повідомлення про завантаження
            const rows = data.split('\n').slice(1); // Розділяємо на рядки, пропускаючи заголовок

            rows.forEach(row => {
                const columns = row.split(','); // Розділяємо рядок на стовпці

                // Отримуємо дані з відповідних стовпців
                const title = columns[10];
                const text = columns[4];
                const imageUrl = columns[2];
                const date = columns[3];

                if (!title) return; // Пропускаємо порожні рядки

                // Створюємо HTML-елементи для новини
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';

                const image = document.createElement('img');
                image.src = imageUrl;

                const content = document.createElement('div');
                content.className = 'news-content';

                const header = document.createElement('h2');
                header.textContent = title;

                const paragraph = document.createElement('p');
                paragraph.textContent = text;
                
                // Збираємо все разом
                content.appendChild(header);
                content.appendChild(paragraph);
                newsItem.appendChild(image);
                newsItem.appendChild(content);

                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            loadingMessage.textContent = 'Не вдалося завантажити новини. Спробуйте пізніше.';
            console.error('Помилка завантаження даних:', error);
        });
});
