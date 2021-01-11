const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//setting up path for express js
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const paritalsPath = path.join(__dirname, '../templates/partials')

//setting up handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(paritalsPath);

//setting up static dir
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Peka'
    });
});

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'Weather App',
        name: 'Peka'
    });
});

app.get('/help',(req,res) =>{
    res.render('help',{
        msg: 'This is a help page',
        title: 'Weather',
        name: 'Peka'
    });
});

app.get('/weather', (req,res) =>{
    if(!req.query.address)
        return res.send({
            error: 'You must provide an address'
        });
    
    geocode(req.query.address,(error,{lat,lon,loc} = {})=>{
        if(error)
           return res.send({
                error
            });
        forecast(lat,lon,(error,{temp,weather,rainProp,feelsLike})=>{
            if(error)
                return res.send({
                    error
                });
            res.send({
                loc,
                temp,
                weather,
                rainProp,
                feelsLike
            });
        })
        
    })
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
        return res.send({
            error: 'You must have a search field'
        });
    res.send([{
        product: 'GPU'
    }]);
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        msg: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404',{
        msg: 'Page does not exist'
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});