var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition =  document.querySelector('.weatherCondition');
const temp = document.querySelector('.temperature span');
const loc = document.querySelector('.place');
const dateElement = document.querySelector('.date');


const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


dateElement.textContent = new Date().getDate() + "," + months[new Date().getMonth()];


weatherForm.addEventListener('submit', function(event){

    event.preventDefault();

    loc.textContent="loading...";
    temp.textContent="";
    weatherCondition.textContent="";

    const locationApi = fetchWeather + "?address=" + search.value;

    fetch(locationApi).then(function(response){

        response.json().then(function(data){
            
            if(data.error){
                loc.textContent=data.error;
                temp.textContent="";
                weatherCondition.textContent="";
                return;
            }

                if( data.description === "rain" || data.description === "fog" || data.description === "haze" || data.description === "hail" || data.description === "snow"){
                    weatherIcon.className ="wi wi-day-" + data.description;
                }
                else if(data.description === "clear sky"){
                    weatherIcon.className ="wi wi-day-sunny"
                }
                else{
                    weatherIcon.className ="wi wi-day-cloudy"
                }

            loc.textContent= data.cityName;
            temp.textContent= (data.temperature-273.5).toFixed(1)+String.fromCharCode(176)+"C";
            weatherCondition.textContent= data.description.toUpperCase();


        });
    });

});
