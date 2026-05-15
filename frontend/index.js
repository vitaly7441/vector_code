document.addEventListener('DOMContentLoaded', function() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const reviewsInput = document.getElementById('reviewsInput');
  const resultDiv = document.getElementById('analysisResult');
  const resultDivCont = document.getElementById('result');
  const loadingIndicator = document.getElementById('loadingIndicator');

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

      // let reviewsData;
      // try {
      //   reviewsData = JSON.parse(inputText);
      // } catch (parseError) {
      //   alert('Ошибка: неверный формат JSON. Проверьте правильность ввода.');
      //   console.error('JSON parse error:', parseError);
      //   return;
      // }



      loadingIndicator.style.display = 'block';
      let response;


      let json1 = {
        "reviews": [
          {
            "id": 1,
            "date": "2024-05-19",
            "author": "Покупатель Wildberries",
            "message": "Внуку очень понравились: лёгкие, удобные, дышащие. Рекомендую к покупке.",
            "rate": 5
          },
          {
            "id": 2,
            "date": "2024-05-13",
            "author": "Иван",
            "message": "внешний вид нормальный, хорошо сидит, удобно носить.",
            "rate": 5
          },
          {
            "id": 3,
            "date": "2024-05-12",
            "author": "Виктор",
            "message": "Вопрос: какой размер?",
            "rate": 5
          },
          {
            "id": 4,
            "date": "2024-05-10",
            "author": "Марина",
            "message": "Достоинства: круто.",
            "rate": 4
          },
          {
            "id": 5,
            "date": "2024-05-10",
            "author": "Покупатель Wildberries",
            "message": "Сильно пахнут какой‑то фигнёй. Комментарий: не берите, сильно пахнут, некачественные.",
            "rate": 1
          },
          {
            "id": 6,
            "date": "2024-05-09",
            "author": "Екатерина",
            "message": "На вид хорошие кроссовки, пришли даже с документами. Маломерят — это точно, брали по размерной сетке производителя. Посмотрим, как проносятся.",
            "rate": 3
          },
          {
            "id": 7,
            "date": "2024-05-07",
            "author": "Андрей",
            "message": "Плюсы товара: внешний вид, хорошо сидит, удобно носить.",
            "rate": 5
          },
          {
            "id": 8,
            "date": "2024-05-07",
            "author": "Покупатель Wildberries",
            "message": "Плюсы товара: удобно носить.",
            "rate": 4
          },
          {
            "id": 9,
            "date": "2024-05-05",
            "author": "Зайнал",
            "message": "Достоинства: внешний вид. Комментарий: 43‑й размер на 26,5 см.",
            "rate": 4
          },
          {
            "id": 10,
            "date": "2024-05-05",
            "author": "Покупатель",
            "message": "Достоинства: всё отлично 👍🤗",
            "rate": 5
          },
          {
            "id": 11,
            "date": "2024-05-04",
            "author": "Наталья",
            "message": "Достоинства: размер соответствует. Самая низкокачественная копия. Комментарий: запах ужасный, приходит просто в пакете, строчки кривые, красная цена этим кроссовкам — 1 000 рублей! Минусы товара: есть запах.",
            "rate": 1
          },
          {
            "id": 12,
            "date": "2024-05-02",
            "author": "Данил",
            "message": "Купил, ещё не пользовался, пока нейтрально",
            "rate": 5
          },
          {
            "id": 13,
            "date": "2024-04-30",
            "author": "Александр",
            "message": "Достоинства: суперлёгкие.",
            "rate": 4
          },
          {
            "id": 14,
            "date": "2024-04-29",
            "author": "Андрей",
            "message": "Плюсы товара: хорошо сидит, внешний вид, удобно носить.",
            "rate": 5
          },
          {
            "id": 15,
            "date": "2024-04-26",
            "author": "Александр Анатольевич",
            "message": "Достоинства: дизайн, удобно ноге, лёгкие.",
            "rate": 5
          },
          {
            "id": 16,
            "date": "2024-04-19",
            "author": "Ирина",
            "message": "Достоинства: запах отвратительный.",
            "rate": 1
          },
          {
            "id": 17,
            "date": "2024-04-15",
            "author": "Елена",
            "message": "Достоинства: сын доволен.",
            "rate": 4
          },
          {
            "id": 18,
            "date": "2024-04-12",
            "author": "Дмитрий",
            "message": "Хорошие кроссовки",
            "rate": 5
          },
          {
            "id": 19,
            "date": "2024-04-08",
            "author": "Ольга",
            "message": "Кроссовки красивые, но подошва слишком тонкая — чувствуется каждый камешек на дороге. Для города не очень подходят.",
            "rate": 3
          },
          {
            "id": 20,
            "date": "2024-04-05",
            "author": "Максим",
            "message": "Очень доволен покупкой! Нога не потеет, материал дышащий, дизайн стильный. Идеально для прогулок.",
            "rate": 5
          },
          {
            "id": 21,
            "date": "2024-04-01",
            "author": "Светлана",
            "message": "Размер не соответствует: заказала 38, а пришли как 36. Пришлось возвращать. Жаль потраченного времени.",
            "rate": 2
          },
          {
            "id": 22,
            "date": "2024-03-28",
            "author": "Артём",
            "message": "Отличные кроссовки за свои деньги! Лёгкие, удобные, хорошо смотрятся с джинсами и шортами. Ношу уже месяц — никаких нареканий.",
            "rate": 5
          },
          {
            "id": 23,
            "date": "2024-03-25",
            "author": "Виктория",
            "message": "Разочарована: через неделю носки начали расходиться швы на носке. Качество явно не соответствует цене. Не рекомендую.",
            "rate": 2
          }
        ]
      }


      if(inputText == "https://www.wildberries.ru/catalog/974596393/feedbacks?imtId=1370661382"){
        response = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(json1)
        });

        // response = {
        //   success: true,
        //   data: {
        //     "DistributionTone": {
        //       "Positive": {
        //         "count": 16,
        //         "percentage": 69.57
        //       },
        //       "Negative": {
        //         "count": 1,
        //         "percentage": 4.35
        //       },
        //       "Neutral": {
        //         "count": 3,
        //         "percentage":13.04
        //       },
        //       "Question": {
        //         "count": 3,
        //         "percentage": 13.04
        //       }
        //     },
        //     "MostCommonWords": [
        //       "кроссовки",
        //       "размер",
        //       "покупка",
        //       "несоответсвие"
        //     ],
        //     "TopIssues": [
        //       "запах",
        //       "качество",
        //       "разный размер",
        //       "вид"
        //     ],
        //     "ImprovementRecommendations": [
        //       "Уделите особое внимание качеству продукции и материала товара, чтобы устранить проблемы с неприятным запахом.",
        //       "Повысьте контроль соответствия размеров, чтобы избежать ошибок в отправке.",
        //       "Проработайте обувь с более прочными и удобными материалами для повышения долговечности и комфорта.",
        //       "Придайте больше внимания упаковке товаров, чтобы избежать повреждений во время транспортировки."
        //     ]
        //   }
        // }
        console.log(json1);
      } else{
        alert("Введена неверная ссылка. Проверьте ввод");
      }

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

      let analysisData;
      try {
        analysisData = JSON.parse(jsonResponse.data);
        console.log('Распарсенные данные:', analysisData);
      } catch (parseError) {
        console.error('Ошибка парсинга JSON из data:', parseError);
        throw new Error('Неверный формат данных от сервера — не удалось распарсить поле data');
      }

      loadingIndicator.style.display = 'none';

      displayAnalysisResults(analysisData, elements);

    } catch (error) {
      console.error('Ошибка при запросе:', error);
      resultDiv.innerHTML = `<p style="color: red;">Произошла ошибка: ${error.message}</p>`;
      loadingIndicator.style.display = 'none';
    }
  });

  function displayAnalysisResults(data, elements) {
    resultDivCont.style.display = "block";
    // console.log('positiveCount элемент:', elements.positiveCount);
    // console.log('mostCommonWordsList элемент:', elements.mostCommonWordsList);
    //
  //   Object.values(elements).forEach(el => {
  //     if (el) {
  //       if (el.tagName === 'UL' || el.tagName === 'OL') {
  //         el.innerHTML = '';
  //       } else {
  //         el.textContent = '';
  //       }
  //     }
  //   });
  //
  //   if (!data || Object.keys(data).length === 0) {
  //     resultDiv.innerHTML = '<p>Нет данных для анализа.</p>';
  //     return;
  //   }
  //
  //
  //
  //   if (data.DistributionTone) {
  //     updateElementText(elements.positiveCount, data.DistributionTone.Positive.count);
  //     updateElementText(elements.positivePercentage, data.DistributionTone.Positive.percentage.toFixed(1));
  //     updateElementText(elements.negativeCount, data.DistributionTone.Negative.count);
  //     updateElementText(elements.negativePercentage, data.DistributionTone.Negative.percentage.toFixed(1));
  //     updateElementText(elements.neutralCount, data.DistributionTone.Neutral.count);
  //     updateElementText(elements.neutralPercentage, data.DistributionTone.Neutral.percentage.toFixed(1));
  //     updateElementText(elements.questionCount, data.DistributionTone.Question.count);
  //     updateElementText(elements.questionPercentage, data.DistributionTone.Question.percentage.toFixed(1));
  //   } else {
  //     console.warn('DistributionTone отсутствует в данных');
  //   }
  //
  //   updateList(elements.mostCommonWordsList, data.MostCommonWords, 'Наиболее частые слова не найдены');
  //   updateList(elements.topIssuesList, data.TopIssues, 'Основные проблемы не найдены');
  //   updateList(elements.improvementRecommendationsList, data.ImprovementRecommendations, 'Рекомендации не найдены');
  // }
  //
  // function updateElementText(element, text) {
  //   if (element) {
  //     element.textContent = text;
  //   } else {
  //     console.warn(`Элемент не найден для обновления: ${element}`);
  //   }
  // }
  //
  // function updateList(listElement, items, emptyMessage = 'Данные отсутствуют') {
  //   if (listElement) {
  //     if (items && items.length > 0) {
  //       listElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
  //     } else {
  //       listElement.innerHTML = `<li>${emptyMessage}</li>`;
  //     }
  //   }
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultContainer = document.getElementById('result');
  const pdfExport = document.getElementById('pdfExport');
  const exportToPdfBtn = document.getElementById('exportToPdf');

  function showExportButton() {
    if (resultContainer.style.display !== 'none') {
      pdfExport.style.display = 'block';
    }
  }

  exportToPdfBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'feedback_analyze.pdf';
    link.download = 'результаты_анализа_отзывов.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  analyzeBtn.addEventListener('click', function() {
    setTimeout(() => {
      showExportButton();
    }, 1500); // Увеличенное время ожидания
  });
});