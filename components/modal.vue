<template>
    <transition name="fade">
        <div v-if="modalContentComponent" class="modal-container">
            <div class="modal-backdrop in">
            </div>
            <div class="modal in">
                <div class="modal-dialog">
                    <component v-on:closeModal="closeModal" v-bind:is="modalContentComponent"></component>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        computed: {
            modalContentComponent: function () {
                return this.$store.state.modal.component;
            }
        },
        methods: {
            closeModal: function () {
                this.$store.commit('setModalComponent', null);
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }

    .modal-container {
        position: fixed;
        z-index: 1500;
    }

    .modal.in {
        display: block;
    }
</style>