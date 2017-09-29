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
                connect: true,
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
        width: 15px;
        height: 15px;
        border-radius: 100%;
        left: -5px;
        top: -9px;
    }
</style>