<template>
    <div >
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon class="hidden-xs-only" :to="{name:'clients-page', params:{page:1}}">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>Редактирование профиля клиента</v-toolbar-title>
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
                        <v-text-field
                                v-model="client.name"
                                label="Имя"
                                required
                                hint="Введите фамилию, имя, отчество клиента"
                        ></v-text-field>

                        <v-text-field
                                v-model="client.passport"
                                label="Паспорт"
                                required
                                hint="Введите паспортные данные клиента"
                        ></v-text-field>

                        <v-text-field
                                v-model="client.phone"
                                label="Телефон"
                                required
                                hint="Ограничений нет. Можно внести два номера"
                        ></v-text-field>

                        <v-text-field
                                type="email"
                                v-model="client.email"
                                label="Email"
                                required
                                hint="Email нужен для отправки клиенту писем подтвержения бронирования"
                        ></v-text-field>

                        <v-text-field
                                type="email"
                                v-model="client.address"
                                label="Адрес"
                                required
                                hint="Адрес клиента"
                        ></v-text-field>

                        <v-text-field
                                type="email"
                                v-model="client.info"
                                label="Информация о клиенте"
                                required
                                hint="Краткая информация о клиенте. Используется внутри-корпоративно."
                        ></v-text-field>

                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="updateClient">Обновить</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" flat @click="dialog = true">Удалить</v-btn>

            </v-card-actions>
        </v-card>


        <v-dialog
                v-model="dialog"
                max-width="400"
        >
            <v-card>
                <v-card-title class="headline">Вы действительно хотите удалить клиента?</v-card-title>

                <v-card-text>
                    У клиента могут быть активные заявки, или бронирования. Так же к клиенту привязывается основная
                    таблица. <b>Удаляйте
                    осознанно!</b>


                    <v-text-field
                            v-model="client.name"
                            label="Имя"
                            required
                            hint="Введите фамилию, имя, отчество клиента"
                    ></v-text-field>

                    <v-text-field
                            v-model="client.passport"
                            label="Паспорт"
                            required
                            hint="Введите паспортные данные клиента"
                    ></v-text-field>

                    <v-text-field
                            v-model="client.phone"
                            label="Телефон"
                            required
                            hint="Ограничений нет. Можно внести два номера"
                    ></v-text-field>

                    <v-text-field
                            type="email"
                            v-model="client.email"
                            label="Email"
                            required
                            hint="Email нужен для отправки клиенту писем подтвержения бронирования"
                    ></v-text-field>

                    <v-text-field
                            type="email"
                            v-model="client.address"
                            label="Адрес"
                            required
                            hint="Адрес клиента"
                    ></v-text-field>

                    <v-text-field
                            type="email"
                            v-model="client.info"
                            label="Информация о клиенте"
                            required
                            hint="Краткая информация о клиенте. Используется внутри-корпоративно."
                    ></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="error"
                            flat
                            @click="dialog = false"
                    >
                        Удалить клиента
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="success"

                            @click="deleteClient"
                    >
                        Закрыть форму
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card class="mt-5">
            <v-layout wrap>
                <v-flex xs12>
                    <v-toolbar flat>
                        <v-toolbar-title>Все бронирования клиента <b>({{orders.length}})</b></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>

            </v-layout>
            <v-card-text>
                <v-list three-line>
                    <v-list-tile
                            v-for="order in orders"
                            :key="order.id"
                            avatar
                            :to="{name:'reservations-id', params:{id: order.id}}"
                            target="_blank"
                    >

                        <v-list-tile-avatar>
                            <v-icon :class="getClass(order.room_status_id)" dark>{{
                                getIcon(order.room_status_id)}}
                            </v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ order.order_num }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ order.begin_date }} | {{ order.end_date }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>
                </v-list>
            </v-card-text>

        </v-card>

    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Редактирование профиля клиента'
            }
        },
        data() {
            return {
                dialog: false,
                client: {
                    name: "",
                    passport: "",
                    phone: "",
                    email: "",
                    address: "",
                    info: "",
                },
                orders: []
            };
        },
        mounted() {
            this.axios.get('clients/' + this.$route.params.id + '/edit').then((response) => {
                console.log(response);
                this.client = response.data.client;
                this.orders = response.data.orders;
            });
        },
        methods: {
            updateClient() {
                this.axios.patch('clients/' + this.client.id, this.client).then((response) => {
                    console.log(response);
                    this.$snotify.success('Данные клиенты обновлены', 'Успешно');
                }).catch((error) => {
                    console.log(error.response);
                    this.$snotify.error('Ошибка при обновлении клиента', 'Ошибка');
                });
            },
            deleteClient() {
                this.dialog = false;
                this.axios.delete('clients/' + this.$route.params.id).then((response) => {
                    console.log(response);
                    this.$snotify.success('Клиент удален', 'Успешно');
                    this.$router.push({name: 'clients', params: {page: 1}})
                }).catch((error) => {
                    console.log(error.response);
                    this.$snotify.error('Ошибка при удалении клиента', 'Ошибка');
                });
            },
            getClass(status) {
                switch (status) {
                    case 1:
                        return 'red ';
                        break;
                    case 2:
                        return 'yellow darken-2 ';
                        break;
                    case 3:
                        return 'green ';
                        break;
                    default:
                        return 'blue ';
                        break;
                }
            },
            getIcon(status) {
                switch (status) {
                    case 1:
                        return 'close';
                        break;
                    case 2:
                        return 'credit_card ';
                        break;
                    case 3:
                        return 'check';
                        break;
                    default:
                        return 'info ';
                        break;
                }
            },
        }
    }
</script>
