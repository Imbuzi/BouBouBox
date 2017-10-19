<template>
    <article>
        <div class="card">
            <div class="body">
                <component v-bind:widget="widget" v-bind:is="widget.widget_type"></component>
            </div>
        </div>
    </article>
</template>

<script>
    import * as components from './widget-types';

    export default {
        props: ['widget'],
        components: components
    }
</script>