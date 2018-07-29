
import { httpAsync, httpPostOrPut, clearBox, httpSync } from './services';

const createMovieCard = (movie) => {
    let movieCard = createHTMLElement(`
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">${movie.title}</h5>
            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}">
            <p class="card-text">Vote Average: ${movie.vote_average}'</p>
            <button href="#" class="addBtn btn btn-primary"  id='${movie.id}'>Get Details</button>
        </div>
      </div>
    `);

    const movieCardTag = movieCard.querySelector('button');
    movieCardTag.addEventListener('click', getMovieDetails);

    return movieCard;
};

export const createMovieSearchCard = (movie) => {
    let movieSearchDetailCard = createHTMLElement(
        `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}">
                <p>${getTruncatedMovieDescription(movie.overview)}</p>
                <button href="#" class="addBtn btn btn-primary"  id='${movie.id}'>Get Details</button>
        </div>
    </div>
        `
    );

    const movieCardTag = movieSearchDetailCard.querySelector('button');
    movieCardTag.addEventListener('click', getMovieDetails);

    return movieSearchDetailCard;
}

const createMovieCardForCollection = (movie) => {
    let movieCard = createHTMLElement(
        `
        <div class="card" id='${movie.id}'>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}">
                <p>${getTruncatedMovieDescription(movie.overview)}</p>
                <button class="btn btn-danger btn-sm float-center delete" value="${movie.id}">Delete</button>
        </div>
    </div>
        `
    );

    let deleteButton = movieCard.querySelector('button');
    deleteButton.addEventListener('click', removeMovie);

    return movieCard;
}

function removeMovie(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var movieId = e.target.value;
            var divCardToDelete = document.getElementById(movieId);
            var divCardParent = divCardToDelete.parentElement;
            divCardParent.removeChild(divCardToDelete);
            removeFromCollection(movieId);
        }
    }
}

// function to remove MovieId from the Collection
function removeFromCollection(movieId) {

    // fetch the Collection first.
    let collectionName = document.getElementById('searchFilterText').textContent;

    let url = "http://localhost:3000/userCollections?name=" + collectionName;
    console.log(url);

    // Fetch Collection details
    httpSync(url, (responseText) => {
        let response = JSON.parse(responseText);
        let index = response[0].movies.indexOf(parseInt(movieId));
        let collectionId = response[0].id;
        if (index > -1) {
            response[0].movies.splice(index, 1);
        }

        //Update the DB
        var url = 'http://localhost:3000/userCollections/' + collectionId;

        // create a Post Request
        var json = JSON.stringify(response[0]);
        httpPostOrPut(url, 'PUT', json);

    }, 'GET', null);
}

const createMovieDetailCard = (movie) => {
    let movieDetailTag = createHTMLElement(
        `
        <div>
        <h3>${movie.title}</h3>
        <h5>user score: ${movie.vote_average.toString()}</h5>
        <h5>Overview</h5>
        <span>Add to Collection: </span>
        <select id='collectionsList'>
                
        </select>
        <button href="#" class="addBtn btn btn-primary"  id='${movie.id}'>Add</button>
        <p>${movie.overview}</p>
        </div>
        `
    );

    let addButton = movieDetailTag.querySelector('button');
    addButton.addEventListener('click', addMovieToCollection);
    return movieDetailTag;
}

function addMovieToCollection(e) {
    let selectedCategoryId = document.getElementById('collectionsList').value;
    let url = 'http://localhost:3000/userCollections/' + selectedCategoryId;

    console.log(url);

    // Fetch Collection details
    httpAsync(url, getCollectionDetailAndUpdate, 'GET', null);
}

function getCollectionDetailAndUpdate(responseText) {
    let addButton = document.getElementsByClassName('addBtn btn btn-primary')[0];
    // <button href="#" class="addBtn btn btn-primary" id="394537">Add</button>
    let movieId = parseInt(addButton.id);
    let response = JSON.parse(responseText);
    let selectedCategoryId = document.getElementById('collectionsList').value;
    let index = response.movies.indexOf(movieId);

    if (index > -1) {
        alert('Movie is already part of the Collection');
        return;
    }
    else {
        response.movies.push(movieId);
    }

    //Update the DB
    var url = 'http://localhost:3000/userCollections/' + selectedCategoryId;

    // create a Post Request
    var json = JSON.stringify(response);
    httpPostOrPut(url, 'PUT', json);
}

function getTruncatedMovieDescription(movieTitle) {
    if (movieTitle.length > 100)
        return movieTitle.substring(0, 100) + '...';
    else
        return movieTitle;
}

function createInitialUserCollectionHtml() {
    let userCollectionHtml = createHTMLElement(
        `
        <div class="container">
    <div id="main" class="card card-body">
      <h2 class="title">User Collection Genre:
        <span id="searchFilterText"></span>
      </h2>
      <section id="Movies">
        <div class="section-content">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group1">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group2">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group3">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group4">

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
        `
    );

    return userCollectionHtml;
}

