<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Utilisateurs en attente de validation</h4>
        </div>
        <div class="modal-body">
            <ul class="list-group">
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
                    <li v-if="userList.length == 0" key="no-user" class="list-group-item col-grey font-italic">
                        Aucun utilisateur en attente de validation
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
                this.$socket.emit('user/refuseNew', this.$store.state.user.token, mail);
            },
            acceptNewUser: function (mail) {
                this.$socket.emit('user/acceptNew', this.$store.state.user.token, mail);
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
        animation: slideOut .5s reverse;
    }

    .slideOut-leave {
        position: absolute;
    }

    .slideOut-leave-active {
        animation: slideOut .5s;
        position: absolute;
    }

    .slideOut-leave-to {
        opacity: 0;
        padding: 0;
        height: 0;
    }

    .slideOut-enter-to {
        opacity: 0;
        padding: 0;
        height: 0;
    }
</style>
<style>
    @keyframes slideOut {
        0% {
            opacity: 1;
            padding: 10px 15px;
            height: auto;
        }

        50% {
            opacity: 0;
            padding: 10px 15px;
            height: auto;
        }

        100% {
            opacity: 0;
            padding: 0;
            height: 0;
        }
    }
</style>