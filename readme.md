# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit #3 Project: Final Project

### Overview

The Weather NoteApp Application is aim to writes a weather notes for the Current Weather status 
paramters that retrieved from https://openweathermap.org/api API which are 
(temperature, wind, humditiy) and store the typed Notes on the database including the 
retrieved parameters from API using Firebase and you can edit or delete 
the notes it self as you want. 

---

### Technical Requirements

- The implementation done by the follwoing steps: 
  - 1- Search for suitable design and this link "https://cosmicjs.com/apps/todo-app/demo" 
     was helpful in getting the suitable theme,the main library i used 
     and i learned from it was bootstrap library which is a public library from twitter for free.

  - 2- after finishing the desgin, I start implement the add/edit/delete forms (CRUD) 
     in addition to the list of notes  and prepare to store the data from add/edit forms into
     he database (firebase) using the following scripts:
     <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase.js"></script>
        <script>
          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyBhu-3Vbxxo9LiEvED-x7ErKxBEZIzlpeg",
            authDomain: "notes-42a6b.firebaseapp.com",
            databaseURL: "https://notes-42a6b.firebaseio.com",
            projectId: "notes-42a6b",
            storageBucket: "notes-42a6b.appspot.com",
            messagingSenderId: "471974223990"
          };
          firebase.initializeApp(config);
        </script>
      and also i got a help in implementing the code from this reference:
      https://softauthor.com/learn-to-build-firebase-crud-app-with-javascript-part01-reading-data/

  - 3- Now its time to implement the weather widges from a public API 
      "https://openweathermap.org/api" as the following:

      A- Sign up to the website and I recieve an email containing API key and endpoint

      B- the waether API provide a city list of the cities ID, so I can chanege the ID sent to API easily.
          
      C- The Url Calling is like this  "http://api.openweathermap.org/data/2.5/weather?id=102358&APPID=8c6d73486a4a9e184a4e3d4caf2e8d4d" 
      which the id means the city Id that i get from city.list.json file and APPID is the API Key.
                
      D- Calling the weather API in weather.js file and the API will retrieve json result and 
      will be fetch the needed data insdie the element in html page using jquery.
      
      E- Calling the weather API when click on Adding the note to store (temperature, wind, humditiy) 
      in addition to title and description inside the database for each note submitted.

- Hosting
  - hosted by Github 

