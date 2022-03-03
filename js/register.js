import { baseUrl } from "./settings/api.js";
import "./common.js";
import { Util } from "./util/util.js";
import { FormValidator } from "./formValidator.js";


const registerApiUrl = baseUrl + "/auth/local/register";

const form = document.querySelector('#signup_form')
const fields = ["username", "email", "password"]

const validator = new FormValidator(form, fields)
const register = (params) => {
    try {
        Util.BlockConcurrentReq(3000);
        Util.postData(registerApiUrl, params).then(data => {
            if(data.user){
                console.log("success", data);
                alert('User created successfully');
                form.reset(); 
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
validator.initialize(register);
