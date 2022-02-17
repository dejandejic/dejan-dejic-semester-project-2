/*---Hero Banner---*/
import { baseUrl } from "./settings/api.js";

const homeApiUrl = baseUrl + "/home";

(async function () {

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

})();

/*---Hamburger menu---*/
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


