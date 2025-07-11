const buttonEl = document.getElementById('search-button')
const formEl = document.getElementById('form')
const inputEl = document.getElementById('input')
const resultitemsEl = document.getElementById('big-div')
const load = document.getElementById('more-button')
let page = 1;

formEl.addEventListener('submit', (event) => {
    page = 1;
    event.preventDefault()
    fetchImages()

})

load.addEventListener('click', (event) => {
    page++
    event.preventDefault()
    fetchImages()

})

async function fetchImages() {

    const token = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"
    const inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${token}`
    
    if(inputData.trim().length){
        alert("Please add search trem")
        return;
    }
    try{

    const fetched = await fetch(url);
    const data = await fetched.json();

    if (page == 1) {
        resultitemsEl.innerHTML = ""
    }

const ittems = data.results
    for (let i = 0; i < data.results.length; i++) {
        const imgUrl = data.results[i].urls.regular
        const description = data.results[i].alt_description;
        const originUrl = data.results[i].links.html

        const resultitemEl = document.createElement(`div`)
        resultitemEl.classList.add('result-item')

        const imgEl = document.createElement('img');
        imgEl.classList.add('image')
        imgEl.setAttribute('src', imgUrl)

        const textEl = document.createElement('a');
        textEl.classList.add('descriptions')
        textEl.innerText = description;
        textEl.setAttribute('href', originUrl)
        textEl.setAttribute('target', '_blank')


        resultitemEl.append(imgEl);
        resultitemEl.append(textEl);
        resultitemsEl.append(resultitemEl);
    }

    load.style.display= "block"
    if(data.results.length > 0 || data.total_page == page){
        load.style.display = "block"
    }else{
           load.style.display = "none"
    }
} catch{
    alert("Sorry something went wrong")
}
}
