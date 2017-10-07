<template>
    <div>
        <div class="font-bold uppercase widget-header">{{name}}
            <power-switch v-bind:value="light.power" v-on:value="powerSwitch"></power-switch>
            <div class="pull-right widget-button">
                <a href="#">
                    <i class="material-icons">more_vert</i>
                </a>
            </div>
        </div>
        <div class="align-center">
            <template v-if="light.type ==='rgbw'">
                <rgbw-light-widget v-bind:light="light"></rgbw-light-widget>
            </template>
        </div>
    </div>
</template>

<script>
    import RGBWLightWidget from './rgbw-light-widget.vue';
    import PowerSwitch from './power-switch.vue';

    export default {
        props: ['light','name'],
        components: {
            'rgbw-light-widget': RGBWLightWidget,
            'power-switch': PowerSwitch
        },
        methods: {
            powerSwitch: function (value) {
                this.$socket.emit('setLightPower', this.$store.state.user.token, {
                    value: value,
                    light: this.light
                });
            }
        }
    }
</script>