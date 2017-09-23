var baseURL = "https://movie-api-joelfieldcode.c9users.io/movieAPI/public/"; // base API URL, change as needed.
// Though I'll keep this server running so you can use it without setting up the API locally yourself.

var auth = {
    allActors : baseURL+"actor", // URL for getting all actors
    allMovies: baseURL+"movie", // URL for getting all movies
    allGenres: baseURL+"genre", // URL for getting all genres,
    addMovie: baseURL+"create/movie",
    addActor: baseURL+"create/actor",
    addGenre: baseURL+"create/genre",
};
