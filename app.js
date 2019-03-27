
// $(function(){ //must always be here if you use JQuery
    
//   let db = firebase.firestore().collection('notes')
  
//   let resList = $("#notes")


//   db.get()
//   .then(result => {
//       let changes = result.docChanges()//gets array of docs

//       changes.forEach(res => {
         
//           resList.append(`<div data-id="${res.doc.id}">${res.doc.data().body}</div>`)

          

         
//       });
      
//   }).catch(err => console.log(err))
 
// })

 

// Form reference

const form = {}
form.noteText = document.querySelector('#formNoteText');
form.addButton = document.querySelector('#formAddButton');
form.color = document.querySelector('#formColor');

const notes = document.querySelector('#notes');

form.noteText.focus();

// // Functions
// function addNote() {
  
//   let text = form.noteText.value;
//   let note = document.createElement('div');
//   let deleteButton = document.createElement('span');

//   note.classList.add('note');
//   note.classList.add(form.color.value);
//   note.innerHTML = `<div class='note-text'>${text}</div>`;
//   deleteButton.classList.add('note-delete');
//   deleteButton.innerHTML = '&times;';

//   note.appendChild(deleteButton);  
//   notes.appendChild(note);

//   form.noteText.value = '';
//   form.noteText.focus();

//   addListenerDeleteButton(deleteButton);
// }

function addNote() {
 
  let db = firebase.firestore().collection('notes')
  let text = form.noteText.value;
        

        db.add({
            body: text
        }).then(res =>{
            //resList.append(`<li data-id="${res.id}">${title} - ${body} <button class="edit">edit</button> <button class="delete">delete</button></li>`)
            let note = document.createElement('div');
            let deleteButton = document.createElement('span');
          
            note.classList.add('note');
            note.classList.add(form.color.value);
            note.innerHTML = `<div class='note-text'>${text}</div>`;
            deleteButton.classList.add('note-delete');
            deleteButton.innerHTML = '&times;';
          
            note.appendChild(deleteButton);  
            notes.appendChild(note);
          
            form.noteText.value = '';
            form.noteText.focus();
          
            addListenerDeleteButton(deleteButton);
        })
  
 }

function getNote() {

  let db = firebase.firestore().collection('notes')
  
  let resList = $("#notes")


  db.get()
  .then(result => {
      let changes = result.docChanges()//gets array of docs

      changes.forEach(res => {
         
          //resList.append(`<div data-id="${res.doc.id}">${res.doc.data().body}</div>`) 
  let text = res.doc.data().body;
  let note = document.createElement('div');
  let deleteButton = document.createElement('span');
  note.classList.add('note');
  note.classList.add(form.color.value);
  note.innerHTML = `<div class='note-text'>${text}</div>`;
  deleteButton.classList.add('note-delete');
  deleteButton.innerHTML = '&times;';

  note.appendChild(deleteButton);  
  notes.appendChild(note);

  form.noteText.value = '';
  form.noteText.focus();

  addListenerDeleteButton(deleteButton);

      });
      
  }).catch(err => console.log(err))

  

 
}

function addListenerDeleteButton(deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();      
    deleteNote(e);
  });
}

function deleteNote(e) {
  let eventNote = e.target.parentNode;
  eventNote.parentNode.removeChild(eventNote);
}



// // Event Listeners
form.addButton.addEventListener('click', function (e) {
  e.preventDefault();  
  if (form.noteText.value != '') {
    addNote();
  }
})

window.addEventListener("load", function(){
  getNote();
});



