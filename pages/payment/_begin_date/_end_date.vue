<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Статистика Оплат</v-toolbar-title>
                    <v-spacer/>
                    <span>C </span>
                    <v-dialog
                            ref="ref_modal_begin_date"
                            v-model="modal_begin_date"
                            :return-value.sync="begin_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                v-model="begin_date"
                                label="Дата заезда"
                                class="ml-3 mr-3 toolbar-input"
                                solo
                                required
                        />
                        <v-date-picker
                                v-model="begin_date"
                                :first-day-of-week="1"
                                scrollable
                                locale="ru-ru"
                        >
                            <v-spacer/>
                            <v-btn flat color="primary"
                                   @click="modal_begin_date = false;"
                            >Закрыть
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    @click="$refs.ref_modal_begin_date.save(begin_date);"
                            >
                                Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <span>По </span>
                    <v-dialog
                            ref="ref_modal_end_date"
                            v-model="modal_end_date"
                            :return-value.sync="end_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                v-model="end_date"
                                label="Дата выезда"
                                class="ml-2 mr-3 toolbar-input"
                                readonly
                                solo
                                required
                        />
                        <v-date-picker
                                v-model="end_date"
                                :first-day-of-week="1"
                                :min="begin_date"
                                scrollable
                                locale="ru-ru"
                        >
                            <v-spacer/>
                            <v-btn flat color="primary"
                                   @click="modal_end_date = false;"
                            >Закрыть
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    @click="$refs.ref_modal_end_date.save(end_date);"
                            >Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-btn color="primary" large @click="updateTable"> Подсчитать</v-btn>
                </v-toolbar>

                <v-layout wrap class="selectors">
                    <table id="customers">
                        <thead>
                        <th/>
                        <th>Итого</th>
                        <th>1-311</th>
                        <th>401-711</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Всего дней за выбранный период</td>
                            <td>{{ response.all_data.days_count }}</td>
                            <td>{{ response.old_data.days_count }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Количество заездов за выбранный период</td>
                            <td>{{ response.all_data.count_orders }}</td>
                            <td>{{ response.old_data.count_orders }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Сумма по забронированным и занятым номерам</td>
                            <td>{{ response.all_data.summ }}</td>
                            <td>{{ response.old_data.summ }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Сумма полученных наличных за выбранный период</td>
                            <td>{{ response.all_data.nal_sum }}</td>
                            <td>{{ response.old_data.nal_sum }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Сумма полученных безналичных за выбранный период</td>
                            <td>{{ response.all_data.besnal_sum }}</td>
                            <td>{{ response.old_data.besnal_sum }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Сумма оплаченная карточкой за выбранный период</td>
                            <td>{{ response.all_data.card_sum }}</td>
                            <td>{{ response.old_data.card_sum }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Всего предоплат</td>
                            <td>{{ response.all_data.sum_pred }}</td>
                            <td>{{ response.old_data.sum_pred }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Общая сумма поступлений</td>
                            <td>
                                {{ response.all_data.summ - response.all_data.discount_sum }}
                            </td>
                            <td>
                                {{ response.old_data.summ - response.old_data.discount_sum }}
                            </td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Всего скидка</td>
                            <td>{{ response.all_data.discount_sum }}</td>
                            <td>{{ response.old_data.discount_sum }}</td>
                            <td/>
                        </tr>

                        <tr>
                            <td>Общая сумма поступлений без предоплат</td>
                            <td>{{ response.all_data.sum_without_pred }}</td>
                            <td>{{ response.old_data.sum_without_pred }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>Количество броней по которым осуществлена предоплата</td>
                            <td>{{ response.all_data.count_pred }}</td>
                            <td>{{ response.old_data.count_pred }}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>
                                Количество броней по которым еще не осуществлена предоплата
                            </td>
                            <td>{{ response.all_data.count_without_pred }}</td>
                            <td>{{ response.old_data.count_without_pred }}</td>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </v-layout>
                <table
                        id="DataTable"
                        ref="DataTable"
                        class="table table-striped table-bordered"
                        style="width:100%"
                >
                    <thead>
                    <tr>
                        <th class="export">Номер</th>
                        <th class="export">Дата заезда</th>
                        <th class="export">Дней</th>
                        <th class="export">Получено нал</th>
                        <th class="export">Получено карта</th>
                        <th class="export">Получено б\н</th>
                        <th class="export">Сумма без скидки</th>
                        <th class="export">Оплачено всего</th>
                        <th class="export">Скидка</th>
                        <th class="export">Получено без предоплат</th>
                        <th class="export">Сумма предоплат</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="room in response.order_rooms"
                            @click="getReservation(room.id);"
                    >
                        <td data-field="room">{{ room.room.name }}</td>
                        <td data-field="begin_date">{{ room.begin_date }}</td>
                        <td data-field="days">{{ room.days_count }}</td>
                        <td v-if="room.payment_type_id == 1" data-field="sum_nal">
                            {{ room.sum_nal }}
                        </td>
                        <td v-else data-field="sum_nal">0</td>
                        <td v-if="room.payment_type_id == 3" data-field="sum_card">
                            {{ room.sum_nal }}
                        </td>
                        <td v-else data-field="sum_card">0</td>
                        <td data-field="sum_besnal">{{ room.sum_besnal }}</td>
                        <td data-field="sum_without_discount">
                            {{ room.total_payment - room.discount }}
                        </td>
                        <td data-field="payed_all">
                            {{ room.was_payed + room.was_prepaid }}
                        </td>
                        <td data-field="discount">{{ room.discount }}</td>
                        <td data-field="was_payed">{{ room.was_payed }}</td>
                        <td data-field="was_prepaid">{{ room.was_prepaid }}</td>
                    </tr>
                    </tbody>
                </table>
            </v-card>
        </v-flex>

        <v-dialog v-model="dialogReservation" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Перейти на бронь?</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md/>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="routeReservation">перейти</v-btn>
                    <v-spacer/>
                    <v-btn @click="dialogReservation = false;">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import $ from "jquery"; // подключаем jQuery
    import "datatables.net"; // подключаем сам плагин
    import "datatables.net-buttons/js/buttons.html5.min";
    import JSZip from "jszip";
    import {datePickerFormat} from "~~/libs/utils";

    export default {
        name: "Payment",
        data() {
            return {
                // data
                begin_date: new Date().toISOString().substr(0, 10),
                end_date: new Date().toISOString().substr(0, 10),
                response: {
                    all_data: {
                        days_count: null,
                        summ: null,
                        cur_sum: null,
                        nal_sum: null,
                        card_sum: null,
                        besnal_sum: null,
                        sum_pred: null,
                        sum_without_pred: null,
                        discount_sum: null,
                        count_orders: null,
                        count_pred: null,
                        count_without_pred: null
                    },
                    old_data: {
                        days_count: null,
                        summ: null,
                        cur_sum: null,
                        nal_sum: null,
                        card_sum: null,
                        besnal_sum: null,
                        sum_pred: null,
                        sum_without_pred: null,
                        discount_sum: null,
                        count_orders: null,
                        count_pred: null,
                        count_without_pred: null
                    }
                },
                // helpers
                modal_begin_date: false,
                modal_end_date: false,
                dialogReservation: false,
                selectReservation: null
            };
        },
        beforeMount() {
            this.axios
                .post("payment", {
                    begin_date: this.$route.params.begin_date,
                    end_date: this.$route.params.end_date
                })
                .then(response => {
                    this.response = response.data;
                    this.begin_date = datePickerFormat(response.data.date_str[0]);
                    this.end_date = datePickerFormat(response.data.date_str[1]);
                    this.generateTable();
                });
        },
        methods: {
            routeReservation() {
            },
            getReservation(id) {
                this.$router.push({name: 'reservations-id', params: {id: id}})
            },
            generateTable() {
                $(document).ready(function () {
                    window.JSZip = JSZip;
                    const totalHeight = $(window).height() - 250;
                    console.log("totalHeight - " + totalHeight);
                    const DATATABLE = $("#DataTable").DataTable({
                        paging: false,
                        searching: false,
                        info: false,
                        scrollY: totalHeight + "px",
                        scrollX: true,
                        scrollCollapse: true,
                        dom: "Bfrtip",
                        buttons: [
                            {
                                extend: "excel",
                                text: "Выгрузить в Excel",
                                className: "v-btn theme--light success",
                                exportOptions: {
                                    modifier: {
                                        page: "current"
                                    },
                                    columns: ".export"
                                },
                                filename: "Отель Маяк - Статистика Оплат "
                            }
                        ]
                    });
                });
            },
            updateTable() {
                this.$router.push({
                    name: "payment-begin_date-end_date",
                    params: {begin_date: this.begin_date, end_date: this.end_date}
                });
            }
        }
    };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
<style scoped>
    .selectors > div {
        padding: 0px 15px;
    }

    #customers {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #customers td,
    #customers th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #customers tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #customers tr:hover {
        background-color: #ddd;
    }

    #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4caf50;
        color: white;
    }
</style>
