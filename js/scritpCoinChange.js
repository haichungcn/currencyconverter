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

let newAmount = 0;

function changeCal(amnt) {
    let newAmountOfBills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newAmount = amnt;
    // checking which key in the database is the closest to amnt, if there is one,
    // copy its values to amountOfBills,
    // reduce amnt by that number and continue with the newAmount.
    
    let listKeysDatabase = Object.keys(database);
    listKeysDatabase.sort(function(a, b){return b-a});
  

    for (let i = 0; i < listOfBills.length; i++) {
        // console.log("recursion of i", i, "and amount is ", newAmount);

        // this part check the database for existing value
        let found = listKeysDatabase.find(function(element) {
          return element <= newAmount;
        });
        // console.log("found", found)
        if (found) {
          // console.log("found 1 bill < ", newAmount,"amount of bills:", newAmountOfBills);
          newAmount -= parseInt(found);
          let newArray = newAmountOfBills;
          // console.log("newArray:", newArray, "newAmountOfBilss:", newAmountOfBills);
          newAmountOfBills = [];
          for (let i = 0; i < newArray.length; i++) {
            newAmountOfBills.push(newArray[i] + database[found][i]);
          }
        }
        // console.log("amount of bills after added found bill:", newAmountOfBills);

        //main
        while (newAmount > listOfBills[i]) {
            newAmount -= listOfBills[i];
            // console.log("amount after reduced by the value of", listOfBills[i], "is ", newAmount, "and value of 500k is ", database["500000"]);
            newAmountOfBills[i] += 1;
            // console.log("the newAmountOfBills right now(", listOfBills[i], ") is:", newAmountOfBills[i], "and value of 500k is ", database["500000"]);
        } 
        // console.log("the amount now is < ", newAmount, "and the newAmountOfBills now is ", newAmountOfBills);
        if (newAmount < 1000) {
          break;
        }
    }

    // console.log("after run the loop, the amnt is ", newAmount, "and the newAmountOfBills now is ", newAmountOfBills);
    
    //checking if the amnt is in database or not, if not, add it to the database
    // console.log("before adding value, database is", newDB);

    if (!(amnt in listKeysDatabase)) {
      database[amnt] = newAmountOfBills;
    };
    // console.log("the Database now is", database);

    return newAmountOfBills;
}

function runProgram(){
  let amountEntered = parseInt(document.getElementById("inputform").value);
  let amountOfBills = changeCal(amountEntered);

  for(let i = 0; i < amountOfBills.length; i++){
    let id = listOfBills[i];
    let result = document.getElementById(id);
    console.log("result is ", result);
    result.innerHTML = amountOfBills[i];
  };

  let leftover = document.getElementById("leftover");
  leftover.innerHTML = newAmount;

  amountOfBills = [];
}