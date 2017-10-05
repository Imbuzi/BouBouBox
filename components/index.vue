<template>
    <alert></alert>
    <router-view></router-view>
</template>

<script>
    import AlertComponent from './alert.vue';

    export default {
        beforeCreate: function () {
            if (!this.$localStorage.get('accessToken')) {
                this.$router.push('login');
            }
        },
        components: {
            'alert': AlertComponent
        }
    }
</script>