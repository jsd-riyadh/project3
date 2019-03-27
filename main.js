
$(document).ready(function () { //must always be here if you use JQuery

    let db = firebase.firestore().collection('reservations')
    let contContainer = $('.content-container')
    let table = $('#data-grid')
    db.where('date', '==', '2019-03-21').where('location','==','الشاليه بالكامل').get()
        .then(e => console.log(e.docChanges()[0].doc.data().name))
    let calendarDiv = $('#calendar')

    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = ((tdate.getMonth().length + 1) === 1) ? (tdate.getMonth() + 1) : '0' + (tdate.getMonth() + 1);
    var yyyy = tdate.getFullYear();
    var currentDate = yyyy + "-" + MM + "-" + dd;
    $('input[name=bday]').attr("placeholder", currentDate)

    // console.log(currentDate)

    getData()

    function getData() {
        calendarDiv.empty()
        table.empty()
        db.get().then(result => {
            let changes = result.docChanges() //gets array of docs
            // console.log(changes)
            changes.forEach(res => {
                // console.log(res.doc.data());

                table.append(`  <tr id="${res.doc.id}" data-id="${res.doc.id}">
            <th scope="row" class="nameClass">${res.doc.data().name}</th>
            <td class="locationClass" >${res.doc.data().location}</td>
            <td  class="dateClass" > ${res.doc.data().date}  </td>
            <td>  
               <button class="edit btn btn-info" data-toggle="modal" data-target="#popUp"><i class="fa fa-edit"></i></button> 
               <button class="delete btn btn-danger"><i class="fa fa-trash"></i></button> 
            </td>     
        </tr>`)


            });

            setCalendar()

        }).catch(err => console.log(err))

    }


    


    table.on('click', ".delete", function () {
        //  console.log(id)
        deletConfirm()
        $('.modal-title').html("تأكيدالحذف !!")

        let id = $(this).closest('tr').data("id")

        


        
        // $('.submit').replaceWith(``)
        $('#popUp').modal({ show: true })

        console.log(id)
        $('.delete-confirm').click(function(){
            done()            
        $('.modal-title').html("")           
            db.doc(id).delete() 
            
            getData()
        })


    })



    table.on('click', ".edit", function () {
        // $(this).parent().attr("data-id")
        let id = $(this).closest('tr').data("id")
        $('.submit').replaceWith(`<button class="update btn btn-info w-100 mt-2">تحديث</button>`)
        let date = $('input[name=bday]').val()
        db.doc(id).get().then(res => {
            // console.log(res.data());            
            $('input[name=name]').val(res.data().name)
            $('input[select=location]').val(res.data().location)
            $('input[name=bday]').val(res.data().date)
            // $('.formcontainer').append(`<button class="update">Update</button>`)
            // $('.submit').replaceWith(`<button class="update btn btn-info w-100 mt-2">تحديث</button>`)
            $('.update').click(function () {
                $('.modal-title').html("بيانات الحجز")
                let nameI = $('input[name=name]').val()
                let locationI = $('select[name=location]').val()
                let dateI = $('input[name=bday]').val()
                db.doc(id).update({
                    name: nameI,
                    location: locationI,
                    date: dateI,
                }).then(docRef => {
                    $(".update").remove();
                    getData()
                    $('input[name=name]').val('')
                    $('input[name=location]').val('')
                    $('input[name=bday]').val('')
                    done()
                })
            })
        })



    })

    $('button[name=close]').click(function () {

  
        $('.modal-title').html("بيانات الحجز")
        $('input[name=name]').val('')
        $('input[name=location]').val('')
        $('input[name=bday]').val('')
        $('.update').replaceWith(`<button class="confirme btn btn-primary w-100 mt-2">احجز</button>`)
        $('.booked').css('display', 'none')     
        $('.error').css('display', 'none')
        formappears()
    })
    $('#book').click(function () {
  
        $('.modal-title').html("بيانات الحجز")
        $('input[name=name]').val('')
        $('input[name=location]').val('')
        $('input[name=bday]').val('')
        $('.update').replaceWith(`<button class="confirme btn btn-primary w-100 mt-2">احجز</button>`)
        formappears()
    })

    //create data and store to restaurants collection
    $('.submit').click(function () {
        let nameI = $('input[name=name]').val()
        let locationI = $('select[name=location]').val()
        let dateI = $('input[name=bday]').val()
        let outdoorI = $('select[name=outdoor]').val()
        let swimmingI = $('select[name=swimming]').val()


        m = moment(dateI, 'iYYYY/iM/iD');
        dateI= m.format('YYYY-MM-DD'); 
        db.add({
            name: nameI,
            location: locationI,
            date: dateI,
            outdoor: outdoorI,
            swimming: swimmingI,
        }).then(res => {
            getData()
            done()
            $('input[name=name]').val('')
            $('input[name=location]').val('')
            $('input[name=bday]').val(currentDate)
            $('#bday').css('border-bottom', '1px solid #757575')
            $('.booked').css('display', 'none')     
            $('.error').css('display', 'none')
        })



    })

    function checkDate(input) {
        let checker = 0
        console.log("input", input)
    
        db.get().then(result => {
            let changes = result.docChanges() //gets array of docs
            // console.log(result)
            changes.forEach(res => {
                if (res.doc.data().date == input) {
                    console.log("date", res.doc.data().date)
    
                    checker = 1
                }
            })

            alert(checker)
            if (checker == 1) {
                return false
            } else {
                return true
            }
        })
    
    
    }

$('#remove-table').click(function () {

    $('.table').removeClass('show')
    $('.table').addClass('hide')
    $('.calendar').addClass('show')
    $('.calendar').removeClass('hide')
    $('.calendar').show()
})




$('#remove-table').click(removeTable())

function removeTable() {
    $('#table').removeClass('show')
    $('#table').addClass('hide')
    $('.calendar').addClass('show')
    $('.calendar').removeClass('hide')
}



$('#remove-calender').click(function () {
    $('.table').addClass('show')
    $('.table').removeClass('hide')
    $('.calendar').removeClass('show')
    $('.calendar').addClass('hide')

});



// $('#bday').datepicker({
//     format: 'yyyy-mm-dd',
//     language: 'AR'
// });


// $('#bday').calendarsPicker(,$.extend( 
//     {calendar: $.calendars.instance('islamic', 'ar')}, 
//     $.calendarsPicker.regionalOptions['ar']));


$('#bday').calendarsPicker($.extend( 
    {calendar: $.calendars.instance('islamic', 'ar'),dateFormat: 'yyyy/mm/dd',}, 
    $.calendarsPicker.regionalOptions['ar'],   


));

// $('#bday').calendarsPicker({
//     dateFormat: 'yyyy/mm/dd',
// });


$('.confirme').click(function () {
   
    let locationI = $('select[name=location]').val()
    let dateI = $('input[name=bday]').val()
    m = moment(dateI, 'iYYYY/iM/iD');
    dateI= m.format('YYYY-MM-DD'); 
    darkSky(dateI)
    $('.modal-title').html("توقعات الطقس")

    $('#dateI').html(dateI)
    db.where('date', '==', dateI).where('location','==',locationI).get()
        .then(e => {
            // console.log(e.docChanges()[0].doc.data())
            let nameB 
           
            if (e.docChanges().length < 1) {
                
                confirmed()
            } else {
                nameB = e.docChanges()[0].doc.data().name
                // alert(nameB+"محجوز من زماان ليت تتواصل مع ")  
                $('.booker-name').html(nameB)   
                $('.booked').css('display', 'block')             
                $('#bday').css('border-bottom', ' 1px solid red')
                $('.error').css('display', 'block')
            }

        })
    })

    function formappears() {
        $('.formcontainer').show()
        $('#weather').addClass('hide')
        $('.done').removeClass('show')
        $('#delet-confirm').addClass('hide')
        $('#delet-confirm').removeClass('show')
    }

    function done() {
        $('.modal-title').html( '')
        $('.formcontainer').hide()
        $('.done').removeClass('hide')
        $('.done').addClass('show')
        $('#weather').removeClass('show')
        $('#weather').addClass('hide')
        $('#delet-confirm').removeClass('show')
        $('#delet-confirm').addClass('hide')
    }

    function confirmed() {
        $('.formcontainer').hide()
        $('.done').removeClass('hide')
        $('#weather').addClass('show')
        $('#weather').removeClass('hide')

    }

    function deletConfirm(){
        $('.formcontainer').hide()
        $('.done').removeClass('show')
        $('.done').addClass('hide')
        $('#delet-confirm').addClass('show')
        $('#delet-confirm').removeClass('hide')
        $('#weather').removeClass('show')
        $('#weather').addClass('hide')

    }




    //  full calender //




    function setCalendar() {
        // calendarEl.empty()
        var calendarEl = document.getElementById('calendar');
        var calendar;
        eventss = [];
        db.get().then(result => {
            let changes = result.docChanges() //gets array of docs
            changes.forEach(res => {
                eventss.push({
                    title: `${res.doc.data().name}`,
                    start: `${res.doc.data().date}`,
                    allDay: true,
                });
            });
            calendar = new FullCalendar.Calendar(calendarEl, {
                selectable: true,
                dateClick: function (info) {
                    //.attr("id", "popUp");
                    console.log(info.dateStr)
                    // let did = data("id")

                    // $(this).modal()
                    $('input[name=bday]').val(info.dateStr)                    
                    $('#popUp').modal({ show: true })
                },

                locale: 'ar-sa',
                plugins: ['interaction', 'dayGrid', 'timeGrid'],
                defaultView: 'dayGridMonth',
                defaultDate: currentDate,
                timeZone: 'UTC',
                code: "ar-sa",
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                events: eventss
            });
            calendar.render();
        }).catch(err => console.log(err))

    }

    // console.log(eventss)

})


