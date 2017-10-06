<template>
    <div class="align-center">
        <template v-if="light.type ==='rgbw'">
            <rgbw-light-widget v-bind:light="light"></rgbw-light-widget>
        </template>
    </div>
</template>

<script>
    import RGBWLightWidget from './rgbw-light-widget.vue';

    export default {
        props: ['light'],
        sockets: {
            lightIntensity: function (value) {
                if (value.light.bridge.mac == this.light.bridge.mac && value.light.zone == this.light.zone) {
                    console.log("Light widget updated light prop with: " + value);
                    this.light.value = value.value;
                }
            }
        },
        components: {
            'rgbw-light-widget': RGBWLightWidget
        }
    }
</script>