// Q1

let x =Number("123");
let y = 7;
console.log( x+y );

console.log( "==============" );

// Q2

let a=0;
if(a==0){
  console.log( "invalid");
}
else{
  console.log( "valid");
}

console.log( "=============");

// Q3

for(let i=0;i<=10;i++){
  if(i %2==0){
    continue;
  }
  console.log (i);
}

console.log( "==============");

// Q4 filter method

// el function ellyesmha filter btmsah elly fe array lw false w lw true bt3ml save

let arr=[1,2,3,4,5];
function printEvenNum (arr){
  return arr.filter(num => num % 2 == 0);
}
console.log(printEvenNum(arr));

console.log("==============");

// Q5 spread operator

//spread operator is ... to concat the array

let arr1 = [1,2,3];
let arr2 = [4,5,6];
function Concat (arr1, arr2) {
  return [...arr1, ...arr2];
}
console.log(Concat (arr1, arr2));

console.log("==============");

// Q6

function getDay(value){
  switch(value){
    case 1:return "saturday";
    case 2:return "sunday";
    case 3:return "monday";
    case 4:return "tuesday";
    case 5:return "wednesday";
    case 6:return "thursday";
    case 7:return "friday";
    default:return "invalid";

  }
}
console.log(getDay(2));

console.log('==============');

// Q7

let arrayy=["a","ab","abc"];
let result=arrayy.map((arr) => {
  return arr.length;
});


console.log(result);

console.log("===============");
// Q8
function check (x){
  if (x%3==0 && x%5==0){
    return "Divisible by both";
  }
  else{
    return "Not divvisble by both";
  }
}
console.log(check(15));
console.log("===============");
// Q9

let square =num=>num*num;
console.log(square(5));

console.log("===============");

// Q10
const person={
  name:"John",
  age:25,
}
  function getPerson(person){
  return person.name + " is "+person.age +" years old";
  }
console.log(getPerson(person));
console.log("===============");

// Q11

function sumOfumbers(...numbers){
  let sum = 0;
  for(let number of numbers){
    sum += number;
  }
  return sum;
}
console.log(sumOfumbers(1,2,3,4,5));

console.log("===============");
// Q12


function Sucess(){
  return new Promise((resolve) => {
    setTimeout(()=>{
    resolve("success");
    },3000);
  });
}
Sucess().then(result=>{
  console.log(result);

})

console.log("===============");
// Q13
let arrray=[1,2,3,4,5];
function large(arr){
  return Math.max(...arr);
}
console.log(large(arrray))
console.log("===============");
// Q14
let obj= {
  name:"John",
  age:30,
}
function getObject(obj) {
  return Object.keys(obj);
}
console.log(getObject(obj));
console.log("===============");
// Q15
 let words="The quick brown fox";
 function splitsWord(words){
   return words.split(" ");
 }
 console.log(splitsWord(words));
//essay q
// Q1
/*
for each
used in array only
no break and continue
no return
for of
use break and continue
can work with {array , string , map}
 */
// Q2
/*
console.log(t);
var t=5;// == undefined
console.log(n);
let n=5;//error
 */
// Q3
/*
== --> for مقارنه عادي
=== --> for مقارنه مع مقارنه ال data type
 */
// Q4
/*
عشان تمنع الايرور وتمنع ان يحصل كراش
 */
// Q5

//Ex :Convertion
console.log(Number("44"));
String(19);
//Ex : coercion
console.log("7"+6);//76
console.log("10"*4);//40