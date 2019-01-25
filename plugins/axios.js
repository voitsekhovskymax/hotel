import Vue from 'vue'
import axios from 'axios';
import Cookies from 'js-cookie';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = process.env.API_URL;
// Request interceptor
axios.interceptors.request.use(request => {
    request.baseURL = process.env.API_URL;
    const token = Cookies.get('token');
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`;

    }
    return request
})

Vue.use(VueAxios, axios);
