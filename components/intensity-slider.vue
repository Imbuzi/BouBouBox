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
                start: [5],
                tooltips: true,
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