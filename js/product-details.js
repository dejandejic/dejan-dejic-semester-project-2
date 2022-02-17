import { baseUrl } from "./settings/api.js";
import { cartObj, handleAddToCart } from "./cart.js";

const getProductApiUrl = (id) => baseUrl + `/products/${id}`;
const url = new URL(window.location.href);
const productId = url.searchParams.get("productid");

(async function () {

  const container = document.querySelector(".shop-content");

  try {
    const response = await fetch(getProductApiUrl(productId));
    const data = await response.json();
    if (cartObj[`product_${data.id}`]) {
      data["cart_status"] = "cart_added";
    }
    if (container) {
      container.innerHTML = `<div class="product-box">
                              <img src="${baseUrl + data.image.url}" alt="" class="product-img">
                              <h2 class="product-title">${data.title}</h2>
                              <p>${data.description}</p>
                              <span class="price"> $ ${data.price}</span>
                              <a href="javascript:void(0)" class="cart_icon ${data.cart_status}"><i class="fas fa-shopping-cart"></i></a>
                            </div>`;
      const cart_icon_ele = document.querySelector('.cart_icon');
      cart_icon_ele.addEventListener('click', event => {
        handleAddToCart(productId, cart_icon_ele, data);
      });
    }
    // console.log(json);
  } catch (error) {
    console.log(error);
  }

})();

