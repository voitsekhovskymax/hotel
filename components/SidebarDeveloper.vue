<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-action>
                <v-switch v-model="developer_night_theme"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Ночная тема</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>


<script>
    export default {
        data() {
            return {}
        },
        computed: {
            developer_night_theme: {
                get() {
                    return this.$store.state.developer.options.night_theme;
                },
                set(val) {
                    this.$store.dispatch('developer/godModeOptions', {type: 'night_theme', value: val})
                }
            },
            developer_new_options: {
                get() {
                    return this.$store.state.developer.options.new_options;
                },
                set(val) {
                    this.$store.dispatch('developer/godModeOptions', {type: 'new_options', value: val})
                }
            }
        }
    }
</script>