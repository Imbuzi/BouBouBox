import Vue from 'vue';
import VueRouter from 'vue-router';
import MainVueComponent from '../components/main.vue';
import LoginComponent from '../components/login.vue';
import SignUpComponent from '../components/signup.vue';
import PasswordReset from '../components/password.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainVueComponent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: LoginComponent
        },
        {
            path: '/sign-up',
            component: SignUpComponent
        },
        {
            path: '/password-reset',
            component: PasswordReset
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!router.app.$store.state.user.token) {
            next('/login');
        } else {
            next();
        }
    } else {
        if (router.app.$store.state.user.token) {
            next('/');
        } else {
            next();
        }
    }
})

export default router;