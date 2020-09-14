var arry = [5,6,4,2,1,3];
console.log(arry);

quickSort = function(a){ 
  var l = a.length;
  
  quickSortHelper(a, 0, l);
  
  return a;
};

quickSortHelper = function (a, low, high){

   if( low < high){
     p = partition(a, low, high);
     
     a = quickSortHelper(a, low, p-1);
     a = quickSortHelper(a, p+1, high);
   }
   return a;
};

partition = function(a, low, high){
  console.log('partitioning');
  pi = high;
  
  for(i=low; i<high; i++){
    if (a[i] < a[pi] && i > pi){
      //swap ai and p
      a = swapElements(a, i, pi);
      
      //now, go back to where pi used to be
      temp = pi;
      pi = i;
      i = temp;
    }
    
    if (a[i] > a[pi] && i< pi){
      a = swapElements(a, i, pi);
      pi = i;
    }
  }
  
  return pi;
};

swapElements = function(a, one, two){
  temp = a[one];
  a[one] = a[two];
  a[two] = temp;
  console.log('swap '+ a[one] + ' for ' + a[two] +' to get ['+ a+']');
  return a;
}

console.log('Sorted: ' + quickSort(arry));
;
