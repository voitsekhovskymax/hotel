<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-tooltip bottom>
                            <v-btn flat icon color="grey" slot="activator" @click="getUpdateYear('prev')">
                                <v-icon>first_page</v-icon>
                            </v-btn>
                            <span>Предыдущий год</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <v-btn flat icon color="grey" slot="activator" @click="getUpdateMonth('prev')">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                            <span>Предыдущий месяц</span>
                        </v-tooltip>
                        <v-dialog
                                ref="dialog_update"
                                v-model="modal_update"
                                :return-value.sync="date_update"
                                persistent
                                lazy
                                full-width
                                width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="date_update"
                                    label="Выбор даты"
                                    solo
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="date_update" type="month" scrollable locale="ru" :no-title="true">

                                <v-btn flat color="primary" @click="modal_update = false">Закрыть</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click="getUpdate(date_update)">Подтвердить</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <v-tooltip bottom>
                            <v-btn flat icon color="grey" slot="activator" @click="getUpdateMonth('next')">
                                <v-icon>chevron_right</v-icon>
                            </v-btn>
                            <span>Следующий месяц</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <v-btn flat icon color="grey" slot="activator" @click="getUpdateYear('next')">
                                <v-icon>last_page</v-icon>
                            </v-btn>
                            <span>Следующий год</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12  class="hidden-sm-and-down">
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>

        </v-card>
        <div class="loader-table">
            <loading :active.sync="loader" :is-full-page="false" :backgroundColor="'#ffffff'" :opacity="1"></loading>

            <v-alert
                    :value="true"
                    type="warning"
                    v-if="error.text != null"
            >
                {{error.text}}
            </v-alert>

            <table id="HomeTable" ref="dataTable" class="table table-bordered home" style="width:100%">
                <thead>
                <tr>
                    <th>#</th>
                    <th v-for="day in response.days">{{day}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="room in response.table">
                    <td>{{room.name}} <span class="quantity" v-if="room.quantity">({{room.quantity}})</span></td>
                    <template v-for="(day, index) in response.days">
                        <td v-if="typeof room.day !== 'undefined' && typeof room.day[index+1] !== 'undefined'"
                            :class="[ room.day[index+1].class, 'order_table' ]"
                            @click="room.day[index+1].id !== undefined ? getOrder(room.day[index+1]) : ''">
                            <!--{{room.day[index+1].id}}-->
                        </td>
                        <td v-else></td>
                        <!--<td>{{typeof room.day}}</td>-->
                    </template>

                </tr>
                </tbody>
                <tfoot>
                <tr class="parking-row">
                    <td>Парк.</td>
                    <template v-for="(item, index) in response.col_parking ">
                        <td>
                            {{response.settings_parking - item}}
                        </td>
                    </template>
                </tr>
                <tr class="beds-row">
                    <td>Кров.</td>
                    <template v-for="(item, index) in response.col_beds ">
                        <td>
                            {{response.settings_beds - item}}
                        </td>
                    </template>
                </tr>
                </tfoot>

            </table>
        </div>

        <v-dialog v-model="dialog" max-width="290" persistent fullscreen hide-overlay scrollable
                  transition="dialog-bottom-transition">
            <v-card v-if="progress" class="progress_loader">
                <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
            </v-card>

            <v-card v-else class="order-info-dialog">
                        <v-toolbar class="no-shadow">
                            <v-toolbar-title class="hidden-sm-and-down">Краткая информация по брони №<b>{{order.orderRoom.order_num}}</b>
                            </v-toolbar-title>

                            <v-btn color="success"
                                   :to="{name:'reservations-id', params:{id: order.orderRoom.id}}">Перейти
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="dialog = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>

                <v-card-text class="card-content mt-3">
                    <v-layout wrap>
                        <v-flex sm6 md6 xs12>
                            <v-text-field label="ФИО" v-model="order.client.name"></v-text-field>

                            <v-text-field label="Телефон" v-model="order.client.phone"></v-text-field>

                            <v-text-field label="Сумма без скидки"
                                          v-model="order.orderRoom.total_payment"></v-text-field>

                            <v-text-field label="Скидка" v-model="order.orderRoom.discount"></v-text-field>

                            <v-text-field label="Сумма предоплаты" v-model="order.orderRoom.sum_prepaid"></v-text-field>

                            <v-text-field label="Получена предоплата"
                                          v-model="order.orderRoom.was_prepaid"></v-text-field>

                            <v-text-field label="Доплата" v-model="order.orderRoom.was_payed"></v-text-field>

                            <v-text-field label="Уплачено всего" v-model="order.orderRoom.sum_payed"></v-text-field>

                            <!--<v-text-field label="Способ оплаты" v-model="order.orderRoom.payment_type.name"-->
                            <!--:hint="order.orderRoom.payment_type.info"></v-text-field>-->

                            <!--<v-text-field label="Статус номера" v-model="order.orderRoom.room_status.name"-->
                            <!--:hint="order.orderRoom.room_status.info"></v-text-field>-->

                        </v-flex>

                        <v-flex sm6 md6 xs12>

                            <v-text-field label="Дата заезда" v-model="order.orderRoom.begin_date"></v-text-field>

                            <v-text-field label="Дата выезда" v-model="order.orderRoom.end_date"></v-text-field>

                            <v-text-field label="Взрослые" v-model="order.orderRoom.adult"></v-text-field>

                            <v-text-field label="Дети" v-model="order.orderRoom.kids"></v-text-field>

                            <v-textarea
                                    label="Информация"
                                    v-model="order.orderRoom.info"
                                    auto-grow
                                    rows="1"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import $ from 'jquery' // подключаем jQuery
    import 'datatables.net' // подключаем сам плагин
    import 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min'
    // import 'datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.min'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'

    export default {
        components: {
            Loading
        },
        name: "table",
        head() {
            return {
                title: 'Главная таблица ' + this.$route.params.month + '-' + this.$route.params.year,
            }
        },
        data: function () {
            return {
                //data
                response: {
                    days: [],
                    col_days: '',
                    col_beds: [],
                    col_parking: [],
                    month: '',
                    settings_beds: 0,
                    settings_parking: 0,
                    table: {}
                },
                dialog: false,
                order: {
                    "orderRoom": {
                        "id": null,
                        "room_id": null,
                        "client_id": null,
                        "room_status_id": null,
                        "payment_type_id": null,
                        "date_checkin": null,
                        "date_prepaid": null,
                        "days_count": null,
                        "discount": null,
                        "order_num": null,
                        "total_payment": null,
                        "sum_nal": null,
                        "sum_besnal": null,
                        "sum_payed": null,
                        "sum_prepaid": null,
                        "was_payed": null,
                        "was_prepaid": null,
                        "info_prepaid": null,
                        "is_payed": null,
                        "is_close": null,
                        "parking": null,
                        "parking_current_count": null,
                        "parking_number": null,
                        "adult": null,
                        "kids": null,
                        "beds": null,
                        "begin_date": null,
                        "end_date": null,
                        "date_transfer": null,
                        "sum_transfer": null,
                        "info_transfer": null,
                        "date_transfer_back": null,
                        "sum_transfer_back": null,
                        "info_transfer_back": null,
                        "col_prepaid_days": null,
                        "info": null,
                        "order_author": null,
                        "is_queue": null,
                        "is_cron": null,
                        "deleted_at": null,
                        "created_at": null,
                        "updated_at": null,
                        "client": {
                            "id": null,
                            "name": null,
                            "passport": null,
                            "phone": null,
                            "email": null,
                            "address": null,
                            "info": null,
                            "is_black_list": null,
                            "deleted_at": null,
                            "created_at": null,
                            "updated_at": null
                        },
                        "room": {
                            "id": null,
                            "name": null,
                            "room_type_id": null,
                            "quantity": null,
                            "location": null,
                            "block": null,
                            "created_at": null,
                            "updated_at": null
                        },
                        "room_status": {
                            "id": null,
                            "name": null,
                            "info": null,
                            "created_at": null,
                            "updated_at": null
                        },
                        "payment_type": null
                    },
                    "client": {
                        "id": null,
                        "name": null,
                        "passport": null,
                        "phone": null,
                        "email": null,
                        "address": null,
                        "info": null,
                        "is_black_list": null,
                        "deleted_at": null,
                        "created_at": null,
                        "updated_at": null
                    },
                    "parking": null,
                    "order_parking": null,
                    "liq_prepaid": null,
                    "liq_paid": {
                        "id": null,
                        "liq_pay_order_id": null,
                        "amount": null,
                        "email": null,
                        "description": null,
                        "href": null,
                        "status_json": null,
                        "cancel_json": null,
                        "send_json": null,
                        "order_type": null,
                        "order_room_id": null,
                        "is_prepaid": null,
                        "is_paid": null,
                        "iterator": null,
                        "deleted_at": null,
                        "created_at": null,
                        "updated_at": null
                    }
                },
                not_data: {},
                col_days: '',
                settings_beds: '',
                settings_parking: '',
                //helpers
                date_update: new Date().toISOString().substr(0, 7),
                modal_update: false,
                loader: true,
                progress: false,
                error: {
                    text: null,
                },
                //    tests
                start_time: null
            }
        },

        created() {
            this.start_time = new Date()
            console.time()
            console.log('Таймер запущен')
            console.log('Страница создана. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
        },
        beforeMount() {

        },
        mounted() {
            console.log('Страница монтируется. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
            let app = this
            console.log('Запрос данных... | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
            this.axios.get('table/' + this.$route.params.month + '/' + this.$route.params.year).then((response) => {
                this.response = response.data
                this.date_update = new Date(this.response.current_year, this.response.current_month).toISOString().substr(0, 7);
                console.log('Запрос данных завершен. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
                this.generateTable()
            }).catch(function (error) {
                console.log(error.response)
                app.loader = false
                app.error.text = error.response.data.message
                console.log('Ошибка получения данных таблицы. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
            })
            console.log('Страница смонтирована. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())

        },
        updated: function () {
        },
        methods: {
            generateTable() {
                console.log('Создаем таблицу. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())

                $(document).ready(function () {
                    let DATATABLE = $('#HomeTable').DataTable({
                        'ordering': false,
                        paging: false,
                        scrollY: $(window).height() - 300 + 'px',
                        'scrollX': true,
                        scrollCollapse: true,
                        fixedHeader: true,
                    })

                    new $.fn.dataTable.FixedColumns(DATATABLE, {
                        leftColumns: 1,
                        heightMatch: 'auto'
                    })
                    console.log('Таблица создана. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
                    console.log('Таймер остановлен')
                    console.timeEnd()

                })
                this.loader = false
            },
            getOrder(order) {
                console.log('Была выбранная клетка');
                console.log(order);
                console.log(order.id);
                this.dialog = true;
                this.progress = true;
                this.axios.get('orders/' + order.id + '/edit').then((response) => {
                    console.log('Полученный номер с бекенда')
                    console.log(response.data);
                    this.order = response.data;
                    this.progress = false;
                })
            },
            getUpdate(date_update) {
                let arrayDATE = date_update.split('-')
                this.$router.push({name: 'table-year-month', params: {year: arrayDATE[0], month: arrayDATE[1]}})
            },
            getUpdateMonth(state) {
                if (state == 'next') {
                    this.response.current_month++;
                    this.$router.push({
                        name: 'table-year-month',
                        params: {year: this.response.current_year, month: this.response.current_month}
                    })
                }

                if (state == 'prev') {
                    this.response.current_month--;
                    this.$router.push({
                        name: 'table-year-month',
                        params: {year: this.response.current_year, month: this.response.current_month}
                    })
                }
            },
            getUpdateYear(state) {
                if (state == 'next') {
                    this.response.current_year++;
                    this.$router.push({
                        name: 'table-year-month',
                        params: {year: this.response.current_year, month: this.response.current_month}
                    })
                }

                if (state == 'prev') {
                    this.response.current_year--;
                    this.$router.push({
                        name: 'table-year-month',
                        params: {year: this.response.current_year, month: this.response.current_month}
                    })
                }
            }
        }
    }
</script>


<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
<style src="~/node_modules/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.min.css" scoped/>
<style src="~/assets/css/home.css" scoped/>

<style>
    .dataTables_info, .dataTables_filter {
        display: none !important;
    }

    #HomeTable ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    #HomeTable ::-webkit-scrollbar-button {
        width: 5px;
        height: 5px;
    }

    #HomeTable ::-webkit-scrollbar-thumb {
        background: #e1e1e1;
        border: 5px none #ffffff;
        border-radius: 50px;
    }

    /*::-webkit-scrollbar-thumb:hover {*/
    /*background: #ffffff;*/
    /*}*/
    /*::-webkit-scrollbar-thumb:active {*/
    /*background: #000000;*/
    /*}*/
    #HomeTable ::-webkit-scrollbar-track {
        background: #666666;
        border: 0px none #ffffff;
        border-radius: 50px;
    }

    #HomeTable ::-webkit-scrollbar-track:hover {
        background: #666666;
    }

    #HomeTable ::-webkit-scrollbar-track:active {
        background: #333333;
    }

    #HomeTable ::-webkit-scrollbar-corner {
        background: transparent;
    }

    .quantity {
        font-weight: 600;
    }



    .order-info-dialog nav{
        z-index: 1;
    }
</style>
