<template>
  <aside v-bind:class="{ open: opened }" class="right-sidebar">
    <div class="container-fluid">
        <div class="row">
            <ul class="nav nav-tabs tab-nav-right" role="tablist">
                <li role="presentation" class="active"><a href="#settings" data-toggle="tab">PARAMÈTRES</a></li>
                <li role="presentation"><a href="#widgets" data-toggle="tab">WIDGETS</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="settings">
                    <b>Paramètres généraux</b>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="widgets">
                    <b>Widgets</b>
                    <p>
                        Lorem ipsum dolor sit amet, ut duo atqui exerci dicunt, ius impedit mediocritatem an. Pri ut tation electram moderatius.
                        Per te suavitate democritum. Duis nemore probatus ne quo, ad liber essent aliquid
                        pro. Et eos nusquam accumsan, vide mentitum fabellas ne est, eu munere gubergren
                        sadipscing mel.
                    </p>
                </div>
            </div>
        </div>
    </div>
  </aside>
</template>

<script>
    export default {
        computed: {
            opened: function() {
                return this.$store.state.sidebar.opened
            }
        }
    }
</script>