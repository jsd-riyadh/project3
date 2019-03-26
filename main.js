$(function () { //must always be here if you use JQuery
  
  function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const textDairy = document.querySelector('.searchForm-input');

    // console.log(textDairy.value)

    textDairy.addEventListener('keyup', logKey);

    function logKey() {
      log.textContent = textDairy.value;
    }

  
  }



  const form = document.querySelector('.textForm');
  form.addEventListener('submit', handleSubmit);





  // let url = "http://api.giphy.com/v1/gifs/random?api_key=MrqXFbPUBq5UZPFQ9ZbLz0sbLP40voobi"

  // fetch(url).then(function (res) {
  //   // console.log(res)
  //   return res.json();

  // }).then(function (res) {
  //   console.log(res.data.images.fixed_width.url)

  //   $(".jaafar").append(`<img src="${res.data.images.fixed_width.url}" alt="" />`)
  // })





  // -----------------------------[ Firebase ]----------------






  let db = firebase.firestore().collection('sultans')
  let resList = $('.res-container')

  db.get()
    .then(result => {
      let changes = result.docChanges()//gets array of docs

      changes.forEach(res => {
        // console.log(res.doc.data());
        resList.append(`
        <div  data-id="${res.doc.id}" class=" text-container m-2 text-white row">
        <div id='open-modal' class=" col-md-8 ellipsis overflow" data-toggle="modal" data-target="#myModal">
        ${res.doc.data().name}
        </div>
        <div class="col-md-4">
         <button class="edit btn btn-info">edit</button>
         <button class="btn btn-danger delete">delete</button>
         </div>
          </div>`)


      });

    }).catch(err => console.log(err))


  resList.on('click', ".delete", function () {
    // $(this).parent().attr("data-id")
    let id = $(this).parent().parent().data("id")

    db.doc(id).delete()
    // .then()

  })


  resList.on('click', "#open-modal", function () {
    let id = $(this).parent().data("id")

    let name = db.doc(id).get().then(res=>{
      name= res.data().name

      $('.modal-body').html(name)
      $('.modal-title').html(name)
       
    })
 
    




  })

  resList.on('click', ".edit", function () {
    // $(this).parent().attr("data-id")
    let id = $(this).parent().parent().data("id")

    // let name = 
    let location = $('input[name=location]').val()

    db.doc(id).get().then(res => {
      // console.log(res.data());

      $('input[name=name]').val(res.data().name)
      // $('input[name=location]').val(res.data().location)
    })
    // db.doc(id).update({

    // })
    // .then()

  })

  //create data and store to restaurants collection
  $('#subBtn').click(function () {
    let input  = $('input').val()
    $('#subDiv').html(input)
    // $('.jaafar').
    // let name = $('input[name=name]').val()
    // let location = $('input[name=location]').val()

    // console.log(name)
    

    db.add({
      name: input,
      // location: location
    }).then(res => {
      resList.append(`<li data-id="${res.id}">${name} - <button class="edit">edit</button> <button class="btn btn-danger delete">delete</button></li>`)


    })


  // })

  // $("").click(function(){
   

  //   db.add({
  //     name: input,
  //   }).then(res => {
  //     // resList.append(`<li data-id="${res.id}">${name} - ${location} <button class="edit">edit</button> <button class="delete">delete</button></li>`)


  //   })
  // })




})
})

