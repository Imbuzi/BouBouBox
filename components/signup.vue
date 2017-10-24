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
                                        <div class="form-line" v-bind:class="{ focused: nameFocused || name, success: name }">
                                            <input v-bind:disabled="formLocked" type="text" class="form-control" v-model="name" v-on:blur="toggleNameFocused(false)" v-on:focus="toggleNameFocused(true)" name="name" placeholder="Prénom" required autofocus>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="form-line" v-bind:class="{ focused: surnameFocused || surname, success: surname }">
                                            <input v-bind:disabled="formLocked" type="text" class="form-control" v-model="surname" v-on:blur="toggleSurnameFocused(false)" v-on:focus="toggleSurnameFocused(true)" name="surname" placeholder="Nom" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">email</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: mailAddressFocused || mailInputState.valid || mailInputState.invalid, success: mailInputState.valid, error: mailInputState.invalid }">
                                    <input v-bind:disabled="formLocked" type="email" class="form-control" v-model="mailAddress" v-on:blur="toggleMailFocused(false)" v-on:focus="toggleMailFocused(true)" name="email" placeholder="Adresse mail" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: passwordFocused || passwordInputState.valid || passwordInputState.invalid, success: passwordInputState.valid, error: passwordInputState.invalid }">
                                    <input v-bind:disabled="formLocked" type="password" class="form-control" v-model="password" v-on:blur="togglePasswordFocused(false)" v-on:focus="togglePasswordFocused(true)" name="password" placeholder="Mot de passe" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line" v-bind:class="{ focused: passwordConfirmFocused || passwordConfirmInputState.valid || passwordConfirmInputState.invalid, success: passwordConfirmInputState.valid, error: passwordConfirmInputState.invalid }">
                                    <input v-bind:disabled="formLocked" type="password" class="form-control" v-model="passwordConfirm" v-on:blur="togglePasswordConfirmFocused(false)" v-on:focus="togglePasswordConfirmFocused(true)" name="confirm" placeholder="Confirmation du mot de passe" required>
                                </div>
                            </div>
                            <transition name="fade" mode="out-in">
                                <button v-if="!loading" key="button" v-bind:disabled="buttonLocked" v-bind:class="'bg-' + color" class="btn btn-block btn-lg" type="submit">CRÉER LE COMPTE</button>
                                <div v-else class="align-center">
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
    import PasswordHash from 'password-hash';

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
        sockets: {
            'user/add': function (data) {
                if (data.error) {
                    this.toggleLoading(false);
                    this.lockForm(false);
                    this.$store.dispatch('showAlert', {
                        message: data.message,
                        delay: 8000
                    });
                } else {
                    this.$router.push('/login');
                    this.$store.dispatch('showAlert', {
                        message: 'Compte créé avec succès',
                        delay: 8000
                    });
                }
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
            toggleMailFocused: function (value) {
                this.mailAddressFocused = value;
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
            toggleLoading: function (value) {
                this.loading = value;
            },
            submitForm: function () {
                this.toggleLoading(true);
                this.lockForm(true);
                this.$socket.emit('user/add', {
                    name: this.name,
                    surname: this.surname,
                    mail: this.mailAddress,
                    password: PasswordHash.generate(this.password, {algorithm: 'SHA512'})
                });
            },
            connect: function () {
                if (!this.formLocked) {
                    this.$router.push('/login');
                }
            }
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            },
            mailInputState: function () {
                if (this.mailAddress) {
                    if (this.mailAddress.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
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
                if (this.password) {
                    if (this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)) {
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
            passwordConfirmInputState: function () {
                if (this.passwordConfirm) {
                    if (this.passwordConfirm == this.password && this.passwordInputState.valid) {
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
                return !(this.passwordInputState.valid && this.mailInputState.valid && this.passwordConfirmInputState.valid && this.name && this.surname);
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