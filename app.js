$(function(){
   station();
})
   
   function station(){
    $.get("https://www.episodate.com/api/most-popular?page=1",function(result){
        let s = JSON.parse(result) 
        let number=1 ;
        let counter = 1 ;
     s.tv_shows.forEach(element => {
      let title = element.name;
      let img = element.image_thumbnail_path ;
      let tag = "#list"+number ;
      if(counter<=3)
      $(tag).append(`
      <div class="col-md-4" >
      <h3  <b>${title}</b><h3>
      <img name="img"  src="${img}" height="250" width="250" >
      <button id="move" class="btn btn-warning" onclick='move("${title}","${img}");' class="btn-warning">ADD TO WATCH LIST</button>
      </div>
      `)
      else{
         number++;
         counter=0;
      }
      counter++;
     })
   })
}
      function move(title , img){
         let db =firebase.firestore().collection('fav');
         var ch = true ;
         db.get().then(res =>{
            let knows = res.docChanges()
            knows.forEach(res =>{
               console.log(res.doc.data().title)
               if(res.doc.data().title === title){
               ch = false ;}
            })


         }).catch(err =>{
            console.log(err);
         }).then(function(){
         if (ch== true){
            db.add({
               title: title,
               img : img
               })
               $("#suc").show();
      setTimeout(function(){
          $("#suc").hide()
      }, 5000);
    }
    else{
      $("#err").show();
      setTimeout(function(){
          $("#err").hide()
      }, 5000);
    
               
   
         }
  
         })

      }
      
 
     
  
    
    

