<template>
    <div ref="slider"></div>
</template>

<script>
    export default {
        props: ["start"],
        mounted: function () {
            let timeout = null;
            let vm = this;

            this.$refs.slider.style.height = "100%";

            noUiSlider.create(this.$refs.slider, {
                animate: true,
                animationDuration: 300,
                connect: [true, false],
                start: [vm.start],
                tooltips: false,
                direction: 'rtl',
                orientation: 'vertical',
                step: 1,
                range: {
                    'min': 5,
                    'max': 100
                }
            });

            this.$refs.slider.noUiSlider.on('slide', function (values, handle) {
                (function (value) {
                    clearTimeout(timeout);
                    timeout = setTimeout(
                        function () {
                            vm.$emit('value', value);
                        },
                        250
                    );
                })(values[0]);
            });
        }
    }
</script>

<style>
    .noUi-target {
        width: 5px;
    }

    .noUi-origin {
        transition: all 300ms ease-in-out !important;
    }

    .noUi-connect {
        transition: all 300ms ease-in-out !important;
    }

    .noUi-handle {
        width: 15px !important;
        height: 15px !important;
        border-radius: 100% !important;
        left: -5px !important;
        top: -9px !important;
        outline: none;
        border: none !important;
    }

    .noUi-handle:not(.noUi-active) {
        box-shadow: none !important;
    }

    .theme-red .noUi-handle, .theme-red .noUi-connect {
        background-color: #F44336;
    }

    .theme-pink .noUi-handle, .theme-pink .noUi-connect {
        background-color: #E91E63;
    }

    .theme-purple .noUi-handle, .theme-purple .noUi-connect {
        background-color: #9C27B0;
    }

    .theme-deep-purple .noUi-handle, .theme-deep-purple .noUi-connect {
        background-color: #673AB7;
    }

    .theme-indigo .noUi-handle, .theme-indigo .noUi-connect {
        background-color: #3F51B5;
    }

    .theme-blue .noUi-handle, .theme-blue .noUi-connect {
        background-color: #2196F3;
    }

    .theme-light-blue .noUi-handle, .theme-light-blue .noUi-connect {
        background-color: #03A9F4;
    }

    .theme-cyan .noUi-handle, .theme-cyan .noUi-connect {
        background-color: #00BCD4;
    }

    .theme-teal .noUi-handle, .theme-teal .noUi-connect {
        background-color: #009688;
    }

    .theme-green .noUi-handle, .theme-green .noUi-connect {
        background-color: #4CAF50;
    }

    .theme-light-green .noUi-handle, .theme-light-green .noUi-connect {
        background-color: #8BC34A;
    }

    .theme-lime .noUi-handle, .theme-lime .noUi-connect {
        background-color: #CDDC39;
    }

    .theme-yellow .noUi-handle, .theme-yellow .noUi-connect {
        background-color: #FFEB3B;
    }

    .theme-amber .noUi-handle, .theme-amber .noUi-connect {
        background-color: #FFC107;
    }

    .theme-orange .noUi-handle, .theme-orange .noUi-connect {
        background-color: #FF9800;
    }

    .theme-deep-orange .noUi-handle, .theme-deep-orange .noUi-connect {
        background-color: #FF5722;
    }

    .theme-brown .noUi-handle, .theme-brown .noUi-connect {
        background-color: #795548;
    }

    .theme-grey .noUi-handle, .theme-grey .noUi-connect {
        background-color: #9E9E9E;
    }

    .theme-blue-grey .noUi-handle, .theme-blue-grey .noUi-connect {
        background-color: #607D8B;
    }

    .theme-black .noUi-handle, .theme-black .noUi-connect {
        background-color: #000;
    }
</style>