const express =  require('express');
const path = require('path');
const port = process.env.PORT || 8000;


const app = express();

const weatherData = require('./utils/weatherData');

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static('assets'));


app.get('/',function(req,res){

    return res.render('home',{
        title: "Weather App"
    });

});

// localhost://8000/weather?address=delhi
app.get('/weather', function(req,res){

    const address = req.query.address;

    if(!address){
        return res.send({
            error: "You must enter address"
        })
    }

    weatherData(address, function(error, {temperature,description,cityName} = {}){
       
        if(error){
            return res.send({
                error
            })
        }   
        res.send({
            temperature,
            description,
            cityName
        });

    });

});

app.get('*', function(req,res){
    return res.send("<h1> Page not found </h1>");

});

app.listen(port, function(err){
    if(err){
        console.log("error",err);
        return;
    }
    console.log("express is running on port",port);
});