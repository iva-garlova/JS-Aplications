function attachEvents() {
document.getElementById('submit').addEventListener('click', getWeather);
const forecastSecRef = document.getElementById('forecast');
const locationInput = document.getElementById('location')
const currentRef = document.getElementById('current');
const upcomingRef = document.getElementById('upcoming');

const baseLocationUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
const todayUrl = 'http://localhost:3030/jsonstore/forecaster/today';
const upcomingUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming';



async function getWeather(ev){
   try {
    const userInput = locationInput.value;
    forecastSecRef.style.display = 'block';
    const locationresponse = await fetch(baseLocationUrl);
    const locationData = await locationresponse.json();
    const currentLocationData = locationData.find(x => x.name === userInput);
    await fillTodayData(currentLocationData.code);
    await fillUpcomingData(currentLocationData.code)

   }catch {
    forecastSecRef.textContent = "Error";

   }
    
}
async function fillUpcomingData(code){
    const response = await fetch(upcomingUrl + code);
    const data = await response.json();
    const upcomingInfo =  createForecadtUpcomingSection(data)
    upcomingRef.appendChild(upcomingInfo)


}

function createForecadtUpcomingSection(data){
    const container = document.createElement('div');
    container.classList.add('forecast-info');
    const upcoming1Day = generateSpan('upcomig', "symbol", data.name, data.forecast[0]);
    const upcoming2Day = generateSpan('upcomig', "symbol", data.name, data.forecast[1]);
    const upcoming3Day = generateSpan('upcomig', "symbol", data.name, data.forecast[2]);
    container.appendChild(upcoming1Day);
    container.appendChild(upcoming2Day);
    container.appendChild(upcoming3Day);

    return container;
}

function generateSpan(classConatainer, classSpan, name, data){
    const spanContainer = generateSpan('condition', data)
    spanContainer.classList.add(classConatainer);

    const spanName = document.createElement('span');
    spanName.classList.add(classSpan);
    classSpan === 'symbol' ? spanName.innerHTML = findSymbol(data.condition) : spanName.textContent = name
    spanName.textContent = name;

    const degree = document.createElement('span');
    degree.classList.add('forecast-data');
    degree.innerHTML = `${data.low + findSymbol("Degrees")}/${data.high + findSymbol("Degrees")}`;

    const condition = document.createElement('span');
    condition.classList.add('forecast-data');
    condition.textContent = data.condition;
    spanContainer.appendChild(spanName);
    spanContainer.appendChild(degree);
    spanContainer.appendChild(condition);
    return spanContainer;

    
}

async function fillTodayData(code){
const response = await fetch(todayUrl + code);
const data  = await response.json();
const todayInfo = createForecastTodaySection(data);
currentRef.appendChild(todayInfo);

}

function createForecastTodaySection(data){
    const container = document.createElement('div');
    container.classList.add('forecasts');
    const conditionSpan = document.createElement('span');
    conditionSpan.classList.add('condition');
    condition.classList.add('symbol');
    conditionSpan.innerHTML = findSymbol(data.forecast.condition);

    container.appendChild(conditionSpan);
    const spanContainer = generateSpan("condition","forecast-data",  data.name, data.forecast);

   
    container.appendChild(spanContainer);

    return container;
    


}
function findSymbol(condition){
    switch(condition){
        case "Sunny":  return '&#x2600';
        case "Partly sunny": return "&#x26C5";
        case "Overcast": return "&#x2601";
        case "Rain": return "&#x2614";
        case "Degrees": return "&#176";
        default: return condition;
    }
}
}

attachEvents();