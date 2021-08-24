console.log('Client side js loaded yey!')

//  fetch and dump to console on user
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

/* fetch('http://localhost:3000/weather?address=Bangkok').then((response) => {
    response.json().then((data) => {

        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    
    })
}) */

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

//  p
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

//messageOne.textContent = 'From JavaScript'
//  event listener form
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()          //prevent the refresh
    //console.log('test')       //reload the page but shows when click on search

    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})