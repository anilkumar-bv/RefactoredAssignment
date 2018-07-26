import {httpAsync, clearBox} from './services';

const addMovieToCollectionController = () => {
    alert('Add movie to collection');
};

// function getMovieDetails(e) {
//      // clear the Contents of the Main div Tag
//      console.log('Within the Click Event', e);
//      clearBox('contentDiv');

//     let movieId = e.target.id;
//     let url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';

//     console.log(movieId);
//     //httpGetAsync(url, processResponse);
//     httpAsync(url, processResponse, 'GET', null);

// }

function processResponse(responseText) {
    movie = JSON.parse(responseText);
    console.log(movie);

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

// function to create a Movie Card
// export const createMovieCard = (movie, isUserCollection = false) => {
//     let movieCard = null;
//     // if (isUserCollection) {
//     //     // Append "&source=userCollections" to the Anchor Tag
//     //     movieCard = createHTMLElement(`
//     //   <div class="card" style="width: 18rem;">
//     //     <div class="card-body">
//     //         <h3 class="card-title">${movie.title}</h5>
//     //         <a href="../src/movie.html?movieId=${movie.id}&source=userCollections"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}"></a>
//     //         <p class="card-text">Vote Average: ${movie.vote_average}'</p>
//     //     </div>
//     //   </div>
//     // `);
//     // }
//     // else {
//         movieCard = createHTMLElement(`
//       <div class="card" style="width: 18rem;">
//         <div class="card-body">
//             <h3 class="card-title">${movie.title}</h5>
//             <a href="" id='${movie.id}'><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}"></a>
//             <p class="card-text">Vote Average: ${movie.vote_average}'</p>
//         </div>
//       </div>
//     `);

//     const anchorButton = movieCard.getElementsByTagName('a')[0];
//     console.log(anchorButton);
//     anchorButton.addEventListener('onclick', getMovieDetails);

//     return movieCard;
// };

// export const createInitialSection = () => {
//     const mainPage = createHTMLElement(
//         `<section id="Movies">
//         <div class="section-content">
//             <div class="container">
//                 <div class="row">
//                     <div class="col-sm-12">
//                         <div class="card-group">
//                             <div class="card">
//                                 <div class="card-body">
//                                     <h2 class="card-title">Most Popular</h2>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <div class="card-group" id="popularCardGroup1">
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <div class="card-group" id="popularCardGroup2">
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <div class="card-group" id="popularCardGroup3">
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <div class="card-group" id="popularCardGroup4">
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <br>
//                 <div class="row">
//                     <div class="col-sm-12">
//                         <div class="card-group">
//                             <div class="card">
//                                 <h2 class="card-title">User Collections</h2>
//                                 <a href="../src/userCollections.html">View all Collections</a>
//                                 <div class="card-body">
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <h4>Action</h4>
//                                             <div class="card-group" id="userCardAction">
//                                             </div>
//                                             <a href="../src/userCollection.html?collection=Action" class="card-link">More...</a>
//                                         </div>
//                                     </div>
//                                     <br>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <h4>Thriller</h4>
//                                             <div class="card-group" id="userCardThriller">
//                                             </div>
//                                             <a href="../src/userCollection.html?collection=Thriller" class="card-link">More...</a>
//                                         </div>
//                                     </div>
//                                     <br>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <h4>Comedy</h4>
//                                             <div class="card-group" id="userCardComedy">
//                                             </div>
//                                             <a href="../src/userCollection.html?collection=Comedy" class="card-link">More...</a>
//                                         </div>
//                                     </div>
//                                     <br>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <h4>Science Fiction</h4>
//                                             <div class="card-group" id="userCardScienceFiction">
//                                             </div>
//                                             <a href="../src/userCollection.html?collection=Science%20Fiction" class="card-link cardCenter">More...</a>
//                                         </div>
//                                     </div>
//                                     <br>
//                                     <div class="row">
//                                         <div class="col-sm-12">
//                                             <h4>Horror</h4>
//                                             <div class="card-group" id="userCardHorror">
//                                             </div>
//                                             <a href="../src/userCollection.html?collection=Horror" class="card-link">More...</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     `);

//     return mainPage;
// };

// export const createMovieSection = () => {
//     let movieDetailHtml = createHTMLElement(
//         `
//         <section id="movie-details">
//         <div class="container">
//             <div class="row">
//                 <div class="col-sm-6" id="imageDiv">

//                 </div>
//                 <div class="col-sm-6" id="descriptionDiv">

//                 </div>
//             </div>
//         </div>
//     </section>
//         `
//     );

//     return movieDetailHtml;
// };

function _moviesCollection(document, movies) {
    const collection = document.createElement('div');
    movies.forEach(movie => {
        collection.appendChild(createMovieCard(movie));
    });

    return collection;
}

const moviesCollection = _moviesCollection.bind(null, document);

// function createHTMLElement(html) {
//     const template = document.createElement('template');
//     template.innerHTML = html;
//     return template.content.firstElementChild;
// }

const movieCard = createMovieCard({
    title: 'Pirates of Caribbean: Dead Man\'s Chest',
    description: 'A short description of the movie'
});

  //document.getElementById('app').appendChild(movieCard);