<template>
    <v-layout>
        <v-flex >
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Очереди</v-toolbar-title>
                </v-toolbar>
                <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th class="export">ФИО</th>
                        <th class="export">Заезд</th>
                        <th class="export">Выезд</th>
                        <th class="export">Почта</th>
                        <th class="export">Телефон</th>
                        <th class="export">Город</th>
                        <th class="export">Номер</th>
                        <th class="export">Кол. мест</th>
                        <th class="export">Взрослые</th>
                        <th class="export">Дети</th>
                        <th class="export">Парко. места</th>
                        <th class="export">Доп. кровати</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="request in requests">
                        <td>{{request.name}}</td>
                        <td>{{request.datein}}</td>
                        <td>{{request.dateout}}</td>
                        <td>{{request.mail}}</td>
                        <td>{{request.phone}}</td>
                        <td>{{request.city}}</td>
                        <td>{{request.room}}</td>
                        <td>{{request.size_room}}</td>
                        <td>{{request.old}}</td>
                        <td>{{request.junior}}</td>
                        <td>{{request.parking}}</td>
                        <td>{{request.beds}}</td>
                        <td>
                            <v-btn color="primary">Бронь</v-btn>
                        </td>
                        <td>
                            <v-btn color="gray" icon>
                                <v-icon>delete_outline</v-icon>
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
    import $ from 'jquery';  // подключаем jQuery
    import 'datatables.net'; // подключаем сам плагин
    import 'datatables.net-buttons/js/buttons.html5.min';
    import 'datatables.net-buttons/js/buttons.html5.min';
    import JSZip from 'jszip';

    export default {
        name:'queue',
        data() {
            return {
                requests: [
                    {
                        "name": "Brandi Eaton",
                        "datein": "Thursday, March 12, 2015 11:12 PM",
                        "dateout": "Monday, February 12, 2018 9:28 PM",
                        "mail": "brandi_eaton@voitsekhovsky.studio",
                        "phone": "+1 (822) 408-3575",
                        "city": "Ryderwood",
                        "room": '101',
                        "size_room": 2,
                        "old": 3,
                        "junior": 2,
                        "parking": 1,
                        "beds": 3
                    }
                ],
            };
        },
        mounted() {
            window.JSZip = JSZip;

            var totalHeight = null;

            totalHeight = $(window).height() - 250;
            console.log("totalHeight - " + totalHeight);
            let DATATABLE = $('#DataTable').DataTable({
                "paging": false,
                "searching": false,
                "info": false,
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Выгрузить в Excel',
                        className: 'v-btn theme--light success',
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            },
                            columns: '.export'
                        },
                        filename: 'Отель Маяк - Заявки ',
                        title: 'Отчет по заявкам на ',


                    }
                ]
            });
        },
    };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
