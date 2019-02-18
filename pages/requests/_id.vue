<template>
    <div>
        <div class="elevation-3">
            <v-card>
                <v-layout wrap>
                    <v-flex sm6 md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-btn icon @click="routerBack">
                                <v-icon>arrow_back</v-icon>
                            </v-btn>
                            <v-toolbar-title
                            >Номер заявки №<b>{{
                                getOrderNum(
                                response.data.room,
                                response.data.begin_date,
                                response.data.end_date
                                )
                                }}</b></v-toolbar-title
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
                <template v-if="progress">
                    <v-card-text class="progress_loader">
                        <v-progress-circular
                                :size="70"
                                :width="7"
                                color="purple"
                                indeterminate
                        />
                    </v-card-text>
                </template>

                <template v-else>
                    <v-card-text class="card-content">
                        <v-alert v-if="response.errors" :value="true" type="error">
                            {{ response.errors }}
                        </v-alert>

                        <v-alert
                                v-if="response.errors"
                                :value="true"
                                color="info"
                                icon="info"
                                outline
                        >
                            Измените данные, и обновите заявку.
                        </v-alert>

                        <v-layout wrap>
                            <v-flex lg6 sm6 md6 xs12>
                                <v-text-field
                                        v-model="response.data.full_name"
                                        label="ФИО"
                                        @change="changeInputs"
                                />

                                <v-dialog
                                        ref="ref_modal_begin_date"
                                        v-model="modal_begin_date"
                                        :return-value.sync="response.data.begin_date"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="response.data.begin_date"
                                            label="Дата заезда"
                                            required
                                            @change="changeInputs"
                                    />
                                    <v-date-picker
                                            v-model="response.data.begin_date"
                                            :first-day-of-week="1"
                                            scrollable
                                            locale="ru-ru"
                                    >
                                        <v-spacer/>
                                        <v-btn
                                                flat
                                                color="primary"
                                                @click="modal_begin_date = false;"
                                        >Закрыть
                                        </v-btn>
                                        <v-btn
                                                flat
                                                color="primary"
                                                @click="
                        $refs.ref_modal_begin_date.save(
                          response.data.begin_date
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
                                        :return-value.sync="response.data.end_date"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="response.data.end_date"
                                            label="Дата выезда"
                                            readonly
                                            required
                                            @change="changeInputs"
                                    />
                                    <v-date-picker
                                            v-model="response.data.end_date"
                                            :first-day-of-week="1"
                                            :min="response.data.begin_date"
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
                                                flat
                                                color="primary"
                                                @click="
                        $refs.ref_modal_end_date.save(response.data.end_date);
                      "
                                        >Подтвердить
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>

                                <v-text-field
                                        v-model="response.data.email"
                                        label="Почта"
                                        @change="changeInputs"
                                />
                                <v-text-field
                                        v-model="response.data.phone"
                                        label="Телефон"
                                        @change="changeInputs"
                                />
                                <v-text-field
                                        v-model="response.prepaid"
                                        label="Предоплата"
                                        @change="changeInputs"
                                        readonly
                                />
                                <v-text-field
                                        v-model="discount"
                                        label="Скидка"
                                        @change="changeInputs"
                                />
                            </v-flex>

                            <v-flex lg6 sm6 md6 xs12>
                                <v-select
                                        v-model="select_room"
                                        :items="rooms"
                                        label="Номер отеля"
                                        item-text="name"
                                        return-object
                                        @change="changeInputs"
                                />

                                <v-text-field
                                        v-model="response.data.adult"
                                        label="Взрослые"
                                        @change="changeInputs"
                                />
                                <v-text-field
                                        v-model="response.data.kids"
                                        label="Дети"
                                        @change="changeInputs"
                                />
                                <v-text-field
                                        v-model="response.data.parking"
                                        label="Паркоместа"
                                        @change="changeInputs"
                                />
                                <v-text-field
                                        v-model="response.data.beds"
                                        label="Доп. кровати"
                                        @change="changeInputs"
                                />
                                <!--
                                  <v-text-field label="Статус номера" v-model="response.data.beds"></v-text-field>
                                -->
                                <v-textarea
                                        v-model="response.data.message"
                                        label="Сообщение от клиента"
                                        auto-grow
                                        rows="1"
                                        @change="changeInputs"
                                />
                            </v-flex>
                            <v-flex v-if="!input_changed" lg12 sm12 md12 xs12>
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
                            </v-flex>

                            <v-flex v-if="!input_changed" lg12 sm12 md12 xs12>
                                <v-textarea
                                        v-model="mail_select.info"
                                        auto-grow
                                        label="Содержимое письма"
                                        rows="1"
                                />
                            </v-flex>
                        </v-layout>
                    </v-card-text>

                    <v-layout wrap>
                        <v-flex>
                            <v-toolbar class="no-shadow">
                                <template v-if="!response.errors">
                                    <v-tooltip v-if="!input_changed" top>
                                        <v-btn slot="activator" color="success"
                                               @click="saveRequest"
                                        >Принять заявку
                                        </v-btn
                                        >
                                        <span>Заявка будет принята, и перейдет в брони</span>
                                    </v-tooltip>
                                </template>

                                <template v-if="response.errors">
                                    <v-tooltip top>
                                        <v-btn
                                                slot="activator"
                                                color="warning"
                                                @click="updateRequest"
                                        >Обновить
                                        </v-btn
                                        >
                                        <span>Заявка будет обновлена, и пересчитана</span>
                                    </v-tooltip>
                                </template>

                                <template v-else-if="input_changed">
                                    <v-tooltip top>
                                        <v-btn
                                                slot="activator"
                                                color="warning"
                                                @click="updateRequest"
                                        >Обновить
                                        </v-btn
                                        >
                                        <span>Заявка будет обновлена, и пересчитана</span>
                                    </v-tooltip>
                                </template>

                                <v-spacer/>
                                <v-tooltip top>
                                    <v-btn slot="activator" color="primary"
                                           @click="queueRequest"
                                    >В очередь
                                    </v-btn
                                    >
                                    <span>Заявка будет отправлена в очередь</span>
                                </v-tooltip>
                            </v-toolbar>
                        </v-flex>
                    </v-layout>
                </template>
            </v-card>

            <v-dialog
                    v-model="dialog"
                    persistent
                    scrollable
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
            >
                <v-card>


                    <v-toolbar class="zindex1" flat color="error" dark>
                        <v-toolbar-title>
                            <v-icon>error_outline</v-icon>
                            <span class="hidden-xs-only">В базе данных есть совпадение клиента</span>
                            <span class="d-xl-block">Совпадение </span>
                        </v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="dialog = false;">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>


                    <v-card-text>
                        <div class="comparison-table">
                            <div class="comparison-column">
                                <div class="comparison-title" style="background: #4caf50">
                                    Клиент в заявке
                                </div>
                                <div class="comparison-content">
                                    <v-text-field disabled v-model="compare_client.id" label="ID"/>
                                    <v-text-field disabled v-model="response.data.full_name" label="ФИО"/>
                                    <v-text-field disabled v-model="response.data.email" label="Почта"/>
                                    <v-text-field disabled v-model="response.data.phone" label="Телефон"/>
                                    <v-text-field disabled v-model="response.data.passport" label="Паспорт"/>
                                    <v-text-field disabled v-model="response.data.city" label="Адрес"/>
                                    <v-textarea disabled v-model="compare_client.info" label="Информация" auto-grow
                                                rows="1"/>
                                    <v-text-field disabled v-model="compare_client.created_at" label="Дата создания"/>
                                </div>
                                <div class="comparison-actions">
                                    <v-tooltip top>
                                        <v-btn slot="activator" :color="new_client.btn_color" small
                                               @click="dialog = false">
                                            {{ new_client.btn_text }}
                                        </v-btn>
                                        <span>{{ new_client.tooltip }}</span>
                                    </v-tooltip>
                                </div>
                            </div>

                            <div v-for="compare in response.find_data" class="comparison-column">
                                <div class="comparison-title">Клиент в базе</div>
                                <div class="comparison-content">
                                    <v-text-field disabled v-model="compare.id" label="ID"/>
                                    <v-text-field disabled v-model="compare.name" label="ФИО"/>
                                    <v-text-field disabled v-model="compare.email" label="Почта"/>
                                    <v-text-field disabled v-model="compare.phone" label="Телефон"/>
                                    <v-text-field disabled v-model="compare.passport" label="Паспорт"/>
                                    <v-text-field disabled v-model="compare.address" label="Адрес"/>
                                    <v-textarea disabled v-model="compare.info" label="Информация" auto-grow rows="1"/>
                                    <v-text-field disabled v-model="compare.created_at" label="Дата создания"
                                                  hint="дата создания клиента"/>
                                </div>
                                <div class="comparison-actions">
                                    <v-layout wrap>
                                        <v-tooltip top>
                                            <v-btn slot="activator" small color="primary"
                                                   @click="updateClient(compare)">Выбрать
                                            </v-btn>
                                            <span>Подставить в заявку этого клиента (новый клиент не будет создан)</span>
                                        </v-tooltip>
                                        <v-spacer></v-spacer>
                                        <v-tooltip top>
                                            <v-btn slot="activator"
                                                   :to="{ name: 'clients-edit-id', params: { id: compare.id } }"
                                                   small target="_blank">Профиль
                                            </v-btn>
                                            <span>Обновить профиль этого клиента</span>
                                        </v-tooltip>


                                    </v-layout>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'requests-id',
        head() {
            return {
                title: 'Заявка №' + this.getOrderNum(this.response.data.room, this.response.data.begin_date, this.response.data.end_date)
            }
        },
        data() {
            return {
                input_changed: false,
                dialog: false,
                progress: true,
                mail_select: {
                    info: null
                },
                messages: null,
                modal_begin_date: false,
                modal_end_date: false,
                select_room: {
                    id: null,
                    name: null,
                    room_type_id: null,
                    quantity: null,
                    type: null,
                    created_at: null,
                    updated_at: null,
                    room_type: {
                        id: null,
                        name: null,
                        info: null,
                        created_at: null,
                        updated_at: null
                    }
                },
                rooms: null,
                discount: "",
                response: {
                    data: {
                        id: null,
                        full_name: null,
                        email: null,
                        phone: null,
                        city: null,
                        message: null,
                        begin_date: "",
                        end_date: "",
                        room: "",
                        adult: null,
                        kids: null,
                        parking: null,
                        beds: null,
                        is_get: null,
                        is_queue: null,
                        is_answer: null
                    },
                    total_sum: null,
                    prepaid: null,
                    find_data: [
                        {
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
                        }
                    ],
                    errors: null
                },
                compare_client: {
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
                new_client: {
                    btn_color: "success",
                    btn_text: "Создать клиента",
                    state: true, // true = создание нового клиента, false = обновление данных с базы
                    tooltip: "Будет создан новый клиент с такими параметрами"
                }
            };
        },
        watch: {
            mail_select(after, before) {

                let order_num_locale = "Ваш номер брони - ";
                let begin_date_locale = "Дата заезда - ";
                let end_date_locale = "Дата выезда - ";
                let adult_locale = "Взрослых - ";
                let kids_locale = "Детей  - ";
                let parking_locale = "Парковочных мест - ";
                let beds_locale = "Дополнительных кроватей - ";

                if (this.mail_select.lang == 'ua') {
                    order_num_locale = "Ваш номер бронювання- ";
                    begin_date_locale = "Дата заїзду - ";
                    end_date_locale = "Дата виїзду - ";
                    adult_locale = "Дорослих - ";
                    kids_locale = "Дітей - ";
                    parking_locale = "Паркувальних місць - ";
                    beds_locale = "Додаткових ліжок - ";
                }
                const order_num = order_num_locale + this.getOrderNum(this.response.data.room, this.response.data.begin_date, this.response.data.end_date) + "; ";
                const begin_date = begin_date_locale + this.formatDate(this.response.data.begin_date) + "; ";
                const end_date = end_date_locale + this.formatDate(this.response.data.end_date) + "; ";
                const adult = adult_locale + this.response.data.adult + "; ";
                const kids = kids_locale + (this.response.data.kids !== null ? this.response.data.kids : 0) + "; ";
                const parking = parking_locale + (this.response.data.parking !== null ? this.response.data.parking : 0) + "; ";
                const beds = beds_locale + (this.response.data.beds !== null ? this.response.data.beds : 0) + "; ";
                this.mail_select.info =
                    after.info +
                    " | " +
                    order_num +
                    begin_date +
                    end_date +
                    adult +
                    kids +
                    parking +
                    beds;
            }
        },
        created() {
            this.axios
                .get("reserves/" + this.$route.params.id + "/edit")
                .then(response => {
                    console.log(response);
                    this.response = response.data;
                    if (this.response.find_data && this.response.find_data.length > 0) {
                        this.dialog = true;
                    }
                    this.getRooms();
                })
                .catch(error => {
                    console.log(error.response);
                    this.response = error.response.data;
                    this.getRooms();
                });

            this.axios.get("messages").then(response => {
                this.messages = response.data.messages;
                for (let i = 0; i < this.messages.length; i++) {
                    this.messages[i].title = this.messages[i].title + ' | ' + this.messages[i].lang;
                }
            });
        },

        methods: {
            changeInputs() {
                this.input_changed = true;
            },
            deleteMailSelect() {
                this.mail_select = {
                    info: null
                };
            },
            updateClient(client) {
                this.response.data.full_name = client.name;
                this.response.data.email = client.email;
                this.response.data.phone = client.phone;
                this.response.data.city = client.address;

                // Если этот обьект будет не пустым - вставим client_id,  в создание брони
                this.compare_client = client;
                this.new_client.btn_text = "Обновить данные";
                this.new_client.btn_color = "primary";
                this.new_client.state = false;
                this.new_client.tooltip =
                    "Подставлен клиент с базы (новый клиент не будет создан)";
            },
            queueRequest() {
                console.log(this.response.data.id);

                this.axios.post('queue', this.response.data).then((response) => {
                    console.log(response);
                    console.log('Заявка была перемещена в очередь');
                    this.$snotify.success('Заявка была перемещена в очередь', 'Внимание');
                    this.$router.push({name: 'queue'})
                }).catch((error) => {
                    console.log(error.data);
                    this.$snotify.success(error.data, 'Ошибка');
                })
            },
            updateRequest() {
                this.progress = true;
                this.response.data.room = this.select_room.name;
                console.log(this.response.data);

                this.axios
                    .patch("reserves/" + this.response.data.id, this.response.data)
                    .then(response => {
                        console.log(response.data);
                        const id = response.data.id;
                        this.axios
                            .get("reserves/" + id + "/edit")
                            .then(response => {
                                console.log(response);
                                this.response = response.data;
                                this.progress = false;
                                this.input_changed = false;
                                if (this.response.find_data) {
                                    this.dialog = true;
                                }
                            })
                            .catch(error => {
                                console.log(error.response);
                                this.response = error.response.data;
                                this.progress = false;
                                this.input_changed = false;
                                if (this.response.find_data) {
                                    this.dialog = true;
                                }
                            });
                    });
            },
            saveRequest() {
                console.log("Принятие заявки..");

                this.progress = true;
                const new_order = this.response.data;

                new_order.order_num = this.getOrderNum();
                new_order.discount = this.discount;
                new_order.prepaid = this.response.prepaid;

                new_order.begin_date = this.formatDate(this.response.data.begin_date);
                new_order.end_date = this.formatDate(this.response.data.end_date);

                // Отправка письма клиенту
                if (this.mail_select.info != null) {
                    console.log("Письмо вложено");
                    new_order.client_mail = this.mail_select.info;
                    new_order.mail_select = this.mail_select;
                    new_order.email_lang = this.mail_select.lang;

                }

                if (this.compare_client.id !== null) {
                    console.log("Клиента создавать не нужно");
                    new_order.client_id = this.compare_client.id;
                    this.postRequest(new_order);
                } else {
                    //  Создать клиента и уже потом создать бронь с этим клиентом
                    console.log("Нужно создать клиента");

                    const client = {};
                    client.name = this.response.data.full_name;
                    client.passport = "";
                    client.phone = this.response.data.phone;
                    client.email = this.response.data.email;
                    client.address = this.response.data.city;
                    client.info = "";

                    this.axios
                        .post("clients", client)
                        .then(response => {
                            console.log("Клиент успешно создан");

                            new_order.client_id = response.data.client.id;
                            this.postRequest(new_order);
                        })
                        .catch(error => {
                            console.log("Ошибка при создании клиента");
                            console.log(error);
                        });
                }
            },
            postRequest(new_order) {
                console.log("Создание брони");
                console.log(new_order);
                this.axios
                    .post("orders", new_order)
                    .then(response => {
                        console.log("Бронь успешно создана");
                        let requests_id = response.data.id;
                        this.axios.get('neworders').then((response) => {
                            this.response = response.data;
                            this.$store.dispatch('storage/set', {
                                type: 'count_requests',
                                value: response.data.data.length
                            })
                            this.$router.push({
                                name: "reservations-id",
                                params: {id: requests_id}
                            });
                        });


                    })
                    .catch(error => {
                        console.log("Ошибка при создании брони");
                        console.log(error.response);
                        console.log(error.response.data);
                    });
            },
            getRooms() {
                this.axios.get("rooms").then(response => {
                    this.rooms = response.data.rooms;
                    for (let i = 0; i < this.rooms.length; i++) {
                        if (parseInt(this.rooms[i].name) == this.response.data.room) {
                            this.select_room = this.rooms[i];
                        }
                    }
                    this.progress = false;
                });
            },

            getOrderNum() {
                let format_date = "";
                format_date =
                    this.response.data.room +
                    this.formatDateOrder(this.response.data.begin_date) +
                    this.formatDateOrder(this.response.data.end_date);
                return format_date;
            },
            formatDateOrder(date) {
                let date_formatted = "";
                const arr_date = date.split("-");
                date_formatted = arr_date[2] + arr_date[1] + arr_date[0];
                return date_formatted;
            },
            formatDate(date) {
                let date_formatted = "";
                const arr_date = date.split("-");
                date_formatted = arr_date[2] + "-" + arr_date[1] + "-" + arr_date[0];
                return date_formatted;
            },
            routerBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped>
    .comparison-table {
        display: flex;
        overflow: auto;
    }

    .comparison-column {
        border: 1px solid #ccc;
        padding: 15px;
        margin: 5px;
        min-width: 350px;
    }

    .comparison-title {
        font-size: 18px;
        background: #ff5252;
        margin: -15px -15px 0px -15px;
        padding: 5px;
        text-align: center;
        color: white;
    }

    .card-content .flex {
        padding: 10px !important;
    }

    .small-less .comparison-table {
        display: block;
        padding-top: 50px;
    }

    .small-less .comparison-column {
        min-width: inherit !important;

    }
</style>
