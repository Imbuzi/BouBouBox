<template>
    <article>
        <template v-if="widget.type == 'light'">
            <light-widget v-bind:light="widget.light"></light-widget>
        </template>
    </article>
</template>

<script>
    import LightWidget from './light-widget.vue';

    export default {
        props: ['widget'],
        components: {
            'light-widget': LightWidget
        }
    }
</script>