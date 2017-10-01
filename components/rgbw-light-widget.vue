<template>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card">
            <div class="body">
                <div class="font-bold uppercase widget-header">{{room.name}}<div class="pull-right widget-button"><a href="#"><i class="material-icons">more_vert</i></a></div></div>
                <div class="align-center">
                    <div class="light-selectors-container container-fluid">
                        <div class="row flex-content">
                            <div class="col-xs-2">
                                <intensity-slider v-on:value="intensitySet"></intensity-slider>
                            </div>
                            <div class="col-xs-8">
                                <color-wheel></color-wheel>
                            </div>
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

    export default {
        props: ['room'],
        methods: {
            intensitySet: function (value) {
                console.log(room);
                console.log(room.name);
                this.$emit('intensity', {
                    value: value,
                    room: room
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