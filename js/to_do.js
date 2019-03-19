{/* <input type="text" placeholder="Enter an activity.." id="item">
                <button id="add">Submit</button>
   */}

   function addToList($list, thing) {
    var $thingLi = $('<li>');
    var $list_buttons = $('<div class="button_container"> <button class="list_button" id="trash_button"></button> <button class="list_button" id="check_button"></button></div>')
    $thingLi.text(thing);
    $list.append($thingLi);
    $("li").append($list_buttons)
  }
//   function removefromlist(){
//       var current_element = this.$("li");
//       console.log(current_element)
      
//   }
  

  $('.list_button').on('click', function(event){

    event.preventDefault();
    alert("clicked")

    // console.log(current_value)
      
    //   removefromlist().current_element;

  })
  
  
    var $thingList = $('#undone');
    var $submit_button = $('#add');
    var $newThingInput = $('#item');
    var $remove_button = $('#trash_button')
  
    $submit_button.on('click', function(event) {
      event.preventDefault();
      var newThing = $newThingInput.val();
      if (newThing === '') {
        alert('You must type in a value!');
      } else {
        addToList($thingList, newThing);
        $newThingInput.val('');
      }
    });

