

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let trans of this.transactions) {
      balance += trans.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value () {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// t1 = new Withdrawal(50.25);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00);
// t3.commit();
// console.log('Transaction 3:', t3);

// console.log('Balance:', balance);

////////////////////////////////////////////////////

// const myAccount = new Account("snow-patrol");

// t1 = new Withdrawal(balance, myAccount);
// t1.commit();

///////////////////////////////////////////////////////

const myAccount = new Account('billybob');

//over- withdrawal
console.log('Starting Balance:', myAccount.balance);
const t1 = new Withdrawal(50.00, myAccount);
console.log('t1 commit', t1.commit());
console.log('Ending Balance after OVER withdrawal: ', myAccount.balance);

console.log('==========================')
//depositing
const t2 = new Deposit(100.00, myAccount);
console.log('t2 commit', t2.commit());
console.log('Ending balance after deposit: ', myAccount.balance);


console.log('==========================')
//withdrawal with enough balance to cover it
console.log('Starting Balance after first deposit:', myAccount.balance);
const t3 = new Withdrawal(50.00, myAccount);
console.log('t3 commit', t3.commit());
console.log('Ending Balance after withdrawal with enough balance to start', myAccount.balance);


console.log('billibobs transaction history: ', myAccount.transactions);

console.log('==========================')
console.log(myAccount)
