<template>
    <div ref="slider"></div>
</template>

<script>
    export default {
        mounted: function () {
            this.$refs.slider.style.height = "100%";

            noUiSlider.create(this.$refs.slider, {
                animate: true,
                animationDuration: 300,
                connect: [true, false],
                start: [5],
                tooltips: false,
                direction: 'rtl',
                orientation: 'vertical',
                step: 1,
                range: {
                    'min': 5,
                    'max': 100
                }
            });
        }
    }
</script>

<style>
    .noUi-target {
        width: 5px;
    }

    .noUi-handle {
        width: 15px !important;
        height: 15px !important;
        border-radius: 100% !important;
        left: -5px !important;
        top: -9px !important;
        outline: none;
    }
</style>