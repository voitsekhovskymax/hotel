import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
var ax =  axios.create({
    baseURL: process.env.API_URL ,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "X-Requested-With":"XMLHttpRequest"
    }
});
Vue.use(VueAxios, ax);