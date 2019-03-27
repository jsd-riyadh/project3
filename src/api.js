
const url = ('/api/movies');


//RETURNS MOVIE DATABASE AS JSON //
const getMovies = () => {
  console.log(url)
  return fetch(url)
    .then(response => response.json());
};


//ADD MOVIE TO DATABASE
const addMovie = () => {
  let title = $('#title').val();
  let rating = $("input[name='star-rating']:checked").val();

  const newMovie = {
    title: title,
    rating: rating
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  };
  fetch(url, options)
    .then(() => console.log('new movie added'))
    .catch(() => console.log('error'))
};

/// REMOVE MOVIE FROM DATABASE
const removeMovie = (movieID) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url + '/' + movieID + '', options)
    .then(() => console.log(`movie ${movieID} deleted`))
    .catch(() => console.log('error on delete'));
}


///RENDER MOVIE CARDS USING GET MOVIE FUNCTION ///
const renderMovies = () => {
  getMovies().then((movies) => {
    $("#pinwheel").css("display", "none");
    movies.forEach(({
      title,
      rating,
      id
    }) => {
      $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=3f81170cd8bbe4add029f6081319a022&query=" + title + "&callback=?", function (json) {
        var html = `<div class="card " id="${id}" style="background-image: url('https://image.tmdb.org/t/p/w185/${json.results[0].poster_path}')">`;
        html += 'Title: ' + title + '<br>';
        html += 'Rating: ' + rating + '</div>';
        $('#row1').append(html);
      });
    })
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  })
}


const renderDeletePills = () => {
  getMovies().then((movies) => {
    movies.forEach(({
      title,
      rating,
      id
    }) => {
      var html = `<a href="#" class="badge badge-danger" id="${id}">${title}</a>`;
      $('#delete-mov-title').append(html);
    })
  })
}

export default {
  getMovies,
  addMovie,
  removeMovie,
  renderMovies,
  renderDeletePills
};
