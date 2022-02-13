let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};


import { baseUrl } from "./settings/api.js";
const productsUrl = baseUrl + "products";

(async function() {

  const container = document.querySelector("shop-content");

  try{
    const response = await fetch (productsUrl);
    const json = await response.json();
    console.log(productsUrl);

    json.forEach(function (data) {
      container.innerHTML += `<h2 class="product-title">${data.title}<h/2>
                             <span class="price">: ${data.price}</span>
                              <p>${data.description}</p>`;
    });
    
    console.log(json);
  } catch(error) {
    console.log(error);
  }

})();