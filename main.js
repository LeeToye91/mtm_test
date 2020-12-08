// Lee.T I have not compiled this project for readability, however I would use npm minify and compile into relevant production folder on push

//Navbar Toggler Animation (Purely for mobiles sake)

$(document).ready(function () {
    $('.navbar-toggler').on('click', function () {
        $('.animated-icon').toggleClass('open');
    });
});


// Call API Feed and Set Variables
var apiUrl = 'https://api.themoviedb.org/3/';
var apiKey = '6d5cb596ee405a9c6afc4a3225572361'

// Fetch genre list
var genreList = new Array();
$.ajax({ type: "GET",   
         url: apiUrl + "genre/movie/list?api_key=" + apiKey + "&language=en-US",   
         async: false,
         success : function(text)
         {
             genreList = text;
         },
         error: function(text) {
            alert("AJAX error: "+JSON.stringify(text));
        }
});

function jsonCallMovieList() {

    // Format Genre List for comparison
    var genreItems = genreList.genres
    console.log(genreItems);

    $.ajax({
        type: 'GET',
        url: apiUrl + 'movie/now_playing?api_key=' + apiKey + '&language=en-US&page=1',
        crossDomain: true,
        dataType: 'json',
        success: function(data){  

            var results = data.results;
        
            // Sort json by popularity
            results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));

            $.each(results, function(index, results) {
                // Build list element for genre
                var list = document.createElement('ul');
                list.className = "genre-list movie-content-" + index;

                // Pull genre IDs and compare in genre API to pull name values
                var genreIds = results.genre_ids;
                for(let i = 0; i < genreIds.length; i++){ 
                    var movieId = genreIds[i];
                    if (genreItems.indexOf(movieId) == -1) {
                        var item = genreItems.find(item => item.id === movieId)
                        // Create list element for genre
                        var itemContainer = document.createElement('li');
                        itemContainer.appendChild(document.createTextNode([item.name]));
                        list.appendChild(itemContainer);
                    }
                }

                var anchor = document.getElementById('movieList'); 
               
                // Set variables for HTML output
                var movieTitle = results.title;
                var imageSrc = 'https://image.tmdb.org/t/p/w500' + results.backdrop_path;
                // Format HTML output
                var movieHeading = "<h1 class='movie-text movie-content-" + index + "'>" + movieTitle + "</h1>";
                var movieImage = $('<div class="image-container movie-content-' + index + '""><img src="' + imageSrc + '" alt="Image of ' + movieTitle + '"></div>');
                // Structure elements
                $(anchor).append(movieImage, movieHeading, list);

                // Set popularity value as id of movie tile div
                var popId = results.vote_average
                var popId = Math.floor(popId);
                // Wrap specified elements with outside tile/grid div
                $( ".movie-content-" + index ).wrapAll( $( "<div class='shadow-custom movie-item' data-pop=" + popId + "></div>" ) );
            });
        },
        error: function(request,error) {
            alert("AJAX error: "+JSON.stringify(data));
        }
    });

};

function movieFilter(id) {
    // Setup filter to add display none to all items in movie grid less than select value
    // Simple class switch to prevent further api calls to filter results
    $('#movieList').find(".movie-item").each(function(){
        if($(this).attr('data-pop') < id){
            $(this).addClass('d-none');
        }
        else{
            $(this).removeClass('d-none');
        }
    });
};

$('#movieFilter').on('change', function() {
    var optionValue = $('#movieFilter select').val();
    movieFilter(optionValue);
});

$(document).ready(function() {
    jsonCallMovieList();
});


