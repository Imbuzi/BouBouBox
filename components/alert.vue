<template>
    <div class="bootstrap-notify-container alert alert-dismissible bg-black p-r-35">
        <button type="button" class="close">×</button>
        Turning standard Bootstrap alerts
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .bootstrap-notify-container {
        display: inline-block;
        margin: 0px auto;
        position: fixed;
        transition: all 0.5s ease-in-out;
        z-index: 1000;
        top: 20px;
        left: 0px;
        right: 0px;
    }

    .bootstrap-notify-container button.close {
        position: absolute;
        right: 10px;
        top: 5px;
        z-index: 1033;
    }
</style>