const createInitialSection = () => {
    const mainPage = createHTMLElement(
        `<section id="Movies">
        <div class="section-content">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title">Most Popular</h2>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card-group" id="popularCardGroup1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card-group" id="popularCardGroup2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card-group" id="popularCardGroup3">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card-group" id="popularCardGroup4">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-group">
                            <div class="card">
                                <h2 class="card-title">User Collections</h2>
                                <button href="#" class="addBtn btn btn-primary" id='allCollections'>View all Collections</button>
                                <div class="card-body" id="userCollectionsCardBody">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `);

    return mainPage;
};



function getAllUserCollections() {

    // Clear the content
    clearBox('contentDiv');
    const userCollectionSectionHtml = createInitialUserCollectionsHtml();
    document.getElementById('contentDiv').appendChild(userCollectionSectionHtml);

    let addCollectionButton = document.getElementById('addCollectionButton');
    addCollectionButton.addEventListener('click', addCollection);

    let displayButton = document.getElementById('displayCollection');
    displayButton.addEventListener('click', displayMoviesOfCollection);

    // Get the User Collection Movies
    let urlForUserCollections = "http://localhost:3000/userCollections";

    console.log(urlForUserCollections);

    httpAsync(urlForUserCollections, getDifferentUserCollections, 'GET', null);

}

function addCollection() {
    let collectionInput = document.getElementById('addCollectionInput');
    let inputText = collectionInput.value;

    let newUserCollection = {};
    newUserCollection.name = inputText;
    newUserCollection.movies = [];

    let url = 'http://localhost:3000/userCollections';

    // create a Post Request
    let json = JSON.stringify(newUserCollection);

    // Add to the CollectionTypes
    httpPostOrPut(url, 'POST', json);

    // Reload the page to get the updated Collections
    getAllUserCollections();
}

function getDifferentUserCollections(responseText) {
    let response = JSON.parse(responseText);
    console.log(response);

    //console.log(response.results[0]);
    if (response.length > 0) {
        let selectList = document.getElementById('collectionsList');

        // Loop through all the movies to fetch unique genre
        for (let i = 0; i < response.length; i++) {
            let collectionName = response[i].name;
            let collectionId = response[i].id;

            let option = document.createElement("option");
            option.value = collectionId;
            option.text = collectionName;
            selectList.appendChild(option);
        }
    }
}

let collection = null;

function displayMoviesOfCollection() {
    let selectList = document.getElementById('collectionsList');
    let collectionId = selectList.options[selectList.selectedIndex].value;
    collection = selectList.options[selectList.selectedIndex].text;
    if (collection === 'Select') {
        alert('Please select a Collection');
        return false;
    }

    getCollectionDetailswithCollectionId(collectionId)
}

const createMovieSection = () => {
    let movieDetailHtml = createHTMLElement(
        `
        <section id="movie-details">
        <div class="container">
            <div class="row">
                <div class="col-sm-6" id="imageDiv">

                </div>
                <div class="col-sm-6" id="descriptionDiv">

                </div>
            </div>
        </div>
    </section>
        `
    );

    return movieDetailHtml;
};

export const loadInitialPage = () => {
    const initalHtml = createInitialSection();
    document.getElementById('contentDiv').appendChild(initalHtml);

    document.getElementById('allCollections').addEventListener('click', getAllUserCollections); //

    // Get the Popular Movies
    const urlForPopular = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1";
    const urlForUserCollections = "http://localhost:3000/userCollections";

    console.log(urlForPopular);

    // GET the Movies
    httpAsync(urlForPopular, processResponseForPopular, "GET", null);
    httpAsync(urlForUserCollections, processRespForUserCollections, 'GET', null);
}

export const createInitialMovieCollectionHtml = () => {
    const initialMovieCollection = createHTMLElement(
        `
        <div class="container">
    <div id="main" class="card card-body">
      <h2 class="title">Search Results for:
        <span id="searchFilterText"></span>
      </h2>
      <section id="Movies">
        <div class="section-content">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group1">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group2">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group3">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="card-group" id="group4">

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
        `
    );

    return initialMovieCollection;
}

// process the Response for Popular Movies of the Main Page
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
            let cardDiv = createMovieCard(movie);

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

function processRespForUserCollections(responseText) {
    let response = JSON.parse(responseText);

    if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
            let collection = response[i];
            let collectionName = collection.name;
            console.log(collection);
            createUserCollectionCard(collection);
        }
    }
}

