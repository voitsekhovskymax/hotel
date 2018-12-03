import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookie from 'cookie-universal'
let cookies = Cookie();
var token = cookies.get('token');
console.log('axios token - ' + token);
var ax =  axios.create({
    baseURL: process.env.API_URL ,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "X-Requested-With":"XMLHttpRequest",
        'Authorization' : 'Bearer ' + token
    }
});
Vue.use(VueAxios, ax);