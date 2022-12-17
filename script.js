// Random Quotes API URL
const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100'
const quoteSection = document.getElementById('quote')
const userInput = document.getElementById('quote-input')

// Initialize values
let quote = ''
let time = 60
let timer = ''
let mistakes = 0

// Display random quotes
const renderNewQuote = async () => {
    // Fetch cotent from API
    const response = await fetch(quoteApiUrl)
    // Store parsed returned promise as json 
    let data = await response.json()
    // Access content of data
    quote = data.content
    // Array of each character quote
    let arr = quote.split('').map((value) => {
        // wrap each character in span tag
        return "<span class='quote-chars'>" + value + "</span>"
    })
    // Join elements in array and display on quote section
    // a += b is a = a + b
    quoteSection.innerHTML += arr.join('')  // don't know why they used the += and not the = ¯\_(ツ)_/¯ 
}

// New sentence on window load event
window.onload = () => {
    userInput.value = ''
    // Assign css with ".style" property
    document.getElementById('start-test').style.display = 'block'
    document.getElementById('stop-test').style.display = 'none'
    userInput.disabled = true
    // Display new quote
    renderNewQuote()
}