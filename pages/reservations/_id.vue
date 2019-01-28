<template>
    <div class="elevation-3">
        <template v-if="progress">
            <v-card class="progress_loader">
                <v-progress-circular
                        :size="70"
                        :width="7"
                        color="purple"
                        indeterminate
                />
            </v-card>
        </template>
        <template v-else>
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-btn icon @click="routerBack">
                                <v-icon>arrow_back</v-icon>
                            </v-btn>
                            <v-toolbar-title
                            >Бронь
                                <b>{{ response.orderRoom.order_num }}</b></v-toolbar-title
                            >
                            <v-spacer/>
                        </v-toolbar>
                    </v-flex>

                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer/>
                            <v-btn icon>
                                <v-icon>help_outline</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text class="card-content">
                    <!-- SUBTITLE INFO -->
                    <v-layout wrap>
                        <v-flex lg6 sm6 md6 xs12>
                            <v-text-field
                                    v-model="response.orderRoom.room.name"
                                    label="Номер отеля"
                                    box
                                    readonly
                            />
                        </v-flex>
                        <v-flex lg6 sm6 md6 xs12>
                            <v-text-field
                                    v-model="response.orderRoom.id"
                                    label="Порядковый номер "
                                    box
                                    readonly
                            />
                        </v-flex>
                    </v-layout>

                    <!-- ORDER INFO -->
                    <v-layout wrap>
                        <v-flex sm6 md6 xs12>
                            <div class="card_user_reservation">
                                <v-text-field v-model="response.client.name" label="ФИО"/>

                                <v-text-field v-model="response.client.email" label="Почта"/>

                                <v-text-field v-model="response.client.phone" label="Телефон"/>
                            </div>
                            <v-text-field
                                    v-model="response.orderRoom.total_payment"
                                    label="Сумма без скидки"
                            />

                            <v-text-field
                                    v-model="response.orderRoom.discount"
                                    label="Скидка"
                            />

                            <v-text-field
                                    v-model="response.orderRoom.col_prepaid_days"
                                    label="Количество дней предоплаты"
                            />

                            <v-text-field
                                    v-model="response.orderRoom.sum_prepaid"
                                    label="Сумма предоплаты"
                            />
                            <v-layout wrap>
                                <v-text-field
                                        v-model="response.orderRoom.was_prepaid"
                                        label="Получена предоплата"
                                />
                                <v-tooltip top>
                                    <v-btn
                                            slot="activator"
                                            flat
                                            icon
                                            color="success"
                                            @click="dialogMail = true;"
                                    >
                                        <v-icon>mail_outline</v-icon>
                                    </v-btn>
                                    <span>Отправить письмо</span>
                                </v-tooltip>
                            </v-layout>

                            <v-text-field
                                    v-model="response.orderRoom.was_payed"
                                    label="Доплата"
                            />

                            <v-text-field
                                    v-model="response.orderRoom.sum_payed"
                                    label="Уплачено всего"
                            />

                            <v-select
                                    :items="payment_types"
                                    v-model="response.orderRoom.payment_type_id"
                                    label="Способ оплаты"
                                    item-text="name"
                                    item-value="id"
                            />

                            <v-select
                                    :items="room_statuses"
                                    v-model="response.orderRoom.room_status_id"
                                    label="Статус номера"
                                    item-text="name"
                                    item-value="id"
                            />
                        </v-flex>

                        <v-flex sm6 md6 xs12>
                            <v-dialog
                                    ref="ref_modal_begin_date"
                                    v-model="modal_begin_date"
                                    :return-value.sync="response.orderRoom.begin_date"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="response.orderRoom.begin_date"
                                        label="Дата заезда"
                                        required
                                />
                                <v-date-picker
                                        v-model="response.orderRoom.begin_date"
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
                                            color="success"
                                            @click="
                      $refs.ref_modal_begin_date.save(
                        response.orderRoom.begin_date
                      );
                    "
                                    >
                                        Подтвердить
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>

                            <v-dialog
                                    ref="ref_modal_end_date"
                                    v-model="modal_end_date"
                                    :return-value.sync="response.orderRoom.end_date"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="response.orderRoom.end_date"
                                        label="Дата выезда"
                                        readonly
                                        required
                                />
                                <v-date-picker
                                        v-model="response.orderRoom.end_date"
                                        :first-day-of-week="1"
                                        :min="response.orderRoom.begin_date"
                                        scrollable
                                        locale="ru-ru"
                                >
                                    <v-spacer/>
                                    <v-btn flat color="primary"
                                           @click="modal_end_date = false;"
                                    >Закрыть
                                    </v-btn
                                    >
                                    <v-btn
                                            color="success"
                                            @click="
                      $refs.ref_modal_end_date.save(
                        response.orderRoom.end_date
                      );
                    "
                                    >Подтвердить
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>

                            <v-text-field
                                    v-model="response.orderRoom.adult"
                                    label="Взрослые"
                            />

                            <v-text-field v-model="response.orderRoom.kids" label="Дети"/>
                            <v-layout wrap>
                                <v-select
                                        :items="response.parking"
                                        v-model="response.orderRoom.parking_number"
                                        label="Паркоместа"
                                        item-text="name"
                                        item-value="id"
                                        multiple
                                        attach
                                        chips
                                >
                                    <v-list-tile slot="prepend-item" ripple>
                                        <v-list-tile-title
                                        >Клиенту требуется паркомест -
                                            {{ response.orderRoom.parking }}
                                        </v-list-tile-title
                                        >
                                    </v-list-tile>
                                    <v-list-tile slot="prepend-item" disabled>
                                        <v-list-tile-title
                                        >Выберите номер паркоместа из списка
                                        </v-list-tile-title
                                        >
                                    </v-list-tile>
                                    <v-divider slot="prepend-item" class="mt-2"/>
                                </v-select>
                                <v-tooltip left>
                                    <v-btn
                                            slot="activator"
                                            flat
                                            icon
                                            color="success"
                                            @click="response.orderRoom.parking_number = null;"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                    <span>Очистить паркоместа</span>
                                </v-tooltip>
                            </v-layout>
                            <v-text-field
                                    v-model="response.orderRoom.beds"
                                    label="Дополнительные кровати"
                            />

                            <v-textarea
                                    v-model="response.orderRoom.info"
                                    label="Информация"
                                    auto-grow
                                    rows="1"
                            />

                            <v-switch v-model="transfer_in" label="Трансфер на приезд"/>
                            <transition name="fade">
                                <v-card v-if="transfer_in" color="grey lighten-3">
                                    <v-card-text>
                                        <v-text-field
                                                v-model="response.orderRoom.sum_transfer"
                                                label="Сумма"
                                        />
                                        <v-textarea
                                                v-model="response.orderRoom.info_transfer"
                                                label="Информация"
                                                hint="Информация о трансфере на вьезд"
                                                auto-grow
                                                rows="1"
                                        />
                                        <v-text-field
                                                v-model="response.orderRoom.date_transfer"
                                                label="Дата"
                                        />
                                    </v-card-text>
                                </v-card>
                            </transition>
                            <v-switch v-model="transfer_out" label="Трансфер на выезд"/>

                            <transition name="fade">
                                <v-card v-if="transfer_out" color="grey lighten-3 mt-2">
                                    <v-card-text>
                                        <v-text-field
                                                v-model="response.orderRoom.sum_transfer_back"
                                                label="Сумма"
                                        />
                                        <v-textarea
                                                v-model="response.orderRoom.info_transfer_back"
                                                label="Информация"
                                                hint="Информация о трансфере на выезд"
                                                auto-grow
                                                rows="1"
                                        />
                                        <v-text-field
                                                v-model="response.orderRoom.date_transfer_back"
                                                label="Дата"
                                        />
                                    </v-card-text>
                                </v-card>
                            </transition>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveReservation">Сохранить</v-btn>
                    <v-btn flat color="error"
                           @click="dialogDelete = true;"
                    >Удалить
                    </v-btn
                    >
                    <v-spacer/>
                    <v-btn class="liqpay_btn" @click="dialogLiqpay = true;"/>
                </v-card-actions>
            </v-card>
        </template>

        <v-dialog v-model="dialogMail" width="500">
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-toolbar-title>Отправка письма</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                    </v-flex>

                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer/>
                            <v-btn icon @click="dialogMail = false;">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="response.client.email" label="Почта"/>

                    <v-layout align-center justify-space-around row fill-height>
                        <v-select
                                v-model="mail_select"
                                :items="messages"
                                label="Название письма"
                                hint="Выберите письмо из списка, и его содержимое добавится"
                                item-text="title"
                                return-object
                        />
                        <v-btn flat icon @click="deleteMailSelect">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-layout>

                    <v-textarea
                            v-model="mail_select.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="success" @click="sendMail"> Отправить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" width="500">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar class="no-shadow warning " dark>
                            <v-toolbar-title>Внимание</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogDelete = false;">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    Вы действительно хотите удалить бронь #<b>{{
                    response.orderRoom.order_num
                    }}</b>
                    ?
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="error" @click="deleteReservation"> Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialogLiqpay"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
        >
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-toolbar-title>Liqpay</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                    </v-flex>

                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer/>
                            <v-btn icon @click="dialogLiqpay = false;">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <template v-if="progress_dialog_liqpay">
                    <v-card class="progress_loader">
                        <v-progress-circular
                                :size="70"
                                :width="7"
                                color="purple"
                                indeterminate
                        />
                    </v-card>
                </template>
                <template v-else>
                    <v-card-text>
                        <v-tabs
                                slot="extension"
                                v-model="currentTab"
                                color="transparent"
                                fixed-tabs
                                slider-color="success"
                        >
                            <v-tab href="#paid"> Liqpay предоплата</v-tab>
                            <v-tab href="#prepaid"> Liqpay оплата</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="currentTab">
                            <v-tab-item id="paid">
                                <v-card>
                                    <v-card-text>
                                        <v-layout wrap class="card-content ">
                                            <v-flex sm6 md6 xs12>
                                                <v-text-field
                                                        v-model="response.client.email"
                                                        label="Почта"
                                                />
                                                <v-text-field
                                                        v-model="response.orderRoom.sum_prepaid"
                                                        label="Сумма предоплаты"
                                                />
                                                <v-text-field
                                                        v-model="response.orderRoom.order_num"
                                                        label="order_id"
                                                        readonly
                                                />
                                                <v-btn
                                                        color="success"
                                                        small
                                                        @click="liqpay('prepaid');"
                                                >
                                                    Отправить предоплату на LIQPAY
                                                </v-btn>
                                                <v-btn
                                                        flat
                                                        color="success"
                                                        small
                                                        @click="liqpayReload('prepaid');"
                                                >
                                                    Перезапросить INVOICE предоплаты
                                                </v-btn>
                                            </v-flex>
                                            <v-flex sm6 md6 xs12>
                                                <v-btn
                                                        flat
                                                        color="success"
                                                        small
                                                        @click="liqpayStatus('prepaid');"
                                                >
                                                    Получить статус
                                                </v-btn>

                                                <template v-if="progress_liqpay_prepaid_statuses">
                                                    <v-card class="progress_loader">
                                                        <v-progress-circular
                                                                :size="70"
                                                                :width="7"
                                                                color="purple"
                                                                indeterminate
                                                        />
                                                    </v-card>
                                                </template>
                                                <template v-else>
                                                    <v-card
                                                            v-if="liqpay_prepaid_statuses !== null"
                                                            style="max-width: 400px;"
                                                    >
                                                        <v-card-title><h4>Данные инвойса</h4></v-card-title>
                                                        <v-divider/>
                                                        <v-list dense>
                                                            <v-list-tile
                                                                    v-for="(value, key) in liqpay_prepaid_statuses"
                                                                    :key="key"
                                                            >
                                                                <v-list-tile-content
                                                                ><b>{{ key }}</b></v-list-tile-content
                                                                >
                                                                <v-list-tile-content class="align-end">{{
                                                                    value
                                                                    }}
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card>
                                                </template>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item id="prepaid">
                                <v-card>
                                    <v-card-text>
                                        <v-layout wrap class="card-content ">
                                            <v-flex sm6 md6 xs12>
                                                <v-text-field
                                                        v-model="response.client.email"
                                                        label="Почта"
                                                />
                                                <v-text-field
                                                        v-model="response.orderRoom.sum_prepaid"
                                                        label="Сумма предоплаты"
                                                />
                                                <v-text-field
                                                        v-model="response.orderRoom.order_num"
                                                        label="order_id"
                                                        readonly
                                                />
                                                <v-btn color="success" small @click="liqpay('paid');">
                                                    Отправить оплату на LIQPAY
                                                </v-btn>
                                                <v-btn
                                                        flat
                                                        color="success"
                                                        small
                                                        @click="liqpayReload('paid');"
                                                >
                                                    Перезапросить INVOICE оплаты
                                                </v-btn>
                                            </v-flex>
                                            <v-flex sm6 md6 xs12>
                                                <v-btn
                                                        flat
                                                        color="success"
                                                        small
                                                        @click="liqpayStatus('paid');"
                                                >
                                                    Получить статус
                                                </v-btn>

                                                <template v-if="progress_liqpay_paid_statuses">
                                                    <v-card class="progress_loader">
                                                        <v-progress-circular
                                                                :size="70"
                                                                :width="7"
                                                                color="purple"
                                                                indeterminate
                                                        />
                                                    </v-card>
                                                </template>
                                                <template v-else>
                                                    <v-card
                                                            v-if="liqpay_paid_statuses !== null"
                                                            style="max-width: 400px;"
                                                    >
                                                        <v-card-title><h4>Данные инвойса</h4></v-card-title>
                                                        <v-divider/>
                                                        <v-list dense>
                                                            <v-list-tile
                                                                    v-for="(value, key) in liqpay_paid_statuses"
                                                                    :key="key"
                                                            >
                                                                <v-list-tile-content
                                                                ><b>{{ key }}</b></v-list-tile-content
                                                                >
                                                                <v-list-tile-content class="align-end">{{
                                                                    value
                                                                    }}
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card>
                                                </template>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                progress_dialog_liqpay: false,
                progress_liqpay_prepaid_statuses: false,
                progress_liqpay_paid_statuses: false,
                progress: false,
                modal_begin_date: false,
                modal_end_date: false,
                transfer_in: false,
                transfer_out: false,
                liqpay_paid_headers: [
                    {
                        text: "Ключ",
                        align: "left",
                        sortable: false,
                        value: "key"
                    },
                    {
                        text: "Значение",
                        align: "right",
                        sortable: false,
                        value: "value"
                    }
                ],
                liqpay_paid_statuses: null,
                liqpay_prepaid_headers: [
                    {
                        text: "Ключ",
                        align: "left",
                        sortable: false,
                        value: "key"
                    },
                    {
                        text: "Значение",
                        align: "right",
                        sortable: false,
                        value: "value"
                    }
                ],
                liqpay_prepaid_statuses: null,
                currentTab: "paid",
                dialogLiqpay: false,
                dialogMail: false,
                dialogDelete: false,
                response: {
                    orderRoom: {
                        id: null,
                        room_id: null,
                        client_id: null,
                        room_status_id: null,
                        payment_type_id: null,
                        date_checkin: null,
                        date_prepaid: null,
                        days_count: null,
                        discount: null,
                        order_num: null,
                        total_payment: null,
                        sum_nal: null,
                        sum_besnal: null,
                        sum_payed: null,
                        sum_prepaid: null,
                        was_payed: null,
                        was_prepaid: null,
                        info_prepaid: null,
                        is_payed: null,
                        is_close: null,
                        parking: null,
                        parking_current_count: null,
                        parking_number: [],
                        adult: null,
                        kids: null,
                        beds: null,
                        begin_date: null,
                        end_date: null,
                        date_transfer: null,
                        sum_transfer: null,
                        info_transfer: null,
                        date_transfer_back: null,
                        sum_transfer_back: null,
                        info_transfer_back: null,
                        col_prepaid_days: null,
                        info: null,
                        order_author: null,
                        is_queue: null,
                        deleted_at: null,
                        created_at: null,
                        updated_at: null,
                        room: {
                            id: null,
                            name: null,
                            room_type_id: null,
                            quantity: null,
                            type: null,
                            created_at: null,
                            updated_at: null
                        },
                        room_status: {
                            id: null,
                            name: null,
                            info: null,
                            created_at: null,
                            updated_at: null
                        },
                        payment_type: {
                            id: null,
                            name: null,
                            info: null,
                            created_at: null,
                            updated_at: null
                        }
                    },
                    client: {
                        id: null,
                        name: null,
                        passport: null,
                        phone: null,
                        email: null,
                        address: null,
                        info: null,
                        is_black_list: null,
                        deleted_at: null,
                        created_at: null,
                        updated_at: null
                    },
                    parking: [],
                    order_parking: [],
                    busy_parking: [],
                    states: {
                        "1": "Весенняя скидка",
                        "2": "Майские праздники",
                        "9": "бронь",
                        "13": "Тест отправки письма",
                        "14": "очередь",
                        "15": "предоплата получена",
                        "16": "замена номера",
                        "17": "снятие брони",
                        "17": "снятие брони",
                        "18": "Трансфер",
                        "19": "освободился номер",
                        "20": "отсутствие предоплаты",
                        "21": "уточнение брони"
                    },
                    liq_prepaid: {
                        id: null,
                        liq_pay_order_id: null,
                        amount: null,
                        email: null,
                        description: null,
                        href: null,
                        status_json: null,
                        cancel_json: null,
                        send_json: null,
                        order_type: null,
                        order_room_id: null,
                        is_prepaid: null,
                        is_paid: null,
                        iterator: null,
                        deleted_at: null,
                        created_at: null,
                        updated_at: null
                    },
                    liq_paid: null
                },
                params_id: this.$route.params.id,
                mail_select: {
                    info: null
                },
                messages: null,
                payment_types: [],
                room_statuses: []
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            deleteReservation() {
                this.axios.delete("orders/" + this.$route.params.id).then(response => {
                    console.log(response);
                    this.$snotify.success("Бронь успешно удалена!", "Успешно");
                    this.$router.push({name: "reservations"});
                });
            },
            init() {
                console.log("Загрузка данных");
                this.progress = true;
                this.axios
                    .get("orders/" + this.$route.params.id + "/edit")
                    .then(response => {
                        this.response = response.data;
                        console.log(response);

                        // this.response.orderRoom.parking_number = this.response.order_parking;

                        if (
                            this.response.orderRoom.date_transfer !== null ||
                            this.response.orderRoom.info_transfer !== null ||
                            this.response.orderRoom.sum_transfer !== null
                        ) {
                            this.transfer_in = true;
                        }
                        if (
                            this.response.orderRoom.date_transfer_back !== null ||
                            this.response.orderRoom.info_transfer_back !== null ||
                            this.response.orderRoom.sum_transfer_back !== null
                        ) {
                            this.transfer_out = true;
                        }
                        this.getPaymentTypes();
                        this.getRoomStatuses();
                        this.progress = false;
                        console.log("Загрузка данных завершена");
                    })
                    .catch(error => {
                        console.log("Ошибка сервера");
                        console.log(response);
                    });
                this.axios.get("messages").then(response => {
                    this.messages = response.data.messages;
                });
            },
            getRoomStatuses() {
                this.axios.get("room-statuses").then(response => {
                    this.room_statuses = response.data.room_statuses;
                });
            },
            getPaymentTypes() {
                this.axios.get("payment-types").then(response => {
                    this.payment_types = response.data.payment_types;
                });
            },
            saveReservation() {
                console.log("Отправлено на сервер");
                console.log(this.response.orderRoom);

                this.response.orderRoom.phone = this.response.client.phone;
                this.response.orderRoom.email = this.response.client.email;

                this.axios
                    .patch("orders/" + this.$route.params.id, this.response.orderRoom)
                    .then(response => {
                        console.log("Сервер прислал");
                        console.log(response);
                        this.init();
                    }).catch(error => {
                    console.log("Ошибка сервера");
                    console.log(error);
                });
            },
            sendMail() {
                const request = {
                    email_client: this.response.client.email,
                    email_content: this.mail_select.info
                };
                console.log(request);
                this.axios
                    .post("send-single-email", request)
                    .then(response => {
                        console.log("send-single-email");
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.response = error.response.data;
                    });
            },
            routerBack() {
                this.$router.go(-1);
            },
            deleteMailSelect() {
                this.mail_select = {
                    info: null
                };
            },
            liqpay(order_type) {
                this.progress_dialog_liqpay = true;
                let iterator = null;
                if (this.response.liq_prepaid != null) {
                    iterator += this.response.liq_prepaid.iterator;
                } else {
                    iterator = "-1";
                }

                const request = {
                    email: this.response.client.email,
                    liqpay_order_id:
                        this.response.orderRoom.order_num +
                        "-" +
                        this.response.orderRoom.room_id +
                        "-" +
                        order_type +
                        iterator,
                    order_room_id: this.response.orderRoom.room_id,
                    sum_prepaid: this.response.orderRoom.sum_prepaid,
                    order_type: order_type
                };
                console.log(request);
                this.axios
                    .post("liqpay", request)
                    .then(response => {
                        console.log("liqpay");
                        console.log(response);
                        if (response.data.status == 1) {
                            this.$notify({
                                group: "global",
                                type: "success",
                                title: "Внимание!",
                                text: response.data.text
                            });
                            this.dialogLiqpay = false;
                        } else {
                            this.$notify({
                                group: "global",
                                type: "warning",
                                title: "Внимание!",
                                text: response.data.text
                            });
                        }
                        this.progress_dialog_liqpay = false;
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.$notify({
                            group: "global",
                            type: "error",
                            title: "Произошла ошибка!",
                            text: error.response
                        });
                        this.progress_dialog_liqpay = false;
                    });
            },
            liqpayStatus(order_type) {
                if (order_type == "prepaid") {
                    this.progress_liqpay_prepaid_statuses = true;
                }
                if (order_type == "paid") {
                    this.progress_liqpay_paid_statuses = true;
                }

                let iterator = null;
                if (this.response.liq_prepaid != null) {
                    iterator += this.response.liq_prepaid.iterator;
                } else {
                    iterator = "-1";
                }

                let request = {}

                // В  январе 2019, изменилась строка liqpay
                if (parseInt(this.response.orderRoom.end_date.substr(0, 4)) < 2019) {
                    request.liq_pay_order_id = this.response.orderRoom.order_num + this.response.orderRoom.room_id + order_type + iterator;
                }
                else {
                    request.liq_pay_order_id = this.response.orderRoom.order_num + "-" + this.response.orderRoom.room_id + "-" + order_type + iterator;
                }

                console.log('Получение статуса. Отправляем такой обьект');
                console.log(request);
                this.axios
                    .post("liqpay-status", request)
                    .then(response => {
                        console.log(response.data.result);

                        if (order_type == "prepaid") {
                            this.liqpay_prepaid_statuses = response.data.result;
                            this.progress_liqpay_prepaid_statuses = false;
                        }
                        if (order_type == "paid") {
                            this.liqpay_paid_statuses = response.data.result;
                            this.progress_liqpay_paid_statuses = false;
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.progress_liqpay_prepaid_statuses = false;
                        this.progress_liqpay_paid_statuses = false;

                        this.$notify({
                            group: "global",
                            type: "error",
                            title: "Произошла ошибка!",
                            text: error.response
                        });
                    });
            },
            liqpayReload(order_type) {
                this.progress_dialog_liqpay = true;

                let iterator = null;
                if (this.response.liq_prepaid != null) {
                    iterator += this.response.liq_prepaid.iterator;
                } else {
                    iterator = "-1";
                }

                const request = {
                    email: this.response.client.email,
                    liqpay_order_id:
                        this.response.orderRoom.order_num +
                        "-" +
                        this.response.orderRoom.room_id +
                        "-" +
                        order_type +
                        iterator,
                    order_room_id: this.response.orderRoom.room_id,
                    sum_prepaid: this.response.orderRoom.sum_prepaid,
                    order_type: order_type
                };
                console.log(request);
                this.axios
                    .post("liqpay-reload", request)
                    .then(response => {
                        console.log("liqpay-reload");
                        console.log(response);
                        if (response.data.status == 1) {
                            this.$notify({
                                group: "global",
                                type: "success",
                                title: "Внимание!",
                                text: response.data.text
                            });
                            this.dialogLiqpay = false;
                        } else {
                            this.$notify({
                                group: "global",
                                type: "warning",
                                title: "Внимание!",
                                text: response.data.text
                            });
                        }
                        this.progress_dialog_liqpay = false;
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.$notify({
                            group: "global",
                            type: "error",
                            title: "Произошла ошибка!",
                            text: error.response
                        });
                        this.progress_dialog_liqpay = false;
                    });
            }
        }
    };
</script>

<style scoped>
    .card-content .flex {
        padding: 10px !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>
