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
                                <rgb-light-widget v-for="room in rooms" v-bind:key="room.id" v-bind:room-name="room.name"></rgb-light-widget>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import RGBLightWidget from './rgb-light-widget.vue';

    export default {
        props: ['panel-title'],
        computed: {
            panels: function () {
                return this.$store.state.rooms.list
            }
        },
        components: {
            'rgb-light-widget': RGBLightWidget
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