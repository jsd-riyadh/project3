// Array of markers
var markers = [
    {
        coords: {
            lat: 24.774265,
            lng: 46.738586
        },
        content: '<h1>Riyadh Park</h1>'
    }

];


//database 
$(function () {

    let db = firebase.firestore().collection('places')
    let list = $('.list-data')
    db.get()
        .then(result => {
            let changes = result.docChanges()//gets array of docs

            changes.forEach(res => {
                // console.log(res.doc.data());
                list.append(`
                <tr data-id="${res.doc.id}" id="${res.doc.id}">
                    <th> ${res.doc.data().name} </th>
                    <td> ${res.doc.data().lat} </td>
                    <td> ${res.doc.data().long}  </td>
                    <td data-id="${res.doc.id}"> 
                        // <button class="edit btn btn-default btn-sm"> edit </button> 
                        <button class="delete btn btn-success btn-sm"> Done </button> 
                    </td>
                </tr>`)
                //appening the places to the marker array to create markers on the map
                let placesList = {
                    coords: {
                        lat: parseFloat(res.doc.data().lat),
                        lng: parseFloat(res.doc.data().long)
                    },
                    content: `<h1> ${res.doc.data().name} </h1>`
                }
                markers.push(placesList);

            });

        }).then(res => {
            //reload the map.
            initMap();

        }).catch(err => console.log(err))


    list.on('click', ".delete", function () {
        let id = $(this).parent().data("id");
        db.doc(id).delete()

        var element = document.getElementById(id);
        element.parentNode.removeChild(element);

    })




    //create data and store to places collection
    $('.submit').click(function () {

        let name = $('input[name=name]').val()
        let lat = $('input[name=lat]').val()
        let long = $('input[name=long]').val()

        db.add({
            name: name,
            lat: parseFloat(lat),
            long: parseFloat(long),
        }).then(res => {
            //appending the place to the list
            list.append(`
                <tr>
                    <th> ${name} </th>
                    <td> ${lat} </td>
                    <td> ${long}  </td>
                    <td data-id="${res.id}"> 
                        // <button class="edit btn btn-default btn-sm"> edit </button> 
                        <button class="delete btn btn-success btn-sm"> Done </button> 
                    </td>
                </tr>`)
            // adding marker to the map
            let place = {
                coords: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
                content: `<h1> ${name} </h1>`
            }
            markers.push(place);

            //clear the input fields after append
            $('input[name=name]').val("")
            $('input[name=lat]').val("")
            $('input[name=long]').val("")

        }).then(res => {
            //reload the map.
            initMap();


        }).catch(err => console.log(err))


    })

    //edit 
    list.on('click', ".edit", function () {
        let id = $(this).parent().data("id")
        db.doc(id).get().then(res => {

            $('input[name=name]').val(res.data().name)
            $('input[name=lat]').val(res.data().lat)
            $('input[name=long]').val(res.data().long)
        }).then(res => {
            //reload the map.
            initMap();


        }).catch(err => console.log(err))

    })


})







// map
function initMap() {
    // Map options
    var options = {
        zoom: 4,
        center: { lat: 24.774265, lng: 46.738586 }
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Loop through markers

    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i]);
        console.log(markers[i]);
    }


    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,

            map: map,

        });

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}
