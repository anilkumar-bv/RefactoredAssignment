import { loadInitialPage, createInitialMovieCollectionHtml, createMovieSearchCard } from './views';
import { clearBox, httpAsync } from './services';
import {filterItems} from './controllers';

loadInitialPage();
document.getElementById('search').addEventListener('click', filterItems);
document.getElementById('backButton').addEventListener('click', () => {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');

    // Load Home Page
    loadInitialPage();
});

// // Filter event
// document.getElementById('search').addEventListener('click', filterItems);

// // function to filter the Movies
// function filterItems() {
//     let filter = document.getElementById('filterMovies');

//     // convert text to lowercase
//     let text = filter.value.toLowerCase();

//     if (text === '') {
//         alert('please provide search value');
//         return false;
//     }

//     // clear the Contents of the Main div Tag
//     clearBox('contentDiv');

//     // get the initial html section
//     let movieSection = createInitialMovieCollectionHtml();
//     document.getElementById('contentDiv').appendChild(movieSection);

//     var span = document.getElementById('searchFilterText');
//     if (text)
//         span.innerHTML = '<em>' + text + '</em>';
//     var url = "https://api.themoviedb.org/3/search/movie?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&query=" + text + "&page=1&include_adult=false";
//     console.log(url);

//     // GET the Movies
//     httpAsync(url, processResponseForMovieCollection, "GET", null);
//     // Redirect to the Search Screen to fetch Results
//     //window.location.href = '../src/moviesCollection.html?movieFilter=' + text;
// }

// // process the Response
// function processResponseForMovieCollection(responseText) {
//     var response = JSON.parse(responseText);
//     console.log(response);
//     if (response.total_results > 0) {
//         var group1Tag = document.getElementById('group1');
//         var group2Tag = document.getElementById('group2');
//         var group3Tag = document.getElementById('group3');
//         var group4Tag = document.getElementById('group4');

//         for (var i = 0; i <= 12; i++) {
//             /*
//             <div class="card">
//                 <div class="card-body">
//                     <h5 class="card-title">Jurassic World: Fallen Kingdom</h5>
//                     <a href="../src/movie.html?movieId=351286&amp;source=search">
//                         <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg" alt="Jurassic World: Fallen Kingdom">
//                     </a>
//                     <p>Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosa...</p>
//                 </div>
//             </div>
//             */
//             var movie = response.results[i];
//             /*
//             var cardDivTag = document.createElement('div');
//             cardDivTag.className = "card";
//             var cardBodyDivTag = document.createElement('div');
//             cardBodyDivTag.className = "card-body";
//             var h5 = document.createElement('h5');
//             h5.className = "card-title";
//             h5.textContent = movie.title;
//             var imgTag = document.createElement('img');
//             imgTag.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
//             imgTag.alt = movie.title;
//             var anchorTag = document.createElement('a');
//             anchorTag.href = '../src/movie.html?movieId=' + movie.id + '&source=search';
//             anchorTag.appendChild(imgTag);
//             var pTag = document.createElement('p');
//             if (movie.overview.length > 100)
//                 pTag.textContent = movie.overview.substring(0, 100) + '...';
//             else
//                 pTag.textContent = movie.overview;

//             cardBodyDivTag.appendChild(h5);
//             cardBodyDivTag.appendChild(anchorTag);
//             cardBodyDivTag.appendChild(pTag);
//             cardDivTag.appendChild(cardBodyDivTag);
//             */
//            let cardDivTag = createMovieSearchCard(movie);

//             if (i <= 2)
//                 group1Tag.appendChild(cardDivTag);
//             else if (i > 2 && i <= 5)
//                 group2Tag.appendChild(cardDivTag);
//             else if (i > 5 && i <= 8)
//                 group3Tag.appendChild(cardDivTag);
//             else if (i > 9 && i <= 12)
//                 group4Tag.appendChild(cardDivTag);
//         }
//     }
// }

// const searchButton = document.getElementById('search');
// const initalHtml = createInitialSection();
// document.getElementById('contentDiv').appendChild(initalHtml);

// // Filter event
// searchButton.addEventListener('click', filterItems);

