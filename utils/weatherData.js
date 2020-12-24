const request = require('request');
const constants = require('../config');

const weatherData = function(address,callback){

    const url = constants.openWeatherMap.BASE_URL +  encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;

    request({url, json:true}, function(error, res){
        // console.log(url)
        // console.log(typeof(body));
        // console.log(body.body.main);

        if(error){
            console.log('Cannot fetch data from openweather api',undefined);
            return;
        }

        callback(undefined,{
            temperature: res.body.main.temp,
            description: res.body.weather[0].description,
            cityName: res.body.name

        });

    });

}

module.exports = weatherData;