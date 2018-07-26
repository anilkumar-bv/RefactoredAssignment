//import { httpAsync,getParameterByName}  from './services';
import { httpAsync } from './services';

//import { createMovieCard } from './movies';

// function to get Parameter by Name
function getParameterByName(name, urlFromRequest) {
    if (!urlFromRequest) urlFromRequest = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(urlFromRequest);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let collectionTypes = ['Select'];
const collectionsUrl = 'http://localhost:3000/userCollections';

console.log(collectionsUrl);

export function getDifferentCollections(responseText) {
    let allMoviesFromCollections = JSON.parse(responseText);
    console.log(allMoviesFromCollections);
    let movieGenre;
    if (allMoviesFromCollections.length > 0) {
        for (let i = 0; i <= allMoviesFromCollections.length; i++) {
            let localMovie = allMoviesFromCollections[i];
            if (localMovie) {
                movieGenre = localMovie.genre;
                if (collectionTypes.indexOf(movieGenre) === -1) {
                    collectionTypes.push(movieGenre);
                }
            }
        }
    }
}

// Get different Collections
httpAsync(collectionsUrl, getDifferentCollections, "GET", null);
//httpGetAsync(collectionsUrl, getDifferentCollections);

/*
// function to make the HTTP GET call
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
*/


let url = null;

// query string: ?movieFilter=filter
let filter = getParameterByName('movieId', window.location.href);
let source = getParameterByName('source', window.location.href);

if (source === 'popular' || source === 'search')
    url = 'https://api.themoviedb.org/3/movie/' + filter + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
else
    url = 'http://localhost:3000/userCollections/' + filter;

console.log(url);

var movie;
var userCollectionMovies;

// process the Response
function processResponse(responseText) {
    movie = JSON.parse(responseText);
    console.log(movie);

    /*
    <div class="col-sm-6" id="descriptionDiv">
        <h3>Jurassic World: Fallen Kingdom</h3>
        <h5>user score: 66%</h5>
        <h5>Overview</h5>
        <p>Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.</p>
        </div>
    */
    var imageDiv = document.getElementById('imageDiv');
    var imageTag = document.createElement('img');
    imageTag.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
    imageTag.alt = movie.title;

    imageDiv.appendChild(imageTag);

    var descriptionDiv = document.getElementById('descriptionDiv');
    var h3 = document.createElement('h3');
    h3.textContent = movie.title;
    var voterAvgTag = document.createElement('h5');
    voterAvgTag.textContent = 'user score: ' + movie.vote_average.toString().replace('.', '') + '%';
    var h5 = document.createElement('h5');
    h5.textContent = 'Overview';

    if (movie.genre) {
        var genreTag = document.createElement('h5');
        genreTag.textContent = 'Collection: ' + movie.genre;
        var spanTagForChangeCollection = document.createElement('span');
        spanTagForChangeCollection.textContent = 'Change Collection to: ';
        var selectForCollections = document.createElement('select');

        //Create and append the options
        for (var i = 0; i < collectionTypes.length; i++) {
            var option = document.createElement("option");
            option.value = collectionTypes[i];
            option.text = collectionTypes[i];
            selectForCollections.appendChild(option);
        }

        selectForCollections.addEventListener('change', updateCollection);
    }

    var descriptionTag = document.createElement('p');
    descriptionTag.textContent = movie.overview;

    descriptionDiv.appendChild(h3);
    descriptionDiv.appendChild(voterAvgTag);
    if (movie.genre) {
        descriptionDiv.appendChild(genreTag);
        descriptionDiv.appendChild(spanTagForChangeCollection);
        descriptionDiv.appendChild(selectForCollections);
    }
    descriptionDiv.appendChild(h5);
    descriptionDiv.appendChild(descriptionTag);
}

function updateCollection(e) {

    // Get the User Collection Movies
    let urlForUserCollectionsUpdate = "http://localhost:3000/userCollections/" + movie.id;
    let selectedCollection = e.target.value;
    movie.genre = selectedCollection;

    let json = JSON.stringify(movie);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", urlForUserCollectionsUpdate, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        let updatedMovie = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(updatedMovie);
        } else {
            console.error(updatedMovie);
        }
    }
    xhr.send(json);
}

// GET the Movies
//httpGetAsync(url, processResponse);
httpAsync(url, processResponse, 'GET', null);
