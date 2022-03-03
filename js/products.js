import { baseUrl } from "./settings/api.js";
import "./common.js";
import { cartObj, handleAddToCart } from "./cart_functions.js";

// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close-cart");

// cartIcon.onclick = () => {
//   cart.classList.add("active");
// };

// closeCart.onclick = () => {
//   cart.classList.remove("active");
// };


const productsApiUrl = baseUrl + "/products";

(async function () {

  const container = document.querySelector(".shop-content");
  const search_input = document.querySelector("#search_input");

  try {
    const response = await fetch(productsApiUrl);
    const json = await response.json();
    let cart_status = "";

    if (container) {

      renderProducts(json);

      search_input.addEventListener('input', function (evt) {
        if (this.value && this.value.length > 1) {
          const val = this.value.toLowerCase();
          renderProducts(json.filter((p)=>{
            return (p.title.toLowerCase().indexOf(val) > -1) || (p.description.toLowerCase().indexOf(val) > -1)
          }));
        } else {
          renderProducts(json);
        }
      });
      function attachCartIconClickEvent(){
        document.querySelectorAll('.cart_icon').forEach(item => {
          item.addEventListener('click', event => {
            const id = item.getAttribute('data-id');
            const data = json.filter((p) => p.id == id);
            handleAddToCart(id, item, data[0]);
          });
        });
      }
      function renderProducts(productData) {
        if(productData.length === 0){
          container.innerHTML = '<div style="text-align:center;">No Product found</div>';
          return;
        }
        container.innerHTML = '';
        productData.forEach(function (data) {
          cart_status = "";
          if (cartObj[`product_${data.id}`]) {
            cart_status = "cart_added";
          }
          container.innerHTML += `<div class="product-box">
            <a class="product_link" href="/product-details.html?productid=${data.id}">
            <img src="${baseUrl + data.image.url}" alt="" class="product-img"></a>
            <h2 class="product-title">${data.title}</h2>
            <span class="price"> $ ${data.price}</span>
            <a href="javascript:void(0)" class="cart_icon ${cart_status}" data-id="${data.id}"><i class="fas fa-shopping-cart"></i></a>
          </div>`;
        });
        attachCartIconClickEvent();
      }

    }
    // console.log(json);
  } catch (error) {
    console.log(error);
  }

})();