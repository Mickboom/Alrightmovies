document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "69398c8228ad0ef2282393e5c5e98323";

    function fetchMovies(category, elementId) {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const row = document.getElementById(elementId);
            row.innerHTML = ""; 

            data.results.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <h5>${movie.title}</h5>
                    <button class="btn btn-warning btn-sm" onclick="showAdThenTrailer(${movie.id})">Watch Trailer</button>
                `;
                row.appendChild(movieCard);
            });
        });
    }

    window.showAdThenTrailer = function(movieId) {
        document.getElementById("trailerModalContainer").innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <p>Advertisement</p>
                    <button onclick="fetchTrailer(${movieId})">Skip Ad</button>
                </div>
            </div>
        `;
    };

    window.fetchTrailer = function(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const trailerKey = data.results[0].key;
                document.getElementById("trailerModalContainer").innerHTML = `
                    <div class="modal">
                        <iframe class="modal-content" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                alert("Trailer not available.");
            }
        });
    };

    fetchMovies("popular", "trending");
    fetchMovies("top_rated", "top-rated");
    fetchMovies("upcoming", "upcoming");
});