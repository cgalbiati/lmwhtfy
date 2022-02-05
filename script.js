const wowheadUrl = 'https://tbc.wowhead.com/search?q='
const waitMult = 150
const mouseMoveWait = 3000
const moveToCLickWait = 1000
const pause = 1000
const pauseBeforeRedirect = 500

function typingWait(len) {
    return mouseMoveWait + waitMult * (len + 1)
}

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
    searchTerm.split('').forEach((letter, idx) => {
        setTimeout(() => {
            const input = document.getElementById('search-input')
            const inputText = input.value
            input.value = inputText + letter
        }, typingWait(idx))
    })
}
function animateMouseToInput() {
    document.getElementById("mouse").classList.add("moving-mouse")
}
function setMouseToCursor() {
    setTimeout(() => {
        console.log('setting to cursor')
        const mouse = document.getElementById("mouse")
        mouse.classList.remove("moving-mouse")
        mouse.classList.add("cursor")

    }, mouseMoveWait)
}

function animateMouseToButton(searchTearmLength) {
    setTimeout(() => {
        console.log('animating to button')
        const mouse = document.getElementById("mouse")
        mouse.classList.remove("cursor")
        mouse.classList.add("clicking-mouse")

    }, typingWait(searchTearmLength) + pause)
}

function runSearchActionsIfSearch() {
    const searchTerm = getSearchTermFromUrl()
    if (searchTerm) {
        console.log("this is a search")
        animateMouseToInput()
        setMouseToCursor()
        addSearchToInput(searchTerm)
        animateMouseToButton(searchTerm.length)
        clickButton(searchTerm.length)
        setTimeout(() => {
            console.log('done')
            redirectToWowHeadIfSearch(searchTerm)
                }, typingWait(searchTerm.length) + pause + moveToCLickWait + pauseBeforeRedirect)
        
    }
}
function handleGo() {
    const searchTerm = getSearchFromInput()
    redirectToWowHeadIfSearch(searchTerm)
}
function clickButton(searchTearmLength) {
    setTimeout(() => {
        document.getElementById("search-submit").classList.add("button-hover")
    }, typingWait(searchTearmLength) + pause + moveToCLickWait)
}

window.onload = function() {
    console.log('loaded')
    const linkButton = document.getElementById('get-link')
    linkButton.addEventListener("click", makeLink)
    const goButton = document.getElementById('search-submit')
    goButton.addEventListener("click", handleGo)

    runSearchActionsIfSearch()
}