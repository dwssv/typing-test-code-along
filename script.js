// Random Quotes API URL
const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100'
const quoteSection = document.getElementById('quote')
const userInput = document.getElementById('quote-input')

// Initialize values
let quote = ''
let time = 60
let timer = ''
let mistakes = 0