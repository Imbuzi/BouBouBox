<template>
    <article>
        <div class="container-fluid">
            <div class="block-header">
                <h2>{{panelTitle}}</h2>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="container-fluid">
                            <div class="row">
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                                <widget></widget>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import Widget from './widget.vue';

    export default {
        props: ['panel-title'],
        computed: {
            panels: function () {
                return this.$store.state.rooms.list
            }
        },
        components: {
            'widget': Widget
        },
        created: function () {
            var vm = this;
            fetch('/room', {
                headers: { Accept: 'application/json' }
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                vm.$store.commit('setRoomList', res);
            }).catch(function (err) {
                console.log(err);
            })
        }
    }
</script>