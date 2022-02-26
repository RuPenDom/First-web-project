const intro = introJs();

intro.setOptions({
    steps: [
        {
            title: 'Добро пожаловать',
            intro: "Данный сайт сделал Липинский Илья"
        },
        {
            element: "header",
            // title: "Хедер",
            intro: "Это шапка сайта с навигацией"
        },
        {
            element: "#article-about",
            title: "Немного обо мне",
            intro: "Содержит информацию о биографии, образовании, трудоустройстве и т.д."
        },
        {
            element: "#article-contacts",
            title: "Мои контакты",
            intro: "Телефон, соцсети, почта"
        },
        {
            element: ".series-table",
            title: "Числовой ряд",
            intro: "Последовательный числовой ряд"
        },
        {
            element: "footer",
            title: "Футер",
            intro: "Время загрузки страницы"
        },
        {
            title: "Тур закончен",
            intro: "Спасибо за внимание"
        }
    ],
    scrollTo: "tooltip"
});
// console.log(intro)
// intro.start();

const buttonStart = document.querySelector(".tour");

buttonStart.addEventListener("click", (event) => {
    intro.start();
});