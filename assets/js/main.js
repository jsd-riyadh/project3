

$(function(){
    $("#back").click(function(){
        $("#categories").show();
        $("#categoryResults").hide();
    })

    let db = firebase.firestore().collection('favouriteRecipes');
    let favList = $('#favouriteRecipes');
    
    db.get().then(res => {
       let changes = res.docChanges();// gets array of docs in my collection and checks for changes

       changes.forEach(res => {
           //Read
           console.log(res.doc.id);
           
           console.log(res.doc.data());
           favList.append(`
           <div class="col-md-4 " data-id="${res.doc.id}">
            <div class="card ">
                <img class="card-img-top" src=${res.doc.data().imgUrl} alt="Recipe Thumbnail">
                <div class="card-body" style="width: 18rem;">
                    <h5 class="card-title">${res.doc.data().name}</h5>
                    <button class="remove">Remove from Favorites</button>
                </div>
            </div>
            </div>
           `)
           
           
       })

       $(".remove").click(function(){
        let id = $(this).parent().parent().parent().data("id")
        console.log(id);
        db.doc(id).delete().then(() => {
            $(this).parent().parent().parent().remove();
        })
    })
        
    }).catch(err => {
        console.log(err);
        
    })


    $.get(`https://www.themealdb.com/api/json/v1/1/categories.php`,function(res){
        var category = document.getElementById("categories");
        
        res.categories.forEach(el => {


        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-md-4");
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", `${el.strCategoryThumb}`);
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body");
        cardBody.setAttribute("style","width: 18rem; position: relative;");
        var h5 = document.createElement("h5");
        var title = document.createTextNode(`${el.strCategory}`);
        h5.appendChild(title);
        var textDiv = document.createElement("div")
        textDiv.setAttribute("style","width: 100%; height: 100%; overflow:auto;")
        var p = document.createElement("p");
        var desc = document.createTextNode(`${el.strCategoryDescription}`);
        p.appendChild(desc);
        textDiv.appendChild(p);
        var btn = document.createElement("button");
        var btnTxt = document.createTextNode("Go To Category")
        btn.setAttribute("class","btn btn-primary")
        btn.setAttribute("id","categoryBtn")
        btn.appendChild(btnTxt)
        cardBody.appendChild(h5);
        cardBody.appendChild(textDiv);
        cardBody.appendChild(btn)
        card.appendChild(img);
        card.appendChild(cardBody)
        colDiv.appendChild(card);
        category.appendChild(colDiv)

        

        })

        $(".btn").click(function(){
            var catTitle = $(this).parent().find("h5").text();
            $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catTitle}`,function(res){

                $("#selectedCategory").children().replaceWith(` `)
                res.meals.forEach(el => {
                    $("#selectedCategory").append(`
                    <div class="col-md-4 ">
                        <div class="card ">
                            <img class="card-img-top" src="${el.strMealThumb}" alt="Recipe Thumbnail">
                            <div class="card-body" style="width: 18rem;">
                                <h5 class="card-title">${el.strMeal}</h5>
                                <button class="add">Add to Favorites</button>
                            </div>
                        </div>
                    </div>
                `)


                })
                $(".add").click(function(){
                   
                    let name = $(this).parent().find("h5").text(); 
                    console.log(name);
                    let imgUrl = $(this).parent().parent().find("img").attr("src"); 
                    console.log(imgUrl);

                    
                    db.add({
                        name: name,
                        imgUrl: imgUrl
                    }).then(res => {
                        console.log(res);
                        favList.append(`
                        <div class="col-md-4 " data-id="${res.id}">
                         <div class="card ">
                             <img class="card-img-top" src=${imgUrl} alt="Recipe Thumbnail">
                             <div class="card-body" style="width: 18rem;">
                                 <h5 class="card-title">${name}</h5>
                                 <button class="remove">Remove from Favorites</button>
                             </div>
                         </div>
                         </div>
                        `)
                    })
                })
            })
         $("#categories").hide();
         $("#categoryResults").show();
        })



    })





    // $("#searchResults").removeAttr('id');
})

