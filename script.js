const wowheadUrl = 'https://tbc.wowhead.com/search?q='

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

function redirectToWowHeadIfSearch(searchTerm) {
    
    console.log('searchTerm', searchTerm)
    if (searchTerm) {
        location.assign(wowheadUrl + searchTerm)
    }
}

function addSearchToInput(searchTerm) {
    console.log('adding search to input', searchTerm)
}

function runSearchActionsIfSearch() {
    const searchTerm = getSearchTermFromUrl()
    if (searchTerm) {
        console.log("this is a search")
        addSearchToInput(searchTerm)
        redirectToWowHeadIfSearch(searchTerm)
    }
}

window.onload = function() {
    console.log('loaded')
    const linkButton = document.getElementById('get-link')
    linkButton.addEventListener("click", makeLink)
    runSearchActionsIfSearch()
}