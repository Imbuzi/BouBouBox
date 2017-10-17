<template>
    <aside v-bind:class="{ open: opened }" class="right-sidebar">
        <div class="container-fluid">
            <div class="row">
                <ul class="nav nav-tabs tab-nav-right">
                    <li v-bind:class="{ active: panelId == 'settings' }"><a v-on:click.prevent="panelId = 'settings'" href="#">PARAMÈTRES</a></li>
                    <li v-bind:class="{ active: panelId == 'widgets' }"><a v-on:click.prevent="panelId = 'widgets'" href="#">WIDGETS</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <transition name="fade" mode="out-in">
                        <div v-if="panelId == 'settings'" key="settings" class="tab-pane active">
                            <general-settings></general-settings>
                        </div>
                        <div v-else-if="panelId == 'widgets'" key="widgets" class="tab-pane active">
                            <widget-settings></widget-settings>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    import GeneralSettings from './general-settings.vue';
    import WidgetSettings from './widget-settings.vue';

    export default {
        data: function () {
            return {
                panelId: 'settings'
            }
        },
        methods: {
            setTabPanel: function (id) {

            }
        },
        components: {
            'general-settings': GeneralSettings,
            'widget-settings': WidgetSettings
        },
        computed: {
            opened: function() {
                return this.$store.state.sidebar.opened
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }

    .tab-pane {
        margin-top: 15px;
    }
</style>