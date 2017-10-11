<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Utilisateurs en attente de validation</h4>
        </div>
        <div class="modal-body">
            <ul v-if="userList" class="list-group">
                <li v-for="user in userList" class="list-group-item">{{user.name}} {{user.surname}}</li>
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
        }
    }
</script>