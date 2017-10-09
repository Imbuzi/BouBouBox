<template>
    <div>
        <div class="font-bold uppercase widget-header">{{name}}
            <power-switch class="pull-right widget-button" v-bind:value="light.power" v-on:value="powerSwitch"></power-switch>
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
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        }
    }
</script>

<style scoped>
    .switch.widget-button {
        margin-top: -3px;
    }

    .widget-header {
        margin-bottom: 15px;
    }

    .uppercase {
        text-transform: uppercase;
    }
</style>