<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                <div class="card">
                    <div class="body">
                        <form v-on:submit.prevent="submitForm">
                            <h4>Inscription</h4>
                            <div class="msg">
                                Suite à la création de votre compte, celui-ci devra être validé par un utilisateur
                                approuvé pour vous permettre l'accès à l'interface.
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="name" placeholder="Prénom" required autofocus>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="surname" placeholder="Nom" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">email</i>
                                </span>
                                <div class="form-line">
                                    <input type="email" class="form-control" name="email" placeholder="Adresse mail" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line">
                                    <input type="password" class="form-control" name="password" placeholder="Mot de passe" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line">
                                    <input type="password" class="form-control" name="confirm" placeholder="Confirmation du mot de passe" required>
                                </div>
                            </div>
                            <button v-bind:class="'bg-' + color" class="btn btn-block btn-lg" type="submit">CRÉER LE COMPTE</button>
                            <div class="m-t-25 m-b--5 align-center">
                                <a v-bind:class="'col-' + color" href="#" v-on:click.prevent="connect">Se connecter</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            submitForm: function () {

            },
            connect: function () {
                this.$router.push('/login');
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
    .msg {
        margin-bottom: 15px;
    }

    .body .col-xs-6 {
        margin-bottom: 0px !important;
    }
</style>