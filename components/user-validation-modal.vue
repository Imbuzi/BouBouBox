<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Utilisateurs en attente de validation</h4>
        </div>
        <div class="modal-body">
            <ul v-if="userList" class="list-group">
                <transition-group name="slideOut">
                    <li v-for="user in userList" key="user.mail" class="list-group-item">
                        {{user.name}} {{user.surname}} ({{user.mail}})
                        <div class="pull-right">
                            <button class="btn btn-xs btn-success" v-on:click.prevent="acceptNewUser(user.mail)">
                                <i class="material-icons">check</i>
                            </button>
                            <button class="btn btn-xs btn-danger" v-on:click.prevent="refuseNewUser(user.mail)">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                    </li>
                </transition-group>
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-link" v-on:click.prevent="$emit('closeModal')">FERMER</button>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            userList: function () {
                return this.$store.state.user.waitingForValidation;
            }
        },
        methods: {
            refuseNewUser: function (mail) {
                this.$socket.emit('refuseNewUser', this.$store.state.user.token, mail);
            },
            acceptNewUser: function (mail) {
                this.$socket.emit('acceptNewUser', this.$store.state.user.token, mail);
            }
        }
    }
</script>

<style scoped>
    .pull-right {
        margin-top: -4px;
    }

    .list-group {
        margin-bottom: 0;
    }

    .slideOut-enter-active {
        animation: slideOut .2s reverse;
    }

    .slideOut-leave-active {
        animation: slideOut .2s;
    }
</style>
<style>
    @keyframes slideOut {
        0% {
            opacity: 1;
            padding: 10px 15px;
            height: auto;
            display: block;
        }

        50% {
            opacity: 0;
            padding: 10px 15px;
            height: auto;
            display: block;
        }

        99% {
            opacity: 0;
            padding: 0;
            height: 0;
            display: block;
        }

        100% {
            opacity: 0;
            padding: 0;
            height: 0;
            display: none;
        }
    }
</style>