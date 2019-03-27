$(document).ready(function () {
    let section = "hardcover-advice";
    Fetch_books = function (t) {
        if (t == 1) {
            $("select").attr('selected', section)
            section = "hardcover-advice";
        }
        $("#select").show()
        $(".list").html("")
        $.ajax({
            url: `https://api.nytimes.com/svc/books/v3/lists.json?list-name=${section}&api-key=H0B75M4LG56eu5hpS0BVWrLX8rluJyuJ`,
            type: "get",
            success: function (res) {
                $(".ind").hide()
                res.results.forEach(element => {
                    $(".list").append(`
                    <div class="book">
                    <div class="details">
                        <h3 id="title">${element.book_details[0].title} By ${element.book_details[0].author}</h3>
                        <h4 id="discription">${element.book_details[0].description}</h4>
                    </div> <button class="add"  id="${element.book_details[0].title}-${element.book_details[0].description}-${element.book_details[0].author}">Add To Reading List</button>
                </div>`)
                });
            },
            error: function (xhr, status, err) {
                alert(err)
            }
        })
    }

    Fetch_books();
    let db = firebase.firestore().collection('books')
    let list = $('.list')

    Fetch_readingList = function () {
        console.log("hi")
        $(".list").html("")
        $("#select").hide()
        db.get()
            .then(result => {
                let changes = result.docChanges()
                changes.forEach(res => {
                    $(".list").append(`
                    <div class="book" >
                    <div class="details">
                        <h3 id="title">${res.doc.data().title} By ${res.doc.data().author}</h3>
                        <h4 id="discription">${res.doc.data().description}</h4>
                    </div> <button class="delete" id = "${res.doc.id}">delete</button></div>`)
                })
            })
    }

    list.on('click', ".delete", function () {
        let id = this.id;
        db.doc(id).delete()
        alert("The book deleted from your list!")
        Fetch_readingList()
    })

    $(".list").on('click', '.add', function () {
        let bookData = this.id.split("-");
        db.add({
            author: bookData[2],
            description: bookData[1],
            title: bookData[0]
        }).then(res => {
            alert(`${bookData[0]} added to your lis!`)
        })
    })
    $('#select').change(function () {
        console.log(this.value)
        $(".ind").show()
        section = this.value;
        Fetch_books();
    })
    $("#best_list").on("click", function () { Fetch_books(1) })
    $("#reading_list").on("click", function () {
        Fetch_readingList()
    })
})