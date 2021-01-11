const request = require('request');

const forcast = (lat,lon,callback)=>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c68846606ba18b4eae2da66446d648f3&units=metric`;
    request({url, json: true}, (error,{body})=>{
        if(error)
            callback("Weather service currently unavailable", undefined);
        else if(body.cod === '400')
            callback("Unable to find location", undefined);
        else
            callback(undefined,{
                temp: body.current.temp,
                weather: body.current.weather[0].description,
                rainProp: body.daily[0].pop,
                feelsLike: body.current.feels_like
            })    
    });
}

module.exports = forcast;