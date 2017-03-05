var view = {
    // Receive list of movies, create a list
    addMovies : function(movies){
        var html = "";

        movies.forEach(function(movie){
            html+= view.appendMovie(movie);
        });
        var parent = document.getElementById("movieListContainer");
        parent.innerHTML = html;

    },
    
    // Pop up error messages to deal with errors.
    dealWithError: function(error){
        if(error.message === "Network Error"){
            notific8("Network error, please try another time.", { color: 'ruby' });
            return;
        }
        notific8("Coudn't find that actor, movie or genre, please use the links provided on this page", { color: 'ruby' });
  
    },
    
    // Receive one movie, append a item div with href link
    appendMovie : function(movie){
        var fixedMovieUrl = this.fixUrl(movie.name);

        return `
            <div class = "item">
                <div class = "content">
                    <a href = /movie/`+fixedMovieUrl+`>
                        <div class ="header">
                            `+movie.name+`
                        </div>
                    </a>
                    <i class="fa fa-star" aria-hidden="true"></i> `+movie.rating+
                    view.createGenreLabel(movie.genre)+`
                </div>
            </div>
        `;
    },
    
    // Receive list of genres, create a list
    addGenres: function(genres){
        var self = view;
        var parent = document.getElementById("genreList");
        
        genresHTML = "";
        
        genres.forEach(function(genre){
            genresHTML += self.createGenreLabel(genre.name);
        });
        
        
        parent.innerHTML = genresHTML;
    },
    
    //Receive a genre, create a label with a href link
    createGenreLabel: function(genre){
        var genreURL = this.fixUrl(genre);
        return `
            <div class = "item">
                <a href = "/genre/`+genreURL+`">
                    <i class="fa fa-film" aria-hidden="true"></i>`+genre+`
		        </a>
            </div>`;
    },
    
    // Toggle search box display depending on if we are in detail view.
    toggleSearchBoxes: function(type){
        var allSearches =  document.getElementsByClassName("ui search");
        var thisSearchEL;
        for(var searchEL in allSearches){
            thisSearchEL = allSearches[searchEL];
            if(thisSearchEL.style === undefined){continue;}
            
            thisSearchEL.style.display = type;
        }
    },
    
    //Toggle menu selections
    toggleClasses: function(el){
        var elements = document.getElementsByClassName("item");
        var self = view;
        self.removeMenuSelections(elements);
        
        el.classList.add("active");
      
    },
    
    // Remove menu selections if we are on a detail view( e.g - actor/Robert Downey Jr)
    removeMenuSelections: function(elements){
        for(var element in elements){
            if(elements[element].classList === undefined){continue;}
            elements[element].classList.remove("active");
        }
    },
    
    //Little fix for spaces in href links
    fixUrl: function(value){
        return value.replace(/ /g, "%20");
    },
    
    //Receive a movie, load the detail info about it
    loadMovieDetail: function(movie){

        var self = view;
        var genreURL = self.fixUrl(movie.genre);
        var movieDetailStr = "";
        
        // Add detail label
        movieDetailStr +=
        `<a href = "/genre/`+genreURL+`">
            <i class="fa fa-film" aria-hidden="true"></i>
    		 `+movie.genre+`
		</a>
		`;
		
        document.getElementById("movieDetailIcon").innerHTML = movieDetailStr;
        document.getElementById("detailHeader").innerHTML = movie.name;
        
        document.getElementById("movieDetailRating").innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>`+movie.rating;
        
        // Add the list of actors from this movie
        view.addActorsList(movie.actors);

    },
    
    // Receive a list of actors, create a list
    addActorsList : function(actors){
        var actorList = document.getElementById("actorList");
        var movieActors = "";
        
        //Loop through each actor, sent to get a item created
        for(var actor in actors){
            movieActors+= view.appendActor(actors[actor]);
        }
        actorList.innerHTML = movieActors;
    },
    
    // Receive a actor, create a item for it
    appendActor: function(actor){
        var fixedUrl = this.fixUrl(actor.name);
        return `
            <div class = "item">
                <i class = "fa fa-profile" aria-hidden="true"></i>
                <div class="content">
    		      <a href = "/actor/`+fixedUrl+`">
    		        <div class="header">`+actor.name+`</div>
    		      </a>
    		      `+actor.bio+`
    		    </div>
            </div>
        `;
    },
    
    // Receive a genre, load the detail info for it
    loadGenreDetail: function(genre){
        document.getElementById("detailHeader").innerHTML = genre.name;
        
        // Add all the movies from this genre
        view.addMovies(genre.movies);
        
        // Hacky fix because of the JSON structure my API is serving. I am basically just converting the object structure back into an array of actors
        var actorsArray = [];
        for(var actorKey in genre.actors){
            actorsArray.push({
                name: actorKey,
                bio: genre.actors[actorKey].bio
            });
        }
        
        // Add all the actors from this genre
        view.addActorsList(actorsArray);
    },
    
    // Receive actor, load detail view for it
    loadActorDetail: function(actor){

        document.getElementById("detailHeader").innerHTML = actor.info.name;

	 	document.getElementById("actorAge").innerHTML = "Age: "+actor.info.age;
	 	document.getElementById("actorBio").innerHTML = actor.info.bio;
	 	
	 	// Add all the actor's movies
        view.addMovies(actor.movies);
    },
}