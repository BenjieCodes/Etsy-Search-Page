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
    imgUrl = "http://placehold.it/170x135";
  }
  else {
    imgUrl = etsyImage.url_170x135;
  }
  // object's item name
  var itemName = item.title;
  // object's shop name
  var shop = item.Shop.shop_name;
  // shop's url
  var shopUrl = item.Shop.url;
  // object's price
  var price = "$" + item.price;
  //object's url
  var itemUrl = item.url

  var imageArea = `
    <div class="imageArea">
      <a href="${itemUrl}">
        <img src="${imgUrl}"></img>
        <p class="itemName">${itemName}</p>
      </a>
      <a href="${shopUrl}">
        <p class="shop">${shop}</p>
      </a>
        <p class="price">${price}</p>

    </div>
  `;


  images.append(imageArea);
});

// var hovertarget = $('.price');
//
// hovertarget.hover(function(){
//
//   var hoverimages =
//   `<div class="hoverimages">
//   <img src="images/heart.png">
//   <img src="images/hamburger.png">
//   </div>`
//
//   hovertarget.toggleClass(hoverimages);
// })
