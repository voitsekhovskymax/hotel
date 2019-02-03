<template>
    <div class="elevation-3">
        <template v-if="progress">
            <v-card-text class="progress_loader">
                <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
            </v-card-text>
        </template>
        <template v-else>
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-toolbar-title>Письма</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-flex>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer></v-spacer>
                            <v-btn color="success" :to="{name:'messages-templates'}">
                                Шаблоны писем
                            </v-btn>
                            <v-btn icon>
                                <v-icon>help_outline</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-radio-group v-model="sendTo">
                        <v-radio label="Определенному клиенту" value="single"></v-radio>
                        <v-radio label="Всем клиентам отеля" value="all"></v-radio>
                    </v-radio-group>
                    <template v-if="sendTo == 'single'">
                        <v-autocomplete v-model="search" :items="results" :loading="isLoading"
                                        :search-input.sync="keywords"
                                        return-object
                                        item-text="name" label="Найти клиента.." solo @change="activateClientDialog">
                            <template slot="no-data">
                                <v-list-tile>
                                    <v-list-tile-title>
                                        Минимум <strong>три</strong> символа
                                    </v-list-tile-title>
                                </v-list-tile>
                            </template>
                            <template
                                    slot="item"
                                    slot-scope="{ item, tile }"
                            >

                                <v-list-tile-avatar
                                        color="success"
                                        class="headline font-weight-light white--text"
                                >
                                    {{ item.name.charAt(0) }}
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                    <v-list-tile-sub-title><span v-if="item.email">{{item.email}} &nbsp &nbsp</span>{{item.phone}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </template>
                        </v-autocomplete>

                        <v-text-field
                                v-model="request.email_client"
                                label="Email клиента"
                                required
                                hint="На этот email будет отослано письмо"
                        ></v-text-field>

                        <v-select
                                label="Название письма"
                                hint="Выберите письмо из списка, и его содержимое добавится"
                                v-model="mail_select"
                                :items="messages"
                                item-text="title"
                                return-object

                        ></v-select>

                        <v-textarea
                                v-model="mail_select.info"
                                auto-grow
                                label="Содержимое письма"
                                rows="1"
                        ></v-textarea>
                    </template>
                    <template v-else>
                        <v-alert :value="true" color="info" icon="info" outline class="mb-3">
                            Письмо будет отправлено всем клиентам, кроме клиентов из черного списка.
                        </v-alert>


                        <v-select
                                label="Выберите письмо"
                                hint="Выберите письмо из списка, и его содержимое добавится"
                                v-model="mail_select"
                                :items="messages"
                                item-text="title"
                                return-object

                        ></v-select>

                        <v-textarea
                                v-model="mail_select.info"
                                auto-grow
                                label="Содержимое письма"
                                rows="1"
                        ></v-textarea>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="sendTo == 'single'" color="success" @click="sendMail">Отправить клиенту
                        {{request.email_client}}
                    </v-btn>
                    <v-btn v-else color="success" @click="sendMail">Отправить всем клиентам</v-btn>

                </v-card-actions>
            </v-card>
        </template>

        <v-dialog v-model="dialogClient" scrollable width="400">
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-toolbar-title>Выбор клиента</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-flex>

                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer></v-spacer>
                            <v-btn icon @click="dialogClient = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text class="card-content" style="max-height: 80vh; ">
                    <v-layout wrap>
                        <v-flex>

                            <v-text-field
                                    v-model="search.name"
                                    label="Имя"
                                    required
                                    hint="Фамилия, имя, отчество клиента"
                            ></v-text-field>

                            <v-text-field
                                    v-model="search.passport"
                                    label="Паспорт"
                                    required
                                    hint="Паспортные данные клиента"
                            ></v-text-field>

                            <v-text-field
                                    v-model="search.phone"
                                    label="Телефон"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    type="email"
                                    v-model="search.email"
                                    label="Email"
                                    required
                                    hint="Email нужен для отправки клиенту писем подтвержения бронирования"
                            ></v-text-field>

                            <v-text-field
                                    type="email"
                                    v-model="search.address"
                                    label="Адрес"
                                    required
                                    hint="Адрес клиента"
                            ></v-text-field>

                            <v-text-field
                                    type="email"
                                    v-model="search.info"
                                    label="Информация о клиенте"
                                    hint="Краткая информация о клиенте. Используется внутри-корпоративно."
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            @click="setClient"
                    >
                        Принять
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

    export default {
        name: 'messages',
        head() {
            return {
                title: 'Письма'
            }
        },
        data() {
            return {
                progress: false,
                sendTo: 'single',
                search: {
                    name: null,
                    passport: null,
                    phone: null,
                    email: null,
                    address: null,
                    info: null,
                },
                results: [],
                keywords: null,
                isLoading: null,
                dialogClient: false,
                messages: null,
                mail_select: {
                    info: null
                },
                request: {
                    email_client: null,
                    email_content: null,
                }
            };
        },
        watch: {
            keywords(after, before) {
                if (this.keywords != null) {
                    if (this.keywords.length > 2) {
                        this.isLoading = true;
                        this.getSearch();
                    } else {
                        this.results = [];
                    }
                } else {
                    this.results = [];
                    this.keywords = "";
                }
            }
        },
        created() {
            this.progress = true;
            this.axios.get('messages').then((response) => {
                this.messages = response.data.messages;
                this.progress = false;
            })
        },
        methods: {
            getSearch() {
                this.axios.post('client-search', {
                    keywords: this.keywords
                }).then((response) => {
                    console.log(response);
                    this.results = response.data.clients;
                    this.isLoading = false;
                })
            },
            activateClientDialog() {
                this.dialogClient = true;
            },

            setClient() {
                this.request.email_client = this.search.email;
                this.dialogClient = false;

            },
            sendMail() {
                this.progress = true;
                this.request.email_content = this.mail_select.info;
                if (this.sendTo == 'single') {
                    this.axios.post('send-single-email', this.request).then((response) => {
                        console.log(response);
                        this.$snotify.success('Клиенту отправлено письмо', 'Успешно');
                        this.progress = false;
                    }).catch((error) => {
                        console.log(error.response);
                        this.$snotify.error(error.response, 'Ошибка');

                    })
                } else {
                    this.axios.post('send-multiple-email', this.request).then((response) => {
                        this.$snotify.success('Письма отправлены всем клиентам', 'Успешно');
                        this.progress = false;
                    }).catch((error) => {
                        console.log(error.response);
                        this.$snotify.error(error.response, 'Ошибка');
                    })
                }
            }
        }
    };
</script>
