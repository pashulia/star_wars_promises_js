// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)

// элементы ввода текста для поисковых запросов
let query = document.querySelector('#input1');
let query2 = document.querySelector('#input2');
// контейнер для отображения результатов поиска
const container = document.querySelector('#result-container');
// элемент для отображения текстового содержимого результатов
const content = document.querySelector('#content');
// кнопки для запуска поисковых запросов
const queryBtn = document.querySelector('#byQueryBtn1');
const queryBtn2 = document.querySelector('#byQueryBtn2');
// спиннер, который отображается во время выполнения запросов
const spinner = document.querySelector('.spinner')
// кнопка для скрытия контейнера с результатами
const btnHide = document.querySelector('.delete');
// элемент для отображения заголовка результатов
const contentHeader = container.querySelector('#header');
// селекторы для выбора типа поиска (персонажи, планеты, виды и т. д.)
const selector = document.querySelector('#querySelector');
const IDselector = document.querySelector('#IDSelector');

// функции для показа и скрытия спиннера
const showSpinner = () => spinner.style.visibility = 'visible';
const hideSpinner = () => spinner.style.visibility = 'hidden';

// функции для показа и скрытия контейнера с результатами
const showContainer = () => container.style.visibility = 'visible';
const hideContainer = () => container.style.visibility = 'hidden';

// функция выполняет поиск персонажей, извлекает информацию о планете, на которой они живут, 
// и создает текстовое представление этой информации.
const showChars = async (query) => {
    // Выполняется асинхронный запрос к функции starWars.searchCharacters(query), 
    // чтобы найти персонажей, соответствующих заданному запросу. 
    const char = await starWars.searchCharacters(query);
    // Из результатов запроса выбирается первый персонаж (первый элемент массива результатов), 
    // который представлен в виде объекта. 
    const charResults = char.results[0];
    // Получается ссылка на мир, на котором живет выбранный персонаж, сохраненная в свойстве 
    // homeworld объекта charResults.
    const planetLink = charResults.homeworld;
    // поиска цифр в строке
    const regExp = /\d/gm;
    // Применяется регулярное выражение к planetLink для извлечения ID планеты, на которой 
    // живет персонаж. planetID содержит только цифры из этой ссылки
    const planetID = planetLink.match(regExp).join('');
    // Выполняется асинхронный запрос к функции starWars.getPlanetsById(planetID), 
    // чтобы получить информацию о планете, указанной в planetID
    const planet = await starWars.getPlanetsById(planetID);
    // имя планеты
    const planetName = planet.name;
    // Имя планеты (planetName) присваивается свойству homeworld объекта charResults. 
    // Таким образом, информация о планете, на которой живет персонаж, обновляется и 
    // содержит имя планеты, а не только ее ID.
    charResults.homeworld = planetName;
    // Преобразуется объект charResults в массив пар ключ-значение с помощью Object.entries. 
    // Это позволит обойти и преобразовать все свойства персонажа в текстовый формат
    const objEn = Object.entries(charResults);
    // Создается текстовое представление персонажа, преобразовав массив пар ключ-значение в 
    // строки вида "ключ: значение", а затем объединив их с помощью символа новой строки 
    // \n. .replaceAll(',', '\n') используется для замены запятых на символы новой строки, 
    // чтобы сделать результат более читаемым.
    const text = objEn.map(el => el.join(': ')).join('\n').replaceAll(',', '\n');
    // Полученный текст возвращается как результат выполнения функции
    return text;
}

// функция для поиска планет:
const showPlanets = async (query) => {
    const planet = await starWars.searchPlanets(query);
    const planetResults = planet.results[0];
    const entries = Object.entries(planetResults);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

// функция для поиска информации о виде:
const showSpecies = async (query) => {
    const specie = await starWars.searchSpecies(query);
    const speciesResults = specie.results[0];

    const planetLink = speciesResults.homeworld;
    const regExp = /\d/gm;
    const planetID = planetLink.match(regExp).join('');
    
    const planet = await starWars.getPlanetsById(planetID);
    const planetName = planet.name;
    speciesResults.homeworld = planetName;

    const entries = Object.entries(speciesResults);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

// функции getQuery и getID, которые выполняют поиск в зависимости от выбранного типа 
// (персонажи, планеты, виды) и вызывают соответствующие функции для выполнения 
// запросов.
async function getQuery() {
    // проверка на ввод от пользователя
    if(!query.value) {
        content.innerText = 'Try again!'
        contentHeader.innerText = 'Empty'
        showContainer();
        return;
    } 
    // если прошлый результат открыт, то закрываем
    if(container.style.visibility === 'visible') hideContainer();

    showSpinner();
    // если поиск персонажа
    if(selector.value === 'people') {
        const text = await showChars(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };
    // если поиск планеты
    if(selector.value === 'planets') {
        const text = await showPlanets(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };
    // если поиск по виду
    if(selector.value === 'species') {
        const text = await showSpecies(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };
    // скроет спиннер с помощью hideSpinner() и покажет контейнер с результатами 
    // с помощью showContainer()
    setTimeout(() => {
        hideSpinner();
        showContainer();
    }, 1000);
}   

const showCharsID = async (query) => {
    const char = await starWars.getCharactersById(query);
    
    const planetLink = char.homeworld;
    const regExp = /\d/gm;
    const planetID = planetLink.match(regExp).join('');
    
    const planet = await starWars.getPlanetsById(planetID);
    const planetName = planet.name;
    char.homeworld = planetName;
    
    const objEn = Object.entries(char);
    const text = objEn.map(el => el.join(': ')).join('\n').replaceAll(',', '\n');

    return text;
}

const showPlanetsID = async (query) => {
    const planet = await starWars.getPlanetsById(query);
    const entries = Object.entries(planet);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

const showSpeciesID = async (query) => {
    const specie = await starWars.getSpeciesById(query);

    const planetLink = specie.homeworld;
    const regExp = /\d/gm;
    const planetID = planetLink.match(regExp).join('');
    
    const planet = await starWars.getPlanetsById(planetID);
    const planetName = planet.name;
    specie.homeworld = planetName;

    const entries = Object.entries(specie);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

const showFilmsID = async (query) => {
    const film = await starWars.getFilmsById(query);
    const entries = Object.entries(film);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

async function getID() {

    if(!query2.value) {
        content.innerText = 'Try again!'
        contentHeader.innerText = 'Empty'
        showContainer();
        return;
    } 

    if(container.style.visibility === 'visible') hideContainer();

    showSpinner();

    if(IDselector.value === 'people') {
        const text = await showCharsID(query2.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    if(IDselector.value === 'planets') {
        const text = await showPlanetsID(query2.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    if(IDselector.value === 'species') {
        const text = await showSpeciesID(query2.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    if(IDselector.value === 'films') {
        const text = await showFilmsID(query2.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    setTimeout(() => {
        hideSpinner();
        showContainer();
    }, 1000);
}

queryBtn.addEventListener('click', getQuery);
queryBtn2.addEventListener('click', getID);
btnHide.addEventListener('click', hideContainer);