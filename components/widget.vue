<template>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <div class="main-widget-part">
            WIDGET
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .main-widget-part:not(:nth-of-type(4n)):not(:last-of-type) {
        border-right: 1px solid #9E9E9E;
    }

    .main-widget-part {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>