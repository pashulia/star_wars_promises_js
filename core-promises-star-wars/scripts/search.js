// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)

let query = document.querySelector('#input1');
let query2 = document.querySelector('#input2');
const container = document.querySelector('#result-container');
const content = document.querySelector('#content');
const queryBtn = document.querySelector('#byQueryBtn');
const queryBtn2 = document.querySelector('#byQueryBtn2');
const spinner = document.querySelector('.spinner')
const btnHide = document.querySelector('.delete');
const contentHeader = container.querySelector('#header');
const selector = document.querySelector('#querySelector');
const IDselector = document.querySelector('#IDSelector');

const showSpinner = () => spinner.style.visibility = 'visible';
const hideSpinner = () => spinner.style.visibility = 'hidden';

const showContainer = () => container.style.visibility = 'visible';
const hideContainer = () => container.style.visibility = 'hidden';

const showChars = async (query) => {
    const char = await starWars.searchCharacters(query);
    const charResults = char.results[0];
    
    const planetLink = charResults.homeworld;
    const regExp = /\d/gm;
    const planetID = planetLink.match(regExp).join('');
    
    const planet = await starWars.getPlanetsById(planetID);
    const planetName = planet.name;
    charResults.homeworld = planetName;
    
    const objEn = Object.entries(charResults);
    const text = objEn.map(el => el.join(': ')).join('\n').replaceAll(',', '\n');

    return text;
}

const showPlanets = async (query) => {
    const planet = await starWars.searchPlanets(query);
    const planetResults = planet.results[0];
    const entries = Object.entries(planetResults);
    const text = entries.map(el => el.join(': ')).join('\n').replaceAll(',', '\n'); 
    return text;
}

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

async function getQuery() {

    if(!query.value) {
        content.innerText = 'Try again!'
        contentHeader.innerText = 'Empty'
        showContainer();
        return;
    } 

    if(container.style.visibility === 'visible') hideContainer();

    showSpinner();

    if(selector.value === 'people') {
        const text = await showChars(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    if(selector.value === 'planets') {
        const text = await showPlanets(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

    if(selector.value === 'species') {
        const text = await showSpecies(query.value)
        .catch(err => content.innerText = 'Ooops. Something went wrong...');
        content.innerText = text;
        contentHeader.innerText = query.value;
    };

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