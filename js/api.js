
    var main_url = "https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us";
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=8870c787b3904854bfcb207e29d0f65e
    var api_key = "apiKey=8870c787b3904854bfcb207e29d0f65e";
    var source = "&source=ign&sortBy=top&"; 
       var url = main_url + source + api_key;
       $.ajax({
         type: 'GET',
         url : url,
         contentType : "json",
        success: function(data){
           var data1 = data.articles
        
           data1.forEach(function(currentValue,index,array){ 

            //  console.log(data1)
             var cursor_arr=[];
             var cursor = cursor_arr.length
            //  console.log(currentValue)
             
             
            // function click_function(){
              $("#next").on("click", function() {
                cursor_arr.push(1)
                cursor ++
                // console.log(cursor)
                if (index == cursor && cursor <= 10 && cursor >=0){
                  $("#first").empty()
                  $("#first_image").empty()
                  $("#first").append("<a href="+currentValue.url+"><h3>"+currentValue.title+"</h3></a>")
                  $("#first").append("<p>"+currentValue.description+"</p>")
                  $("#first").append("<h3>"+currentValue.author+"</h3>")
                  $("#first_image").append(`<img src="${currentValue.urlToImage}"/>`)
                }
                // return cursor
              })
              $("#before").on("click", function(){
      
                      cursor_arr.pop()
                      cursor = cursor_arr.length
                      // console.log(cursor)
                      if (index == cursor && cursor <= 10){
                        $("#first").empty()
                        $("#first_image").empty()
                        $("#first").append("<a href="+currentValue.url+"><h3>"+currentValue.title+"</h3></a>")
                        $("#first").append("<p>"+currentValue.description+"</p>")
                        $("#first").append("<h3>"+currentValue.author+"</h3>")
                        $("#first_image").append(`<img src="${currentValue.urlToImage}"/>`)
            }
                  // return cursor
            })
          })
        }
      })
    
 
              // $("#before").on("click", function(){
              
              //       cursor_arr.pop()
              //       cursor = cursor_arr.length
              //       console.log(cursor)
              //   return cursor
              //     })
                 
              
              // return cursor


            // }
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
         
             