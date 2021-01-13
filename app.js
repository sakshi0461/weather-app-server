const express = require('express')
const path = require('path')
const hbs = require('hbs');
const geocoder = require('./geocoder');

const app = express()

const viewslink = path.join(__dirname, '/template/views')
const partiallink = path.join(__dirname,'/template/partials')
const staticlink = path.join(__dirname,'/public')

app.use(express.static(staticlink))
app.set('view engine','hbs')
app.set('views',viewslink)
hbs.registerPartials(partiallink);

app.get('',(req,res) => {
    res.render('index',{
        title:'Welcome to Weather App!!!',
        author:'Sakshi Gupta'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        author:'Sakshi Gupta'
    })
})

app.get('/help',(req,res) => {
    res.render('help' , {
        title:'Help',
        author:'Sakshi Gupta'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.location){
        return res.render('404' ,{
            title:'Page Not Found',
            errormsg:'Location does not exist',
            author:'Sakshi Gupta'
        })
    }
    const loc = req.query.location

    geocoder(loc , (error , response) => {
        if(error){
            return res.render('404',{
                title:'Location Not Found',
                errormsg:error,
                author:'Sakshi Gupta'
            })
        }else{
            return res.render('weather', {
                title:'Weather',
                author:'Sakshi Gupta',
                response:response,
                location:loc
            })
        }   
    });
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'Error 404',
        errormsg:'Oops Page note found',
        author:'Sakshi Gupta'
    });
})
app.listen(3000 , () => {
    console.log('Server is running')
})
