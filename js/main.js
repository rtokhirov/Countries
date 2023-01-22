const body = document.querySelector('body');
let mbDiv = document.querySelector('.main__bottom')
const darkBtn = document.getElementById('darkBtn');
const shape = document.querySelector('.shape')
let regions = document.querySelectorAll('.regions')
let regionFilter = document.querySelector('.regionFilter')
let searchText = document.querySelector('#inp')
let mode = localStorage.getItem('mode') ? localStorage.getItem('mode') : null;

if (mode) {
    body.classList.add('dark');
    setShape()
}
darkBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    mode ? localStorage.setItem('mode', '') : localStorage.setItem('mode', 'dark')
    setShape()
})

function setShape() {
    if (body.classList.contains('dark')) {
        shape.src = "./img/shape-dark.svg";
    } else {
        shape.src = "./img/shape.svg";
    }
}


let api = 'https://restcountries.com/v3.1/all';

const request = new XMLHttpRequest();
let boshArray = []
request.addEventListener('readystatechange', () => {
    if (request.readyState != 4) {
        // console.log('Loading');
    } else if (request.readyState == 4) {
        sarala(JSON.parse(request.responseText));
        console.log(JSON.parse(request.responseText));
        boshArray = [...JSON.parse(request.responseText)];
    }
})

request.open(('get'), api);
request.send()



function chiqar(data) {

    let counter = 0
    mbDiv.innerHTML = ``

    data.forEach((element) => {

        let counrty = element.name.common;
        let region = element.region;
        let capital = "No capital"
        let flag = element.flags.svg;
        let population = element.population;

        counter++
        if (element.capital) {
            capital = element.capital[0]
        }

        mbDiv.innerHTML += `
            <div class="country">
                <a class="country__img" href="./about.html"><img src="${flag}"></a>

                <div class="country__info">
                    <h2>${counrty}</h2>
                    <p><b>Population: </b> ${population}</p>
                    <p><b>Region: </b> ${region}</p>
                    <p><b>Capital: </b> ${capital}</p>
                </div>
            </div>
        `
            // console.log(counter);
    });
}



let hisobla = false;
let regionSave = "All..."
    // console.log(regionSave); 
regions.forEach(element => {
    element.addEventListener('click', () => {
        hisobla = true
            // console.log(element.textContent);
        regionSave = element.textContent
        regionFilter.innerHTML = regionSave;
        sarala(boshArray);
    });
});

let regArray = []

function sarala(data) {
    regArray = []
    data.forEach((element) => {
        if (element.region == regionSave) {
            regArray.push(element)
        } else if (regionSave == "All...") {
            regArray = data;
        }
    });
    // console.log(regArray);
    // console.log(hisobla);
    let soni = regArray.length;
    if (hisobla) {
        // console.log('ishladi', soni);
        regionFilter.innerHTML += ' ' + ` (${soni})`;
    }
    qidir(regArray)

}


searchText.addEventListener('input', () => {
    qidir(regArray)
})

function qidir(date) {
    let searchedArray = []
    date.forEach(element => {
        if (element.name.common.toLowerCase().includes(searchText.value.toLowerCase())) {
            searchedArray.push(element)
        } else if (searchText.value == "") {
            searchedArray = date;
        }
    })
    chiqar(searchedArray)
}