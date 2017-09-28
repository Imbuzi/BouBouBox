<template>
    <article>
        <div class="container-fluid">
            <div class="block-header">
                <h2>{{panelTitle}}</h2>
            </div>
            <div class="row">
                <template v-for="room in rooms">
                    <template v-if="room.type ==='rgbw'">
                        <rgbw-light-widget v-bind:key="room.id" v-bind:room-name="room.name"></rgbw-light-widget>
                    </template>
                </template>
            </div>
        </div>
    </article>
</template>

<script>
    import RGBWLightWidget from './rgbw-light-widget.vue';

    export default {
        props: ['panel-title'],
        computed: {
            rooms: function () {
                return this.$store.state.rooms.list
            }
        },
        components: {
            'rgbw-light-widget': RGBWLightWidget
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