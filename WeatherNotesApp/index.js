//add listerner for click event for add note 
$("#submitbtn").click(function () {
	$("#UpdatingForm").hide();
	var note_title = $('#note_title').val();
	var note_details = $('#note_details').val();


	//call API to get the data from aPI weather		 
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id=102358&APPID=8c6d73486a4a9e184a4e3d4caf2e8d4d";
	var temp2 = 0;
	var Wind2, HUMIDITY2;


// We get the data back from the request in the parameter we pass in the function
	$.get(weatherUrl, function (r) {

		//API return temp in kelvi so convert to celios
		temp2 = parseInt(r.main.temp - 273.15); 

		Wind2 = r.wind.speed;
		HUMIDITY2 = r.main.humidity;
		var note_temp = temp2;
		var note_Wind = Wind2;
		var note_HUMIDITY = HUMIDITY2;
		var d = new Date();
		var note_CuurentDate = d.toLocaleString();

		var uid = firebase.database().ref().child('Notes').push().key;

		var data = {
			note_id: uid,
			note_title: note_title,
			note_details: note_details,
			note_Wind: note_Wind,
			note_temp: note_temp,

			note_HUMIDITY: note_HUMIDITY,
			note_CuurentDate: note_CuurentDate
		}

		var updates = {};
		updates['/Notes/' + uid] = data;
		firebase.database().ref().update(updates);

		alert('The Note is created successfully!');
		reload_table();
	});

});
$("#closebtn").click(function () {
	$("#UpdatingForm").hide();
});
$("#updatebtn").click(function () {
	var note_title = $('#Unote_title').val();
	var note_details = $('#Unote_details').val();
	//here is hidden to prevent change on it 
	var note_id = $('#Unote_id').val();
	var note_temp = $('#Unote_temp').val();
	var note_wind = $('#Unote_wind').val();
	var note_humidity = $('#Unote_humidity').val();
	var note_date = $('#Unote_date').val();

	var data = {
		note_id: note_id,
		note_title: note_title,
		note_details: note_details,
		note_temp: note_temp,
		note_Wind: note_wind,
		note_HUMIDITY: note_humidity,
		note_CuurentDate: note_date
	}

	var updates = {};
	updates['/Notes/' + note_id] = data;
	firebase.database().ref().update(updates);

	alert('The Note is updated successfully!');

	reload_table();
	//empty the field 
	$('#Unote_title').val("");
	$('#Unote_details').val("");
	$('#Unote_id').val("");
	$("#UpdatingForm").hide();
});
var tblNotes = document.getElementById('tbl_Notes_list');
var databaseRef = firebase.database().ref('Notes/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
	snapshot.forEach(function (childSnapshot) {
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val();

		var row = tblNotes.insertRow(rowIndex);

		var cellName = row.insertCell(0);
		var cellDetails = row.insertCell(1);
		var celltemp = row.insertCell(2);
		var cellWind = row.insertCell(3);
		var cellHumidity = row.insertCell(4);
		var celldate = row.insertCell(5);
		var cellDelete = row.insertCell(6);
		var cellUpdate = row.insertCell(7);


		cellName.appendChild(document.createTextNode(childData.note_title));
		cellDetails.appendChild(document.createTextNode(childData.note_details));
		celltemp.appendChild(document.createTextNode(childData.note_temp));
		cellWind.appendChild(document.createTextNode(childData.note_Wind));
		cellHumidity.appendChild(document.createTextNode(childData.note_HUMIDITY));
		celldate.appendChild(document.createTextNode(childData.note_CuurentDate));

		//add child key attribute to save the key for each record
		cellDelete.setAttribute("child-key", childKey);
		cellDelete.setAttribute("class", "HyperLinkDesign glyphicon glyphicon-trash");//this is for design
		//add event listener for click on delete 	
		cellDelete.addEventListener("click", delete_note);

		//add child key attribute to save the key for each record
		cellUpdate.setAttribute("child-key", childKey);
		cellUpdate.setAttribute("class", "HyperLinkDesign glyphicon glyphicon-edit");//this is for design
		//add event listener for click on update 	
		cellUpdate.addEventListener("click", update_note);


		rowIndex = rowIndex + 1;
	});
});



