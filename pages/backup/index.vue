<template>
    <v-layout>
        <v-flex >
            <v-alert :value="true" type="info" outline class="mb-3">
                В процессе
            </v-alert>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name:'backup',
        head() {
            return {
                title: 'Восстановление данных'
            }
        },
        data() {
            return {};
        }
    };
</script>