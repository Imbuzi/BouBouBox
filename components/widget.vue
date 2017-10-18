<template>
    <article>
        <div class="card">
            <div class="body">
                <!--<light-widget v-bind:name="widget.name" v-bind:light="widget.light"></light-widget>-->
                <component v-bind:widget="widget" v-bind:is="widget.widget_type"></component>
            </div>
        </div>
    </article>
</template>

<script>
    import * as components from './widget-types';

    console.log(components);

    export default {
        props: ['widget'],
        components: components
    }
</script>