const createUserCollectionCard = (collection) => {
    let userCollectionCardElement = createHTMLElement(
        `
        <div class="row">
            <div class="col-sm-12">
                <h4>${collection.name}</h4>
                <div class="card-group" id='collection${collection.id}'>
                </div>
                <button href="#" class="addBtn btn btn-primary" id='collection${collection.id}More'>More...</button>
            </div>
        </div>
        `
    );

    let userCollectionsCardBody = document.getElementById('userCollectionsCardBody');
    userCollectionsCardBody.appendChild(userCollectionCardElement);

    // Show only first three.  Rest can be shown via "More..." button.
    let movieIds = collection.movies.slice(0, 3);
    let collectionId = 'collection'.concat(collection.id);
    let collectionIdMore = collectionId.concat('More');
    console.log(collectionId);
    let userCollectionCard = document.getElementById(collectionId);
    let moreButton = document.getElementById(collectionIdMore)

    moreButton.addEventListener('click', getCollectionDetails);

    for (let movieId of movieIds) {
        userCollectionCard.appendChild(createMovieSearchCardFromMovieId(movieId));
    }

}

function getCollectionDetails(e) {
    let collectionIdMore = e.target.id;
    let collectionId = collectionIdMore.replace('collection', '').replace('More', '');
    console.log(collectionId);
    getCollectionDetailswithCollectionId(collectionId);
}

function getCollectionDetailswithCollectionId(collectionId) {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    let collectionsUrl = 'http://localhost:3000/userCollections/' + collectionId;
    httpAsync(collectionsUrl, processResForCollection, 'GET', null);
}


function processResForCollection(responseText) {
    let collectionResponse = JSON.parse(responseText);
    console.log(collectionResponse);
    let movieCounter = 0;
    collection = collectionResponse.name;
    let span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    let group1Tag = document.getElementById('group1');
    let group2Tag = document.getElementById('group2');
    let group3Tag = document.getElementById('group3');
    let group4Tag = document.getElementById('group4');

    for (let movieId of collectionResponse.movies) {
        ++movieCounter;
        let desiredMovieDiv = createMovieCardFromMovieId(movieId);

        if (movieCounter <= 3) {
            console.log(desiredMovieDiv);
            group1Tag.appendChild(desiredMovieDiv);
        }
        else if (movieCounter > 3 && movieCounter <= 6)
            group2Tag.appendChild(desiredMovieDiv);
        else if (movieCounter > 6 && movieCounter <= 9)
            group3Tag.appendChild(desiredMovieDiv);
        else if (movieCounter > 10 && movieCounter <= 12)
            group4Tag.appendChild(desiredMovieDiv);

    }
}

function createMovieCardFromMovieId(movieId) {
    let url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
    let desiredMovieDiv = null;

    httpSync(url, (responseText) => {
        let desiredMovie = JSON.parse(responseText);
        console.log(desiredMovie);
        desiredMovieDiv = createMovieCardForCollection(desiredMovie);
    }, 'GET', null);

    return desiredMovieDiv;
}

function createMovieSearchCardFromMovieId(movieId) {
    let url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
    let desiredMovieDiv = null;

    httpSync(url, (responseText) => {
        let desiredMovie = JSON.parse(responseText);
        console.log(desiredMovie);
        desiredMovieDiv = createMovieSearchCard(desiredMovie);
    }, 'GET', null);

    return desiredMovieDiv;
}


function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

const createInitialUserCollectionsHtml = () => {
    let initialCollectionsSection = createHTMLElement(
        `
        <section id="Movies">
        <div class="section-content">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title">User Collections</h2>
                                <div class="card-group" id="userCollectionsCard">
                                    <select name="collectionsList" id="collectionsList">
                                        <option value="Select">Select</option>
                                    </select>
                                    <button id='displayCollection' class="btn btn-info">Display Movies</button>
                                </div>
                            </div>
                            <div class="card-body">
                                <input type="text" class="form-control" id="addCollectionInput" placeholder="Add Collection...">
                                <button type="button" class="btn btn-dark" id="addCollectionButton">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </section>
        `
    );

    return initialCollectionsSection;
}

function getMovieDetails(e) {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const movieSectionHtml = createMovieSection();
    document.getElementById('contentDiv').appendChild(movieSectionHtml);

    let movieId = e.target.id;
    let url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';

    console.log(movieId);
    httpAsync(url, processResponseForMovieDetail, 'GET', null);
}

function processResponseForMovieDetail(responseText) {

    let movie = JSON.parse(responseText);
    /*
    <div class="col-sm-6" id="descriptionDiv">
        <h3>Jurassic World: Fallen Kingdom</h3>
        <h5>user score: 66%</h5>
        <h5>Overview</h5>
        <p>Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.</p>
        </div>
    */
    let imageDiv = document.getElementById('imageDiv');
    let imageTag = document.createElement('img');
    imageTag.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
    imageTag.alt = movie.title;

    imageDiv.appendChild(imageTag);

    let descriptionDiv = document.getElementById('descriptionDiv');
    descriptionDiv.appendChild(createMovieDetailCard(movie));

    let collectionsUrl = 'http://localhost:3000/userCollections';
    httpSync(collectionsUrl, getDifferentUserCollections, 'GET', null);
}
