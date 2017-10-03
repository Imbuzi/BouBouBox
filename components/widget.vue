<template>
    <article>
        <div class="card">
            <div class="body">
                <div class="font-bold uppercase widget-header">{{widget.name}}<div class="pull-right widget-button"><a href="#"><i class="material-icons">more_vert</i></a></div></div>
                <template v-if="widget.type == 'light'">
                    <light-widget v-bind:light="widget.light"></light-widget>
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