import {createRouter,createWebHashHistory } from 'vue-router'
import Home from './pages/Home'
import Index from './pages/index'

export default new createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'index',
                    component:Index,
                },
                {
                    path:'/product/:id',
                    name:'product',
                    component:() => import('./pages/product.vue')
                },
                {
                    path:'/detail/:id',
                    name:'detail',
                    component:() => import('./pages/detail.vue')
                },
            ]
        },
        {
            path:'/login',
            name:'login',
            // component:resolve=>require(['./pages/login.vue'],resolve),
            component:() => import('./pages/login.vue')
        },
        {
            path:'/register',
            name:'register',
            component:() => import('./pages/register.vue')
        },
        {
            path:'/cart',
            name:'cart',
            component:() => import('./pages/cart.vue')
        },
        {
            path:'/order',
            name:'order',
            component:() => import('./pages/order.vue'),
            children:[
                {
                    path:'list',
                    name:'order-list',
                    component:() => import('./pages/orderList.vue'),
                },
                {
                    path:'pay',
                    name:'order-pay',
                    component:() => import('./pages/orderPay.vue'),
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    component:() => import('./pages/orderConfirm.vue'),
                },
                {
                    path:'alipay',
                    name:'ali-pay',
                    component:() => import('./pages/alipay.vue'),
                }
            ]
        }

    ]
})