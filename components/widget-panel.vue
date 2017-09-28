<template>
    <article>
        <div class="container-fluid">
            <div class="block-header">
                <h2>{{panelTitle}}</h2>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        props: ['panel-title'],
        computed: {
            panels: function () {
                return this.$store.state.rooms.list
            }
        },
        created: function () {
            var vm = this;
            fetch('/room', {
                headers: { Accept: 'application/json' }
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                vm.$store.commit('setRoomList', res);
            }).catch(function (err) {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .card .container-fluid .row div:not(:nth-child(4n)):not(:last-child) {
        border-right: 1px solid #9E9E9E;
    }

    .card {
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>