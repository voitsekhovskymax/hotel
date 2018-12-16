<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Трансфер</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <span>C </span>
                    <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                              :return-value.sync="begin_date" persistent lazy full-width
                              width="290px">

                        <v-text-field slot="activator" v-model="begin_date_string" label="Дата заезда"
                                      class="ml-3 mr-3 toolbar-input" solo required></v-text-field>
                        <v-date-picker v-model="begin_date" scrollable :first-day-of-week="1"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_begin_date.save(begin_date)">
                                Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <span>По </span>
                    <v-dialog ref="ref_modal_end_date" v-model="modal_end_date"
                              :return-value.sync="end_date"
                              persistent lazy full-width width="290px">
                        <v-text-field slot="activator" v-model="end_date_string" label="Дата выезда"
                                      class="ml-2 mr-3 toolbar-input" readonly solo required></v-text-field>
                        <v-date-picker v-model="end_date" scrollable :first-day-of-week="1"
                                       :min="begin_date"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_end_date.save(end_date)">Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-btn color="primary" large @click="updateTable">
                        Подсчитать
                    </v-btn>

                </v-toolbar>
                <!---->
                <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th class="export">ФИО</th>
                        <th class="export">Номер телефона</th>
                        <th class="export">Номер заявки</th>
                        <th class="export">Дата трансфера приезд</th>
                        <th class="export">Сумма трансфера приезд</th>
                        <th class="export">Инфо трансфера приезд</th>
                        <th class="export">Дата трансфера выезд</th>
                        <th class="export">Сумма трансфера выезд</th>
                        <th class="export">Инфо трансфера выезд</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="transfer in response.orders">
                        <td>{{transfer.client.name}}</td>
                        <td>{{transfer.client.phone}}</td>
                        <td>{{transfer.order_num}}</td>
                        <td>{{transfer.date_transfer}}</td>
                        <td>{{transfer.sum_transfer}}</td>
                        <td>{{transfer.info_transfer}}</td>
                        <td>{{transfer.date_transfer_back}}</td>
                        <td>{{transfer.sum_transfer_back}}</td>
                        <td>{{transfer.info_transfer_back}}</td>
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
        name: 'transfer',
        data() {
            return {
                //data
                begin_date: new Date().toISOString().substr(0, 10),
                end_date: new Date().toISOString().substr(0, 10),
                begin_date_string: this.formatDate(new Date().toISOString().substr(0, 10)),
                end_date_string: this.formatDate(new Date().toISOString().substr(0, 10)),
                response: {
                    date_str: [],
                    count: 0,
                    clients: []
                },
                //helpers
                modal_begin_date: false,
                modal_end_date: false,


                //tests
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
                menu2: false
            };
        },
        beforeMount() {
            this.axios.get('transfer').then((response) => {
                console.log('transfer');
                console.log(response.data);
                this.response = response.data;
                this.begin_date = this.reFormatDate(response.data.date_str[0]);
                this.begin_date_string = response.data.date_str[0];
                this.end_date = this.reFormatDate(response.data.date_str[1]);
                this.end_date_string = response.data.date_str[1];
                this.generateTable();
            });

        },

        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
            },
            begin_date(val, oldVal) {
                this.begin_date_string = this.formatDate(this.begin_date)
            },
            end_date(val, oldVal) {
                this.end_date_string = this.formatDate(this.end_date);
            }
        },

        methods: {
            formatDate(date) {
                if (!date) return null;
                const [year, month, day] = date.split('-');
                return `${day}-${month}-${year}`;
            },
            reFormatDate(date) {
                if (!date) return null;
                const [day, month, year] = date.split('-');
                return `${year}-${month}-${day}`;
            },
            generateTable() {
                let app = this;
                $(document).ready(function () {
                    window.JSZip = JSZip;
                    var totalHeight = $(window).height() - 250;
                    console.log("totalHeight - " + totalHeight);
                    let DATATABLE = $('#DataTable').DataTable({
                        "paging": false,
                        "searching": false,
                        "info": false,
                        scrollY: totalHeight + "px",
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
                                filename: 'Отель Маяк - Трансфер ' + app.begin_date_string + " " + app.end_date_string,
                            }
                        ]
                    });
                });


            },
            updateTable() {
                this.axios.post('transfer', {
                    begin_date: this.begin_date,
                    end_date: this.end_date
                }).then((response) => {
                    this.response = response.data;
                    this.begin_date = this.reFormatDate(response.data.date_str[0]);
                    this.begin_date_string = response.data.date_str[0];
                    this.end_date = this.reFormatDate(response.data.date_str[1]);
                    this.end_date_string = response.data.date_str[1];
                });
            },
        }
    };

    function gettanggal(str) {
        console.log(str);
        var arr = str.split('-');
        return arr[0] + '-' + arr[1] + '-' + arr[2];
    }
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>