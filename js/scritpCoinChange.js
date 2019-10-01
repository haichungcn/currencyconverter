//"Coin Change Challenge" (Vietnamese style)

// 500,000 VND
// 200,000 VND
// 100,000 VND
// 50,000 VND
// 20,000 VND
// 10,000 VND
// 5,000 VND
// 2,000 VND
// 1,000 VND

const listOfBills = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000];
let amountOfBills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// let objectOfBills = {
//   500000 : 

// }

let database = {
  500000 : [1, 0, 0, 0, 0, 0, 0, 0, 0],
  200000 : [0, 1, 0, 0, 0, 0, 0, 0, 0],
  100000 : [0, 0, 1, 0, 0, 0, 0, 0, 0],
  50000 : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  20000 : [0, 0, 0, 0, 1, 0, 0, 0, 0],
  10000 : [0, 0, 0, 0, 0, 1, 0, 0, 0],
  5000 : [0, 0, 0, 0, 0, 0, 1, 0, 0],
  2000 : [0, 0, 0, 0, 0, 0, 0, 1, 0],  
  1000 : [0, 0, 0, 0, 0, 0, 0, 0, 1]
};

const amntToChange = 597000;

function changeCal(amnt) {
    let amountOfBills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let newAmount = amnt;

    // checking which key in the database is the closest to amnt, if there is one,
    // copy its values to amountOfBills,
    // reduce amnt by that number and continue with the newAmount.
    
    let listKeysDatabase = Object.keys(database);
    listKeysDatabase.reverse()
    var found = listKeysDatabase.find(function(element) {
      return element <= amnt;
    });

    amountOfBills = database[found];
    console.log("found is", found, "and amountOfBills is", amountOfBills);
    newAmount = amnt - parseInt(found);
    console.log("newAmount is ", newAmount);


    for (let i = 0; i < listOfBills.length; i++) {
        console.log("recursion of i", i, "and amount is ", newAmount);

        while (newAmount >= listOfBills[i]) {
            newAmount -= listOfBills[i];
            console.log("amount after reduced by the value of", listOfBills[i], "is ", newAmount);
            amountOfBills[i] += 1;
            console.log("the amountOfBills right now(", listOfBills[i], ") is:", amountOfBills[i]);
        }
        console.log("the amount now is < ", newAmount, "and the amountOfBills now is ", amountOfBills);
    }

    console.log("after run the loop, the amnt is ", newAmount, "and the amountOfBills now is ", amountOfBills);
    
    //checking if the amnt is in database or not, if not, add it to the database

    if (!(amnt in listKeysDatabase)) {
      database[amnt] = amountOfBills;
      listKeysDatabase.push(parseInt(amnt));
      listKeysDatabase.sort();
      //sorting database keys
      console.log("listKeysDatabase is", listKeysDatabase);
      
      let newDatabase = {};

      listKeysDatabase.forEach(function(element){
        console.log(element);
        newDatabase[element] = database[element];
      });
      database = newDatabase;
      //This still change the value of 500k bill -> need to work on
    }
    console.log("the Database now is", database);

    return amountOfBills;
}

function runProgram(){
  let amountEntered = parseInt(document.getElementById("inputform").value);
  let amountOfBills = changeCal(amountEntered);
  console.log("inside runProgram, the amountOfBills now is", amountOfBills);
  // let result = document.getElementById("result");
  amountOfBills.forEach(function(element){
    console.log(element);
    let result = document.getElementById("result");
    result.innerHTML = amountOfBills;
    //result.innerHTML = ("You will need ", element, "bills of ", listOfBills[(amountOfBills.indexOf(element))]) ;
  });
}