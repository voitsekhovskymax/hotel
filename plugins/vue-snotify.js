import Vue from 'vue';
import Snotify  from 'vue-snotify';
import '../node_modules/vue-snotify/styles/material.css'
const options = {
    timeout: 5000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
};


Vue.use(Snotify, options);
