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
                <template v-else>
                    <div class="col-xs-12 align-center">
                        <div class="main-container">
                            <div class="preloader pl-size-xl" v-bind:class="'pl-' + color">
                                <div class="spinner-layer" >
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 align-center">
                        Chargement en cours ...
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
            },
            color: function () {
                return this.$store.state.theme.color;
            }
        },
        created: function () {
            this.$socket.emit('getWidgetList', this.$store.state.user.token);
        }
    }
</script>

<style scoped>
    .main-container {
        margin-top: 100px;
    }
</style>