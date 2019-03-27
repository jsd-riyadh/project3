var db = firebase.firestore().collection("LRDB");
var load_count = 5;

function explore() {
    //api parameters
    let api_url = "https://developers.zomato.com/api/v2.1/search?";
    let params = {
        "Content-Type": "aplication/json",
        "user-key": "8db3364f3ed4a1e5bf83f8cdebf801dc"
    };
    //London city lat & lon
    let location = {
        count: load_count,
        lat: "51.509865",
        lon: "-0.118092"
    };

    for (key in location) { api_url += ("&" + key + "=" + location[key]) }

    //Search for resturants in London city
    $.ajax({
        url: api_url,
        headers: params,
        success: function (data) {

            data.restaurants.forEach(element => {
                var obj = {
                    res_id: element.restaurant.id,
                    name: element.restaurant.name,
                    cuisines: element.restaurant.cuisines,
                    photos_url: element.restaurant.featured_image,
                    url: element.restaurant.url,
                    user_rating: element.restaurant.user_rating.aggregate_rating
                };

                if (obj.photos_url === '') {
                    obj.photos_url = "https://www.tourismvictoria.com/sites/default/files/eat-and-drink-restaurants-and-cafes-rebar.jpg"
                }

                $("#main").append(
                    `<article >
                    <section >
                        <a href="${obj.url}" id="title"><h3>${obj.name}</h3></a>
                        <h4>Cuisines: ${obj.cuisines}</h4>
                    </section>
                    <section >
                        <img src="${obj.photos_url}" alt="" />
                    </section>
                    <section > 
                        <h4>Zomato website rating: ${obj.user_rating}</h4>
                    </section>
                    <section >
                        <h4 data-id="${obj.res_id}">Add your rate: 
                            <input type="number" name="input_rateing${obj.res_id}" min="1" max="5" />
                            <input type="text" name="input_address${obj.res_id}"  placeholder="Your Rinkby Address(optional)" /><br/>
                            <button onclick="addRating(${obj.res_id})">Rateing</button>
                        </h4>
                    </section>
                    <br/>
                    <div class="clearfix"></div>
                </article>`
                );
            });

            $(".loader").hide();
            $("#show_more").show();
        },
        error: function (request, status, error) {
            alert("API is not working!!");
        }
    });
}

function addRating(id) {
    if ($(`input[name=input_rateing${id}`).val().length !== 0) {
        let rating = $(`input[name=input_rateing${id}`).val();
        db.add({
            res_id: id,
            rating: rating
        }).then(res => {
            alert("Your rating is added to LRDB, to see all your rating click on LRDB Rating Tab");
        }).catch(function (error) {
            alert("Error adding your rating: ", error);
        });
    } else {
        alert("Please Enter the Rating Value.");
    }

    if ($(`input[name=input_address${id}`).val().length !== 0) {
        alert("sorry, we are still working on blockchain feature :(");
    } else {
        console.log("empty address");
    }
}

function getRestaurant(res_id, rating, doc_id) {
    //api parameters
    let res_url = "https://developers.zomato.com/api/v2.1/restaurant?";
    let params = {
        "Content-Type": "aplication/json",
        "user-key": "8db3364f3ed4a1e5bf83f8cdebf801dc"
    };

    res_url += "res_id=" + res_id;

    //Search for resturants in London city
    $.ajax({
        url: res_url,
        headers: params,
        success: function (data) {

            var obj = {
                res_id: data.id,
                name: data.name,
                cuisines: data.cuisines,
                photos_url: data.featured_image,
                url: data.url,
                user_rating: data.user_rating.aggregate_rating
            };

            if (obj.photos_url === '') {
                obj.photos_url = "https://www.tourismvictoria.com/sites/default/files/eat-and-drink-restaurants-and-cafes-rebar.jpg"
            }

            $("#main").append(
                `<article id="${doc_id}">
                    <section >
                        <a href="${obj.url}" id="title"><h3>${obj.name}</h3></a>
                        <h4>Cuisines: ${obj.cuisines}</h4>
                    </section>
                    <section >
                        <img src="${obj.photos_url}" alt="" />
                    </section>
                    <section > 
                        <h4>Zomato website rating: ${obj.user_rating}</h4>
                    </section>
                    <section >
                        <h4 data-id="${doc_id}" data-resid="${obj.res_id}">LRDB rating: 
                            <input type="number" name="input_rateing${obj.res_id}" min="1" max="5" value="${rating}"/>
                            <button class="update">Update</button>
                            <button class="delete">Delete</button>
                        </h4>
                    </section>
                    <br/>
                    <div class="clearfix"></div>
                </article>`
            );

            $(".loader").hide();

        },
        error: function (request, status, error) {
            alert("API is not working!!");
        }
    });
}

function lrdb() {

    db.get().then(result => {
        let changes = result.docChanges();
        if (changes.length !== 0) {
            changes.forEach(change => {
                getRestaurant(change.doc.data().res_id, change.doc.data().rating, change.doc.id)
            });
        } else {
            $("#main").append("<article >LRDB is empty</article>")
            $(".loader").hide();

        }
    }).catch(err => console.log(err));


    $("#main").on("click", ".delete", function () {
        let doc_id = $(this).parent().attr("data-id");
        let rest_article = $(this).parent().parent().parent().attr("id");

        db.doc(doc_id).delete().then(function () {
            $(`#${rest_article}`).remove();
            alert("Your Rating successfully deleted!");
        }).catch(function (error) {
            alert("Error removing your rating: ", error);
        });
    });

    $("#main").on("click", ".update", function () {
        let res_id = $(this).parent().attr("data-resid");
        let doc_id = $(this).parent().attr("data-id");

        if ($(`input[name=input_rateing${res_id}`).val().length !== 0) {
            let rating = $(`input[name=input_rateing${res_id}`).val();
            db.doc(doc_id).update({
                res_id: res_id,
                rating: rating
            }).then(res => {
                alert("Your rating is updated");
            }).catch(function (error) {
                alert("Error updating your rating: ", error);
            });

        } else {
            alert("Please Enter the Rating Value.");
        }
    });

}

function blockchain() {
    $("#main").append("<article >Coming Soon...</article>")
    $(".loader").hide();

}

$(document).ready(function () {
    $("#show_more").hide();
    explore();

    $("#explore").click(function () {
        $("#main").empty();
        $(".loader").show();
        $("#show_more").hide();
        explore();
    });

    $("#lrdb").click(function () {
        $("#main").empty();
        $(".loader").show();
        $("#show_more").hide();
        lrdb();
    });

    $("#blockchain").click(function () {
        $("#main").empty();
        $(".loader").show();
        $("#show_more").hide();
        blockchain();
    });

    $("#show_more").click(function () {
        $("#main").empty();
        $(".loader").show();
        load_count += 5;
        explore();
    });
});