var db = firebase.firestore().collection('locations');

//update if username exist if not crete
function updateLocationData(username, latitude, longitude) {
    getData(username, function (location) {
        if (!location) {
            //create
            writeLocationData(username, latitude, longitude);
        } else {
            //update
            db.doc(location.id).update({
                location: {
                    latitude,
                    longitude
                }
            }).then(function (docRef) {
            }).catch(function (error) {
                console.error("Error updating document: ", error);
            });
        }
    });
}

function getData(username, cb) {
    db.get().then(querySnapshot => {
        let location;
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            let data = doc.data()
            if (data.username == username) {
                location = data;
                location.id = doc.id;
            }
        });
        cb(location);
    }).catch(console.log)
}
function getAllData(cb) {
    db.get().then(querySnapshot => {
        let list = [];
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            let data = doc.data();
            list.push(data);
        });
        cb(list);
    }).catch(console.log)
}

function writeLocationData(username, latitude, longitude) {
    db.add({
        location: {
            latitude,
            longitude
        },
        username: username,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}