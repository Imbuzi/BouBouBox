<template>
    <article>
        <div class="card">
            <div class="body">
                <template v-if="widget.type == 'light'">
                    <light-widget v-bind:name="widget.name" v-bind:light="widget.light"></light-widget>
                </template>
            </div>
        </div>
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

<style scoped>
    .widget-button a i {
        font-size: 20px;
        margin-top: -2px;
        color: #555;
    }

    .widget-header {
        margin-bottom: 15px;
    }

    .uppercase {
        text-transform: uppercase;
    }
</style>