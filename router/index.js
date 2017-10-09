import Vue from 'vue';
import VueRouter from 'vue-router';
import MainVueComponent from '../components/main.vue';
import LoginComponent from '../components/login.vue';
import SignUpComponent from '../components/signup.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: MainVueComponent },
        { path: '/login', component: LoginComponent },
        { path: '/sign-up', component: SignUpComponent }
    ]
});