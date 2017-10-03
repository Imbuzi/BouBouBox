<template>
    <div class="card">
        <div class="body">
            <div class="font-bold uppercase widget-header">{{light.name}}<div class="pull-right widget-button"><a href="#"><i class="material-icons">more_vert</i></a></div></div>
            <div class="align-center">
                <div class="light-selectors-container container-fluid">
                    <div class="row flex-content">
                        <div class="col-xs-2">
                            <intensity-slider v-on:value="intensitySet"></intensity-slider>
                        </div>
                        <div class="col-xs-8">
                            <color-wheel></color-wheel>
                            <power-switch v-on:value="powerSwitch"></power-switch>
                        </div>
                    </div>
                </div>
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
        sockets: {
            updateLightPower: function (value) {
                console.log(value);
            }
        },
        methods: {
            intensitySet: function (value) {
                this.$socket.emit('setLightIntensity', {
                    value: parseInt(value),
                    room: this.light
                });
            },
            powerSwitch: function (value) {
                this.$socket.emit('setLightPower', {
                    value: value,
                    room: this.light
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

    .widget-button a i {
        font-size: 20px;
        margin-top: -2px;
        color: #555;
    }

    .widget-header {
        margin-bottom: 15px;
    }

    .uppercase {
        text-transform: uppercase;
    }
</style>