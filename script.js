const wowheadUrl = 'https://tbc.wowhead.com/search?q='
const waitMult = 150

console.log('script.js')

function getSearchFromInput() {
    const term = document.getElementById('search-input').value
    console.log('term from input', term)
    return term
}

function makeLink() {
    console.log('making link')
    const term = getSearchFromInput()
    const pageUrl = location.protocol + '//' + location.host + location.pathname
    const url = pageUrl + "?q=" + term 
    console.log('new link is', url)
    const a = document.createElement('a');
      const linkText = document.createTextNode(url);
      a.appendChild(linkText);
      a.title = "wowhead search link";
      a.href = url;
      const container = document.getElementById('link-container')
      container.appendChild(a);

}

function getSearchTermFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.q
}

function timeout(cb, time=10) {
    setTimeout(time, cb)
}

function redirectToWowHeadIfSearch(searchTerm) {
    
    console.log('searchTerm', searchTerm)
    if (searchTerm) {
        console.log('redirecting to ', wowheadUrl + searchTerm)
        location.assign(wowheadUrl + searchTerm)
    }
}

function addSearchToInput(searchTerm) {
    console.log('adding search to input', searchTerm)
    const input2 = document.getElementById('search-input')
    console.log('input start', input2.value)
    input2.value = 'hello '
    searchTerm.split('').forEach((letter, idx) => {
        console.log('letter timeout', letter, idx, waitMult * (idx + 1))
        setTimeout(() => {
            console.log('adding letter')
            const input = document.getElementById('search-input')
            const inputText = input.value
            input.value = inputText + letter
        }, waitMult * (idx + 1))
    })
}

function runSearchActionsIfSearch() {
    const searchTerm = getSearchTermFromUrl()
    if (searchTerm) {
        console.log("this is a search")
        addSearchToInput(searchTerm)
        setTimeout(() => {
            console.log('done')
            redirectToWowHeadIfSearch(searchTerm)
                },  waitMult * (searchTerm.length + 1))
        
    }
}

window.onload = function() {
    console.log('loaded')
    const linkButton = document.getElementById('get-link')
    linkButton.addEventListener("click", makeLink)
    runSearchActionsIfSearch()
}