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
                <v-layout row wrap>
                    <v-flex>
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th>Дата и время создания заявки</th>
                                <td>{{response.created_at}}</td>
                            </tr>
                            <tr>
                                <th>Номер комнаты</th>
                                <td>{{response.parameters.before.room}}</td>
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
                    </v-flex>
                </v-layout>
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
                            <td> {{response.parameters.before.room}}</td>
                            <td> {{response.parameters.after.room}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Клиент</th>
                            <td>{{response.parameters.before.full_name}}</td>
                            <td>{{response.parameters.after.full_name}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Город</th>
                            <td>{{response.parameters.before.city}}</td>
                            <td>{{response.parameters.after.city}}</td>
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
                            <th scope="row">Почта</th>
                            <td>{{response.parameters.before.email}}</td>
                            <td>{{response.parameters.after.email}}</td>
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
                title: 'Лог: Создание бронирования'
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
                            "parking": null,
                            "room_id": null,
                            "sum_nal": null,
                            "discount": null,
                            "end_date": null,
                            "is_close": null,
                            "is_payed": null,
                            "client_id": null,
                            "order_num": null,
                            "begin_date": null,
                            "created_at": null,
                            "days_count": null,
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
                            "room_status_id": null,
                            "col_prepaid_days": null
                        },
                        "before": {
                            "id": null,
                            "_url": null,
                            "beds": null,
                            "city": null,
                            "kids": null,
                            "room": null,
                            "adult": null,
                            "email": null,
                            "phone": null,
                            "is_get": null,
                            "message": null,
                            "parking": null,
                            "prepaid": null,
                            "discount": null,
                            "end_date": null,
                            "is_queue": null,
                            "client_id": null,
                            "full_name": null,
                            "is_answer": null,
                            "order_num": null,
                            "begin_date": null,
                            "deleted_at": null
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
            };
        },
        mounted() {
            this.axios.get('logs/' + this.$route.params.id).then((response) => {
                console.log(response);
                this.response = response.data.log
            });
        },
        methods: {}
    }
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>

