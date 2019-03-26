class UI {
  constructor() {
    this.monthInput = document.getElementById("month-select");
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;

    // firebase
    let dbb = firebase.firestore().collection('app')
    dbb.get().then(result => {
      let changes = result.docChanges()
      changes.forEach(res => {
        $("#month-select").append(`
          <option id="lamia" data-id="${res.doc.id}" value="${res.doc.id}" name="op"> ${res.doc.data().month} </option>
           `);
      })
    }).catch(err => console.log(err))

  }
  //-------------------------submitbudgetForm-----------------------
  submitbudgetForm(element) {
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`
      const self = this;
      setTimeout(function () {
        self.budgetFeedback.classList.remove('showItem');
      }, 4000);
    }
    else {
      let db = firebase.firestore().collection('app')
      db.doc(element).update({
        budget: this.budgetInput.value,
      })
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }

  }
  //-------------------------submitexpenseForm-----------------------
  submitexpenseForm(element) {
    var db = firebase.firestore().collection('expense')
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`
      const self = this;
      setTimeout(function () {
        self.expenseFeedback.classList.remove('showItem');
      }, 4000);
    }
    else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";
      db.add({
        title: expenseValue,
        amount: amount,
        month: element

      })
    }
    this.showBalance();
  }

  //------------------------------------------------------------------
  showBalance(element) {

    this.expenseInput.value = "";
    this.amountInput.value = "";
    let db = firebase.firestore().collection('app')
    this.totalExpense(element);
    db.get().then(result => {
      let changes = result.docChanges()
      changes.forEach(res => {
        if (res.doc.id === element) {
          this.totalExpense(element);
          this.budgetInput.value = res.doc.data().budget;
          this.budgetAmount.textContent = res.doc.data().budget
          this.expenseAmount.textContent = res.doc.data().expense
          const total = parseInt(res.doc.data().budget) - parseInt(res.doc.data().expense);
          this.balanceAmount.textContent = total;

          if (total < 0) {
            this.balance.classList.remove("showGreen", "showBlack");
            this.balance.classList.add("showRed");
          }
          else if (total > 0) {
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
          }
          else if (total === 0) {
            this.balance.classList.remove("showRed", "showGreen");
            this.balance.classList.add("showBlack");
          }

        }
      })

    }).catch(err => console.log(err))
    this.showExpense(element);
  }
  //------------------------------------------------------------------
  totalExpense(element) {
    var total = 0;
    let db = firebase.firestore().collection('expense')
    let dbb = firebase.firestore().collection('app')
    db.get().then(result => {
      let changes = result.docChanges()
      changes.forEach(res => {
        if (res.doc.data().month === element) {
          total += parseInt(res.doc.data().amount);
        }
      })

      dbb.doc(element).update({
        expense: total
      })
    })


  }
  //------------------------------------------------------------------
  editExpense(element, ele) {
    let idd = element.dataset.id;
    var db = firebase.firestore().collection('expense')
    db.doc(idd).get().then(res => {
      $('input[name=title]').val(res.data().title)
      $('input[name=amount]').val(res.data().amount)
    })

    $("#expense-update").click(function () {
      const ui = new UI();
      let title = $('input[name=title]').val()
      let amount = $('input[name=amount]').val()
      if (title === "" || amount === "" || amount < 0) {
        this.expenseFeedback.classList.add('showItem');
        this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`
        const self = this;
        setTimeout(function () {
          self.expenseFeedback.classList.remove('showItem');
        }, 4000);
      }
      else {
        db.doc(idd).update({
          title: title,
          amount: amount
        })
        ui.showBalance(ele);
      }
    });
  }
  //
  deleteExpense(element, ele) {
    var db = firebase.firestore().collection('expense')
    let idd = element.dataset.id;
    db.doc(idd).delete();
    this.showBalance(ele);
  }

  showExpense(element) {
    $("#expense-list").empty();
    let db = firebase.firestore().collection('expense')
    db.get().then(result => {
      let changes = result.docChanges()
      changes.forEach(res => {
        if (res.doc.data().month === element) {
          const div = document.createElement('div');
          div.classList.add('expense');
          div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
          <h6 class="expense-title mb-0 text-uppercase list-item">${res.doc.data().title}</h6>
          <h5 class="expense-amount mb-0 list-item">${res.doc.data().amount}</h5>
          <div class="expense-icons list-item">
           <a href="#" class="edit-icon mx-2" data-id="${res.doc.id}">
            <i class="fas fa-edit"></i>
           </a>
           <a href="#" class="delete-icon" data-id="${res.doc.id}">
            <i class="fas fa-trash"></i>
           </a>
          </div>
         </div> `;
          this.expenseList.appendChild(div);
        }
      })
    }).catch(err => console.log(err))
  }


}//end UI

//------------------------------------------------------------------
//------------------------------------------------------------------
function eventListenters() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const monthselect = document.getElementById("month-select");

  const ui = new UI();


  $("#budget-show").click(function () {
    event.preventDefault();
    let x = monthselect.selectedIndex
    ui.showBalance(monthselect.options[x].value);
  });

  $("#budget-submit").click(function () {
    event.preventDefault();
    let x = monthselect.selectedIndex
    ui.submitbudgetForm(monthselect.options[x].value);
  });

  //expenseForm
  $("#expense-submit").click(function () {
    event.preventDefault();
    let x = monthselect.selectedIndex
    ui.submitexpenseForm(monthselect.options[x].value);
    ui.showBalance(monthselect.options[x].value);

  });
  //expenseList
  expenseList.addEventListener('click', function (event) {
    var db = firebase.firestore().collection('expense')
    let resList = $('.expenseList')
    if (event.target.parentElement.classList.contains('edit-icon')) {
      let x = monthselect.selectedIndex
      ui.editExpense(event.target.parentElement, monthselect.options[x].value)
    }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
      let x = monthselect.selectedIndex
      ui.deleteExpense(event.target.parentElement, monthselect.options[x].value)
    }
  });
  //
}
document.addEventListener('DOMContentLoaded', function () {
  eventListenters();
})
