<template>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <div class="card">
            <div class="body">
                <div class="font-bold uppercase widget-header">{{roomName}}<div class="pull-right widget-button"><a href="#"><i class="material-icons">more_vert</i></a></div></div>
                <div class="align-center">
                    <div class="color-wheel-container">
                        <color-wheel></color-wheel>
                    </div>
                    <div class="intensity-selector-container">
                        <div ref="slider"></div>
                    </div>
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
            'color-wheel': ColorWheel,
        },
        mounted: function () {
            this.$refs.slider.style.height = "250px";

            noUiSlider.create(this.$refs.slider, {
                animate: true,
                animationDuration: 300,
                start: [5],
                tooltips: true,
                step: 1,
                range: {
                    'min': 5,
                    'max': 100
                }
            });
        }
    }
</script>

<style scoped>
    .color-wheel-container {
        width: 50%;
        margin: auto;
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