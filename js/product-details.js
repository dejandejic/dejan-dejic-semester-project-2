import { baseUrl } from "./settings/api.js";

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
                              <p>${data.description}</p>
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

