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
        props: ['light']
    }
</script>