// // Get the Popular Movies
// const urlForPopular = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1";
// const urlForUserCollections = "http://localhost:3000/userCollections";

// console.log(urlForPopular);

// // process the Response for Popular Movies
// function processResponseForPopular(responseText) {
//     let response = JSON.parse(responseText);
//     console.log(response);

//     //console.log(response.results[0]);
//     if (response.results.length > 0) {
//         var movieDiv1 = document.getElementById('popularCardGroup1');
//         var movieDiv2 = document.getElementById('popularCardGroup2');
//         var movieDiv3 = document.getElementById('popularCardGroup3');
//         var movieDiv4 = document.getElementById('popularCardGroup4');

//         for (var i = 0; i < 12; i++) {
//             let movie = response.results[i];
//             let cardDiv = createMovieCard(movie, false);

//             if (i <= 2)
//                 movieDiv1.appendChild(cardDiv);
//             else if (i > 2 && i <= 5)
//                 movieDiv2.appendChild(cardDiv);
//             else if (i > 5 && i <= 8)
//                 movieDiv3.appendChild(cardDiv);
//             else if (i > 8 && i <= 11)
//                 movieDiv4.appendChild(cardDiv);
//         }
//     }
// }

// // Process the Response for UserCollections
// function processResponseForUserCollections(responseText) {
//     let response = JSON.parse(responseText);
//     console.log(response);
//     let actionCount = 0;
//     let thrillerCount = 0;
//     let comedyCount = 0;
//     let scienceFictionCount = 0;
//     let horrorCount = 0;

//     //console.log(response.results[0]);
//     if (response.length > 0) {
//         let actionDiv = document.getElementById('userCardAction');
//         let thrillerDiv = document.getElementById('userCardThriller');
//         let comedyDiv = document.getElementById('userCardComedy');
//         let scienceFictionDiv = document.getElementById('userCardScienceFiction');
//         let horrorDiv = document.getElementById('userCardHorror');

//         console.log(actionDiv);
//         for (var i = 0; i < response.length; i++) {
//             let movie = response[i];
//             let cardDiv = createMovieCard(movie, true);

//             if (movie.genre === 'Action' && actionCount < 4) {
//                 ++actionCount;
//                 actionDiv.appendChild(cardDiv);
//             }
//             else if (movie.genre === 'Thriller' && thrillerCount < 4) {
//                 ++thrillerCount;
//                 thrillerDiv.appendChild(cardDiv);
//             }
//             else if (movie.genre === 'Comedy' && comedyCount < 4) {
//                 ++comedyCount;
//                 comedyDiv.appendChild(cardDiv);
//             }
//             else if (movie.genre === 'Science Fiction' && scienceFictionCount < 4) {
//                 ++scienceFictionCount;
//                 scienceFictionDiv.appendChild(cardDiv);
//             }
//             else if (movie.genre === 'Horror' && horrorCount < 4) {
//                 ++horrorCount;
//                 horrorDiv.appendChild(cardDiv);
//             }
//         }
//     }
// }

// // GET the Movies
// httpAsync(urlForPopular, processResponseForPopular, "GET", null);
// httpAsync(urlForUserCollections, processResponseForUserCollections, "GET", null);

// function to filter the Movies
// function filterItems() {
//     let filter = document.getElementById('filterMovies');

//     // convert text to lowercase
//     let text = filter.value.toLowerCase();

//     if (text === '') {
//         alert('please provide search value');
//         return false;
//     }

//     // clear the Contents of the Main div Tag
//     clearBox('contentDiv');
//     //clearBox('headerDiv');

//     // get the initial html section
//     let movieSection = createMovieSection();
//     document.getElementById('contentDiv').appendChild(initalHtml);

//     let collectionTypes = ['Select'];
//     const collectionsUrl = 'http://localhost:3000/userCollections';

//     // Get different Collections
//     httpAsync(collectionsUrl, getDifferentCollections, "GET", null);

//     // get the movie id
//     let movieId = document.getElementById('');

//     url = 'https://api.themoviedb.org/3/movie/' + filter + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
//     // Redirect to the Search Screen to fetch Results
//     window.location.href = '../src/moviesCollection.html?movieFilter=' + text;
// }