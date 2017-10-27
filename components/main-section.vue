<template>
    <section>
        <div class="container">
            <div class="row">
                <template v-for="widget in widgets">
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
            }
        },
        computed: {
            widgets: function () {
                return this.$store.state.widget.list;
            }
        },
        created: function () {
            this.$socket.emit('widgetList', this.$store.state.user.token);
        }
    }
</script>