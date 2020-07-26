const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const spinner = document.getElementById('spinner');

function showLoadingSpinner() {
    spinner.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!spinner.hidden) {
        quoteContainer.hidden = false;
        spinner.hidden = true;
    }
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    // Created and using personal CORS Proxy URL to make our API call eliminating the CORS error
    const proxyUrl = 'https://arcane-bayou-46264.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add "Unknown"
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quote.Text.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        console.log(error)
        alert("Javascript error: " + "Check Console Log for error" + error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// Start on Page Load
getQuoteFromAPI();