function update_note(e) {
	const dbRef = firebase.database().ref();
	var note_id = e.target.getAttribute("child-key");


	const userRef = dbRef.child('Notes/' + note_id);

	userRef.on("child_added", snap => {
		if (snap.key == "note_title")
			$('#Unote_title').val(snap.val());

		if (snap.key == "note_details")
			$('#Unote_details').val(snap.val());

		if (snap.key == "note_id")
			$('#Unote_id').val(snap.val());

		if (snap.key == "note_HUMIDITY")
			$('#Unote_humidity').val(snap.val());

		if (snap.key == "note_CuurentDate")
			$('#Unote_date').val(snap.val());

		if (snap.key == "note_Wind")
			$('#Unote_wind').val(snap.val());

		if (snap.key == "note_temp")
			$('#Unote_temp').val(snap.val());


	});
	$("#UpdatingForm").show();//show update div
}

function delete_note(e) {

	var r = confirm("Are you sure you want to delete?");
	if (r == true) {
		var note_id = e.target.getAttribute("child-key");

		firebase.database().ref().child('/Notes/' + note_id).remove();
		reload_table();
	} else {
		//nothing
	}

}

function reload_table() {
	//window.location.reload();
	var tblNotes = document.getElementById('tbl_Notes_list');
	$("#tbl_Notes_list tr").remove(); //delete rows
	//add the title of table first
	var titlerow = tblNotes.insertRow(0);
	titlerow.setAttribute("class", "boldRow");//this is for design

	var cellName = titlerow.insertCell(0).appendChild(document.createTextNode("Title"));
	var cellDetails = titlerow.insertCell(1).appendChild(document.createTextNode("Description"));
	var celltemp = titlerow.insertCell(2).appendChild(document.createTextNode("Temperature"));
	var cellWind = titlerow.insertCell(3).appendChild(document.createTextNode("Wind Speed"));
	var cellHumidity = titlerow.insertCell(4).appendChild(document.createTextNode("Humidity"));
	var celldate = titlerow.insertCell(5).appendChild(document.createTextNode("Date"));
	var cellDelete = titlerow.insertCell(6).appendChild(document.createTextNode("Delete?"));
	var cellupdate = titlerow.insertCell(7).appendChild(document.createTextNode("Update?"));

	var databaseRef = firebase.database().ref('Notes/');
	var rowIndex = 1;


	databaseRef.once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();



			var row = tblNotes.insertRow(rowIndex);
			// var cellId = row.insertCell(0);
			var cellName = row.insertCell(0);
			var cellDetails = row.insertCell(1);
			var celltemp = row.insertCell(2);
			var cellWind = row.insertCell(3);
			var cellHumidity = row.insertCell(4);
			var celldate = row.insertCell(5);
			var cellDelete = row.insertCell(6);
			var cellUpdate = row.insertCell(7);
			// cellId.appendChild(document.createTextNode(childKey));
			cellName.appendChild(document.createTextNode(childData.note_title));
			cellDetails.appendChild(document.createTextNode(childData.note_details));
			celltemp.appendChild(document.createTextNode(childData.note_temp));
			cellWind.appendChild(document.createTextNode(childData.note_Wind));
			cellHumidity.appendChild(document.createTextNode(childData.note_HUMIDITY));
			celldate.appendChild(document.createTextNode(childData.note_CuurentDate));

			//add child key attribute to save the key for each record
			cellDelete.setAttribute("child-key", childKey);
			cellDelete.setAttribute("class", "HyperLinkDesign glyphicon glyphicon-trash");//this is for design
			//add event listener for click on delete 	
			cellDelete.addEventListener("click", delete_note);

			//add child key attribute to save the key for each record
			cellUpdate.setAttribute("child-key", childKey);
			cellUpdate.setAttribute("class", "HyperLinkDesign glyphicon glyphicon-edit");//this is for design
			//add event listener for click on update 	
			cellUpdate.addEventListener("click", update_note);
			rowIndex = rowIndex + 1;
		});
	});
	//after saving o firebase now empty the fieldsetote_title = $('#note_title').val();
	$('#note_title').val("");
	$('#note_details').val("");

}


//Calling public API

// Create instance of XMLHTTPRequest
var httpRequest = new XMLHttpRequest();

// Set a custom function to handle the request
httpRequest.onreadystatechange = responseMethod;

function responseMethod() {
	// Check if our state is "DONE"
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		// If our request was successful we get a return code/status of 200
		if (httpRequest.status === 200) {
			// This is where we update our UI accordingly. Our data is available to us through the responseText parameter
			console.log(httpRequest.responseText);
		} else {
			// This is the scenario that there was an error with our request
			console.log('There was a problem with the request.');
		}
	}
}