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
                console.log(value);
            }
        },
        components: {
            'rgbw-light-widget': RGBWLightWidget
        }
    }
</script>