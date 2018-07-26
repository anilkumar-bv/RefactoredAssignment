
import { httpAsync, clearBox } from './services';

const createMovieCard = (movie, isUserCollection = false) => {
    // if (isUserCollection) {
    //     // Append "&source=userCollections" to the Anchor Tag
    //     movieCard = createHTMLElement(`
    //   <div class="card" style="width: 18rem;">
    //     <div class="card-body">
    //         <h3 class="card-title">${movie.title}</h5>
    //         <a href="../src/movie.html?movieId=${movie.id}&source=userCollections"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}"></a>
    //         <p class="card-text">Vote Average: ${movie.vote_average}'</p>
    //     </div>
    //   </div>
    // `);
    // }
    // else {
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

export const createMovieDetailCard = (movie) => {
    let movieDetailTag = createHTMLElement(
        `
        <div>
        <h3>${movie.title}</h3>
        <h5>user score: ${movie.vote_average.toString()}</h5>
        <h5>Overview</h5>
        <p>${movie.overview}</p>
        </div>
        `
    );

    return movieDetailTag;
}

function getTruncatedMovieDescription(movieTitle) {
    if (movieTitle.length > 100)
        return movieTitle.substring(0, 100) + '...';
    else
        return movieTitle;
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
                                <button href="#" class="addBtn btn btn-primary">View all Collections</button>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Action</h4>
                                            <div class="card-group" id="userCardAction">
                                            </div>
                                            <a href="../src/userCollection.html?collection=Action" class="card-link">More...</a>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Thriller</h4>
                                            <div class="card-group" id="userCardThriller">
                                            </div>
                                            <a href="../src/userCollection.html?collection=Thriller" class="card-link">More...</a>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Comedy</h4>
                                            <div class="card-group" id="userCardComedy">
                                            </div>
                                            <a href="../src/userCollection.html?collection=Comedy" class="card-link">More...</a>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Science Fiction</h4>
                                            <div class="card-group" id="userCardScienceFiction">
                                            </div>
                                            <a href="../src/userCollection.html?collection=Science%20Fiction" class="card-link cardCenter">More...</a>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4>Horror</h4>
                                            <div class="card-group" id="userCardHorror">
                                            </div>
                                            <a href="../src/userCollection.html?collection=Horror" class="card-link">More...</a>
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

    const userCollections = mainPage.querySelector('button');
    userCollections.addEventListener('click', getAllUserCollections);

    return mainPage;
};

function getAllUserCollections() {

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

export const loadInitialPage = () => {
    const initalHtml = createInitialSection();
    document.getElementById('contentDiv').appendChild(initalHtml);

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

    let displayButton = initialCollectionsSection.querySelector('.btn btn-info');
    displayButton.addEventListener('click', displayMovies);

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