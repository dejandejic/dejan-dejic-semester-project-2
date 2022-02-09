import { baseUrl } from "./settings/api.js";
const productsUrl = baseUrl + "products";

(async function() {

  const container = document.querySelector("hero-banner");

  try{
    const response = await fetch (productsUrl);
    const json = await response.json();
    console.log(products);

    products.forEach(function (data) {
      container.innerHTML += `<img>${data.hero_banner}</img>
                              <img>${data.thumbnail}</img>`;
    });
    
    console.log(json);
  } catch(error) {
    console.log(error);
  }

})();

/*
let menu = document.querySelector("#hamburger");
let navbar = document.querySelector(".navbar");

menu.onclick = () =>{
  menu.classList.toggle("fa-times");
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove("fa-times");
    navbar.classList.remove('active');
}

// Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};
*/