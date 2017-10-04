<template>
    <router-view></router-view>
</template>

<script>
    export default {
        beforeCreate: function () {
            if (!this.$localStorage.get('accessToken')) {
                this.$router.push('login');
            }
        }
    }
</script>