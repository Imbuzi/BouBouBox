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
                                        <div class="form-line" v-bind:class="{ focused: nameFocused }">
                                            <input v-bind:disabled="formLocked" type="text" class="form-control" v-model="name" v-on:blur="toggleNameFocused(false)" v-on:focus="toggleNameFocused(true)" name="name" placeholder="Prénom" required autofocus>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="form-line" v-bind:class="{ focused: surnameFocused }">
                                            <input v-bind:disabled="formLocked" type="text" class="form-control" v-model="surname" v-on:blur="toggleSurnameFocused(false)" v-on:focus="toggleSurnameFocused(true)" name="surname" placeholder="Nom" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">email</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: mailFocused }">
                                    <input v-bind:disabled="formLocked" type="email" class="form-control" v-model="mailAddress" v-on:blur="toggleMailFocused(false)" v-on:focus="toggleMailFocused(true)" name="email" placeholder="Adresse mail" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: passwordFocused }">
                                    <input v-bind:disabled="formLocked" type="password" class="form-control" v-model="password" v-on:blur="togglePasswordFocused(false)" v-on:focus="togglePasswordFocused(true)" name="password" placeholder="Mot de passe" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: passwordConfirmFocused }">
                                    <input v-bind:disabled="formLocked" type="password" class="form-control" v-model="passwordConfirm" v-on:blur="togglePasswordConfirmFocused(false)" v-on:focus="togglePasswordConfirmFocused(true)" name="confirm" placeholder="Confirmation du mot de passe" required>
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
        data: function () {
            return {
                name: '',
                surname: '',
                mailAddress: '',
                password: '',
                passwordConfirm: '',
                nameFocused: false,
                surnameFocused: false,
                mailAddressFocused: false,
                passwordFocused: false,
                passwordConfirmFocused: false,
                loading: false,
                formLocked: false
            }
        },
        methods: {
            toggleMailFocused: function (value) {
                this.mailFocused = value;
            },
            toggleNameFocused: function (value) {
                this.nameFocused = value;
            },
            toggleSurnameFocused: function (value) {
                this.surnameFocused = value;
            },
            togglePasswordFocused: function (value) {
                this.passwordFocused = value;
            },
            togglePasswordConfirmFocused: function (value) {
                this.passwordConfirmFocused = value;
            },
            lockForm: function (value) {
                this.formLocked = value;
            },
            submitForm: function () {
                this.toggleLoading(true);
                this.lockForm(true);
                // DO STUFF
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