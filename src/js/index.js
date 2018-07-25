import { httpAsync } from './services';
import {
    createMovieCard,
    createInitialSection,
    createMovieSection,
    clearBox
} from './movies';
import { getDifferentCollections } from './movie';

const searchButton = document.getElementById('search');
const initalHtml = createInitialSection();
document.getElementById('contentDiv').appendChild(initalHtml);

// Filter event
searchButton.addEventListener('click', filterItems);

// Get the Popular Movies
const urlForPopular = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1";
const urlForUserCollections = "http://localhost:3000/userCollections";

console.log(urlForPopular);

// process the Response for Popular Movies
function processResponseForPopular(responseText) {
    let response = JSON.parse(responseText);
    console.log(response);

    //console.log(response.results[0]);
    if (response.results.length > 0) {
        var movieDiv1 = document.getElementById('popularCardGroup1');
        var movieDiv2 = document.getElementById('popularCardGroup2');
        var movieDiv3 = document.getElementById('popularCardGroup3');
        var movieDiv4 = document.getElementById('popularCardGroup4');

        for (var i = 0; i < 12; i++) {
            let movie = response.results[i];
            let cardDiv = createMovieCard(movie, false);

            if (i <= 2)
                movieDiv1.appendChild(cardDiv);
            else if (i > 2 && i <= 5)
                movieDiv2.appendChild(cardDiv);
            else if (i > 5 && i <= 8)
                movieDiv3.appendChild(cardDiv);
            else if (i > 8 && i <= 11)
                movieDiv4.appendChild(cardDiv);
        }
    }
}

// Process the Response for UserCollections
function processResponseForUserCollections(responseText) {
    let response = JSON.parse(responseText);
    console.log(response);
    let actionCount = 0;
    let thrillerCount = 0;
    let comedyCount = 0;
    let scienceFictionCount = 0;
    let horrorCount = 0;

    //console.log(response.results[0]);
    if (response.length > 0) {
        let actionDiv = document.getElementById('userCardAction');
        let thrillerDiv = document.getElementById('userCardThriller');
        let comedyDiv = document.getElementById('userCardComedy');
        let scienceFictionDiv = document.getElementById('userCardScienceFiction');
        let horrorDiv = document.getElementById('userCardHorror');

        console.log(actionDiv);
        for (var i = 0; i < response.length; i++) {
            let movie = response[i];
            let cardDiv = createMovieCard(movie, true);

            if (movie.genre === 'Action' && actionCount < 4) {
                ++actionCount;
                actionDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Thriller' && thrillerCount < 4) {
                ++thrillerCount;
                thrillerDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Comedy' && comedyCount < 4) {
                ++comedyCount;
                comedyDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Science Fiction' && scienceFictionCount < 4) {
                ++scienceFictionCount;
                scienceFictionDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Horror' && horrorCount < 4) {
                ++horrorCount;
                horrorDiv.appendChild(cardDiv);
            }
        }
    }
}

// GET the Movies
httpAsync(urlForPopular, processResponseForPopular, "GET", null);
httpAsync(urlForUserCollections, processResponseForUserCollections, "GET", null);

// function to filter the Movies
function filterItems() {
    let filter = document.getElementById('filterMovies');

    // convert text to lowercase
    let text = filter.value.toLowerCase();

    if (text === '') {
        alert('please provide search value');
        return false;
    }

    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    //clearBox('headerDiv');

    // get the initial html section
    let movieSection = createMovieSection();
    document.getElementById('contentDiv').appendChild(initalHtml);

    let collectionTypes = ['Select'];
    const collectionsUrl = 'http://localhost:3000/userCollections';

    // Get different Collections
    httpAsync(collectionsUrl, getDifferentCollections, "GET", null);

    // get the movie id
    let movieId = document.getElementById('');

    url = 'https://api.themoviedb.org/3/movie/' + filter + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
    // Redirect to the Search Screen to fetch Results
    window.location.href = '../src/moviesCollection.html?movieFilter=' + text;
}