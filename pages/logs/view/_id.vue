<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon class="hidden-xs-only" :to="{name:'logs-page', params:{page:1}}">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>Системный лог</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>
            <v-card-text>

                <v-layout row wrap>
                    <v-flex>

                    </v-flex>
                </v-layout>
            </v-card-text>

        </v-card>


    </div>
</template>

<script>
    export default {
        name: 'logs-view-id',
        head() {
            return {
                title: 'Системный лог'
            }
        },
        data() {
            return {
                response: {},
            };
        },
        mounted() {
            this.axios.get('logs/' + this.$route.params.id).then((response) => {
                console.log(response);

            });
        },
        methods: {}
    }
</script>
