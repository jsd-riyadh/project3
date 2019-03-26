$(function () {

    $("#datepicker").datepicker();

    let db = firebase.firestore().collection('Bills')
    let resList = $('.res-container')

    db.get()
        .then(result => {
            let changes = result.docChanges()
            changes.forEach(res => {
                console.log(res.doc.data());
                $(".tbl").append(`<tr data-id="${res.doc.id}">
            <td> ${res.doc.data().Amount} </td> 
            <td>${res.doc.data().Date} </td>
            <td> <button class="edit">Edit</button> <button class="delete">Delete</button></td>
            </tr>`)
            });
        }).catch(err => console.log(err))


    $('.add').click(function () {
        let amount = $('input[name=amount]').val() //take value from user input
        let date = $('input[name=date]').val()

        console.log(amount)
        console.log(date)

        db.add({//add input to database
            Amount: amount,
            Date: date
        }).then(res => {
            console.log(res)
            $(".tbl").append(`<tr data-id="${res.id}">
            <td> ${amount} </td> 
            <td>${date} </td>
            <td> <button class="edit">Edit</button> <button class="delete">Delete</button></td>
            </tr>`)

        })
    })
    $(".tbl").on('click', ".delete", function () {
        let id = $(this).parent().parent().data("id")

        db.doc(id).delete().then(suc => {
            $(this).parent().parent().remove()
        })
    })

    $.get("http://data.fixer.io/api/latest?access_key=fd9421626772d5d91a677c547eefff91", function (res) {
        console.log(res.rates);
        console.log(Object.keys(res.rates))
        var s = Object.keys(res.rates)
        s.forEach(el => {
            $(".api").append(`<li>${el} :  ${res.rates[el]}</li>`)
        })
    })

    //     resList.on('click', ".edit", function () {
    //         let id = $(this).parent().parent().data("id")
    //         db.doc(id).get().then(ress => {

    //             $("input[name=amount]").val(ress.data().amount)
    //             $("input[name=date]").val(ress.data().date)
    //             $(".update").attr("data-id", id)

    //            $(".submit").hide()
    //            $(".update").show()

    //        })

    //    })
    //    $(".update").on("click", function () {
    //        let id = $(this).data("id")
    //        console.log(id)

    //        let amount = $("input[name=amount]").val()
    //        let date = $("input[name=date]").val()
    //        db.doc(id).update({
    //            Amount: amount,
    //            Date: date
    //        })
    //    })
})

