import { Util } from "./util/util.js";

export let cartObj = Util.getLocalStorage('cart') || {};
 
export function handleAddToCart(id, item, data) {
    console.log(item);
    delete cartObj[`product_undefined`];
    if (cartObj[`product_${id}`]) {
      item.classList.remove('cart_added');
      delete cartObj[`product_${id}`];
    } else {
      item.classList.add('cart_added');
      cartObj[`product_${id}`] = data;
    }
    console.log(cartObj);
    Util.setLocalStorage('cart', cartObj);
  }