<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Трансфер</v-toolbar-title>
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
                <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th class="export">ФИО</th>
                        <th class="export">Телефон</th>
                        <th class="export">Заявка</th>
                        <th class="export">Дата  приезд</th>
                        <th class="export">Сумма  приезд</th>
                        <th class="export">Инфо  приезд</th>
                        <th class="export">Дата  выезд</th>
                        <th class="export">Сумма  выезд</th>
                        <th class="export">Инфо  выезд</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="res in response">
                        <td>{{res.name}}</td>
                        <td>{{res.phone}}</td>
                        <td>{{res.order}}</td>
                        <td>{{res.date_in}}</td>
                        <td>{{res.summ_in}}</td>
                        <td>{{res.info_in}}</td>
                        <td>{{res.date_out}}</td>
                        <td>{{res.summ_out}}</td>
                        <td>{{res.info_out}}</td>
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
    import {formateDate} from '../../libs/utils';
    export default {
        name: 'transfer',
        data() {
            return {
                request: {
                    begin_date: '',
                    end_date: '',
                },
                response: [{
                    "name": "Brandi Eaton",
                    "phone": "+1 (822) 408-3575",
                    "order": '3061906201829062018',
                    "date_in": "19-06-2018",
                    'summ_in': '700',
                    'info_in': 'Минск-Мелитополь №100БА, вагон 3, дата прибытия - 19.06.2018, время прибытия - 08.02\t',
                    "date_out": "29-06-2018",
                    'summ_out': '700',
                    'info_out': '29.06',
                }],
                modal_begin_date: false,
                modal_end_date: false,
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
                        filename: 'Отель Маяк - Трансфер ' + this.request.begin_date + " " + this.request.end_date,

                    }
                ]
            });
        },
    };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>