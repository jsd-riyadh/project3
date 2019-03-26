$(function(){
    favoriteMovies()
  })
  
  function favoriteMovies(){
    let db = firebase.firestore().collection('movies');
    db.get().then(res => {
      let changes = res.docChanges()
      changes.forEach(res => {
        $("#favoriteMoviesList").append(`
        <div class="col-md-4 col-sm-12">
            <div class="card">
            <img class="card-img-top" src="${res.doc.data().poster}" alt="Move Poster">
            <div class="card-body">
                <h4 class="card-title ">${res.doc.data().title}</h4>
                <p class="card-text">${res.doc.data().overview}.</p>
            <button id="${res.doc.id}" href="#" class="btn btn-danger" style="margin-left: 3%;" onclick='deleteMovie("${res.doc.id}")'><i class="material-icons">clear</i> Remove from My Favorite List</button>
            </div>
            </div>
        </div>
        `)
       })
  
    }).catch(err => {
        console.log(err);
    }).then(function(){
      $("#loading").hide()
    }
    )
  }

  function deleteMovie(id){
    let db = firebase.firestore().collection('movies');
    db.doc(id).delete().then(() => { 
        $(`#${id}`).parent().parent().parent().hide()//.remove();
        $("#suc").show()
        setTimeout(function(){
            $("#suc").hide()
        }, 5000);
    })
  }