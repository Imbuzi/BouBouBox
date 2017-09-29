<template>
    <div class="slider">
    </div>
</template>

<script>
    export default {
        mounted: function() {
            var noUiSlider = require('nouislider');
            var slider = document.querySelector('.slider');

            noUiSlider.create(slider, {
                start: 40,
                connect: "lower",
                range: {
                    min: 0,
                    max: 100
                }
            });
        }
    }
</script>

<style scoped>
</style>