<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon class="hidden-xs-only" :to="{name:'logs-page', params:{page:1}}">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>Системный лог</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>
            <v-card-text>
                <!-- todo вывести иконку для предоплаты -->
                <!--
                получена предоплата- в журнале отображается информация -дата и время изменений, номер комнаты, номер брони,
                дата заезда и выезда, куда внесены изменения, кто внес изменения
                -->
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>Дата и время обновления брони</th>
                        <td>{{response.created_at}}</td>
                    </tr>
                    <tr>
                        <th>Номер комнаты</th>
                        <td>{{additional_response.before.room.name}}</td>
                    </tr>
                    <tr>
                        <th>Номер брони</th>
                        <td>
                            <router-link
                                    :to="{name:'reservations-id', params:{'id':response.parameters.after.id}}"
                                    target='_blank'>
                                {{response.parameters.after.order_num}}
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <th>Дата заезда</th>
                        <td>{{response.parameters.after.begin_date}}</td>
                    </tr>
                    <tr>
                        <th>Дата выезда</th>
                        <td>{{response.parameters.after.end_date}}</td>
                    </tr>
                    <tr>
                        <th>Кто внес изменения</th>
                        <td>
                            <router-link :to="{name:'users-id', params:{'id':response.user.id}}">
                                {{response.user.name}}
                            </router-link>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>Таблица сравнения</v-toolbar-title>
                    </v-toolbar>
                    <table class="table  table-hover table-bordered">
                        <thead style="background: #ccc">
                        <tr>
                            <th scope="col">Название поля</th>
                            <th scope="col">До</th>
                            <th scope="col">После</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Номер отеля</th>
                            <td> {{additional_response.before.room.name}}</td>
                            <td>{{additional_response.after.room.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Клиент</th>
                            <td>
                                <template v-if="response.parameters.before.client">
                                    {{response.parameters.before.client.name}}
                                </template>
                                <template v-else-if="response.parameters.before.client_id">
                                        <router-link :to="{name:'clients-edit-id', params:{id:response.parameters.before.client_id}}" target="_blank">Профиль клиента</router-link>
                                </template>
                                <template v-else>
                                    <b>Клиент не найден</b>
                                </template>
                            </td>
                            <td>{{response.parameters.after.client.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Скидка</th>
                            <td>{{response.parameters.before.discount}}</td>
                            <td>{{response.parameters.after.discount}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Количество дней предоплаты</th>
                            <td>{{response.parameters.before.col_prepaid_days}}</td>
                            <td>{{response.parameters.after.col_prepaid_days}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Получена предоплата</th>
                            <td>{{response.parameters.before.was_prepaid}}</td>
                            <td>{{response.parameters.after.was_prepaid}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Уплачено всего</th>
                            <td>{{response.parameters.before.was_payed}}</td>
                            <td>{{response.parameters.after.was_payed}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Способ оплаты</th>
                            <td v-if="additional_response.before.payment_type">
                                {{additional_response.before.payment_type.name}}
                            </td>
                            <td v-else>не выбран</td>
                            <td v-if="additional_response.after.payment_type">
                                {{additional_response.after.payment_type.name}}
                            </td>
                            <td v-else>не выбран</td>
                        </tr>
                        <tr>
                            <th scope="row">Статус номера</th>
                            <td>{{additional_response.before.room_statuses.name}}</td>
                            <td>{{additional_response.after.room_statuses.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дата заезда</th>
                            <td>{{response.parameters.before.begin_date}}</td>
                            <td>{{response.parameters.after.begin_date}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дата выезда</th>
                            <td>{{response.parameters.before.end_date}}</td>
                            <td>{{response.parameters.after.end_date}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Взрослые</th>
                            <td>{{response.parameters.before.adult}}</td>
                            <td>{{response.parameters.after.adult}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дети</th>
                            <td>{{response.parameters.before.kids}}</td>
                            <td>{{response.parameters.after.kids}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Паркоместа</th>
                            <td>{{response.parameters.before.parking_number}}</td>
                            <td>{{response.parameters.after.parking_number}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дополнительные кровати</th>
                            <td>{{response.parameters.before.beds}}</td>
                            <td>{{response.parameters.after.beds}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Информация</th>
                            <td>{{response.parameters.before.info}}</td>
                            <td>{{response.parameters.after.info}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (сумма)</th>
                            <td>{{response.parameters.before.sum_transfer}}</td>
                            <td>{{response.parameters.after.sum_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (информация)</th>
                            <td>{{response.parameters.before.info_transfer}}</td>
                            <td>{{response.parameters.after.info_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (дата)</th>
                            <td>{{response.parameters.before.date_transfer}}</td>
                            <td>{{response.parameters.after.date_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (сумма)</th>
                            <td>{{response.parameters.before.sum_transfer_back}}</td>
                            <td>{{response.parameters.after.sum_transfer_back}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (информация)</th>
                            <td>{{response.parameters.before.info_transfer_back}}</td>
                            <td>{{response.parameters.after.info_transfer_back}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (дата)</th>
                            <td>{{response.parameters.before.date_transfer_back}}</td>
                            <td>{{response.parameters.after.date_transfer_back}}</td>
                        </tr>
                        </tbody>
                    </table>
                </v-card>
            </v-card-text>
        </v-card>


    </div>
</template>

<script>
    export default {
        name: 'logs-created-order-id',
        head() {
            return {
                title: 'Лог: Обновление бронирования'
            }
        },
        data() {
            return {
                response: {
                    "id": null,
                    "user_id": null,
                    "type": "created",
                    "model": "OrderRoom",
                    "parameters": {
                        "after": {
                            "id": null,
                            "beds": null,
                            "info": null,
                            "kids": null,
                            "adult": null,
                            "client": {
                                "id": null,
                                "info": null,
                                "name": null,
                                "email": null,
                                "phone": null,
                                "address": null,
                                "passport": null,
                                "created_at": null,
                                "deleted_at": null,
                                "updated_at": null,
                                "is_black_list": null
                            },
                            "is_cron": null,
                            "parking": null,
                            "room_id": null,
                            "sum_nal": null,
                            "discount": null,
                            "end_date": null,
                            "is_close": null,
                            "is_payed": null,
                            "is_queue": null,
                            "client_id": null,
                            "order_num": null,
                            "sum_payed": null,
                            "was_payed": null,
                            "begin_date": null,
                            "created_at": null,
                            "days_count": null,
                            "deleted_at": null,
                            "sum_besnal": null,
                            "updated_at": null,
                            "sum_prepaid": null,
                            "was_prepaid": null,
                            "date_checkin": null,
                            "date_prepaid": null,
                            "info_prepaid": null,
                            "order_author": null,
                            "sum_transfer": null,
                            "date_transfer": null,
                            "info_transfer": null,
                            "total_payment": null,
                            "parking_number": null,
                            "room_status_id": null,
                            "payment_type_id": null,
                            "col_prepaid_days": null,
                            "sum_transfer_back": null,
                            "date_transfer_back": null,
                            "info_transfer_back": null,
                            "parking_current_count": null
                        },
                        "before": {
                            "id": null,
                            "beds": null,
                            "info": null,
                            "kids": null,
                            "adult": null,
                            "client": {
                                "id": null,
                                "info": null,
                                "name": null,
                                "email": null,
                                "phone": null,
                                "address": null,
                                "passport": null,
                                "created_at": null,
                                "deleted_at": null,
                                "updated_at": null,
                                "is_black_list": null
                            },
                            "is_cron": null,
                            "parking": null,
                            "room_id": null,
                            "sum_nal": null,
                            "discount": null,
                            "end_date": null,
                            "is_close": null,
                            "is_payed": null,
                            "is_queue": null,
                            "client_id": null,
                            "order_num": null,
                            "sum_payed": null,
                            "was_payed": null,
                            "begin_date": null,
                            "created_at": null,
                            "days_count": null,
                            "deleted_at": null,
                            "sum_besnal": null,
                            "updated_at": null,
                            "sum_prepaid": null,
                            "was_prepaid": null,
                            "date_checkin": null,
                            "date_prepaid": null,
                            "info_prepaid": null,
                            "order_author": null,
                            "sum_transfer": null,
                            "date_transfer": null,
                            "info_transfer": null,
                            "total_payment": null,
                            "parking_number": null,
                            "room_status_id": null,
                            "payment_type_id": null,
                            "col_prepaid_days": null,
                            "sum_transfer_back": null,
                            "date_transfer_back": null,
                            "info_transfer_back": null,
                            "parking_current_count": null
                        }
                    },
                    "created_at": null,
                    "updated_at": null,
                    "user": {
                        "id": null,
                        "name": null,
                        "email": null,
                        "email_verified_at": null,
                        "role_id": null,
                        "created_at": null,
                        "updated_at": null
                    }
                },
                additional_response: {
                    before: {
                        room: {
                            name: null
                        },
                        payment_type: {
                            name: null
                        },
                        room_statuses: {
                            name: null
                        }
                    },
                    after: {
                        room: {
                            name: null
                        },
                        payment_type: {
                            name: null
                        },
                        room_statuses: {
                            name: null
                        }
                    }
                }
            };
        },
        async mounted() {
            await this.axios.get('logs/' + this.$route.params.id).then((response) => {
                console.log(response);
                this.response = response.data.log
            });

            // Получение дополнительных данных
            // назхвания комнат
            await this.axios.get('rooms/' + this.response.parameters.before.room_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.before.room = response.data.room
            });
            await this.axios.get('rooms/' + this.response.parameters.after.room_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.after.room = response.data.room
            });

            // названия типов оплаты
            await this.axios.get('payment-types/' + this.response.parameters.before.payment_type_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.before.payment_type = response.data.payment_type
            });
            await this.axios.get('payment-types/' + this.response.parameters.after.payment_type_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.after.payment_type = response.data.payment_type
            });

            await this.axios.get('room-statuses/' + this.response.parameters.before.room_status_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.before.room_statuses = response.data.room_statuses
            });
            await this.axios.get('room-statuses/' + this.response.parameters.after.room_status_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.after.room_statuses = response.data.room_statuses
            });
        },
        methods: {}
    }
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>

