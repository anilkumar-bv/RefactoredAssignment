import { clearBox, httpAsync } from './services';
import { createInitialMovieCollectionHtml, createMovieSearchCard } from './views';

export const filterItems = () => {
    let filter = document.getElementById('filterMovies');

    // convert text to lowercase
    let text = filter.value.toLowerCase();

    if (text === '') {
        alert('please provide search value');
        return false;
    }

    // clear the Contents of the Main div Tag
    clearBox('contentDiv');

    // get the initial html section
    let movieSection = createInitialMovieCollectionHtml();
    document.getElementById('contentDiv').appendChild(movieSection);

    var span = document.getElementById('searchFilterText');
    if (text)
        span.innerHTML = '<em>' + text + '</em>';
    var url = "https://api.themoviedb.org/3/search/movie?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&query=" + text + "&page=1&include_adult=false";
    console.log(url);

    // GET the Movies
    httpAsync(url, processResponseForMovieCollection, "GET", null);
}

// process the Response
function processResponseForMovieCollection(responseText) {
    var response = JSON.parse(responseText);
    console.log(response);
    if (response.total_results > 0) {
        var group1Tag = document.getElementById('group1');
        var group2Tag = document.getElementById('group2');
        var group3Tag = document.getElementById('group3');
        var group4Tag = document.getElementById('group4');

        for (var i = 0; i <= 12; i++) {
            /*
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Jurassic World: Fallen Kingdom</h5>
                    <a href="../src/movie.html?movieId=351286&amp;source=search">
                        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg" alt="Jurassic World: Fallen Kingdom">
                    </a>
                    <p>Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosa...</p>
                </div>
            </div>
            */
            let movie = response.results[i];
            let cardDivTag = createMovieSearchCard(movie);

            if (i <= 2)
                group1Tag.appendChild(cardDivTag);
            else if (i > 2 && i <= 5)
                group2Tag.appendChild(cardDivTag);
            else if (i > 5 && i <= 8)
                group3Tag.appendChild(cardDivTag);
            else if (i > 9 && i <= 12)
                group4Tag.appendChild(cardDivTag);
        }
    }
}