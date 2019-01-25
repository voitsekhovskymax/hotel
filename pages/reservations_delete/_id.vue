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
                            <v-toolbar-title>Восстановление Брони <b>{{ response.order_num }}</b></v-toolbar-title>
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
                                    v-model="response.room.name"
                                    label="Номер отеля"
                                    box
                                    readonly
                            />
                        </v-flex>
                        <v-flex lg6 sm6 md6 xs12>
                            <v-text-field
                                    v-model="response.id"
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
                                    v-model="response.total_payment"
                                    label="Сумма без скидки"
                            />

                            <v-text-field
                                    v-model="response.discount"
                                    label="Скидка"
                            />

                            <v-text-field
                                    v-model="response.col_prepaid_days"
                                    label="Количество дней предоплаты"
                            />

                            <v-text-field
                                    v-model="response.sum_prepaid"
                                    label="Сумма предоплаты"
                            />
                            <v-layout wrap>
                                <v-text-field
                                        v-model="response.was_prepaid"
                                        label="Получена предоплата"
                                />
                            </v-layout>

                            <v-text-field
                                    v-model="response.was_payed"
                                    label="Доплата"
                            />

                            <v-text-field
                                    v-model="response.sum_payed"
                                    label="Уплачено всего"
                            />

                        </v-flex>

                        <v-flex sm6 md6 xs12>

                            <v-text-field

                                    v-model="response.begin_date"
                                    label="Дата заезда"
                                    required
                            />


                            <v-text-field

                                    v-model="response.end_date"
                                    label="Дата выезда"
                                    readonly
                                    required
                            />


                            <v-text-field v-model="response.adult" label="Взрослые"/>

                            <v-text-field v-model="response.kids" label="Дети"/>

                            <v-text-field v-model="response.parking" label="Паркоместа"/>


                            <v-text-field v-model="response.beds"
                                          label="Дополнительные кровати"></v-text-field>

                            <v-textarea v-model="response.info" label="Информация" auto-grow
                                        rows="1"></v-textarea>

                            <v-card color="grey lighten-3">
                                <v-card-text>
                                    <v-text-field
                                            v-model="response.sum_transfer"
                                            label="Сумма трансфера на заезд"
                                    />
                                    <v-textarea v-model="response.info_transfer" label="Информация"
                                                hint="Информация о трансфере на заезд" auto-grow rows="1"/>
                                    <v-text-field v-model="response.date_transfer" label="Дата"/>
                                </v-card-text>
                            </v-card>

                            <v-card color="grey lighten-3 mt-2">
                                <v-card-text>
                                    <v-text-field v-model="response.sum_transfer_back"
                                                  label="Сумма трансфера на выезд"></v-text-field>
                                    <v-textarea v-model="response.info_transfer_back" label="Информация"
                                                hint="Информация о трансфере на выезд" auto-grow
                                                rows="1"></v-textarea>
                                    <v-text-field v-model="response.date_transfer_back"
                                                  label="Дата"></v-text-field>
                                </v-card-text>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveReservation">Восстановить бронь</v-btn>
                    <v-spacer/>
                </v-card-actions>
            </v-card>
        </template>


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
                response: {
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
                    "is_cron": 1,
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
                // this.axios.delete("orders/" + this.$route.params.id).then(response => {
                //     console.log(response);
                //     this.$snotify.success("Бронь успешно удалена!", "Успешно");
                //     this.$router.push({name: "reservations"});
                // });
            },
            saveReservation() {
                console.log(this.$route.params.id);
                this.axios.post("cron-deleted-orders-backup/" + this.$route.params.id).then(response => {
                    this.$snotify.success("Бронь успешно восстановлена!", "Успешно");
                    this.$router.push({name: "reservations-id", params: {id: this.$route.params.id}});
                }).catch((error) => {
                    this.$snotify.error(error.data, "Ошибка");
                    console.log(error);
                    console.log(error.response.data.errors);
                });
            },
            init() {
                this.response = this.$route.params.reservation;
            },
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
