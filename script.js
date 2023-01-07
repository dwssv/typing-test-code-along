// Random Quotes API URL
const quoteSection = document.getElementById('quote')
const userInput = document.getElementById('quote-input')

// Initialize values
let quote = ''
let time = 60
let timer = ''
let mistakes = 0

// Display random quotes
// const renderNewQuote = async () => {
//     // Fetch cotent from API
//     const response = await fetch(quoteApiUrl)
//     // Store parsed returned promise as json 
//     let data = await response.json()
//     // Access content of data
//     quote = data.content
//     // Array of each character quote
//     let arr = quote.split('').map((value) => {
//         // wrap each character in span tag
//         return "<span class='quote-chars'>" + value + "</span>"
//     })
//     // Join elements in array and display on quote section
//     // a += b is a = a + b
//     quoteSection.innerHTML = arr.join('')  // don't know why they used the += and not the = ¯\_(ツ)_/¯ 
// }

const renderNewQuote = async (len) => {
    const dict = {
        'short': 'minLength=25&maxLength=50',
        'medium': 'minLength=125&maxLength=150',
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
}

// Fake API request for debugging
const fakeApiReq = () => {o
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

// New test when short / medium / long is clicked
document.getElementById('selection').addEventListener('click', e => {
    boldSelection(e.target.id)
    loadTest(e.target.id)
})

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
        else if (userInputChars[index] == null) {   // undefined also works instead of null
            // If you try to index an empty array you get undefined. I dont understand why they used null
            // const emptyArr = [], emptyArr[1] returns undefined
            // const const twoItems = ['a', 'b'], twoItems[2] returns undefined
            // forEach goes through each character in the quoteChars array
            // When a user backspaces or when the array is empty, userInputChars[index] is undefined
            // If the conditions above are met, the if/else statement to remove class below runs

            // null: intentional absence of any value, must be assigned
            // undefined: variables that do not have an assigned value

            // In conclusion, from my research, I think that in this case. undefined might be a better use.
            // **************************************

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
    console.log(e.key)
    for (const l of letters.split('')) {
        if (l === e.key) {
            keystroke += 1
            console.log(keystroke)
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
    let letterNum = userInput.value.split('').length
    console.log(wordNum)
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