<template>
    <div class="light-selectors-container container-fluid">
        <div class="row flex-content">
            <div class="col-xs-1">
                <intensity-slider v-bind:value="light.intensity" v-on:value="intensitySet"></intensity-slider>
            </div>
            <div class="col-xs-10">
                <color-wheel v-on:color="colorSet"></color-wheel>
            </div>
        </div>
    </div>
</template>

<script>
    import ColorWheel from './color-wheel.vue';
    import IntensitySlider from './intensity-slider.vue';

    export default {
        props: ['light'],
        methods: {
            intensitySet: function (value) {
                this.$socket.emit('setLightIntensity', this.$store.state.user.token, {
                    value: parseInt(value),
                    light: this.light
                });
            },
            colorSet: function (value) {
                this.$socket.emit('setLightColor', this.$store.state.user.token, {
                    value: value,
                    light: this.light
                });
            }
        },
        components: {
            'color-wheel': ColorWheel,
            'intensity-slider': IntensitySlider
        }
    }
</script>

<style scoped>
    .flex-content {
        display: flex;
    }
</style>