$('document').ready(function(){

// var config = {
//     apiKey: "AIzaSyBIr57wZoMZAvNfZaDibuXwj2Ec1H0FnHw",
//     authDomain: "todolist-2119f.firebaseapp.com",
//     databaseURL: "https://todolist-2119f.firebaseio.com",
//     projectId: "todolist-2119f",
//     storageBucket: "todolist-2119f.appspot.com",
//     messagingSenderId: "869364570942"
//   };
//   firebase.initializeApp(config);
  
//   var database = firebase.database();
//   var ref = database.ref('todolist');

//   console.log(ref)

var data 
 if(localStorage.getItem('todolists')){
    data = JSON.parse(localStorage.getItem('todolists'))
} else {
    data = {Not_importent_arr:[],
    Urgent_arr:[],
    Importent_arr:[],
    Critical_arr:[],
    completed_tasks_arr:[]}
};
todolistdata();

//The todolistdata function gets the data from the local storage then loops through it and creates it before the page reloads

function todolistdata(){
    if (data.Not_importent_arr.length === 0 && data.Urgent_arr.length === 0 && data.Importent_arr.length ===0 && data.Critical_arr.length === 0 && data.completed_tasks_arr === 0)
    {
        return
    }
    
    for (var i = 0; i < data.Not_importent_arr.length; i++)
    {
        var value = data.Not_importent_arr[i];
        createitem(value,"1")
        
    }
    for (var j = 0; j < data.Urgent_arr.length; j++)
    {
        var value = data.Urgent_arr[j];
        createitem(value,"2")
    }
    for (var h = 0; h < data.Importent_arr.length; h++)
    {
        var value = data.Importent_arr[h];  
        createitem(value,"3")  
    }
    for (var x = 0; x < data.Critical_arr.length; x++)
    {
        var value = data.Critical_arr[x];
        createitem(value,"4")
    }
    for (var z = 0; z < data.completed_tasks_arr.length; z++)
    {
        var value = data.completed_tasks_arr[z];
        createitem(value,"5")
    }

}

// This function updates the local storage by setting items in json format
function dataUpdate(){
    localStorage.setItem('todolists',JSON.stringify(data));
    // ref.push(data)

}
document.getElementById("todo_add").addEventListener("click", function(){
    
        var value = document.getElementById("todo_item").value;
        if (value) 
        {  
            createitem(value)
            data.Not_importent_arr.push(value);
            dataUpdate()
            value = document.getElementById("todo_item").value = "";
        }
})


// This Function moves the card to the list on the right 
function move_card_right(){
    
    var card = this.parentNode.parentNode.parentNode.parentNode;
    var card_parent = card.parentNode;
    parent_id = card_parent.id;
    var Not_importent = document.getElementById('Not_importent')
    var Urgent = document.getElementById('Urgent')
    var Importent = document.getElementById('Importent')
    var Critical = document.getElementById('Critical')
    var value = card.innerText;

    if(parent_id === 'Not_importent'){

        card_parent.removeChild(card);
        Urgent.appendChild(card);

        data.Not_importent_arr.splice(data.Not_importent_arr.indexOf(value), 1)
        data.Urgent_arr.push(value)

        dataUpdate()

    }else if(parent_id === 'Urgent'){

        card_parent.removeChild(card);
        Importent.appendChild(card);

        data.Urgent_arr.splice(data.Urgent_arr.indexOf(value), 1)
        data.Importent_arr.push(value)

        dataUpdate()

    }else if(parent_id === 'Importent'){

        card_parent.removeChild(card);
        Critical.appendChild(card);

        data.Importent_arr.splice(data.Importent_arr.indexOf(value), 1)
        data.Critical_arr.push(value)

        dataUpdate()

    }else if(parent_id === 'Critical'){

        card_parent.removeChild(card);
        Not_importent.appendChild(card);

        data.Critical_arr.splice(data.Critical_arr.indexOf(value), 1)
        data.Not_importent_arr.push(value)

        dataUpdate()
    }
}


// This Function moves the card to the left by appending it to the list next to it
    function move_card_left(){
    
        var card = this.parentNode.parentNode.parentNode.parentNode;
        var card_parent = card.parentNode;
        parent_id = card_parent.id;
        var Not_importent = document.getElementById('Not_importent')
        var Urgent = document.getElementById('Urgent')
        var Importent = document.getElementById('Importent')
        var Critical = document.getElementById('Critical')
        var value = card.innerText;
    
        if(parent_id === 'Not_importent'){
    
            card_parent.removeChild(card);
            Critical.appendChild(card);

            data.Not_importent_arr.splice(data.Not_importent_arr.indexOf(value), 1)
            data.Critical_arr.push(value)

            dataUpdate()
    
        }else if(parent_id === 'Urgent'){
    
            card_parent.removeChild(card);
            Not_importent.appendChild(card);

            data.Urgent_arr.splice(data.Urgent_arr.indexOf(value), 1);
            data.Not_importent_arr.push(value);

            dataUpdate()

    
        }else if(parent_id === 'Importent'){
    
            card_parent.removeChild(card);
            Urgent.appendChild(card);

            data.Importent_arr.splice(data.Importent_arr.indexOf(value), 1);
            data.Urgent_arr.push(value);

            dataUpdate()

    
        }else if(parent_id === 'Critical'){
    
            card_parent.removeChild(card);
            Importent.appendChild(card);

            data.Critical_arr.splice(data.Critical_arr.indexOf(value), 1);
            data.Importent_arr.push(value);

            dataUpdate()

        }
}

// This Function removes the completed card from the parent list and appends it to the completed_tasks list
function complete_card(){
    var card = this.parentNode.parentNode.parentNode.parentNode;
    var card_parent = card.parentNode;
    parent_id = card_parent.id;
    var completed_list = document.getElementById('completed_tasks')
    var value = card.innerText


    if (parent_id === 'Not_importent'){

        data.Not_importent_arr.splice(data.Not_importent_arr.indexOf(value), 1);
        data.completed_tasks_arr.push(value);

        card_parent.removeChild(card);
        completed_list.appendChild(card);

        dataUpdate()
        
        }else if (parent_id === 'Urgent'){

        data.Urgent_arr.splice(data.Urgent_arr.indexOf(value), 1);
        data.completed_tasks_arr.push(value);

        card_parent.removeChild(card);
        completed_list.appendChild(card);

        dataUpdate()


        }else if (parent_id === 'Importent'){

        data.Importent_arr.splice(data.Importent_arr.indexOf(value), 1);
        data.completed_tasks_arr.push(value);

        card_parent.removeChild(card);
        completed_list.appendChild(card);

        dataUpdate()

        }else if (parent_id === 'Critical'){

        data.Critical_arr.splice(data.Critical_arr.indexOf(value), 1);
        data.completed_tasks_arr.push(value);

        card_parent.removeChild(card);
        completed_list.appendChild(card);

        dataUpdate()

        
        } else if (parent_id === 'completed_tasks') {

        card_parent.removeChild(card);
        data.completed_tasks_arr.splice(data.completed_tasks_arr.indexOf(value), 1)

        dataUpdate()

    }

}
// This Function creates the item by getting the value from input

    function createitem(input , number){

        var list  
        if(number === "1"){
        list = document.getElementById('Not_importent') 
        }else if(number === "2"){
        list = document.getElementById('Urgent')
        }else if(number === "3"){
        list = document.getElementById('Importent')
        }else if(number === "4"){
        list = document.getElementById('Critical')
        }else if(number === "5"){
        list = document.getElementById('completed_tasks')
        }else{
        list = document.getElementById('Not_importent')
        }
    

        var new_list = document.createElement('li');

        var card = document.createElement('div');
        card.classList.add('undone');

        var body = document.createElement('div');
        body.classList.add('card-body');

        var text = document.createElement('h4');
        text.innerText = input;

        var button_container = document.createElement('div');
        button_container.classList.add('container-fluid');

        var left_button = document.createElement('button');
        left_button.classList.add('right')
        left_button.innerHTML = ('<i class="fas fa-arrow-circle-left"></i>')
         

        var check_button = document.createElement('button');
        check_button.classList.add('check')
        check_button.innerHTML = ('<i class="fas fa-check"></i>')


        var right_button = document.createElement('button');
        right_button.classList.add('right')
        right_button.innerHTML = ('<i class="fas fa-arrow-circle-right"></i>')

        right_button.addEventListener("click", move_card_right)
        check_button.addEventListener("click" , complete_card)
        left_button.addEventListener("click", move_card_left)
        

        
        new_list.appendChild(card);
        card.appendChild(body);
        body.appendChild(text);
        body.appendChild(button_container);
        button_container.appendChild(left_button)
        button_container.appendChild(check_button)
        button_container.appendChild(right_button)

        list.insertBefore(new_list,list.childNodes[0]);

    }

});


   

   

  