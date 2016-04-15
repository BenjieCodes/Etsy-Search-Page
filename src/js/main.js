console.log("hello world");


import etsyItems from './etsy-items';

console.log(etsyItems);

etsyItems.forEach( function(result) {
  console.log(result.results.description);
});
