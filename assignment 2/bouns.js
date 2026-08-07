

function findThMissNumber(arr,k) {
let cur = 1;
let i = 0;
while (k > 0) {
   if( i<arr.length && arr[i] === cur) {
i++;
   }
   else{
    k--;
    if(k == 0) {
        return cur;
    }
   
   }
  cur++;
}
}
console.log(findThMissNumber([2,3,4,7,11],5));