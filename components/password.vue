<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                <div class="card">
                    <div class="body">
                        <form v-on:submit.prevent="submitForm">
                            <div class="msg">
                                Veuillez saisir l'adresse mail que vous avez utilisé lors de votre création de compte.
                                Vous allez recevoir par mail un lien pour réinitialiser votre mot de passe.
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">email</i>
                                </span>
                                <div class="form-line">
                                    <input type="email" class="form-control" name="email" placeholder="Adresse mail" required autofocus>
                                </div>
                            </div>

                            <button v:bind-class="'bg-' + color" class="btn btn-block btn-lg" type="submit">Réinitialiser mon mot de passe</button>
                            <div class="row m-t-20 m-b--5 align-center">
                                <a href="#" v-on:click.prevent="connect">Se connecter</a>
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
        beforeCreate: function () {
            if (this.$store.state.user.token) {
                this.$router.replace('/');
            }
        },
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