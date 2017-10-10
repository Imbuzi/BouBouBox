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
                                <div class="form-line">
                                    <input type="text" class="form-control" name="namesurname" placeholder="Name Surname" required autofocus>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">email</i>
                                </span>
                                <div class="form-line">
                                    <input type="email" class="form-control" name="email" placeholder="Email Address" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line">
                                    <input type="password" class="form-control" name="password" minlength="6" placeholder="Password" required>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line">
                                    <input type="password" class="form-control" name="confirm" minlength="6" placeholder="Confirm Password" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="terms" id="terms" class="filled-in chk-col-pink">
                                <label for="terms">I read and agree to the <a href="javascript:void(0);">terms of usage</a>.</label>
                            </div>

                            <button class="btn btn-block btn-lg bg-pink waves-effect" type="submit">SIGN UP</button>

                            <div class="m-t-25 m-b--5 align-center">
                                <a href="sign-in.html">You already have a membership?</a>
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

            }
        }
    }
</script>

<style scoped>
    .msg {
        margin-bottom: 15px;
    }
</style>