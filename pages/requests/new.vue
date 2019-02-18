<template>
    <v-layout>
        <v-flex>
            <template v-if="progress">
                <v-card-text class="progress_loader">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
                </v-card-text>
            </template>
            <template v-else>
                <v-card color="grey lighten-4">
                    <v-toolbar prominent>
                        <v-toolbar-title>Создание заявки</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-autocomplete v-model="search" :items="results" :loading="isLoading"
                                        :search-input.sync="keywords"
                                        return-object
                                        clearable item-text="name" label="Найти клиента.." solo
                                        @change="activateClientDialog">
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


                        <v-card>
                            <v-container grid-list-lg>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md6 lg6>

                                        <v-text-field
                                                v-model="request.full_name"
                                                label="ФИО"
                                                hint="Вы можете подставить значения, воспользовавшись поиском выше"
                                                :error="errors.has('full_name')"
                                                :error-messages="errors.collect('full_name')"
                                                v-validate="'required|min:3'" name="full_name"
                                                data-vv-as="full_name">
                                            >
                                        </v-text-field>


                                        <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                                                  :return-value.sync="request.begin_date" persistent lazy full-width
                                                  width="290px">
                                            <v-text-field slot="activator" v-model="request.begin_date"
                                                          label="Дата заезда"
                                                          :error="errors.has('begin_date')"
                                                          :error-messages="errors.collect('begin_date')"
                                                          v-validate="'required'" name="begin_date"
                                                          data-vv-as="begin_date"></v-text-field>
                                            <v-date-picker v-model="request.begin_date" scrollable
                                                           :first-day-of-week="1"
                                                           locale="ru-ru">
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть
                                                </v-btn>
                                                <v-btn flat color="primary"
                                                       @click="$refs.ref_modal_begin_date.save(request.begin_date); request.end_date = request.begin_date">
                                                    Подтвердить
                                                </v-btn>
                                            </v-date-picker>
                                        </v-dialog>

                                        <v-dialog ref="ref_modal_end_date" v-model="modal_end_date"
                                                  :return-value.sync="request.end_date" persistent lazy full-width
                                                  width="290px">
                                            <v-text-field slot="activator" v-model="request.end_date"
                                                          label="Дата выезда"
                                                          readonly :error="errors.has('end_date')"
                                                          :error-messages="errors.collect('end_date')"
                                                          v-validate="'required'" name="end_date"
                                                          data-vv-as="end_date"></v-text-field>
                                            <v-date-picker v-model="request.end_date" scrollable :first-day-of-week="1"
                                                           :min="request.begin_date"
                                                           locale="ru-ru">
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal_end_date = false">Закрыть
                                                </v-btn>
                                                <v-btn flat color="primary"
                                                       @click="$refs.ref_modal_end_date.save(request.end_date)">
                                                    Подтвердить
                                                </v-btn>
                                            </v-date-picker>
                                        </v-dialog>

                                        <v-text-field
                                                v-model="request.email"
                                                label="Email"
                                                hint="Нужен для рассылки писем, и приглашений"

                                                :error="errors.has('email')"
                                                :error-messages="errors.collect('email')"
                                                v-validate="'required'" name="email"
                                                data-vv-as="email"
                                        ></v-text-field>


                                        <v-text-field
                                                v-model="request.phone"
                                                label="Телефон"

                                                :error="errors.has('phone')"
                                                :error-messages="errors.collect('phone')"
                                                v-validate="'required'" name="phone"
                                                data-vv-as="phone"
                                        ></v-text-field>


                                        <v-text-field
                                                v-model="request.city"
                                                label="Адрес"
                                                :error="errors.has('city')"
                                                :error-messages="errors.collect('city')"
                                                v-validate="'required'" name="city"
                                                data-vv-as="city"
                                        ></v-text-field>

                                    </v-flex>

                                    <v-flex xs12 sm12 md6 lg6>

                                        <v-select
                                                :items="rooms"
                                                item-text="name"
                                                item-value="name"
                                                v-model="request.room"
                                                label="Номер отеля"

                                                :error="errors.has('room')"
                                                :error-messages="errors.collect('room')"
                                                v-validate="'required'" name="room"
                                                data-vv-as="room"
                                        ></v-select>

                                        <v-text-field
                                                label="Количество взрослых"
                                                v-model="request.adult"
                                                type="number"
                                                :error="errors.has('adult')"
                                                :error-messages="errors.collect('adult')"
                                                v-validate="'required'" name="adult"
                                                data-vv-as="adult"
                                        ></v-text-field>

                                        <v-text-field
                                                label="Количество детей"
                                                v-model="request.kids"
                                                type="number"
                                        ></v-text-field>

                                        <v-text-field
                                                label="Паркоместа"
                                                hint="Количество паркомест"
                                                v-model="request.parking"
                                                type="number"

                                        ></v-text-field>

                                        <v-text-field
                                                label="Доп. кровати"
                                                hint="Количество дополнительных кроватей"
                                                v-model="request.beds"
                                                type="number"

                                        ></v-text-field>

                                    </v-flex>
                                    <v-btn color="success" @click="saveRequests">Сохранить</v-btn>
                                </v-layout>

                            </v-container>

                        </v-card>
                    </v-card-text>
                </v-card>
            </template>
        </v-flex>


        <v-dialog v-model="dialogClient" width="500">
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
                <v-card-text class="card-content">
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


    </v-layout>
