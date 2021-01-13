const request = require('request');

const geocoder = (address , callback) => {
   
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=928ca37137cadf95ccfa6139dae1490a';
   
    request({url} , (error , response) => {
        if(error){
            console.log('Unable to connect');
            callback(error , undefined);
        }else{
            const data = JSON.parse(response.body);
            callback(undefined,'Temp is '+ data.main.temp + ' it feels like '+data.main.feels_like+' . Pressure is '+data.main.pressure+' with humidity '+data.main.humidity);
        }
    });

};
module.exports = geocoder; 

