var main_url = "https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v1/articles?";
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=8870c787b3904854bfcb207e29d0f65e

    $("#cnn_view").on("click",function(){
        
        $("#cnn_back").toggle()
        $("#cnn_next").toggle()
        $("#cnn_view").toggle()

        // $("#cnn").css('color', 'red');
        // $("#bbc").css('color', 'black');
        // $("#ign").css('color', 'black');

        var api_key = "apiKey=8870c787b3904854bfcb207e29d0f65e";
    var source = "&source=cnn&sortBy=top&"; 
       var url = main_url + source + api_key;
       $.ajax({
         type: 'GET',
         url : url,
         contentType : "json",
        success: function(data){
           var data1 = data.articles
           

        
           data1.forEach(function(currentValue,index,array){ 

             var cursor_arr=[];
             var cursor = cursor_arr.length
       
              $("#cnn_next").on("click", function() {
                cursor_arr.push(1)
                cursor ++
                
                if (index == cursor && cursor <= 10 && cursor >=0){

                
                  
                  

                  $("#article_title").empty()
                  $("#article_title").append("<h3>"+currentValue.title+"</h3>")
                  
                  $("#Read_More").empty()
                  $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
                  
                  $("#article_content").empty()
                  $("#article_content").append("<p>"+currentValue.description+"</p>")

                  $("#article_author").empty()
                  $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)

                  $("#article_img").empty()
                  $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`)

                  

                
                  
                }
              })
              $("#cnn_back").on("click", function(){
      
                      cursor_arr.pop()
                      cursor = cursor_arr.length

                      if (index == cursor && cursor <= 10 && cursor >=0){
                 
                        $("#article_title").empty()
                        $("#article_title").append("<h3>"+currentValue.title+"</h3>")
                        
                        $("#Read_More").empty()
                        $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
                        
                        $("#article_content").empty()
                        $("#article_content").append("<p>"+currentValue.description+"</p>")
      
                        $("#article_author").empty()
                        $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)
      
                        $("#article_img").empty()
                        $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`) 
                    }
                })
            })
        }
    })   
})
$("#bbc_view").on("click",function(){
        
    $("#bbc_back").toggle()
    $("#bbc_next").toggle()
    $("#bbc_view").toggle()

    // $("#bbc").css('color', 'red');
    // $("#cnn").css('color', 'black');
    // $("#ign").css('color', 'black');

    var api_key = "apiKey=8870c787b3904854bfcb207e29d0f65e";
var source = "&source=bbc-news&sortBy=top&"; 
   var url = main_url + source + api_key;
   $.ajax({
     type: 'GET',
     url : url,
     contentType : "json",
    success: function(data){
       var data1 = data.articles

    
       data1.forEach(function(currentValue,index,array){ 

         var cursor_arr=[];
         var cursor = cursor_arr.length
   
          $("#bbc_next").on("click", function() {
            cursor_arr.push(1)
            cursor ++
            
            if (index == cursor && cursor <= 10 && cursor >=0){

            
              
              

              $("#article_title").empty()
              $("#article_title").append("<h3>"+currentValue.title+"</h3>")
              
              $("#Read_More").empty()
              $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
              
              $("#article_content").empty()
              $("#article_content").append("<p>"+currentValue.description+"</p>")

              $("#article_author").empty()
              $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)

              $("#article_img").empty()
              $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`)

              

            
              
            }
          })
          $("#bbc_back").on("click", function(){
  
                  cursor_arr.pop()
                  cursor = cursor_arr.length

                  if (index == cursor && cursor <= 10 && cursor >=0){
             
                    $("#article_title").empty()
                    $("#article_title").append("<h3>"+currentValue.title+"</h3>")
                    
                    $("#Read_More").empty()
                    $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
                    
                    $("#article_content").empty()
                    $("#article_content").append("<p>"+currentValue.description+"</p>")
  
                    $("#article_author").empty()
                    $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)
  
                    $("#article_img").empty()
                    $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`) 
                }
            })
        })
    }
})  

})
$("#ign_view").on("click",function(){
        
    $("#ign_back").toggle()
    $("#ign_next").toggle()
    $("#ign_view").toggle()

    // $("#ign").css('color', 'red');
    // $("#cnn").css('color', 'black');
    // $("#bbc").css('color', 'black');

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

         var cursor_arr=[];
         var cursor = cursor_arr.length
   
          $("#ign_next").on("click", function() {
            cursor_arr.push(1)
            cursor ++
            
            if (index == cursor && cursor <= 10 && cursor >=0){

            
              
              

              $("#article_title").empty()
              $("#article_title").append("<h3>"+currentValue.title+"</h3>")
              
              $("#Read_More").empty()
              $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
              
              $("#article_content").empty()
              $("#article_content").append("<p>"+currentValue.description+"</p>")

              $("#article_author").empty()
              $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)

              $("#article_img").empty()
              $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`)

              

            
              
            }
          })
          $("#ign_back").on("click", function(){
  
                  cursor_arr.pop()
                  cursor = cursor_arr.length

                  if (index == cursor && cursor <= 10 && cursor >=0){
             
                    $("#article_title").empty()
                    $("#article_title").append("<h3>"+currentValue.title+"</h3>")
                    
                    $("#Read_More").empty()
                    $("#Read_More").append(`<a href="${currentValue.url}" class="btn btn-primary">Learn More</a>`)
                    
                    $("#article_content").empty()
                    $("#article_content").append("<p>"+currentValue.description+"</p>")
  
                    $("#article_author").empty()
                    $("#article_author").append(`<p><span style="color:red">${currentValue.author}</span></p>`)
  
                    $("#article_img").empty()
                    $("#article_img").append(`<img src="${currentValue.urlToImage}" class="img-fluid"/>`) 
                }
            })
        })
    }
})  

})
