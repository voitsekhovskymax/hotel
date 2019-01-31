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
                                <th>Дата и время бронирования</th>
                                <td>{{response.created_at}}</td>
                            </tr>
                            <tr>
                                <th>Номер комнаты</th>
                                <td>{{response.parameters.before.room}}</td>
                            </tr>
                            <tr>
                                <th>Номер брони</th>
                                <td>
                                    <router-link :to="{name:'reservations-id', params:{'id':response.parameters.after.id}}" target='_blank'>
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
                                <th>Статус</th>
                                <td>
                                    {{(response.parameters.after.room_status_id == 1) ? "Бронь" : "Статус неизвестен"}}
                                </td>
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

