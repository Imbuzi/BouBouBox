<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <button v-bind:class="'bg-' + color" class="btn btn-circle">
                    <i class="material-icons">person</i>
                </button>
                <span class="badge notification-badge bg-black">1</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        }
    }
</script>

<style scoped>
    span.badge.notification-badge {
        margin-left: -20px;
        margin-top: -35px;
    }

    button {
        color: #fff !important;
    }
</style>