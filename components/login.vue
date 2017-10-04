<template>
    <main v-bind:class="'theme-' + color">
        <div class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <div class="card">
                        <div class="body">
                            <form v-on:submit.prevent="submitForm">
                                <h4>Connexion requise</h4>
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i>
                                    </span>
                                    <div class="form-line" v-bind:class="{ focused: mailFocused }">
                                        <input v-bind:disabled="formLocked" type="email" v-model="mailAddress" class="form-control" v-on:blur="toggleMailFocused(false)" v-on:focus="toggleMailFocused(true)" name="mail" placeholder="Adresse mail" required autofocus>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">lock</i>
                                    </span>
                                    <div class="form-line" v-bind:class="{ focused: passwordFocused }">
                                        <input v-bind:disabled="formLocked" type="password" v-model="password" class="form-control" v-on:blur="togglePasswordFocused(false)" v-on:focus="togglePasswordFocused(true)" name="password" placeholder="Mot de passe" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 p-t-5">
                                        <input v-bind:disabled="formLocked" type="checkbox" id="rememberme" name="rememberme" class="filled-in" v-bind:class="'chk-col-' + color">
                                        <label for="rememberme">Rester connecté</label>
                                    </div>
                                    <transition name="fade" mode="out-in">
                                        <div v-if="!loading" class="col-xs-6" key="button">
                                            <button class="btn btn-block waves-effect" v-bind:class="'bg-' + color" type="submit">SE CONNECTER</button>
                                        </div>
                                        <div v-else key="loading" class="col-xs-6 align-center">
                                            <div class="preloader pl-size-xs">
                                                <div class="spinner-layer" v-bind:class="'pl-' + color">
                                                    <div class="circle-clipper left">
                                                        <div class="circle"></div>
                                                    </div>
                                                    <div class="circle-clipper right">
                                                        <div class="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                                <div class="row m-t-15 m-b--20">
                                    <div class="col-xs-6">
                                        <a v-bind:class="'col-' + color" href="#">Créer un compte</a>
                                    </div>
                                    <div class="col-xs-6 align-right">
                                        <a v-bind:class="'col-' + color" href="#">Mot de passe oublié</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <alert v-bind:alert="alert"></alert>
    </main>
</template>

<script>
    import AlertComponent from './alert.vue';

    export default {
        data: function () {
            return {
                mailFocused: false,
                passwordFocused: false,
                mailAddress: '',
                password: '',
                loading: false,
                formLocked: false,
                alert: {
                    opened: false,
                    message: "",
                    timeout: null
                }
            }
        },
        methods: {
            toggleMailFocused: function (value) {
                this.mailFocused = value;
            },
            togglePasswordFocused: function (value) {
                this.passwordFocused = value;
            },
            toggleLoading: function (value) {
                this.loading = value;
            },
            lockForm: function (value) {
                this.formLocked = value;
            },
            showAlert: function (message, delay) {
                let vm = this;
                vm.alert.message = message;
                vm.alert.opened = true;
                clearTimeout(vm.alert.timeout);
                vm.alert.timeout = setTimeout(function () {
                    vm.alert.opened = false;
                }, delay);
            },
            submitForm: function () {
                this.toggleLoading(true);
                this.lockForm(true);
                this.$socket.emit('getJWT', {
                    mail: this.mailAddress,
                    password: this.password
                });
            }
        },
        sockets: {
            JWT: function (result) {
                if (result.error) {
                    this.toggleLoading(false);
                    this.lockForm(false);
                    this.showAlert(result.message, 10000);
                } else {
                    console.log(result);
                }
            }
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        },
        components: {
            'alert': AlertComponent
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>