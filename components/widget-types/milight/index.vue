<template>
    <div>
        <div class="font-bold uppercase widget-header">{{widget.name}}
            <power-switch class="pull-right widget-button" v-bind:value="widget.milight.power" v-on:value="powerSwitch"></power-switch>
        </div>
        <div class="align-center">
            <template v-if="widget.milight.type ==='rgbw'">
                <rgbw-light-widget v-bind:light="widget.milight"></rgbw-light-widget>
            </template>
        </div>
    </div>
</template>

<script>
    import * as components from './components';

    export default {
        props: ['widget'],
        components: components,
        methods: {
            powerSwitch: function (value) {
                this.$socket.emit('setLightPower', this.$store.state.user.token, {
                    value: value,
                    light: this.widget.milight
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