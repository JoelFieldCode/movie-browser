var view = {
    addMovies : function(movies){
        var html = "";

        movies.forEach(function(movie){
            console.log(movie);
            html+= view.appendMovie(movie);
        });
        var parent = document.getElementById("movieListContainer");
        parent.innerHTML = html;

    },
    
    appendMovie : function(movie){

        return `
            <div class = "item">
                <div class = "content">
                    <a href = /movie/`+movie.name+`>
                        <div class ="header">
                            `+movie.name+`
                        </div>
                    </a>
                    `+movie.rating+ ` - ` +view.createGenreLabel(movie.genre)+`
                    
                </div>
            </div>
        `;
    },
    
    createGenreLabel: function(genre){
        return `
            <a href = "/genre/`+genre+`">
                <i class="fa fa-film" aria-hidden="true"></i>
    		    `+genre+`
		    </a>`;
    },
    
    loadMovieDetail: function(movie){
        var movieDetailStr = "";
        movieDetailStr +=
        `<a href = "/genre/`+movie.genre+`">
            <i class="fa fa-film" aria-hidden="true"></i>
    		 `+movie.genre+`
		</a>
		`;
		
        document.getElementById("movieDetailIcon").innerHTML = movieDetailStr;
        document.getElementById("detailHeader").innerHTML = movie.name;
        
        document.getElementById("movieDetailRating").innerHTML = `Rating : `+movie.rating;
        
        
        var detailMovieActorList = document.getElementById("detailMovieActorList");
        
        var movieActors = "";
        
        for(var actor in movie.actors){
            movieActors+= view.appendActors(movie.actors[actor]);
        }
        detailMovieActorList.innerHTML = movieActors;
    },
    
    appendActors: function(actor){
        return `
            <div class = "item">
                <i class = "fa fa-profile" aria-hidden="true"></i>
                <div class="content">
    		      <div class="header">`+actor.name+`</div>
    		      `+actor.bio+`
    		    </div>
            </div>
        `;
    },
    
    loadGenreDetail: function(genre){
        document.getElementById("detailHeader").innerHTML = genre.name;
        view.addMovies(genre.movies);
    },
    
    loadActorDetail: function(genre){
        document.getElementById("detailHeader").innerHTML = genre.name;
        view.addMovies(genre.movies);
    },
}
