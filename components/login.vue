<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                <div class="card">
                    <div class="body">
                        <form v-on:submit.prevent="submitForm">
                            <h4>Connexion requise</h4>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: mail.focused || mailInputState.valid || mailInputState.invalid, success: mailInputState.valid, error: mailInputState.invalid }">
                                    <input v-bind:disabled="formLocked" type="email" v-model="mail.value" class="form-control" v-on:blur="mail.focused = false" v-on:focus="mail.focused = true" name="mail" placeholder="Adresse mail" required autofocus>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: password.focused || passwordInputState.valid || passwordInputState.invalid, success: passwordInputState.valid, error: passwordInputState.invalid }">
                                    <input v-bind:disabled="formLocked" type="password" v-model="password.value" class="form-control" v-on:blur="password.focused = false" v-on:focus="password.focused = true" name="password" placeholder="Mot de passe" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 p-t-5">
                                    <input v-bind:disabled="formLocked" v-model="rememberMe" type="checkbox" id="rememberme" name="rememberme" class="filled-in" v-bind:class="'chk-col-' + color">
                                    <label for="rememberme">Rester connecté</label>
                                </div>
                                <transition name="fade" mode="out-in">
                                    <div v-if="!loading" class="col-xs-6" key="button">
                                        <button v-bind:disabled="buttonLocked" class="btn btn-block waves-effect" v-bind:class="'bg-' + color" type="submit">SE CONNECTER</button>
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
                                    <a v-bind:class="'col-' + color" href="#" v-on:click.prevent="createAccount">Créer un compte</a>
                                </div>
                                <div class="col-xs-6 align-right">
                                    <a v-bind:class="'col-' + color" href="#" v-on:click.prevent="resetPassword">Mot de passe oublié</a>
                                </div>
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
                mail: {
                    focused: false,
                    value: ''
                },
                password: {
                    focused: false,
                    value: ''
                },
                loading: false,
                formLocked: false,
                rememberMe: false
            }
        },
        methods: {
            submitForm: function () {
                this.loading = true;
                this.formLocked = true;
                this.$socket.emit('JWT', {
                    mail: this.mail.value,
                    password: this.password.value
                });
            },
            createAccount: function () {
                if (!this.formLocked) {
                    this.$router.push('/sign-up');
                }
            },
            resetPassword: function () {
                if (!this.formLocked) {
                    this.$router.push('/password-reset');
                }
            }
        },
        sockets: {
            JWT: function (result) {
                if (result.error) {
                    this.loading = false;
                    this.formLocked = false;
                    this.$store.dispatch('showAlert', {
                        message: result.message,
                        delay: 8000
                    });
                } else {
                    if (this.rememberMe) {
                        this.$localStorage.set('accessToken', result.token);
                    } else {
                        this.$session.set('accessToken', result.token);
                    }
                    this.$store.commit('setToken', {
                        token: result.token
                    });
                    this.$store.commit('setMail', result.mail);
                    this.$router.replace('/');
                }
            }
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            },
            mailInputState: function () {
                if (this.mail.value) {
                    if (this.mail.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                        return {
                            valid: true,
                            invalid: false
                        };
                    } else {
                        return {
                            valid: false,
                            invalid: true
                        };
                    }
                } else {
                    return {
                        valid: false,
                        invalid: false
                    };
                }
            },
            passwordInputState: function () {
                if (this.password.value) {
                    if (this.password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)) {
                        return {
                            valid: true,
                            invalid: false
                        };
                    } else {
                        return {
                            valid: false,
                            invalid: true
                        };
                    }
                } else {
                    return {
                        valid: false,
                        invalid: false
                    };
                }
            },
            buttonLocked: function () {
                return !(this.passwordInputState.valid && this.mailInputState.valid);
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

    button {
        transition: opacity .2s
    }
</style>