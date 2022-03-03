import { baseUrl } from "./settings/api.js";
import "./common.js";
import { cartObj, handleRemoveFromCart } from "./cart_functions.js";

const getCartProducts = async () => {
  const container = document.querySelector("#cart_products");

  try {

    if (container) {
      renderCart();

      function renderCart() {
        let product_key_list = Object.keys(cartObj);
        if (product_key_list.length === 0) {
          container.innerHTML = '<div style="text-align:center;">No Product added</div>';
          document.querySelector('.total_count').innerHTML = 0;
          document.querySelector('#total_price').innerHTML = "";
          return;
        }
        let totalPrice = 0;
        container.innerHTML = '';
        product_key_list.forEach(function (key) {
          const data = cartObj[key];
          if (data) {
            container.innerHTML += `<div class="row align-items-center mb-1">
                <div class="col-2">
                <a class="product_link" href="/product-details.html?productid=${data.id}">
                <img class="img-fluid product_img" src="${baseUrl + data.image.url}" />
                </a>
                </div>
                <div class="col">
                <a class="product_link" href="/product-details.html?productid=${data.id}"><div class="h5">${data.title}</div></a>
                </div>
                <div class="col-2 price">$ ${data.price}<div class="close_wrapper" data-id="${data.id}"><span class="close">&#10005;</span></div>
                </div>
              </div>`;
              if(data.price){
                totalPrice += data.price;
              }
          }
        });
        document.querySelector('.total_count').innerHTML = product_key_list.length;
        document.querySelector('#total_price').innerHTML = '$ ' + totalPrice;
        attachCloseIconClickEvent();
      }
      function attachCloseIconClickEvent(){
        document.querySelectorAll('.close_wrapper').forEach(item => {
          item.addEventListener('click', event => {
            // const data = json.filter((p) => p.id == id);
            handleRemoveFromCart(item.getAttribute('data-id'));
            renderCart();
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getCartProducts();