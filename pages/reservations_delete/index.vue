<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Удаленные брони</v-toolbar-title>
                    <v-spacer/>
                </v-toolbar>

                <table
                        id="table"
                        ref="table"
                        class="table table-striped table-bordered"
                        style="width:100%"
                >
                    <thead>
                    <tr>
                        <th class="export">Дата удаления</th>
                        <th class="export">Номер заявки</th>
                        <th class="export">ФИО</th>
                        <th class="export">Дата заезда</th>
                        <th class="export">Дата выезда</th>
                        <th class="export">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="reservation in response">
                        <td data-field="date">{{ reservation.deleted_at }}</td>
                        <td data-field="room">{{ reservation.order_num }}</td>
                        <td data-field="client">{{ reservation.client.name }}</td>
                        <td data-field="begin_date">{{ reservation.begin_date }}</td>
                        <td data-field="end_date">{{ reservation.end_date }}</td>
                        <td data-field="action">
                            <v-btn color="primary" small
                                   :to="{name:'reservations_delete-id', params:{id:reservation.id, reservation:reservation}}">
                                Открыть
                            </v-btn>
                        </td>

                    </tr>
                    </tbody>
                </table>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import $ from "jquery"; // подключаем jQuery
    import "datatables.net"; // подключаем сам плагин
    import "datatables.net-buttons/js/buttons.html5.min";
    import JSZip from "jszip";

    export default {
        name: 'reservations_delete',
        head() {
            return {
                title: 'Удаленные брони'
            }
        },
        data() {
            return {
                response: null
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.axios.get("cron-deleted-orders").then(response => {
                    this.response = response.data.cron_deleted_orders;
                    this.generateTable();
                });
            },
            generateTable() {
                $(document).ready(function () {
                    window.JSZip = JSZip;
                    const totalHeight = $(window).height() - 250;
                    console.log("totalHeight - " + totalHeight);
                    const table = $("#table").DataTable({
                        paging: false,
                        searching: false,
                        info: false,
                        scrollY: totalHeight + "px",
                        scrollX: true,
                        scrollCollapse: true,
                    });
                });
            }
        }
    }
</script>

<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>