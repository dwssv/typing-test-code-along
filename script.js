// Random Quotes API URL
const quoteSection = document.getElementById('quote')
const userInput = document.getElementById('quote-input')

// Initialize values
let quote = ''
let time = 60
let timer = ''
let mistakes = 0

const renderNewQuote = async (len) => {
    if (!len) {
        len = document.getElementsByClassName('selected-len')[0].innerText
    }
    const dict = {
        'short': 'minLength=25&maxLength=50',
        'medium': 'minLength=100&maxLength=125',
        'long': 'minLength=200&maxLength=225'
    }
    const res = await fetch('https://api.quotable.io/random?' + dict[len]) 
    let data = await res.json()
    let quote = data.content
    // Array of each character quote
    let arr = quote.split('').map((value) => {
        // wrap each character in span tag
        return "<span class='quote-chars'>" + value + "</span>"
    })
    quoteSection.innerHTML = arr.join('')
    console.log(len)
}

// Fake API request for debugging
const fakeApiReq = () => {
    quote = 'A cat and a cow.'
    let arr = quote.split('').map((value) => {
        return "<span class='quote-chars'>" + value + "</span>"
    })
    quoteSection.innerHTML += arr.join('')
}

// Add bold style to selected length
const boldSelection = (len) => {
    let arr = ['short', 'medium', 'long']
    // remove selected test length from array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == len) {
            arr.splice(i, 1)
        }
    }
    // remove styles from the other two
    document.getElementById(arr[0]).classList.remove('selected-len')
    document.getElementById(arr[1]).classList.remove('selected-len')
    document.getElementById(len).classList.add('selected-len')
}

// Load test
const loadTest = (len) => {
    userInput.value = ''
    // Assign css with ".style" property
    // document.getElementById('start-test').style.display = 'block'
    document.getElementById('stop-test').style.display = 'none'
    userInput.disabled = false

    // Display quote and text input
    quoteSection.style.display = 'block'
    userInput.style.display = 'block'

    // Check if result is displayed. If true set display property to none
    if (document.querySelector('.result').style.display = 'block') {
        document.querySelector('.result').style.display = 'none'
    }

    // reset mistakes
    quote = ''
    quoteSection.innerHTML = quote
    time = 60
    timer = '0'
    document.getElementById('timer').innerText = timer
    mistakes = 0
    document.getElementById('mistakes').innerText = mistakes

    // Display new quote
    renderNewQuote(len)
    // fakeApiReq()
}
// New sentence on window load event
window.onload = () => {
    boldSelection('short')
    loadTest('short')
}

// Logic to compare input to quote
userInput.addEventListener('input', () => {
    let quoteChars = document.querySelectorAll('.quote-chars')
    // Convert NodeList to Array with Array.from()
    quoteChars = Array.from(quoteChars)
    // Array of user input characters
    let userInputChars = userInput.value.split('')
    // Loop through each characters in quotes
    quoteChars.forEach((char, index) => {
        // Check if char (quote character) = userInputChars[index] (input character)
        if (char.innerText == userInputChars[index]) {
            char.classList.add('success')
        }
        // If user hasn't entered anything or backspaced
        else if (userInputChars[index] == undefined) {

            // Remove class if any 
            if (char.classList.contains('success')) {
                char.classList.remove('success')
            }
            else {
                char.classList.remove('fail')
            }
        }
        // If user enters wrong character
        else {
            // Check if fail class has already been added
            if (!char.classList.contains('fail')) {
                // increment and display mistakes
                mistakes += 1
                // Add fail class
                char.classList.add('fail')
            }
            document.getElementById('mistakes').innerText = mistakes
        }
        //Return true if all characters are entered correctly
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        // End test if all characters are correct
        if (check) {
            displayResult()
        }

    })

})

// Update timer on screen
function updateTimer() {
    if (time == 0) {
        // End test if time = 0
        displayResult()
    } else {
        // decrement the 'time' variable and update on html
        document.getElementById('timer').innerText = --time
    }
}

// Set time
const timeReduce = () => {
    time = 60
    timer = setInterval(updateTimer, 1000)

}

 // get total keystroke
 const letters = '0123456789abcdefghijklmnopqrstuvwxyz!-.,? '
 let keystroke = 0
 document.addEventListener('keydown', e => {
    for (const l of letters.split('')) {
        if (l === e.key) {
            keystroke += 1
         }
    }
 })

// End test
const displayResult = () => {
    // Stop timer
    clearInterval(timer)

    // Show result div
    document.querySelector('.result').style.display = 'block'
    document.getElementById('stop-test').style.display = 'none'
    userInput.disabled = true

    // hide quote and text input
    quoteSection.style.display = 'none'
    userInput.style.display = 'none'

    let timeTaken = 1
    if (time != 0) {
        timeTaken = (60 - time) / 60
    }
    let wordNum = userInput.value.split(' ').length
    document.getElementById('wpm').innerText = Math.round(wordNum / timeTaken) + ' wpm'
    let accuracy = Math.round(((keystroke - mistakes) / keystroke) * 100)
    document.getElementById('accuracy').innerText = accuracy + '%'
}


// Start test 
userInput.addEventListener('focus', () => {
    timer = ''
    mistakes = 0
    timeReduce()
    userInput.focus()
    document.getElementById('stop-test').style.display = 'block'
})


// New test when short / medium / long is clicked
document.getElementById('selection').addEventListener('click', e => {
    boldSelection(e.target.id)
    loadTest(e.target.id)
})
