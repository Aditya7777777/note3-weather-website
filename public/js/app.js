console.log('Client side javascript file is loaded')

// // Goal: Fetch weather!c

// // 1. Setup a call to fetch to fetch weather for Boston
// // 2. Get the parse JSON response
// - If error property, print error
// - If no error property, print location and forecast
// // 3. Refresh the browser and test your work
const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    fetch(`http://api.weatherstack.com/current?access_key=729410b575176514c8132e463d622fdf&query=${location}&units=f`).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
         messageOne.textContent = 'Unable to find location.Try another search'
         messageTwo.textContent = ''
        }else{
        // console.log("Location : "+data.location.name)
        // console.log("Forecast : "+data.current.feelslike)
        messageOne.textContent = data.location.name
        messageTwo.textContent = data.current.feelslike
        }
        
    })
})

    console.log(location)
})