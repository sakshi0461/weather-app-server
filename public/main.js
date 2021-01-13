const form = document.querySelector('form')
const loc = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

form.addEventListener('submit',(e) => {
   e.preventDefault();

   msg1.textContent = 'Loading...'
   msg2.textContent = ''

   fetch('https://api.openweathermap.org/data/2.5/weather?q='+loc.value+'&appid=928ca37137cadf95ccfa6139dae1490a').then(response => {
    response.json().then(data => {
       console.log('Hello');s
           if(data.cod=="404"){
               msg1.textContent = data.message
            }else{
               msg1.textContent = data.name + ',' + data.sys.country
               msg2.textContent = 'Temp is '+ data.main.temp + ' it feels like '+data.main.feels_like+' . Pressure is '+data.main.pressure+' with humidity '+data.main.humidity
           }
    })
  })
})