</template>

<script>

    export default {
        name: 'reservations-new',
        head() {
            return {
                title: 'Создание заявки'
            }
        },
        data() {
            return {
                dialog_client_progress: false,
                dialogClient: false,
                progress: false,
                // data
                request: {
                    full_name: '',
                    begin_date: '',
                    end_date: '',
                    email: '',
                    phone: '',
                    city: '',
                    room: '',
                    adult: '',
                    kids: '',
                    parking: '',
                    beds: '',
                },
                //    helpers
                rooms: null, //Массив с названиями комнат для заявки
                selected_room: {
                    "id": null,
                    "name": null,
                    "room_type_id": null,
                    "quantity": null,
                    "type": null,
                    "created_at": null,
                    "updated_at": null,
                    "room_type": {
                        "id": null,
                        "name": null,
                        "info": null,
                        "created_at": null,
                        "updated_at": null
                    }
                },
                modal_begin_date: false,
                modal_end_date: false,
                isLoading: false,
                search: '',
                results: [],
                keywords: null,
                settings: null,
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
        async created() {
            this.progress = true;
            await this.axios.get('rooms').then((response) => {
                this.rooms = response.data.rooms;
            })
            await this.axios.get('settings').then((response) => {
                this.settings = response.data.data;
            })

            this.progress = false;


            let current_date = new Date()
            // подставляем дату
            console.log('current_date');
            console.log(current_date);
            let settings_begin = new Date(this.settings.begin);
            console.log('this.settings.begin');
            console.log(this.settings.begin);
            console.log('Установить дату');
            console.log(settings_begin);

            if (current_date < settings_begin){
                console.log('current_date < settings_begin');
                this.request.begin_date = settings_begin.toISOString().substr(0, 10);
                this.request.end_date = settings_begin.toISOString().substr(0, 10);
            }
            else{
                console.log('current_date > settings_begin');
            }
        },
        methods: {
            saveRequests() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.progress = true;
                        this.axios.post('reserves', this.request).then((response) => {
                            console.log(response);
                            this.$router.push({name: 'requests'})
                        }).catch((error) => {
                            this.progress = false;
                            console.log(error.data);
                        })
                    }
                    else {
                        this.$snotify.error('Заполните все поля правильно!',);
                        return;
                    }
                })
            },
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
                this.dialog_client_progress = true;
            },
            setClient() {
                this.request.full_name = this.search.name;
                this.request.city = this.search.address;
                this.request.email = this.search.email;
                this.request.phone = this.search.phone;



                    this.dialogClient = false;
            },
        }
    };
</script>
