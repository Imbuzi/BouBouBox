<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-10 col-sm-8 col-md-6 col-lg-4">
                <div class="card">
                    <div class="body">
                        <form>
                            <h4>Connexion requise</h4>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input type="text" class="form-control" name="mail" placeholder="Adresse mail" required autofocus>
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
                            <div class="row">
                                <div class="col-xs-8 p-t-5">
                                    <input type="checkbox" name="rememberme" class="filled-in chk-col-pink">
                                    <label for="rememberme">Rester connecté</label>
                                </div>
                                <div class="col-xs-4">
                                    <button class="btn btn-block bg-pink waves-effect" type="submit">SE CONNECTER</button>
                                </div>
                            </div>
                            <div class="row m-t-15 m-b--20">
                                <div class="col-xs-6">
                                    <a href="#">Créer un compte</a>
                                </div>
                                <div class="col-xs-6 align-right">
                                    <a href="#">Mot de passe oublié</a>
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
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }
</style>