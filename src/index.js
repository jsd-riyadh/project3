///IMPORT FUNCTIONS FROM API.JS ////
import movies from './api';

movies.renderMovies();

// ADD MOVIE BUTTON MODAL //
$("#add").on("click", function(){
    $("#myModal").modal("show");
});

//ADD MOVIE FROM MODAL INFO//
$('#add-movie-btn').on('click', function(){
    console.log($('#title').val());
    console.log($("input[name='star-rating']:checked").val());
    movies.addMovie();
    $('#row1').html('');
    movies.renderMovies();
    $("#myModal").modal("hide");
});

//DELETE MOVIE BUTTON MODAL //
$("#delete").on("click", function(){
    $("#delete-modal").modal("show");
    $('#delete-mov-title').html('');
    movies.renderDeletePills();
});

//DELETE MOVIE BUTTON MODAL //
$(".delete-modal").on("click", ".badge",function(){
    $(this).toggleClass("active");
    let id = $(this).attr('id')

    //delete movie
    $("#del-mov-btn").on("click", function(){
        movies.removeMovie(id);
    });
});



