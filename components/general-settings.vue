<template>
    <div class="row">
        <div class="cotnainer-fluid">
            <button v-bind:class="'bg-' + color" class="btn btn-default btn-circle">
                <i class="material-icons">person</i>
            </button>
            <span class="badge">XX</span>
        </div>
    </div>
</template>

<script>
    export default {}
</script>