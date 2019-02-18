<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon class="hidden-xs-only" :to="{name:'logs-page', params:{page:1}}">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>Лог: удаленная бронь</v-toolbar-title>
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

                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>Дата и время удаления брони</th>
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
                                    :to="{name:'reservations-id', params:{'id':response.parameters.before.id}}"
                                    target='_blank'>
                                {{response.parameters.before.order_num}}
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <th>Дата заезда</th>
                        <td>{{response.parameters.before.begin_date}}</td>
                    </tr>
                    <tr>
                        <th>Дата выезда</th>
                        <td>{{response.parameters.before.end_date}}</td>
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
                        <v-toolbar-title>Подробно</v-toolbar-title>
                    </v-toolbar>
                    <table class="table  table-hover table-bordered">
                        <thead style="background: #ccc">
                        <tr>
                            <th scope="col">Название поля</th>
                            <th scope="col">Данные</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Номер отеля</th>
                            <td> {{additional_response.before.room.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Клиент</th>
                            <td>{{additional_response.before.client.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Скидка</th>
                            <td>{{response.parameters.before.discount}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Количество дней предоплаты</th>
                            <td>{{response.parameters.before.col_prepaid_days}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Получена предоплата</th>
                            <td>{{response.parameters.before.was_prepaid}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Уплачено всего</th>
                            <td>{{response.parameters.before.was_payed}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Способ оплаты</th>
                            <td v-if="additional_response.before.payment_type">
                                {{additional_response.before.payment_type.name}}
                            </td>
                            <td v-else>не выбран</td>
                        </tr>
                        <tr>
                            <th scope="row">Статус номера</th>
                            <td>{{additional_response.before.room_statuses.name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дата заезда</th>
                            <td>{{response.parameters.before.begin_date}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дата выезда</th>
                            <td>{{response.parameters.before.end_date}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Взрослые</th>
                            <td>{{response.parameters.before.adult}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дети</th>
                            <td>{{response.parameters.before.kids}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Паркоместа</th>
                            <td>{{response.parameters.before.parking_number}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дополнительные кровати</th>
                            <td>{{response.parameters.before.beds}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Информация</th>
                            <td>{{response.parameters.before.info}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (сумма)</th>
                            <td>{{response.parameters.before.sum_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (информация)</th>
                            <td>{{response.parameters.before.info_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на заезд (дата)</th>
                            <td>{{response.parameters.before.date_transfer}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (сумма)</th>
                            <td>{{response.parameters.before.sum_transfer_back}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (информация)</th>
                            <td>{{response.parameters.before.info_transfer_back}}</td>
                        </tr>

                        <tr>
                            <th scope="row">Трансфер на выезд (дата)</th>
                            <td>{{response.parameters.before.date_transfer_back}}</td>
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
                title: 'Лог: Удаленная бронь'
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
                        "before": {
                            "id": 3607,
                            "beds": null,
                            "info": null,
                            "kids": null,
                            "adult": 1,
                            "client": {
                                "id": 1953,
                                "info": "Front-end developer,  разработчик этого сервиса.",
                                "name": "Максим  Владимирович Войцеховский",
                                "email": "voitsekhovskymax@gmail.com",
                                "phone": "380989327333",
                                "address": "Запорожье",
                                "passport": "нн1111",
                                "created_at": null,
                                "deleted_at": null,
                                "updated_at": "2018-02-12 19:06:32",
                                "is_black_list": 0
                            },
                            "is_cron": null,
                            "parking": null,
                            "room_id": 1,
                            "sum_nal": 0,
                            "discount": 0,
                            "end_date": "2018-06-02",
                            "is_close": false,
                            "is_payed": false,
                            "is_queue": null,
                            "client_id": 1953,
                            "order_num": "10106201802062018",
                            "sum_payed": 0,
                            "was_payed": null,
                            "begin_date": "2018-06-01",
                            "created_at": "2019-01-31 16:45:46",
                            "days_count": 1,
                            "deleted_at": null,
                            "sum_besnal": 0,
                            "updated_at": "2019-01-31 17:15:43",
                            "sum_prepaid": 700,
                            "was_prepaid": 0,
                            "date_checkin": null,
                            "date_prepaid": null,
                            "info_prepaid": null,
                            "order_author": "Max Voitsekhovsky",
                            "sum_transfer": null,
                            "date_transfer": null,
                            "info_transfer": null,
                            "total_payment": 700,
                            "parking_number": null,
                            "room_status_id": 1,
                            "payment_type_id": null,
                            "col_prepaid_days": 1,
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
                        },
                        client: {
                            name: null
                        }
                    },
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

            await this.axios.get('clients/' + this.response.parameters.before.client_id + "/edit").then((response) => {
                console.log('client');
                console.log(response);
                this.additional_response.before.client = response.data.client
            });
            // названия типов оплаты
            await this.axios.get('payment-types/' + this.response.parameters.before.payment_type_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.before.payment_type = response.data.payment_type
            });

            await this.axios.get('room-statuses/' + this.response.parameters.before.room_status_id + "/edit").then((response) => {
                console.log(response);
                this.additional_response.before.room_statuses = response.data.room_statuses
            });
        },
        methods: {}
    }
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>

