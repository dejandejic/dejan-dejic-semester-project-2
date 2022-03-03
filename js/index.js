/*---Hero Banner---*/
import { baseUrl } from "./settings/api.js";
import "./common.js";
import { jwt, userData } from "./auth.js";
import { cartObj, handleAddToCart } from "./cart_functions.js";

const homeApiUrl = baseUrl + "/home";
const featuredProductsApiUrl = baseUrl + "/products/featured";


const getHome = async () => {
  const heroBanner = document.querySelector(".hero-banner");

  try {
    const response = await fetch(homeApiUrl);
    const data = await response.json();

    if (heroBanner) {
      heroBanner.innerHTML += `<img src="${baseUrl + data.hero_banner.formats.large.url}" />`;
    }
  } catch (error) {
    console.log(error);
  }
}

const getFeaturedProducts = async () => {
  const container = document.querySelector(".shop-content");

  try {
    const response = await fetch(featuredProductsApiUrl);
    const json = await response.json();
    let cart_status = "";

    if (container) {
      renderProducts(json);

      function attachCartIconClickEvent() {
        document.querySelectorAll('.cart_icon').forEach(item => {
          item.addEventListener('click', event => {
            const id = item.getAttribute('data-id');
            const data = json.filter((p) => p.id == id);
            handleAddToCart(id, item, data[0]);
          });
        });
      }
      function renderProducts(productData) {
        if (productData.length === 0) {
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
  } catch (error) {
    console.log(error);
  }
}

getHome();
getFeaturedProducts();


