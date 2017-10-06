<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <template v-if="widgets" v-for="widget in widgets">
                    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <widget v-bind:key="widget.id" v-bind:widget="widget">
                        </widget>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
    import Widget from './widget.vue';

    export default {
        components: {
            'widget': Widget
        },
        sockets: {
            widgetList: function (value) {
                if (value.error) {
                    this.$store.dispatch('showAlert', {
                        message: value.message,
                        delay: 8000
                    });
                } else {
                    this.$store.commit('setWidgetList', value.widgetList);
                }
            },
            lightIntensity: function (value) {
                this.$store.dispatch('setLightIntensity', {
                    value: value
                });
            }
        },
        computed: {
            widgets: function () {
                return this.$store.state.widget.list;
            }
        },
        created: function () {
            this.$socket.emit('getWidgetList', this.$store.state.user.token);
        }
    }
</script>