
const form = document.querySelector('form');
const searchField = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const address = encodeURIComponent(searchField.value);
    messageOne.textContent = 'Loading ... ';

    fetch('http://localhost:3000/weather?address='+address)
    .then(res=> res.json())
    .then(res=>{
        if(res.error){
            messageTwo.textContent = res.error;
            messageOne.textContent = '';
        }
            
        else{
            messageTwo.textContent = `loc: ${res.loc} -- temp: ${res.temp} -- weather: ${res.weather} -- rainProp: ${res.rainProp} -- Feels like: ${res.feelsLike}`;
            messageOne.textContent = '';
        }
            
    });
    
});