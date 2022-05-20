// Quotes API documentation: https://type.fit/api/quotes

// IIFE to make sure our code remains bundled and does not
// mess up some global variables
(() => {
    // ---------- Variables
    let quotes = [];

    // ---------- Functions
    async function getQuotes() {
        const apiURL = "https://type.fit/api/quotes";
        try {
            if(quotes.length > 0) return false;
            const response = await fetch(apiURL);
            quotes = await response.json(); // Use our "global" variable quotes
        } catch(error) {
            // This is where you would handle your error !!!
            console.error(error);
        }
    }

    function getRandomQuote() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const randomIndex = Math.floor(Math.random() * Math.floor(quotes.length))
        return quotes[randomIndex];
    }

    function showNewQuote(quote){
        console.log("New");
        console.log(quote);
    }

// Event Handlers & Initial function calls
    getQuotes()
        .then(() => getRandomQuote())
        .then(quote => showNewQuote(quote))
    ;
})()