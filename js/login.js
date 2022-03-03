import { baseUrl } from "./settings/api.js";
import "./common.js";
import { Util } from "./util/util.js";
import { FormValidator } from "./formValidator.js";


const registerApiUrl = baseUrl + "/auth/local";

const form = document.querySelector('#signin_form')
const fields = ["username", "password"]

const validator = new FormValidator(form, fields)
const login = (params) => {
    try {
        Util.BlockConcurrentReq(3000);
        Util.postData(registerApiUrl, {
            identifier: params.username,
            password: params.password
        }).then(data => {
            if(data.user){
                console.log("success", data);
                const { jwt, user } = data;
                window.localStorage.setItem('jwt', jwt);
                Util.setLocalStorage('userData', user);
                alert('Login successfully');
                window.location.replace("/");
            } else {
                const msg =  data.message[0].messages[0].message;
                alert(msg);
            }
        }).catch((error) => {
            console.log(error)
        });

    } catch (error) {
        console.log(error);
    }
}
validator.initialize(login);
