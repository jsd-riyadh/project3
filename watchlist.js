$(function(){
    watchlist();
})
function watchlist(){
    let db =firebase.firestore().collection('fav');
    db.get().then(res =>{
        let knows = res.docChanges();
        let number=7 ;
        let counter = 1 ;
        knows.forEach(res=>{
            let tag = "#list"+number ;
            if(counter<=3)
            $(tag).append(`
            <div class="col-md-4" >
            <h3  <b>${res.doc.data().title}</b><h3>
            <img name="img"  src="${res.doc.data().img}" height="250" width="250" >
            <button id="move" class="btn btn-warning" onclick='remove("${res.doc.id}");' class="btn-warning">REMOVE FROM WATCH LIST</button>
            </div>
            `)
            else{
               number++;
               counter=0;
            }
            counter++;

        })
            
        }).catch(err => {
        console.log(err);
        }).then(function(){
            $("#wait").hide()
        }
        )
    }

    function remove(id){
        let db =firebase.firestore().collection('fav');
        db.doc(id).delete().then(() =>{
            $(`#${id}`).parent().parent().parent().hide()
            $("#suc").show()
            setTimeout(function(){
                $("#suc").hide()
            }, 5000);
        })
      }

  