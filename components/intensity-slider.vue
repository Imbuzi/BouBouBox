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
        border: none !important;
        background: #3FB8AF !important;
    }

    .noUi-handle:not(.noUi-active) {
        box-shadow: none !important;
    }

    .theme-red .noUi-handle {
        background-color: #F44336;
    }

    .theme-pink .noUi-handle {
        background-color: #E91E63;
    }

    .theme-purple .noUi-handle {
        background-color: #9C27B0;
    }

    .theme-deep-purple .noUi-handle {
        background-color: #673AB7;
    }

    .theme-indigo .noUi-handle {
        background-color: #3F51B5;
    }

    .theme-blue .noUi-handle {
        background-color: #2196F3;
    }

    .theme-light-blue .noUi-handle {
        background-color: #03A9F4;
    }

    .theme-cyan .noUi-handle {
        background-color: #00BCD4;
    }

    .theme-teal .noUi-handle {
        background-color: #009688;
    }

    .theme-green .noUi-handle {
        background-color: #4CAF50;
    }

    .theme-light-green .noUi-handle {
        background-color: #8BC34A;
    }

    .theme-lime .noUi-handle {
        background-color: #CDDC39;
    }

    .theme-yellow .noUi-handle {
        background-color: #FFEB3B;
    }

    .theme-amber .noUi-handle {
        background-color: #FFC107;
    }

    .theme-orange .noUi-handle {
        background-color: #FF9800;
    }

    .theme-orange .noUi-handle {
        background-color: #FF9800;
    }

    .theme-deep-orange .noUi-handle {
        background-color: #FF5722;
    }

    .theme-brown .noUi-handle {
        background-color: #795548;
    }

    .theme-grey .noUi-handle {
        background-color: #9E9E9E;
    }

    .theme-blue-grey .noUi-handle {
        background-color: #607D8B;
    }

    .theme-black .noUi-handle {
        background-color: #000;
    }
</style>