<template>
    <v-card>
        <div class="cheat">
            Читы включены
        </div>
    </v-card>
</template>

<script>
    export default {
        name: 'tests',
        data: function () {
            return {}
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .cheat {
        padding: 15px 50px;
        background: #4CAF50;
        color: #ffffff;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
        border-radius: 5px;
    }
</style>
