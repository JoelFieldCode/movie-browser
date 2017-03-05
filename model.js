var model = {
    movies : [],
    genres: [],
    actors: [],
    
    // Unique key values for genres, actors and movies. By saving the key we don't have to make another AJAX request.
    detailGenres : {
        
    },
    detailActors : {
        
    },
    detailMovies: {
        
    },
    // Filter and return data based on the given type (e.g movies, actors or genres)
    filter: function(e,type){
        
        return this[type].filter(function(d){
            return d.name.toLowerCase().indexOf(e.value.toLowerCase()) > -1;
        });
        
    },
};