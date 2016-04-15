console.log("hello world");
// console.log(etsyItems);
import $ from 'jquery';
import etsyItems from './etsy-items';

// console.log(etsyItems);
// Made a variable to focus on where to display images.
var images = $('.images');
// make a loop that will focus on all the object's individual traits
etsyItems.results.forEach(function (item){
  // object's images array
  var etsyImage = item.Images[0];
  var imgUrl;

  if (etsyImage === undefined ) {
    imgUrl = "http://placehold.it/75x75";
  }
  else {
    imgUrl = etsyImage.url_75x75;
  }

  // Break it down to the images actual image
});

  // var Itemimage =

// http://placehold.it/
