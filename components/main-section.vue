<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <widget-panel v-for="panel in panels" v-bind:key="panel.id" v-bind:panel-title="panel.name">
                    </widget-panel>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import WidgetPanel from './widget-panel.vue';

    export default {
        components: {
            'widget-panel': WidgetPanel
        },
        computed: {
            panels: function () {
                return this.$store.state.panels.list
            }
        },
        created: function () {
            console.log("Main section created!");
        }
    }
</script>