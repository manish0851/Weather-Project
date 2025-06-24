const apiKey = "20da423906ccf27bec8c2d81c8f4a2eb"
const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")
formEle.addEventListener("submit", (e)=>{
    e.preventDefault()
    // console.log(cityNameEle.value);
    const cityValue = cityNameEle.value
    getWeatherData(cityValue)
})
async function getWeatherData(cityValue){
    try{
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response is not ok!")
        }
        const data = await response.json()
        // console.log(data);
        const temprature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
           return `<div>${detail}</div>`
        }).join("")
    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"
    }
}
let updateClock = function(){
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let dayNumber = date.getDay();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yy = date.getFullYear();
    // months increament by 1 as zero-based value
    mm++;

    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let dayName = days[dayNumber-1];

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    dd = dd <10 ? "0" + dd : dd;
    mm = mm <10 ? "0" + mm : mm;

    let timeElement = document.querySelector('.time-container');
    timeElement.innerHTML = `
        <span class="clock-hours">${hours}:</span>
        <span class="clock-minutes">${minutes}</span>
        <span class="clock-seconds">${seconds}</span>
    `;

    let dateElement = document.querySelector('.date-container');
    dateElement.innerHTML = `
        <p class="clock-day-name">${dayName}</p>
        <span class="clock-date">${dd}/${mm}/${yy}</span>
    `;

    // updating background based on time
    if(hours >5 && hours < 8){
        updateBackground('sunrise');
    }else if(hours< 17){
        updateBackground('afternoon');
    } else if(hours < 19){
        updateBackground('sunset');
    }else{
        updateBackground('night');
    }
    
}

updateClock();
setInterval(updateClock, 1000);


function updateBackground(dayStatus){
    let backgroundElement = document.querySelector('.main');
    if(dayStatus === 'sunrise'){
        backgroundElement.style.backgroundImage = "url('../images/sunrise.jpg')";
    }
    else if(dayStatus === 'afternoon'){
        backgroundElement.style.backgroundImage = "url('../images/afternoon.jpg')";
    } else if(dayStatus === 'sunset'){
        backgroundElement.style.backgroundImage = "url('../images/sunset.jpg')";
    } else {
        backgroundElement.style.backgroundImage = "url('../images/night.jpg')";
    }
    backgroundElement.style.backgroundSize = 'cover';
    backgroundElement.style.backgroundPosition = 'center';
    backgroundElement.style.backgroundRepeat = 'no-repeat';

}