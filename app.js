$(function() {
  let jafar = 0;
  let db = firebase.firestore().collection("onehour");

  // This is one hour countdown function includes set interval
  let countdown = 60;
  setInterval(function() {
    countdown--;
    realTime = countdown * 1.6;
    $("#countdown").attr(`style`, `width:${realTime}%`);
    $("#countdown").empty();
    $("#countdown").append(`${countdown} Minutes`);

  }, 60000);

  // Here we retrieve the previous comments from database
  db.get()
    .then(result => {
      let changes = result.docChanges();

      changes.forEach(res => {
        $("#dataTable").append(
          `<tr>
            <td>${res.doc.data().comment}</td>
            <td>
              <button data-id="${
                res.doc.id
              }" type="button" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>`
        );
      });
    })
    .catch(err => console.log(err));

  // This is an API fetch from Youtube searching for TEDx Videos
  axios
    .get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=TEDx&key=AIzaSyAV40f-_FGdzRvz4dxzU7SvYGNAVcaDXKw"
    )
    .then(function(response) {
      var array = [];
      let first = response.data.items;
      for (var i = 1; i < 5; i++) {
        array.push(first[i].id.videoId);
      }
      $("#nextVideo").click(function() {
        if (jafar < 4) {
          $(".responsive-video").empty();
          $(".responsive-video").append(`
          <iframe src="https://www.youtube.com/embed/${array[jafar]}"></iframe>
          </div>`);
          jafar++;
        } else {
          jafar = 0;
        }
      });
    });

  // Here we push new comments to database
  $("#share").click(function() {
    let newComment = $(".form-control").val();
    db.add({
      comment: newComment
    }).then(res => {
      $("#dataTable").append(
        `<tr>
                <td>${newComment}</td>
                <td>
                  <button data-id="${
                    res.id
                  }" type="button" class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>`
      );
    });
    $(".form-control").val("");
  });

  // This is delete button
  $(".table").on("click", ".btn-danger", function(e) {
    let id = $(this).attr("data-id");
    let tr = $(this)
      .parent("td")
      .parent("tr");
    db.doc(id).delete();
    tr.fadeOut("slow");
  });
});
