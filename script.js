// IIFE to make sure our code remains bundled and does not
// mess up some global variables
(() => {
    // ---------- Variables and elements
    let quotes = [];
    const quoteContainer = document.getElementById("quote-container");
    const quoteText = document.getElementById("quote");
    const quoteAuthor = document.getElementById("author");
    const twitterBtn = document.getElementById("twitter");
    const newQuoteBtn = document.getElementById("new-quote");
    const loader = document.getElementById("loader");

    // ---------- Functions
    async function getQuotes() {
        // https://type.fit/api/quotes
        const apiURL = "https://type.fit/api/quotes";
        try {
            startLoading(); // We call this here and in getRandomQuote (once for the initial load, once for the "new quote" functionality
            if(quotes.length > 0) return false;
            const response = await fetch(apiURL);
            quotes = await response.json(); // Use our "global" variable quotes
        } catch(error) {
            // This is where you would handle your error !!!
            console.error(error);
        }
    }

    function getRandomQuote() {
        startLoading(); // We call this here and in getQuotes (once for the initial load, once for the "new quote" functionality
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const randomIndex = Math.floor(Math.random() * Math.floor(quotes.length))
        const randomQuote = quotes[randomIndex];
        showNewQuote(randomQuote);
    }

    function showNewQuote(quote){
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author || "Unknown";

        quote.text.length > 50
            ? quoteText.classList.add("long-quote")
            : quoteText.classList.remove("long-quote");

        completeLoading();
    }

    function tweetQuote(){
        // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
        const text = quoteText.textContent;
        const author = quoteAuthor.textContent;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
        window.open(twitterUrl, "_blank");
    }

    function startLoading(){
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

    function completeLoading(){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }

    // ---------- Event Handlers
    getQuotes().then(() => getRandomQuote()); // Initial call
    newQuoteBtn.addEventListener("click", getRandomQuote);
    twitterBtn.addEventListener("click", tweetQuote);
})()