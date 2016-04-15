console.log("hello world");
// console.log(etsyItems);
import $ from 'jquery';
import etsyItems from './etsy-items';
console.log(etsyItems);
// console.log(etsyItems);
// Made a variable to focus on where to display images.
var images = $('.images');
// make a loop that will focus on all the object's individual traits
etsyItems.results.forEach(function (item){
  // object's images URL
  var etsyImage = item.Images[0];
  var imgUrl;
  if (etsyImage === undefined ) {
    imgUrl = "http://placehold.it/75x75";
  }
  else {
    imgUrl = etsyImage.url_75x75;
  }
  // object's item name
  var itemName = item.title;
  // object's shop name
  var shop = item.Shop.shop_name;
  // object's price
  var price = "$" + item.price

  var imageArea = `
    <div class="imageArea">
      <img src="${imgUrl}">
      <p>${shop}</p>
      <p>${price}</p>
    </div>
  `;
  images.append(imageArea);
});

  // var Itemimage =

// http://placehold.it/
