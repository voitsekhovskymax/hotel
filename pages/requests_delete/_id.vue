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
                            >Восстановление заявки №<b>{{ getOrderNum( response.room, response.begin_date,
                                response.end_date ) }}</b></v-toolbar-title>
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
                    <v-layout wrap>
                        <v-flex lg6 sm6 md6 xs12>
                            <v-text-field
                                    v-model="response.full_name"
                                    label="ФИО"
                            />

                            <v-text-field
                                    slot="activator"
                                    v-model="response.begin_date"
                                    label="Дата заезда"
                                    required

                            />

                            <v-text-field
                                    slot="activator"
                                    v-model="response.end_date"
                                    label="Дата выезда"
                                    readonly
                                    required

                            />

                            <v-text-field
                                    v-model="response.email"
                                    label="Почта"
                            />
                            <v-text-field
                                    v-model="response.phone"
                                    label="Телефон"
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
                                    v-model="response.adult"
                                    label="Взрослые"
                            />
                            <v-text-field
                                    v-model="response.kids"
                                    label="Дети"
                            />
                            <v-text-field
                                    v-model="response.parking"
                                    label="Паркоместа"
                            />
                            <v-text-field
                                    v-model="response.beds"
                                    label="Доп. кровати"
                            />
                            <v-textarea
                                    v-model="response.message"
                                    label="Сообщение от клиента"
                                    auto-grow
                                    rows="1"
                            />
                        </v-flex>

                    </v-layout>
                </v-card-text>

                <v-card-actions>


                </v-card-actions>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar class="no-shadow">
                            <template v-if="!response.errors">
                                <v-btn color="success"
                                       @click="saveRequest"
                                >Восстановить заявку
                                </v-btn>
                            </template>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
            </v-card>


        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                response: {
                    "id": null,
                    "full_name": null,
                    "email": null,
                    "phone": null,
                    "city": null,
                    "message": null,
                    "begin_date": null,
                    "end_date": null,
                    "room": null,
                    "adult": null,
                    "kids": null,
                    "parking": null,
                    "beds": null,
                    "is_get": null,
                    "is_queue": null,
                    "is_answer": null,
                    "deleted_at": null
                },
                rooms: null,

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
            };
        },

        created() {
            this.response = this.$route.params.request;
            this.getRooms();
        },

        methods: {
            saveRequest() {

                this.axios.post("deleted-orders-backup/" + this.$route.params.id).then(response => {
                    console.log("response");
                    console.log(response);
                    this.$router.push({name: "requests-id", params: {id: this.$route.params.id}});

                }).catch(error => {
                    console.log("deleted-orders-backup");
                    console.log(error);
                });

            },
            getRooms() {
                this.axios.get("rooms").then(response => {
                    this.rooms = response.data.rooms;
                    for (let i = 0; i < this.rooms.length; i++) {
                        if (parseInt(this.rooms[i].name) == this.response.room) {
                            this.select_room = this.rooms[i];
                        }
                    }
                });
            },
            getOrderNum() {
                let format_date = "";
                format_date =
                    this.response.room +
                    this.formatDateOrder(this.response.begin_date) +
                    this.formatDateOrder(this.response.end_date);
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

</style>
