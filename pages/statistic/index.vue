<template>
    <v-layout>

        <v-btn color="success"
               :to="{name:'statistic-orders-payment', params:{  begin_date: begin_date, end_date: end_date }}">
            Оплаты
        </v-btn>

    </v-layout>
</template>

<script>

    export default {
        name: 'Payment',
        data() {
            return {
                begin_date: new Date().getFullYear() + "-01-01",
                end_date: new Date().toISOString().substr(0, 10),
            };
        },

        beforeMount() {
        },

        watch: {},

        methods: {}
    };

</script>
