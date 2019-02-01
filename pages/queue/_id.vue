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
                            >Очередь. Номер заявки №<b>{{
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

                                />
                                <v-text-field
                                        v-model="response.data.phone"
                                        label="Телефон"

                                />
                                <v-text-field
                                        v-model="response.prepaid"
                                        label="Предоплата"

                                        readonly
                                />
                                <v-text-field
                                        v-model="discount"
                                        label="Скидка"

                                />
                            </v-flex>

                            <v-flex lg6 sm6 md6 xs12>
                                <v-select
                                        v-model="select_room"
                                        :items="rooms"
                                        label="Номер отеля"
                                        item-text="name"
                                        return-object

                                />

                                <v-text-field
                                        v-model="response.data.adult"
                                        label="Взрослые"

                                />
                                <v-text-field
                                        v-model="response.data.kids"
                                        label="Дети"

                                />
                                <v-text-field
                                        v-model="response.data.parking"
                                        label="Паркоместа"

                                />
                                <v-text-field
                                        v-model="response.data.beds"
                                        label="Доп. кровати"

                                />
                                <!--
                                  <v-text-field label="Статус номера" v-model="response.data.beds"></v-text-field>
                                -->
                                <v-textarea
                                        v-model="response.data.message"
                                        label="Сообщение от клиента"
                                        auto-grow
                                        rows="1"

                                />
                            </v-flex>

                        </v-layout>
                    </v-card-text>

                    <v-layout wrap>
                        <v-flex>
                            <v-toolbar class="no-shadow">

                                <v-tooltip top>
                                    <v-btn slot="activator" color="success"
                                           @click="saveRequest">Восстановить заявку
                                    </v-btn>
                                    <span>Будет пересчитаны даты, и выведена заявка</span>
                                </v-tooltip>

                                <v-spacer/>
                                <v-tooltip top>
                                    <v-btn slot="activator" color="error" @click="deleteRequest">Удалить</v-btn>
                                </v-tooltip>
                            </v-toolbar>
                        </v-flex>
                    </v-layout>
                </template>
            </v-card>


        </div>
    </div>
</template>

<script>
    export default {
        name: 'queue-id',
        head() {
            return {
                title: 'Очередь. Заявка №' + this.getOrderNum(this.response.data.room, this.response.data.begin_date, this.response.data.end_date)
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
                    btn_text: "Создать новый профиль клиента",
                    state: true, // true = создание нового клиента, false = обновление данных с базы
                    tooltip: "Будет создан новый клиент с такими параметрами"
                }
            };
        },
        watch: {
            mail_select(after, before) {
                const order_num =
                    "Ваш номер брони - " +
                    this.getOrderNum(
                        this.response.data.room,
                        this.response.data.begin_date,
                        this.response.data.end_date
                    ) +
                    "; ";
                const begin_date =
                    "Дата заезда - " +
                    this.formatDate(this.response.data.begin_date) +
                    "; ";
                const end_date =
                    "Дата выезда - " + this.formatDate(this.response.data.end_date) + "; ";
                const adult = "Взрослых - " + this.response.data.adult + "; ";
                const kids = "Детей  - " + this.response.data.kids + "; ";
                const parking = "Парковочных мест - " + this.response.data.parking + "; ";
                const beds =
                    "Дополнительных кроватей - " + this.response.data.adult + "; ";
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
                    this.getRooms();
                })
                .catch(error => {
                    console.log(error.response);
                    this.response = error.response.data;
                    this.getRooms();
                });
        },

        methods: {

            deleteRequest() {
                this.axios.delete('queue/' + this.response.data.id).then((response) => {
                    this.$snotify.success('Заявка была удалена', 'Внимание');
                    this.$router.push({name: 'queue'})
                }).catch((error) => {
                    console.log(error.data);
                    this.$snotify.success(error.data, 'Ошибка');
                })
            },
            saveRequest() {
                this.progress = true;

                this.response.data.is_queue = false;
                console.log(this.response.data);
                this.axios
                    .patch("reserves/" + this.response.data.id, this.response.data)
                    .then(response => {
                        this.$snotify.success('Заявка была восстановлена', 'Успешно');

                        console.log(response.data);
                        this.$router.push({name: 'requests-id', params: {id: this.response.data.id}})

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

    .comparison-content {
    }

    .card-content .flex {
        padding: 10px !important;
    }
</style>
