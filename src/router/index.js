import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue"
import ToDoListPage from "../views/ToDoListPage.vue";
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
            component: ToDoListPage,
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
