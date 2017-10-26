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
                console.log(this.light);
                this.$socket.emit('milight/intensity', this.$store.state.user.token, {
                    value: parseInt(value),
                    light: this.light
                });
                this.$store.dispatch('milight/intensity', {
                    id: this.widget.milight.id,
                    intensity: parseInt(value)
                });
            },
            colorSet: function (value) {
                this.$socket.emit('milight/color', this.$store.state.user.token, {
                    value: value,
                    light: this.light
                });
            }
        },
        sockets: {
            'milight/intensity': function (result) {
                if (result.light.id == this.light.id) {
                    this.$store.dispatch('milight/intensity', {
                        id: this.light.id,
                        intensity: result.value
                    });
                }
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