const billList = document.querySelector('#bill-list');
const form = document.querySelector('#add-bill-form');

function renderBill(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let amount = document.createElement('span');
    let date = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    amount.textContent = doc.data().amount;
    date.textContent = doc.data().date;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(amount);
    li.appendChild(date);
    li.appendChild(cross);

    billList.appendChild(li);

    // delete bill
    cross.addEventListener('click', (e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('bills').doc(id).delete();
    })

}
// get bills
db.collection("bills").orderBy('date').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //console.log(doc.data())
        renderBill(doc);
    })
});
// add bill
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('bills').add({
    name: form.name.value,
    amount: form.amount.value,
    date: form.date.value
  })
  form.name.value = '';
  form.amount.value = '';
  form.date.value = '';
});

//real-time bills list
db.collection('bills').orderBy('date').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderBill(change.doc);
    } else if (change.type == 'removed'){
      let li = billList.querySelector('[data-id='+ change.doc.id + ']');
      billList.removeChild(li);
    }
  })
})




