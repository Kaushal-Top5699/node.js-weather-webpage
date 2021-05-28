console.log('Client side javascript file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    //messageTow.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                const location = data.address
                const weather_description = data.weather_description
                const temperature = data.temperature
                const feels_like = data.feels_like
                const chance_of_rain = data.chance_of_rain

                const forcast = 'Its ' + temperature + ' degrees in ' + location + ' ,but it feels like ' + feels_like +
                    ' degrees. Forcast is ' + weather_description + ' and chance of rain is ' +
                    chance_of_rain + '%'

                messageOne.textContent = location
                messageTwo.textContent = forcast
            }
        })
    })
})