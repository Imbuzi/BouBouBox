<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <button v-bind:disabled="!usersWaitingForValidation" v-bind:class="'bg-' + color" class="btn btn-circle" v-on:click.prevent="showUsersWaitingForValidation">
                    <i class="material-icons">person</i>
                </button>
                <transition name="fade">
                    <span v-if="usersWaitingForValidation.length" class="badge notification-badge bg-black">{{usersWaitingForValidation.length}}</span>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import UserValidationModal from './user-validation-modal.vue';

    export default {
        sockets: {
            usersWaitingForValidation: function (result) {
                if (result.error) {
                    this.$store.dispatch('showAlert', {
                        message: result.message,
                        delay: 8000
                    });
                } else {
                    this.$store.commit('setUsersWaitingForValidation', result.userList);
                }
            },
            userRefused: function (result) {
                if (result.error) {
                    this.$store.dispatch('showAlert', {
                        message: value.message,
                        delay: 8000
                    });
                } else {
                    this.$store.commit('removeUserWaitingForValidation', result);
                }
            },
            userAdded: function (user) {
                this.$store.commit('addUserWaitingForValidation', user);
            }
        },
        created: function () {
            this.$socket.emit('getUsersWaitingForValidation', this.$store.state.user.token);
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            },
            usersWaitingForValidation: function () {
                return this.$store.state.user.waitingForValidation;
            }
        },
        methods: {
            showUsersWaitingForValidation: function () {
                this.$store.commit('setModalComponent', UserValidationModal);
            }
        }
    }
</script>

<style scoped>
    span.badge.notification-badge {
        margin-left: -20px;
        margin-top: -35px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }

    button {
        color: #fff !important;
    }
</style>