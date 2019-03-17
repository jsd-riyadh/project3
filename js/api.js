
$(function(){
    var main_url = "https://accesscontrolalloworiginall.herokuapp.com/http://newsapi.org/v1/articles?";
    var api_key = "apiKey=da79a417868543cb9420ab08a9d15428";
    var source = "source=CNN&ign&bbc-news&sortBy=random&"; 
       var url = main_url + source + api_key;
       $.ajax({
         type: 'GET',
         url : url,
         contentType : "json",
        success: function(data){
           var data1 = data.articles
        
           data1.forEach(function(currentValue,index,array){ 

             
             var cursor_arr=[];
             var cursor = click_function()
             console.log(cursor)
             
            function click_function(){
              $("#next").on("click", function() {
                cursor_arr.push(1)
                cursor = cursor_arr.length
                console.log(cursor)
                return cursor
              })
              $("#before").on("click", function(){
              
                    cursor_arr.pop()
                    cursor = cursor_arr.length
                    console.log(cursor)
                return cursor
                  })
            }
            // var cursor;
            // var temp = click_function();
            // console.log(click_function(cursor_arr))

           
          //   $("#next").on("click", function() {
          //   cursor_arr.push(1)
          //   cursor = cursor_arr.length
          //   console.log(cursor)
            
          // })

          //   $("#before").on("click", function(){
              
          //     cursor_arr.pop()
          //     cursor = cursor_arr.length
          //     console.log(cursor)
          //   })
         
             if (index == cursor && cursor <= 10){
               $("#first").empty()
               $("#first_image").empty()
               $("#first").append("<a href="+currentValue.url+"><h3>"+currentValue.title+"</h3></a>")
               $("#first").append("<p>"+currentValue.description+"</p>")
               $("#first").append("<h3>"+currentValue.author+"</h3>")
               $("#first_image").append(`<img src="${currentValue.urlToImage}"/>`)
             }
             
            

           

           
           
           
          
          })
         }
       })
   })
