import { Util } from "./util/util.js";
import "./common.js";

export let jwt =  window.localStorage.getItem('jwt');
export let userData = Util.getLocalStorage('userData');

const auth_tab = document.querySelector('.auth_tab');

function logout(){
    console.log("in");
}

if(jwt && userData){
    auth_tab.innerHTML += `<a href="javascript:void(0)" class="nav-link logout_tab">Logout</a>`;
} else {
    auth_tab.innerHTML += `<a href="admin.html" class="nav-link">Sign in/Sign up</a>`;
}

let logout_tab = document.querySelector(".logout_tab");

if(logout_tab){
    logout_tab.onclick = () => {
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('userData');
        window.location.reload();
    }
}