import Vue from 'vue'
import Router from 'vue-router'
import Threads from '@/components/Threads'
import Login from '@/components/Login'
import firebase from "firebase";
require("firebase/auth");

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Threads',
            component: Threads,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     const currentUser = firebase.auth().currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth && !currentUser) next('/login');
//     else if (!requiresAuth && currentUser) next('/');
//     else router.replace('/login');
// });
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth) {
        if (currentUser) {
            next();
        } else {
            router.replace('/login');
        }
    } else {
        next();
    }
});

export default router