
import { httpAsync, httpPostOrPut, clearBox } from './services';

const createMovieCard = (movie, isUserCollection = false) => {
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
            removeFromStorage(movieId);
        }
    }
}

// function to Delete the movie from the Storage
function removeFromStorage(movieId) {
    var url = "http://localhost:3000/userCollections/" + movieId;
    httpPostOrPut(url, 'DELETE', null);
}

export const createMovieDetailCard = (movie) => {
    let movieDetailTag = createHTMLElement(
        `
        <div>
        <h3>${movie.title}</h3>
        <h5>user score: ${movie.vote_average.toString()}</h5>
        <h5>Overview</h5>
        <span>Add to Collection: </span>
        <select id='categorySelect'>
            <option value="Select">Select</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Comedy">Comedy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Horror">Horror</option>
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
    let sampleMovie = {};
    sampleMovie.id = parseInt(e.target.id);
    let selectedCategory = document.getElementById('categorySelect').value;
    sampleMovie.genre = selectedCategory;

    var url = 'http://localhost:3000/userCollections';

    // create a Post Request
    var json = JSON.stringify(sampleMovie);
    httpPostOrPut(url, 'POST', json);
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
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Action</h4>
                                            <div class="card-group" id="userCardAction">
                                            </div>
                                            <button href="#" class="addBtn btn btn-primary" id='actionMore'>More...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Thriller</h4>
                                            <div class="card-group" id="userCardThriller">
                                            </div>
                                            <button href="#" class="addBtn btn btn-primary" id='thrillerMore'>More...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Comedy</h4>
                                            <div class="card-group" id="userCardComedy">
                                            </div>
                                            <button href="#" class="addBtn btn btn-primary" id='comedyMore'>More...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Science Fiction</h4>
                                            <div class="card-group" id="userCardScienceFiction">
                                            </div>
                                            <button href="#" class="addBtn btn btn-primary" id='fictionMore'>More...</button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Horror</h4>
                                            <div class="card-group" id="userCardHorror">
                                            </div>
                                            <button href="#" class="addBtn btn btn-primary" id='horrorMore'>More...</button>
                                        </div>
                                    </div>
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

    // let displayButton = document.getElementById('displayCollection');
    // displayButton.addEventListener('click', displayMovies);

    // Get the User Collection Movies
    let urlForUserCollections = "http://localhost:3000/collectionTypes";

    console.log(urlForUserCollections);

    httpAsync(urlForUserCollections, getDifferentUserCollections, 'GET', null);

}

function addCollection() {
    let collectionInput = document.getElementById('addCollectionInput');
    let inputText = collectionInput.value;

    let url = 'http://localhost:3000/collectionTypes';

    // create a Post Request
    let json = JSON.stringify(inputText);

    // Add to the CollectionTypes
    httpPostOrPut(url,'POST',json );

    // Reload the page to get the updated Collections
    getAllUserCollections();
}

function getDifferentUserCollections(responseText) {
    let response = JSON.parse(responseText);
    console.log(response);

    //console.log(response.results[0]);
    if (response.length > 0) {
        let selectList = document.getElementById('collectionsList');
        let button = document.getElementById('displayCollection');

        // Loop through all the movies to fetch unique genre
        for (let i = 0; i < response.length; i++) {
            let localCollection = response[i];

            let option = document.createElement("option");
            option.value = localCollection;
            option.text = localCollection;
            selectList.appendChild(option);
        }

        // Add click function
        button.addEventListener('click', displayMoviesOfCollection);
    }
}

let collection = null;

function displayMoviesOfCollection() {
    let selectList = document.getElementById('collectionsList');
    collection = selectList.options[selectList.selectedIndex].value;
    if (collection === 'Select') {
        alert('Please select a Collection');
        return false;
    }

    //window.location.href = '../src/userCollection.html?collection=' + collection;
    switch (collection) {
        case 'Action':
            getActionUserCollections();
            break;
        case 'Thriller':
            getThrillerUserCollections();
            break;
        case 'Comedy':
            getComedyUserCollections();
            break;
        case 'Fiction':
            geFictionUserCollections();
            break;
        case 'Horror':
            getHorrorUserCollections();
            break;
    }
}

export const createMovieSection = () => {
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

function getActionUserCollections() {

    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    collection = 'Action';
    let span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    let urlForUserCollections = "http://localhost:3000/userCollections";
    console.log(urlForUserCollections);

    // GET the Movies
    httpAsync(urlForUserCollections, processResponseForCollection, 'GET', null);
}

function processResponseForCollection(responseText) {
    let response = JSON.parse(responseText);
    console.log(response);
    if (response.length > 0) {
        let movieCounter = 0;
        let group1Tag = document.getElementById('group1');
        let group2Tag = document.getElementById('group2');
        let group3Tag = document.getElementById('group3');
        let group4Tag = document.getElementById('group4');

        for (let i = 0; i <= response.length; i++) {
            /*
            <div class="card">
                <div class="card-body" id="movie1">
                    <h5 class="card-title">Most Popular</h5>
                    <a href="">
                        <img src="" alt="" />
                    </a>
                    <p>Movie Description</p>
                </div>
            </div>


            <div class="card-body">
            <h5 class="card-title">Jurassic School</h5>
            <a href="../src/movie.html?movieId=438817&amp;source=userCollection"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/ykgi4N8r5YqL3LOi1SFrYPWjK74.jpg" alt="Jurassic School"></a>
            <p>Nerdy middle schooler Tommy is forced take care of a baby dinosaur after his cloned science fair pro...</p>
            <button class="btn btn-danger btn-sm float-center delete" value="438817">Delete</button></div>
            */
            let movie = response[i];
            console.log(collection);
            if (movie && movie.genre.toLowerCase() === collection.toLowerCase()) {
                ++movieCounter;

                let movieId = movie.id;
                let url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';

                httpAsync(url, (responseText) => {
                    let desiredMovie = JSON.parse(responseText);
                    console.log(desiredMovie);
                    let desiredMovieDiv = createMovieCardForCollection(desiredMovie);
                    console.log(movieCounter);

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
                }, 'GET', null);


                /*
                var cardDivTag = document.createElement('div');
                cardDivTag.className = "card";
                cardDivTag.id = movie.id;
                var cardBodyDivTag = document.createElement('div');
                cardBodyDivTag.className = "card-body";
                var h5 = document.createElement('h5');
                h5.className = "card-title";
                h5.textContent = movie.title;
                var imgTag = document.createElement('img');
                imgTag.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
                imgTag.alt = movie.title;
                var anchorTag = document.createElement('a');
                anchorTag.href = '../src/movie.html?movieId=' + movie.id + '&source=userCollection';
                anchorTag.appendChild(imgTag);
                var pTag = document.createElement('p');
                if (movie.overview.length > 100)
                    pTag.textContent = movie.overview.substring(0, 100) + '...';
                else
                    pTag.textContent = movie.overview;

                var deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm float-center delete';
                deleteButton.value = movie.id;
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', removeMovie);

                cardBodyDivTag.appendChild(h5);
                cardBodyDivTag.appendChild(anchorTag);
                cardBodyDivTag.appendChild(pTag);
                cardBodyDivTag.appendChild(deleteButton);
                cardDivTag.appendChild(cardBodyDivTag);

                */

            }
        }
    }
}

function getThrillerUserCollections() {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    collection = 'Thriller';
    var span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    var urlForUserCollections = "http://localhost:3000/userCollections";
    console.log(urlForUserCollections);

    // GET the Movies
    httpAsync(urlForUserCollections, processResponseForCollection, 'GET', null);
}

function getComedyUserCollections() {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    collection = 'Comedy';
    var span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    var urlForUserCollections = "http://localhost:3000/userCollections";
    console.log(urlForUserCollections);

    // GET the Movies
    httpAsync(urlForUserCollections, processResponseForCollection, 'GET', null);
}

function geFictionUserCollections() {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    collection = 'Fiction';
    var span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    var urlForUserCollections = "http://localhost:3000/userCollections";
    console.log(urlForUserCollections);

    // GET the Movies
    httpAsync(urlForUserCollections, processResponseForCollection, 'GET', null);

}

function getHorrorUserCollections() {

    // clear the Contents of the Main div Tag
    clearBox('contentDiv');
    const userCollectionHtml = createInitialUserCollectionHtml();
    document.getElementById('contentDiv').appendChild(userCollectionHtml);

    collection = 'Horror';
    var span = document.getElementById('searchFilterText');
    span.innerHTML = '<em>' + collection + '</em>';

    var urlForUserCollections = "http://localhost:3000/userCollections";
    console.log(urlForUserCollections);

    // GET the Movies
    httpAsync(urlForUserCollections, processResponseForCollection, 'GET', null);
}

export const loadInitialPage = () => {
    const initalHtml = createInitialSection();
    document.getElementById('contentDiv').appendChild(initalHtml);

    document.getElementById('allCollections').addEventListener('click', getAllUserCollections); //

    document.getElementById('actionMore').addEventListener('click', getActionUserCollections);
    document.getElementById('thrillerMore').addEventListener('click', getThrillerUserCollections);
    document.getElementById('comedyMore').addEventListener('click', getComedyUserCollections);
    document.getElementById('fictionMore').addEventListener('click', geFictionUserCollections);
    document.getElementById('horrorMore').addEventListener('click', getHorrorUserCollections);

    // Get the Popular Movies
    const urlForPopular = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1";
    const urlForUserCollections = "http://localhost:3000/userCollections";

    console.log(urlForPopular);

    // GET the Movies
    httpAsync(urlForPopular, processResponseForPopular, "GET", null);
    httpAsync(urlForUserCollections, processResponseForUserCollections, "GET", null);
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

// Process the Response for UserCollections of the Main Page
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

function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export const createInitialUserCollectionsHtml = () => {
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

    let collectionTypes = ['Select'];
    const collectionsUrl = 'http://localhost:3000/collectionTypes';

    console.log(collectionsUrl);

    // Get different Collections
    httpAsync(collectionsUrl, getDifferentCollections, "GET", null);

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

    /*
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
    */
}

function getDifferentCollections(responseText) {
    let allMoviesFromCollections = JSON.parse(responseText);
    console.log(allMoviesFromCollections);
    /*
    let movieGenre;
    if (allMoviesFromCollections.length > 0) {
        for (let i = 0; i <= allMoviesFromCollections.length; i++) {
            let localMovie = allMoviesFromCollections[i];
            if (localMovie) {
                if (collectionTypes.indexOf(localMovie) === -1) {
                    collectionTypes.push(localMovie);
                }
            }
        }
    }
    */
}