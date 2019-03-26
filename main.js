$(function () {
    let db = firebase.firestore().collection('movies')
    let db1 = firebase.firestore().collection('books')
    let db2 = firebase.firestore().collection('music')

    $('.popupCloseButton').click(function () {
        $('.popUp').hide();
        $('.here').empty();
        $('.submit').hide()
        $('.submit1').hide()
        $('.submit2').hide()
    })


    $('.submit').hide()
    $('.submit1').hide()
    $('.submit2').hide()


    // retrive movies    
    db.get()
        .then(result => {
            let changes = result.docChanges()

            changes.forEach(res => {
                $(".favMovies").append(`<li data-id="${res.doc.id}">${res.doc.data().name}-${res.doc.data().year}-${res.doc.data().genre}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)

            });

        }).catch(err => console.log(err))

    //    delete movie

    $(".favMovies").on('click', '.delete', function () {
        let id = $(this).parent().remove().data("id")
        console.log(id)
        db.doc(id).delete()

    })


    // retrive books
    db1.get()
        .then(result => {
            let changes = result.docChanges()

            changes.forEach(res => {
                $(".favBooks").append(`<li data-id="${res.doc.id}">${res.doc.data().name}-${res.doc.data().author}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)
            });

        }).catch(err => console.log(err))


    //    delete book

    $(".favBooks").on('click', '.delete', function () {
        let id = $(this).parent().remove().data("id")
        console.log(id)
        db1.doc(id).delete()

    })
    // retrive music
    db2.get()
        .then(result => {
            let changes = result.docChanges()

            changes.forEach(res => {
                $(".favMusic").append(`<li data-id="${res.doc.id}">${res.doc.data().songName}-${res.doc.data().artistName}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)
            });

        }).catch(err => console.log(err))


    //    delete music

    $(".favMusic").on('click', '.delete', function () {
        let id = $(this).parent().remove().data("id")
        console.log(id)
        db2.doc(id).delete()

    })

    // search movie

    $(".search").click(function () {
        $('.popUp').show();
        $('.submit').show();
        $(".submit").on('click', function () {
            let title = $(`input[name=title]`).val()

            $.get("http://www.omdbapi.com/?&apikey=25630984&t=" + title, function (res) {
                $(".here").append(`<li class="listAlign">${res.Title}-${res.Year}-${res.Genre}<img class="fav" src="imges/star.png"/></li>`)
                $(`input[name=title]`).val("")
                $(".fav").on('click', function () {
                    $(".favMovies").append(`<li>${res.Title}-${res.Year}-${res.Genre}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)

                    let name = res.Title
                    let year = res.Year
                    let genre = res.Genre

                    db.add({
                        name: name,
                        year: year,
                        genre: genre
                    })
                })
            })
        })
    })

    //  search book
    $(".search1").click(function () {
        $('.popUp').show();
        $('.submit1').show();
        $(".submit1").on('click', function () {
            let booktitle = $(`input[name=title]`).val()

            $.get("https://www.googleapis.com/books/v1/volumes?q=" + booktitle, function (res) {
                res.items.forEach(element => {
                    $(".here").append(`<li class="listAlign" book-id="${element.id}">${element.volumeInfo.title}-${element.volumeInfo.authors}<img class="fav" src="imges/star.png"/></li>`)
                    $(`input[name=title]`).val("")
                })
                $(".fav").on('click', function () {
                    let elem = $(this).parent()[0].innerText;
                    $(".favBooks").append(`<li>${elem}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)
                    let elementt = elem.split("-")
                    let name = elementt[0];
                    let author = elementt[1];

                    db1.add({
                        name: name,
                        author: author
                    })
                })
            })
        })
    })

    // search music
    $(".search2").click(function () {
        $('.popUp').show();
        $('.submit2').show();
        $(".submit2").on('click', function () {
            let songName = $(`input[name=title]`).val()

            $.get("https://itunes.apple.com/search?media=music&entity=song&term=" + songName, function (res) {
                let data = JSON.parse(res)
                data.results.forEach(element => {
                    let trackName = element.trackName
                    if (trackName == songName) {
                        $(".here").append(`<li class="listAlign" track-id="${element.trackId}">${element.trackName}-${element.artistName}<img class="fav" src="imges/star.png"/></li>`)
                        $(`input[name=title]`).val("")
                    }
                })
                $(".fav").on('click', function () {
                    let song = $(this).parent()[0].innerText
                    $(".favMusic").append(`<li>${song}<img class="delete" src="imges/icons8-trash-can-50.png"/></li>`)
                    let splittosave = song.split("-")
                    let name = splittosave[0];
                    let artistName = splittosave[1];

                    db2.add({
                        songName: name,
                        artistName: artistName
                    })
                })
            })
        })
    })
})