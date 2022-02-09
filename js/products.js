import { baseUrl } from "./settings/api.js";
const productsUrl = baseUrl + "products";

(async function() {

  const container = document.querySelector("product-container");

  try{
    const response = await fetch (productsUrl);
    const json = await response.json();
    console.log(products);

    products.forEach(function (data) {
      container.innerHTML += `<h2 class="product-title">${data.title}<h/2>
                            <span class="price">: ${data.price}</span>
                              <p>${data.description}</p>`;
    });
    
    console.log(json);
  } catch(error) {
    console.log(error);
  }

})();