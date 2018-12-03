<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Парковка</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <span>C </span>
                    <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                              :return-value.sync="request.begin_date" persistent lazy full-width
                              width="290px">

                        <v-text-field slot="activator" v-model="request.begin_date" label="Дата заезда"
                                      class="ml-3 mr-3 toolbar-input" solo required></v-text-field>
                        <v-date-picker v-model="request.begin_date" scrollable :first-day-of-week="1"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_begin_date.save(request.begin_date)">
                                Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <span>По </span>
                    <v-dialog ref="ref_modal_end_date" v-model="modal_end_date" :return-value.sync="request.end_date"
                              persistent lazy full-width width="290px">
                        <v-text-field slot="activator" v-model="request.end_date" label="Дата выезда"
                                      class="ml-2 mr-3 toolbar-input" readonly solo required></v-text-field>
                        <v-date-picker v-model="request.end_date" scrollable :first-day-of-week="1"
                                       :min="request.begin_date"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_end_date.save(request.end_date)">Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-btn color="primary" large>
                        Подсчитать
                    </v-btn>

                </v-toolbar>
                <v-alert :value="true" color="grey">
                    C 2018-09-01 по 2018-09-03 занято 232 паркомест, осталось -175
                </v-alert>
                <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th class="export">ФИО</th>
                        <th class="export">Дата заезда</th>
                        <th class="export">Дата выезда</th>
                        <th class="export">Номер комнаты</th>
                        <th class="export">Количество паркомест</th>
                        <th class="export">Паркоместа</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="res in response">
                        <td>{{res.name}}</td>
                        <td>{{res.date_in}}</td>
                        <td>{{res.date_out}}</td>
                        <td>{{res.room}}</td>
                        <td>{{res.count}}</td>
                        <td>{{res.parking}}</td>
                    </tr>
                    </tbody>
                </table>
                <v-alert :value="true" color="grey">
                    C 2018-09-01 по 2018-09-03 занято 232 паркомест, осталось -175
                </v-alert>
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
        name: 'parking',
        data() {
            return {
                request: {
                    begin_date: '',
                    end_date: '',
                },
                response: [{
                    "name": "Brandi Eaton",
                    "date_in": "19-06-2018",
                    "date_out": "29-06-2018",
                    'room': '101',
                    'count': '1',
                    'parking': '23',
                }],
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
                        filename: 'Отель Маяк - Парковка ' + this.request.begin_date + " " + this.request.end_date,

                    }
                ]
            });
        },
    };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>