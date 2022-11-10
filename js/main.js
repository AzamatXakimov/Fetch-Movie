const elSearchForm = document.querySelector(".js-hero-form");
const elSearch = elSearchForm.querySelector(".js-search");
const elSearchType = elSearchForm.querySelector(".js-type-select");
const elSearchYear = elSearchForm.querySelector(".js-search-year");
const elMovieList = document.querySelector(".js-movie-list")
const elMovieTemp = document.querySelector(".js-movie-template").content;

function renderArray(arr){
    elMovieList.innerHTML = null;
    const elMovieFragment = new DocumentFragment();

    if(arr == undefined){
        const elNotFoundMovieText = document.createElement("h3");
        elNotFoundMovieText.textContent = "Movie Not Found";
        elNotFoundMovieText.classList.add("text-white")
        elMovieList.appendChild(elNotFoundMovieText)
    }
    else{
        arr.forEach(item => {
            const elTempClone = elMovieTemp.cloneNode(true);
    
            elTempClone.querySelector(".js-movie-img").src = item.Poster;
            elTempClone.querySelector(".js-movie-img").alt = item.Title;
            elTempClone.querySelector(".js-movie-title").textContent = item.Title;
            elTempClone.querySelector(".js-movie-year").textContent = `Year: ${item.Year}`;
            elTempClone.querySelector(".js-movie-type").textContent = `Type: ${item.Type}`;
    
            elMovieFragment.appendChild(elTempClone);
        });
    
        elMovieList.appendChild(elMovieFragment)
    }
}

function getInfo(searchValue, searchType = "", searchYear = ""){
    console.log(`https://www.omdbapi.com/?apikey=d4ca8e84&s=${searchValue}${searchType}${searchYear}`)
    fetch(`https://www.omdbapi.com/?apikey=d4ca8e84&s=${searchValue}${searchType}${searchYear}`) // request soro'v
    .then(res => res.json()) //response javob
    .then(data => {
        renderArray(data.Search);
        console.log(data);
    }) // code status 200 Ok
    .catch(err => console.error(err))
}

elSearchForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const elSearchValue = elSearch.value;
    const elsearchTypeValue = elSearchType.value;
    const elSearchYearValue = elSearchYear.value.trim();
    if(elsearchTypeValue == "type"){
        getInfo(elSearchValue, "", `&y=${elSearchYearValue}`)
    }
    else{
        getInfo(elSearchValue, `&type=${elsearchTypeValue}`, `&y=${elSearchYearValue}`)
    }
})

// fetch(`https://www.omdbapi.com/?apikey=d4ca8e84&s=${}`) // request soro'v
//     .then(res => res.json()) //response javob
//     .then(data => console.log(data)) // code status 200 Ok
//     .catch(err => console.error(err))
//     // .finally()