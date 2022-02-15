import { baseUrl } from "./settings/api.js";


let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};


const productsApiUrl = baseUrl + "/products";

(async function () {

  const container = document.querySelector(".shop-content");

  try {
    const response = await fetch(productsApiUrl);
    const json = await response.json();

    if (container) {
      container.innerHTML = '';
      json.forEach(function (data) {
        container.innerHTML += `<div class="product-box">
                              <img src="${baseUrl + data.image.url}" alt="" class="product-img">
                              <h2 class="product-title">${data.title}</h2>
                              <span class="price"> $ ${data.price}</span>
                              <i class="fas fa-shopping-cart"></i>
                            </div>`;
      });
    }
    // console.log(json);
  } catch (error) {
    console.log(error);
  }

})();

