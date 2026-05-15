document.addEventListener('DOMContentLoaded', function() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const reviewsInput = document.getElementById('reviewsInput');
  const resultDiv = document.getElementById('analysisResult');
  const resultDivCont = document.getElementById('result');
  const loadingIndicator = document.getElementById('loadingIndicator');

  // Получаем все элементы для заполнения заранее
  const elements = {
    positiveCount: document.getElementById('positiveCount'),
    positivePercentage: document.getElementById('positivePercentage'),
    negativeCount: document.getElementById('negativeCount'),
    negativePercentage: document.getElementById('negativePercentage'),
    neutralCount: document.getElementById('neutralCount'),
    neutralPercentage: document.getElementById('neutralPercentage'),
    questionCount: document.getElementById('questionCount'),
    questionPercentage: document.getElementById('questionPercentage'),
    mostCommonWordsList: document.getElementById('mostCommonWordsList'),
    topIssuesList: document.getElementById('topIssuesList'),
    improvementRecommendationsList: document.getElementById('improvementRecommendationsList')
  };

  analyzeBtn.addEventListener('click', async function() {
    try {
      const inputText = reviewsInput.value.trim();

      if (!inputText) {
        alert('Пожалуйста, введите JSON с отзывами');
        return;
      }

      let reviewsData;
      try {
        reviewsData = JSON.parse(inputText);
      } catch (parseError) {
        alert('Ошибка: неверный формат JSON. Проверьте правильность ввода.');
        console.error('JSON parse error:', parseError);
        return;
      }

      // Показываем индикатор загрузки
      loadingIndicator.style.display = 'block';
      // resultDiv.innerHTML = '';

      // Отправляем данные на backend
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewsData)
      });

      console.log('HTTP статус:', response.status);
      console.log('Статус OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log('Полный ответ от сервера:', jsonResponse);

      if (!jsonResponse.success) {
        throw new Error('Ошибка на сервере: анализ не выполнен');
      }

      // Парсим вложенный JSON из поля data
      let analysisData;
      try {
        analysisData = JSON.parse(jsonResponse.data);
        console.log('Распарсенные данные:', analysisData);
      } catch (parseError) {
        console.error('Ошибка парсинга JSON из data:', parseError);
        throw new Error('Неверный формат данных от сервера — не удалось распарсить поле data');
      }

      // Скрываем индикатор загрузки после получения ответа
      loadingIndicator.style.display = 'none';

      // Отображаем результаты
      displayAnalysisResults(analysisData, elements);

    } catch (error) {
      console.error('Ошибка при запросе:', error);
      resultDiv.innerHTML = `<p style="color: red;">Произошла ошибка: ${error.message}</p>`;
      loadingIndicator.style.display = 'none'; // Скрываем индикатор даже в случае ошибки
    }
  });

  function displayAnalysisResults(data, elements) {
    resultDivCont.style.display = "block";
    console.log('positiveCount элемент:', elements.positiveCount);
    console.log('mostCommonWordsList элемент:', elements.mostCommonWordsList);
    // Очищаем содержимое списков и текстовых элементов
    Object.values(elements).forEach(el => {
      if (el) {
        if (el.tagName === 'UL' || el.tagName === 'OL') {
          el.innerHTML = '';
        } else {
          el.textContent = '';
        }
      }
    });

    if (!data || Object.keys(data).length === 0) {
      resultDiv.innerHTML = '<p>Нет данных для анализа.</p>';
      return;
    }



    // Заполняем DistributionTone
    if (data.DistributionTone) {
      updateElementText(elements.positiveCount, data.DistributionTone.Positive.count);
      updateElementText(elements.positivePercentage, data.DistributionTone.Positive.percentage.toFixed(1));
      updateElementText(elements.negativeCount, data.DistributionTone.Negative.count);
      updateElementText(elements.negativePercentage, data.DistributionTone.Negative.percentage.toFixed(1));
      updateElementText(elements.neutralCount, data.DistributionTone.Neutral.count);
      updateElementText(elements.neutralPercentage, data.DistributionTone.Neutral.percentage.toFixed(1));
      updateElementText(elements.questionCount, data.DistributionTone.Question.count);
      updateElementText(elements.questionPercentage, data.DistributionTone.Question.percentage.toFixed(1));
    } else {
      console.warn('DistributionTone отсутствует в данных');
    }

    // Заполняем списки
    updateList(elements.mostCommonWordsList, data.MostCommonWords, 'Наиболее частые слова не найдены');
    updateList(elements.topIssuesList, data.TopIssues, 'Основные проблемы не найдены');
    updateList(elements.improvementRecommendationsList, data.ImprovementRecommendations, 'Рекомендации не найдены');
  }

  // Вспомогательная функция для безопасного обновления текста элемента
  function updateElementText(element, text) {
    if (element) {
      element.textContent = text;
    } else {
      console.warn(`Элемент не найден для обновления: ${element}`);
    }
  }

  // Вспомогательная функция для заполнения списков
  function updateList(listElement, items, emptyMessage = 'Данные отсутствуют') {
    if (listElement) {
      if (items && items.length > 0) {
        listElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
      } else {
        listElement.innerHTML = `<li>${emptyMessage}</li>`;
      }
    }
  }
});











