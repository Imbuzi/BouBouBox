<template>
    <div v-if="opened" class="modal-backdrop in fade">
        <div v-bind:class="{ in: opened }" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan
                        vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper.
                        Fusce pulvinar libero vel ligula iaculis ullamcorper. Integer dapibus, mi ac tempor varius, purus
                        nibh mattis erat, vitae porta nunc nisi non tellus. Vivamus mollis ante non massa egestas fringilla.
                        Vestibulum egestas consectetur nunc at ultricies. Morbi quis consectetur nunc.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link">SAVE CHANGES</button>
                        <button type="button" class="btn btn-link">CLOSE</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {},
        computed: {
            opened: function () {
                return this.$store.state.modal.opened;
            }
        }
    }
</script>

<style scoped>
</style>