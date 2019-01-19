import axios from 'axios'
import Cookies from 'js-cookie'

export default async ({store, req}) => {
    const token = Cookies.get('token');

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        store.dispatch('auth/saveToken', {token: token})

    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    if (!store.getters['auth/check'] && token) {
        await store.dispatch('auth/fetchUser')
    }
}
