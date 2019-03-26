
let db = firebase.firestore().collection('project3')

$(document).ready(function () {

  let resList = $('#comment')

  resList.on('click', ".edit", function () {
    // $(this).parent().attr("data-id")
    let id = $(this).parent().data("id")
    let name = $(this).parent().data("name")
    let id2 = $('input[name=id1]').val()

    $("#edit").append( '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span>'+
' <input type="hidden"  name="name1" value="'+name+'">' +
' <input type="text" placeholder="Enter your comment" name="comment1" required>' +
' <input type="hidden" id="custId" name="id" value="'+id+'">'+
'<button class="submit1 btn" type="submit"">send</button></div></div>')

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

span.onclick = function() {
  modal.style.display = "none";
}
$( ".submit1" ).click(function() {
  modal.style.display = "none";});
  $('#' + id).hide()
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    $('#' + id).hide()
    $('#c' + id).hide()
    $('#e' + id2).hide()
    $('#ce' + id2).hide()
  })

  resList.on('click', ".delete", function (e) {
    let id = $(this).parent().data("id")
    let id2 = $('input[name=id1]').val()
    db.doc(id).delete()
    db.doc(id2).delete()
    $('#' + id).hide()
    $('#c' + id).hide()
    $('#e' + id2).hide()
    $('#ce' + id2).hide()
  })

  $('#content').on('click', '.submit', function (e) {
    e.preventDefault()
    let name = $('input[name=name]').val()
    let comment = $('input[name=comment]').val()

    db.add({
      name: name,
      comment: comment
    }).then(res => {
      resList.append(`<div id="c${res.id}" class="comment"><li id="${res.id}" data-name="${name}" data-id="${res.id}"><div class="comment-author">${name} </div><div class="comment-text"> ${comment} </div><button class="edit">edit</button> <button class="delete">delete</button></li></div>`)
      
    }).catch(er => console.log(er))

  })
  
  $('#content').on('click', '.submit1', function (e) {
    e.preventDefault()
    let name = $('input[name=name1]').val()
    let comment = $('input[name=comment1]').val()
    let id2 = $('input[name=id]').val()
console.log(id2)
db.doc(id2).update({
      comment: comment
    })
    resList.append(`<div id="ce`+id2+`" class="comment"><li id="e`+id2+`" data-name="${name}" data-id="`+id2+`"><div class="comment-author">${name} </div><div class="comment-text"> ${comment} </div><button class="edit">edit</button> <button class="delete">delete</button></li></div>`+
    ' <input type="hidden" id="cusId" name="id1" value="'+id2+'">')
  
  })

})


$.ajax({
  url: "https://www.food2fork.com/api/search?key=70733b9b7787b25a26e8dbb489241e5f&q=chicken%20breast&page=2",
  type: "get",
  success: function (results) {
    let s = JSON.parse(results)
    // console.log(s.recipes)
    s.recipes.forEach(function (element) {
      // console.log(element)
      $(".row").append('<div class="col-md-3" data-title="' + element.title + '" data-img="' + element.image_url + '" data-url="' + element.source_url + '" data-id="' + element.recipe_id + '" onclick="popup(this)">' +
        '<div class="image"><img src="' + element.image_url + '"> '
        + '<div class="name"><h3>' + element.title + '</h3></div></div>' +
        '<ul class="media"><li>publisher: ' + element.publisher + '</li><li>recipe id: ' + element.recipe_id + '</li></ul></div>')
    });

  },
  error: function (xhr, status, err) {
    console.log("not working")
  }

})

function popup(con) {
  let title = con.getAttribute("data-title");
  let url = con.getAttribute("data-url");
  let img = con.getAttribute("data-img");
  let id = con.getAttribute("data-id");
  $('#comment').empty()
  document.getElementById("myForm").style.display = "block";
  $("#content").append('<h1>' + title + '</h1>' +
    '<img src="' + img + '" height="150px" width="150px"> <br><br>' +
    '<a href="' + url + '" class="popUpAction" target="_blank">Read more from source</a>' +
    '<div id="' + id + '"><form class="form-container"> <h1>add comments</h1>' +
    ' <input type="text" placeholder="Enter your name" name="name" required>' +
    ' <input type="text" placeholder="Enter your comment" name="comment" required>' +
    '<button class="submit btn" type="submit"">send</button>' +
    '<button type="button" class="btn cancel" onclick="closeForm()">Close</button> </form>' +
    '<div id="edit"></div></div>')
}


function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

