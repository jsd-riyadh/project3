/*
- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Bonus 1: add a form prompting user for the city and state.
- Bonus 2: convert answer from kelvin to fahrenheit.
*/

'use strict';
$(function() {
  var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id=102358&APPID=8c6d73486a4a9e184a4e3d4caf2e8d4d";
 // var apiKey = "8c6d73486a4a9e184a4e3d4caf2e8d4d";

 var temp,Wind,HUMIDITY;
 
  $.get( weatherUrl, function( r ) {
      // We get the data back from the request in the parameter we pass in the function
	    temp=parseInt(r.main.temp-273.15); //API return temp in kelvi so convert to celios
		Wind=r.wind.speed;
		HUMIDITY=r.main.humidity;
		$("#temp").html(temp);
	    $("#Wind").html(Wind);
	    $("#HUMIDITY").html(HUMIDITY);
	   
	   console.log(r);
   });

 
  

});


