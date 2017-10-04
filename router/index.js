import Vue from 'vue';
import VueRouter from 'vue-router';
import MainVueComponent from '../components/main.vue';
import LoginComponent from '../components/login.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: MainVueComponent },
        { path: '/login', component: LoginComponent }
    ]
});