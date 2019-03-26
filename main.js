$(function () {


    // My Books//

    let myBooks = firebase.firestore().collection('myBooks')
    let resList = $('.myBooksContainer')

    myBooks.get()
        .then(result => {
            let changes = result.docChanges()//gets array of docs

            changes.forEach(el => {

                resList.append(`<li data-id="${el.doc.id}">${el.doc.data().Book} - by ${el.doc.data().Author} <button class="edit">edit</button> <button class="delete">delete</button></li>`)

            });

        }).catch(err => console.log(err))

    // if "add to my books" button is clicked, the data in the fields will be added to the database and to the page of the app too.
    $('.addToMyBooks').click(function () {

        let Book = $('input[name=bookName]').val()
        let Author = $('input[name=authorName]').val()

        myBooks.add({
            Book: Book,
            Author: Author
        }).then(res => {
            resList.append(`<li data-id="${res.id}">${Book} - by ${Author} <button class="edit">edit</button> <button class="delete">delete</button></li>`)

        })

        //clear the input fields after appending
        $('input[name=bookName]').val("")
        $('input[name=authorName]').val("")

    });


    // if delete is clicked, the book will be removed from my database and the page of the app too.
    resList.on('click', ".delete", function () {
        let id = $(this).parent().data("id") // gets parent data-id

        // remove from database
        myBooks.doc(id).delete()
            .then(res => {
                // remove from page
                $(this).parent().remove()
            })

    })

    // if edit is clicked, the selected book data will be populated in the field to update
    resList.on('click', ".edit", function () {

        let id = $(this).parent().data("id")

        myBooks.doc(id).get().then(res => {

            $('input[name=bookName]').val(res.data().Book)
            $('input[name=authorName]').val(res.data().Author)
            $('input[name=editedId]').val(id)

        })

    })


    // if "update my book" button is clicked, the bookd details will be updated in the database and on the page of the app too.

    $('.updateMyBook').click(function () {

        let Book = $('input[name=bookName]').val()
        let Author = $('input[name=authorName]').val()
        let id = $('input[name=editedId]').val()

        ///////
        myBooks.doc(id).update({
            Book: Book,
            Author: Author
        })
            .then(res => {
                $(`li[data-id= ${id}]`).html(`${Book} - by ${Author} <button class="edit">edit</button> <button class="delete">delete</button>`)

            })

        //clear the input fields after updating
        $('input[name=bookName]').val("")
        $('input[name=authorName]').val("")

    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    // To Buy Books//

    let booksToBuy = firebase.firestore().collection('toBuyBooks')
    let resList2 = $('.booksToBuyContainer')

    booksToBuy.get()
        .then(result => {
            let changes = result.docChanges()//gets array of docs

            changes.forEach(el => {

                resList2.append(`<li data-id="${el.doc.id}">${el.doc.data().Book} - by ${el.doc.data().Author} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)

            });

        }).catch(err => console.log(err))

    // if "add to books to buy" button is clicked, the data in the fields will be added to the database and to the page of the app too.
    $('.addToBooksToBuy').click(function () {

        let Book = $('.toBuyBookName').val()
        let Author = $('.toBuyAuthorName').val()

        booksToBuy.add({
            Book: Book,
            Author: Author
        }).then(res => {
            resList2.append(`<li data-id="${res.id}">${Book} - by ${Author} <button class="edit">edit</button> <button class="delete">delete</button></li>`)

        })

        //clear the input fields after appending
        $('.toBuyBookName').val("")
        $('.toBuyAuthorName').val("")

    });

    // if delete is clicked, the book will be removed from my database and the page of the app too.
    resList2.on('click', ".delete", function () {
        let id = $(this).parent().data("id") // gets parent data-id

        // remove from database
        booksToBuy.doc(id).delete()
            .then(res => {
                // remove from page
                $(this).parent().remove()
            })

    })

    // if edit is clicked, the selected book data will be populated in the field to update
    resList2.on('click', ".edit", function () {

        let id = $(this).parent().data("id")

        booksToBuy.doc(id).get().then(res => {

            $('.toBuyBookName').val(res.data().Book)
            $('.toBuyAuthorName').val(res.data().Author)
            $('input[name=editedId]').val(id)

        })

    })

    // if "update Books To Buy" button is clicked, the bookd details will be updated in the database and on the page of the app too.

    $('.updateBookToBuy').click(function () {

        let Book = $('.toBuyBookName').val()
        let Author = $('.toBuyAuthorName').val()
        let id = $('input[name=editedId]').val()

        ///////
        booksToBuy.doc(id).update({
            Book: Book,
            Author: Author
        })
            .then(res => {
                $(`li[data-id= ${id}]`).html(`${Book} - by ${Author} <button class="edit">edit</button> <button class="delete">delete</button>`)

            })

        //clear the input fields after updating
        $('.toBuyBookName').val("")
        $('.toBuyAuthorName').val("")

    });

    ////////////////////////////////////////////////////////////////////////////////////////////

    // Books Search//

    let apiData = []

    $("#search").on("click", function () {

        let search = $('input[id=searchField]').val()
        console.log(search)

        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
            type: "get",
            success: function (res) {
                apiData = res
                console.log(apiData.items)
                // appending the searched books to the page
                $(".resultedBook").remove();
                apiData.items.forEach(function (element) {

                    let html = `<div class="resultedBook"><section class="featuredImage"></br><img src="${element.volumeInfo.imageLinks.thumbnail}"> <h3 class="title">${element.volumeInfo.title}</h3></section><section class="description"><div class="description">${element.volumeInfo.description}</div><a href="#"></a><h6${element.section}</h6></section></br></div></div>`

                    $("#searchResults").append(html)
                });

            }
        });


    });

});

