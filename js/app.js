$(function(){
  moviesList()
})

function moviesList(){
  $.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8bcbd60b36410cb7d6c4f88c9eaad318',
    function(results){
      results.results.forEach(element => {

        let title = element.title
        let overview = element.overview
        let poster = `https://image.tmdb.org/t/p/w500/${element.poster_path}`
        
          $("#moviesList").append(`
            <div class="col-md-4 col-sm-12">
              <div class="card">
                <img class="card-img-top" src="${poster}" alt="Move Poster">
                <div class="card-body">
                  <h4 class="card-title">${title}</h4>
                  <p class="card-text">${overview}.</p>
                <button id="add" class="btn btn-primary" style="margin-left: 10%;" onclick='add("${poster}", "${title}", "${overview}")'><i class="material-icons">favorite</i> Add to My Favorite List</button>
                </div>
              </div>
            </div>
          `)
      })
    })
}


function add(poster, title, overview){
  let db = firebase.firestore().collection('movies');
  var flag = true;

  db.get().then(res => {
    let changes = res.docChanges()
    changes.forEach(res => {
      if(res.doc.data().title === title){
        flag = false;
      }
     })
  }).catch(err => {
      console.log(err);
  }).then(function(){
    if(flag == true){
      db.add({
        poster: poster,
        title: title,
        overview: overview,
      })
      $("#suc").show();
      setTimeout(function(){
          $("#suc").hide()
      }, 5000);
    }
    else{
      $("#err").show();
      setTimeout(function(){
          $("#err").hide()
      }, 5000);
    }
  }
  )
}