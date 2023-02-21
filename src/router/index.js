import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Home from "../views/Home.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '首页',
            },
        },
        {
            path: '/list',
            name: 'list',
            component: defineAsyncComponent(() => import(`../views/ToDoListPage.vue`)),
            meta: {
                title: '待办事项',
            },
        },
        {
            path: '/*',
            redirect: '/',
        },
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
    if (to.meta.title) {
        document.title = `${to.meta.title}`;
    }
    next()
})

router.afterEach((to, from)=>{
})

export default router
