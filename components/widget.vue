<template>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 main-widget-container">
        <span class="widget-title">Nom du widget</span>
        <div class="color-wheel-container">
            <color-wheel></color-wheel>
        </div>
    </div>
</template>

<script>
    import ColorWheel from './color-wheel.vue';

    export default {
        components: {
            'color-wheel': ColorWheel
        }
    }
</script>

<style scoped>
    .main-widget-container:not(:nth-child(4n+0)):not(:last-child) {
        border-right: 1px solid #9E9E9E;
    }

    .main-widget-container {
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
    }

    .color-wheel-container {
        width: 70%;
    }

    .widget-title {
        font-size: 16px;
    }
</style>