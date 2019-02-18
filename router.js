import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                // component: MyPage
                component: () => import('~/pages/index')
            }
        ]
    })
}