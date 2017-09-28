<template>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card align-center">
            <div class="header">
                <h2>{{roomName}}</h2>
                <ul class="header-dropdown m-r--5">
                    <li class="dropdown">
                        <a href="#" v-on:click.prevent="">
                            <i class="material-icons">settings</i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="body align-center">
                <div class="color-wheel-container">
                    <color-wheel></color-wheel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ColorWheel from './color-wheel.vue';

    export default {
        props: ['room-name'],
        components: {
            'color-wheel': ColorWheel
        }
    }
</script>

<style scoped>
    .color-wheel-container {
        width: 50%;
        margin: auto;
    }

    .widget-title {
        font-size: 16px;
    }
</style>