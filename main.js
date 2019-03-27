$(document).ready(function () {
  var base = {};
  var onlineUser = [];


  document.getElementById('refresh').style.display = "none";
  document.getElementById('list').style.display = "none";

  $("#update_button").click(function(){
    update();
  });
  $("#refresh_button").click(function(){
    refresh();
  });

  function setBase() {
    db.get().then(querySnapshot => {
      let data;
      querySnapshot.forEach((doc) => {
        data = doc.data();
        if (data.username == 'istra7a') {
          base.latitude = data.location.latitude;
          base.longitude = data.location.longitude;
        }
      });
    }).catch(console.log)
  }
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function appendTolist() {
    onlineUser.forEach((elem) => {
      console.log(getDistanceFromLatLonInKm(base.latitude, base.longitude, elem.location.latitude, elem.location.longitude))
      if (getDistanceFromLatLonInKm(base.latitude, base.longitude, elem.location.latitude, elem.location.longitude) < 1) {
        $('#list').append(`<li> ${elem.username} </li>`)
      }
    })
  }
  function getAndUpdateHtml() {
    getAllData(function (list) {
      onlineUser = list.filter(elem => {
        return elem.username != 'istra7a'
      })
      $('#list').empty();
      appendTolist();
    })
  }
  function refresh() {
    getAndUpdateHtml();
  }

  function update() {
    username = document.getElementById('username_update').value;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        updateLocationData(username, position.coords.latitude, position.coords.longitude);
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    document.getElementById('update_form').style.display = "none";
    document.getElementById('refresh').style.display = "block";
    document.getElementById('list').style.display = "block";
  
  }

  setBase();
  getAndUpdateHtml();
});


