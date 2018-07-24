const addMovieToCollectionController = () => {
    alert('Add movie to collection');
};

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// function to create a Movie Card
export const createMovieCard = function (movie, isUserCollection = false) {
    let movieCard = null;
    if (isUserCollection) {
        // Append "&source=userCollections" to the Anchor Tag
        movieCard = createHTMLElement(`
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">${movie.title}</h5>
            <a href="../src/movie.html?movieId=${movie.id}&source=userCollections"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}"></a>
            <p class="card-text">Vote Average: ${movie.vote_average}'</p>
        </div>
      </div>
    `);
    }
    else {
        movieCard = createHTMLElement(`
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">${movie.title}</h5>
            <a href="../src/movie.html?movieId=${movie.id}&source=popular"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}" alt="${movie.title}"></a>
            <p class="card-text">Vote Average: ${movie.vote_average}'</p>
        </div>
      </div>
    `);
    }

    return movieCard;
};

function _moviesCollection(document, movies) {
    const collection = document.createElement('div');
    movies.forEach(movie => {
        collection.appendChild(createMovieCard(movie));
    });

    return collection;
}

const moviesCollection = _moviesCollection.bind(null, document);

function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

const movieCard = createMovieCard({
    title: 'Pirates of Caribbean: Dead Man\'s Chest',
    description: 'A short description of the movie'
});

  //document.getElementById('app').appendChild(movieCard);