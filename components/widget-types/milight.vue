<template>
    <div>
        <div class="font-bold uppercase widget-header">
            <div class="row">
                <div class="col-xs-9 widget-name">{{widget.name}}</div>
                <div class="col-xs-3">
                    <power-switch class="pull-right widget-button" v-bind:value="widget.milight.power" v-on:value="powerSwitch"></power-switch>
                </div>
            </div>
        </div>
        <div class="align-center">
            <template v-if="widget.milight.type ==='rgbw'">
                <rgbw-light-widget v-bind:light="widget.milight"></rgbw-light-widget>
            </template>
        </div>
    </div>
</template>

<script>
    import * as components from './milight-components';

    export default {
        props: ['widget'],
        components: components,
        methods: {
            powerSwitch: function (value) {
                this.$socket.emit('milight/power', this.$store.state.user.token, {
                    value: value,
                    light: this.widget.milight
                });
                this.$store.dispatch('milight/power', {
                    id: this.widget.milight.id,
                    power: value
                });
            }
        },
        sockets: {
            'milight/power': function (result) {
                if (result.light.id == this.widget.milight.id) {
                    this.$store.dispatch('milight/power', {
                        id: this.widget.milight.id,
                        power: result.value
                    });
                }
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

    .widget-name {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .uppercase {
        text-transform: uppercase;
    }
</style>