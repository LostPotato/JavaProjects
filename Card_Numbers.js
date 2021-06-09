// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 2];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

/* 
* applies the Luhn Algorithm to an array of nummbers and returns weather or not the value is
* a valid card number  
* @parm: array of numbers
* @return: boolean statement
*
*/

const validateCred = array => {
  let doubleNum = 1; // iterator for doubling
  let DigitTotal = 0; // accumulator value
  for(i = array.length - 1; i>=0; i--) {
    let sum = array[i];
    if (doubleNum % 2 === 0) {sum = sum*2;} // doubles every other
      if (sum > 9) {sum = sum - 9;}
    doubleNum += 1;
    DigitTotal += sum; // accumulating a value
  }
  // logical return
  if (DigitTotal%10 === 0) {
    return true;
  }
  else {
    return false; 
  }
}
/**Takes in a nested array of card numbers and returns the invalid ones
 * @parm: {batch}: a nested array of card numbers
 * @returns: nested array of all the cards numbers that were not valid
 */
const findInvalidCards = batch => {
  invalidCards = [];
  const sort = (array) => {
    if(!validateCred(array)) {
      invalidCards.push(array)
    }
  }
  batch.forEach(sort);
  return invalidCards;
};
/**Looks at the first number of the arrays in a nest array to determine which company the
 * card is from.
 * @parm: {batch} nested array of credit card numbers
 * @returns: an array of company names that the numbers belong too
 */
const idInvalidCardCompanies = batch => {
  CompanyNames = []
  batch.forEach(array => {
    if(array[0] === 3){
      if(CompanyNames.indexOf("Amex") < 0){
        CompanyNames.push("Amex")
      }
    }
    else if (array[0] === 4){
      if(CompanyNames.indexOf("Visa") < 0){
        CompanyNames.push("Visa")
      }
    }
    else if (array[0] === 5){
      if(CompanyNames.indexOf("Mastercard") < 0){
        CompanyNames.push("Mastercard")
      }
    }
    else if (array[0] === 6){
      if(CompanyNames.indexOf("Discover") < 0){
        CompanyNames.push("Discover")
      }
    }
    else {
      console.log("The number " + array[0] + " is not a valid number in are software")
    }
  })
  return CompanyNames
};

/** Takes in an nested array of invalid card numbers and translates them in to valid numbers
* using the functions defined above
* @pram {batch} : An array of invalid card numbers.
* @returns : An array of valid numbers
*/ 
const convertInvalidsToValid = (batch) => {
  
  let validNumbers = []
  const correctLength = (array) => {
    while (array.length < 16) {
      array.push(Math.floor(Math.random()*9));
    }
    while(array.length >= 17) {
      array.pop();
    }
    return array;
  }
  // Corrects the length to the most common 16 digit format
  const newNumbers = batch.map(correctLength);
  i = 0;
  // Replaces the last digit with the iterator until it finds a valid match
  newNumbers.map(array => {
    while(validateCred(array) === false && i > 10){
    array[-1] = i;
    i++;
    if(i > 10){
      break;
    }
    }
  validNumbers = newNumbers
  }
  )
  console.log(validNumbers)
  return validNumbers
};

// running the code: 
console.log(findInvalidCards(batch)) // Returns the set of invalid numbers from the test batch above
console.log(idInvalidCardCompanies(findInvalidCards(batch))) // tells you what company those numbers belong to
console.log(convertInvalidsToValid(findInvalidCards(batch))) // Returns valid numbers by modifiying the last number of the invalid numbers
