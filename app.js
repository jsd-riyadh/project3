$(function(){ 

    let db = firebase.firestore().collection('new')
  
 $('.search').on('keyup',function(e){ //value()
            $(".search").val()
             var value = $(".search").val()//pass value as parameter 
             console.log(value)
            // GET https://favqs.com/api/quotes/?filter=funny
            $.ajax({
                    url: "https://favqs.com/api/quotes/?",
                    type: "get",
                headers:{
                    "Content-Type": "application/json",
            "Authorization": "Token token=8b4185e62aa6de3ef6975e353c0a2f15"
                },
                data:{
                    filter:value
                },
                success: function(res){
                    console.log("funny")
                            console.log(res.quotes)
                            $("#main").empty()
                            res.quotes.forEach(element => {
                                // console.log(element.body)
                                $("#main").append(`<article class="article" data-body="${element.body}">
                              <section class="articleContent">
                                  <a href="#"><q>${element.body}</q></a>
                                  <h6>${element.author}</h6>
                              </section><section class="impressions">
                              ${element.tags}
                              </section>
                              <div class="clearfix"></div>
                            </article>`
                                )
                   });
                },
                    error: function(xhr, status, err){
                        console.log("not working")
                    }
                })
            
})
$.ajax({
    url: "https://favqs.com/api/quotes",
    type: "get",
    headers:{
        "Content-Type": "application/json",
"Authorization": "Token token=8b4185e62aa6de3ef6975e353c0a2f15"
    },
    success: function(res){
        console.log(res.quotes)
        res.quotes.forEach(element => {
                     console.log(element.body)
                     $("#main").append(`<article class="article" data-body="${element.body}" quote-id="${element.id}">
                   <section class="articleContent">
                       <a href="#"><q>${element.body}</q></a>
                       <h6>${element.author}</h6>
                   </section><section class="impressions">
                   ${element.tags}
                   </section>
                   <div class="clearfix"></div>
                 </article>`
                     )
        });
        $(".add").on("click",function () {
            console.log("test")
                     $("#popUp").removeClass("hidden");
                     $("#popUp").show()
                    $("#popUp.loader .container").css("display", "block")     
                    $(".res-container").empty();
                    })
                    $(".loader").hide();
                            $(".closePopUp").click(function() {
                                $("#popUp").hide();
                               
                               });
                    
                      
    },
    error: function(xhr, status, err){
        console.log("not working")
    }
})
//must always be here if you use JQuery
    

    let resList = $('.res-container')

    db.get()
    .then(result => {

        let changes = result.docChanges()//gets array of docs

        changes.forEach(res => {
            console.log(res.doc.data());
         resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name}<button class="delete">delete</button> </li>`)

        });
       
    }).catch(err => console.log(err))

    resList.on('click', ".delete", function(){
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id") // gets parent data-id
       
        db.doc(id).delete().then(suc =>{
            $(this).parent().remove()
        })
    })
 

    $('.submit').click(function(){
        
        let name = $('input[name=name]').val()
       
        console.log(name)
        db.add({
            name: name,
           
        }).then(res =>{
        resList.append(`<li data-id="${res.id}">${name}<button class="delete">delete</button></li>`)
        
            $('input[name=name]').val("")
          

            //alert message
            $("#alert").css("display", "block")
            $("#alert").append("Added to List!")

            //set delay 4 seconds then empty alert
            setInterval(function(){ 
                $("#alert").css("display", "none")
                $("#alert").empty() 
            }, 4000)
            
      })
        
        
     })
})
