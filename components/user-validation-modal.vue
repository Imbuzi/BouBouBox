<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Utilisateurs en attente de validation</h4>
        </div>
        <div class="modal-body">
            <ul v-if="userList" class="list-group">
                <transition name="slideOut">
                    <li v-for="user in userList" class="list-group-item">
                        {{user.name}} {{user.surname}} ({{user.mail}})
                        <div class="pull-right">
                            <button class="btn btn-xs btn-success" v-on:click.prevent="refuseNewUser(user.mail)">
                                <i class="material-icons">check</i>
                            </button>
                            <button class="btn btn-xs btn-danger" v-on:click.prevent="acceptNewUser(user.mail)">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                    </li>
                </transition>
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
                console.log('Refuse : ' + mail);
            },
            acceptNewUser: function (mail) {
                console.log('Accept : ' + mail);
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
</style>