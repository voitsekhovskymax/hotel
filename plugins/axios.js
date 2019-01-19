import Vue from 'vue'
import axios from 'axios';
import Cookies from 'js-cookie';
import VueAxios from 'vue-axios';
import store from 'vuex';

console.log('plugins/axios.js init');
axios.defaults.baseURL = process.env.API_URL;
console.log('plugins/axios.js baseURL');

// Request interceptor
axios.interceptors.request.use(request => {
    request.baseURL = process.env.API_URL;
    console.log('plugins/axios.js request');
    const token = Cookies.get('token');
    if (token) {
        console.log('plugins/axios.js token');
        request.headers.common['Authorization'] = `Bearer ${token}`;

    }
    return request
})

Vue.use(VueAxios, axios);
