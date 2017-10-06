<template>
    <div class="light-selectors-container container-fluid">
        <div class="row flex-content">
            <div class="col-xs-2">
                <intensity-slider v-bind:start="light.value" v-on:value="intensitySet"></intensity-slider>
            </div>
            <div class="col-xs-8">
                <color-wheel></color-wheel>
                <power-switch v-on:value="powerSwitch"></power-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import ColorWheel from './color-wheel.vue';
    import IntensitySlider from './intensity-slider.vue';
    import PowerSwitch from './power-switch.vue';

    export default {
        props: ['light'],
        methods: {
            intensitySet: function (value) {
                this.$socket.emit('setLightIntensity', this.$store.state.user.token, {
                    value: parseInt(value),
                    light: this.light
                });
            },
            powerSwitch: function (value) {
                this.$socket.emit('setLightPower', {
                    value: value,
                    light: this.light
                });
            }
        },
        components: {
            'color-wheel': ColorWheel,
            'intensity-slider': IntensitySlider,
            'power-switch': PowerSwitch
        }
    }
</script>

<style scoped>
    .flex-content {
        display: flex;
    }
</style>