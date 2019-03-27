// $.ajax({  
//     url:'https://accesscontrolalloworiginall.herokuapp.com/https://api.darksky.net/forecast/b75e2d1c7e13742e005531c0f9c4db7a/42.3601,-71.0589',
//     type:"get",
//     data:{ latitude: 42.3601,
//     longitude: -71.0589,
// } ,
       
//     // headers :{
//     //     "Access-Control-Allow-Origin" : "*"
//     // },
//     success:function(data){
  
//   console.log(data)
//     },error:function(a,b,c){
//         console.error(a,b,c);
//       }      
//     });
      

  
// $(document).ready(function() {
   
  function  darkSky(dateI) {

  $('.fahrenheit').hide();
  $("#todayF").hide();
  $("#tomorrowF").hide();
  $("#afterTomorrowF").hide();
  $("#afterAfterTomorrowF").hide();
  var latitude;
  var longitude;

 

    navigator.geolocation.getCurrentPosition(function(location) {
      latitude = 24.68773;
      longitude = 46.72185;
      console.log(latitude + " " + longitude);

      var geolocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + '%2C' + longitude + '&language=en';

    
   setTimeout(function(){
		$('div').removeClass('loader');
	}, 1500);     
      
      $.getJSON(geolocation).done(function(location) {
        // console.log(location);
        //var latitude = location.results[0].geometry.location["lat"];
        // var longitude = location.results[0].geometry.location["lng"];
        //console.log("City: " + location.results[0].address_components[1].long_name);
        //console.log("Country: " + location.results[0].address_components[3].long_name);
        var location = location.results[0].address_components[1].long_name + ", " + location.results[0].address_components[3].long_name;
        // $("#location").html(location);

      })

      var url = "https://api.darksky.net/forecast/e7ea57ca52da5ae872c7c0c343f312be/" + latitude + "," + longitude +","+ dateI +"T18:00:00-0400"+"?callback=?&units=si&lang=ar";

      $.getJSON(url, function(data) {
        console.log(data);

        var temp = data.currently.temperature;
        var fahrenheit = (data.currently.temperature * 9 / 5 + 32).toFixed(1) + "&deg;F";
        var celsius = data.currently.temperature.toFixed(1) + "&deg;C";
        var description = data.currently.summary;
        var icon = "wi wi-forecast-io-" + data.currently.icon;
        var wind = " " + data.currently.windSpeed.toFixed(1) + " m/s ";
        var humidity = " " + (data.currently.humidity * 100).toFixed(0) + " %";
        
        //bloody timeout so you can see the loading bars
        setTimeout(function() {
          $("#icon").html("<i class=\"" + icon + "\">");
          $("#description").html(description);
          $("#humidity").html(humidity);
          $("#wind").html(wind);
          $(".celsius").html(celsius);
          $(".fahrenheit").html(fahrenheit);

        //today forecast in C
        var todayMaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
        var todayMinTemp = data.daily.data[0].temperatureMin.toFixed(0);
        var todayIcon = "wi wi-forecast-io-" + data.daily.data[0].icon;
        $("#todayC").html("<br>"+ todayMinTemp + "&deg;/"+ todayMaxTemp +"&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");
        //today forecast in F 
        var todayMaxTemp = (data.daily.data[0].temperatureMax *9/5+32).toFixed(0);
        var todayMinTemp = (data.daily.data[0].temperatureMin *9/5+32).toFixed(0);
        var todayIcon = "wi wi-forecast-io-" + data.daily.data[0].icon;
        $("#todayF").html("<br>"+ todayMinTemp + "&deg;/"+ todayMaxTemp +"&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");
        
        
        //tomorrow forecast in C
        // var tomorrowMaxTemp = data.daily.data[1].temperatureMax.toFixed(0);
        // var tomorrowMinTemp = data.daily.data[1].temperatureMin.toFixed(0);
        // var tomorrowIcon = "wi wi-forecast-io-" + data.daily.data[1].icon;
        // $("#tomorrowC").html("<br>"+ tomorrowMinTemp + "&deg;/"+ tomorrowMaxTemp +"&deg; <br> <i class=\"" + tomorrowIcon + "\" id=\"smallIcon\">");
        //tomorrow forecast in F
        // var tomorrowMaxTemp = (data.daily.data[1].temperatureMax *9/5+32).toFixed(0);
        // var tomorrowMinTemp = (data.daily.data[1].temperatureMin *9/5+32).toFixed(0);
        // var tomorrowIcon = "wi wi-forecast-io-" + data.daily.data[1].icon;
        // $("#tomorrowF").html("<br>"+ tomorrowMinTemp + "&deg;/"+ tomorrowMaxTemp +"&deg; <br> <i class=\"" + tomorrowIcon + "\" id=\"smallIcon\">");
        
        //after tomorrow forecast in C
        // var afterTomorrowMaxTemp = data.daily.data[2].temperatureMax.toFixed(0);
        // var afterTomorrowMinTemp = data.daily.data[2].temperatureMin.toFixed(0);
        // var afterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[2].icon;
        $("#afterTomorrowC").html("<br>"+ afterTomorrowMinTemp + "&deg;/"+ afterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterTomorrowIcon + "\" id=\"smallIcon\">");
        //after tomorrow forecast in F
        // var afterTomorrowMaxTemp = (data.daily.data[2].temperatureMax *9/5+32).toFixed(0);
        // var afterTomorrowMinTemp = (data.daily.data[2].temperatureMin *9/5+32).toFixed(0);
        // var afterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[2].icon;
        $("#afterTomorrowF").html("<br>"+ afterTomorrowMinTemp + "&deg;/"+ afterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterTomorrowIcon + "\" id=\"smallIcon\">");
        
        
        //after after tomorrow forecast in C :))
        // var afterAfterTomorrowMaxTemp = data.daily.data[3].temperatureMax.toFixed(0);
        // var afterAfterTomorrowMinTemp = data.daily.data[3].temperatureMin.toFixed(0);
        // var afterAfterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[3].icon;
        // $("#afterAfterTomorrowC").html("<br>"+ afterAfterTomorrowMinTemp + "&deg;/"+ afterAfterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterAfterTomorrowIcon + "\" id=\"smallIcon\">");
        //after after tomorrow forecast in F :))
        // var afterAfterTomorrowMaxTemp = (data.daily.data[3].temperatureMax *9/5+32).toFixed(0);
        // var afterAfterTomorrowMinTemp = (data.daily.data[3].temperatureMin *9/5+32).toFixed(0);
        // var afterAfterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[3].icon;
        // $("#afterAfterTomorrowF").html("<br>"+ afterAfterTomorrowMinTemp + "&deg;/"+ afterAfterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterAfterTomorrowIcon + "\" id=\"smallIcon\">");
       
        
         }, 2200);   // end of timeout 

        //temp toggle 
        $(".fahrenheit-btn").on("click", function() {
          $(".celsius").hide();
          $("#todayC").hide();
          $("#tomorrowC").hide();
          $("#afterTomorrowC").hide();
          $("#afterAfterTomorrowC").hide();
          $(".fahrenheit").show(fahrenheit);
          $("#todayF").show();
          $("#tomorrowF").show();
          $("#afterTomorrowF").show();
          $("#afterAfterTomorrowF").show();
        });
        $(".celsius-btn").on("click", function() {
          $(".fahrenheit").hide();
          $("#todayF").hide();
          $("#tomorrowF").hide();
          $("#afterTomorrowF").hide();
          $("#afterAfterTomorrowF").hide();
          $(".celsius").show(celsius);
          $("#todayC").show();
          $("#tomorrowC").show();
          $("#afterTomorrowC").show();
          $("#afterAfterTomorrowC").show();
        });

        //  end of temp toggle  
      });

    });
 
 
  //date //
  var months = new Array(12);
  months[0] = "يناير";
  months[1] = "فبراير";
  months[2] = "مارس";
  months[3] = "أبريل";
  months[4] = "مايو";
  months[5] = "جون";
  months[6] = "جولاي";
  months[7] = "اوقست";
  months[8] = "سبتمر";
  months[9] = "أكتوبر";
  months[10] = "نوفمر";
  months[11] = "ديسمبر";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  today = dd + ' -' + months[mm] + '- ' + yyyy;
  $(".date").html(today);
  //end date

    }

// });