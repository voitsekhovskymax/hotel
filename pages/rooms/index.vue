<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>Все комнаты</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer/>
                        <v-btn color="success" @click="dialogNew = true"
                        >Добавить
                        </v-btn
                        >
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>
            <template v-if="progress">
                <div class="progress-container">
                    <v-progress-circular
                            :size="70"
                            :width="7"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </template>
            <template v-else>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex>
                            <v-list three-line>
                                <v-list-tile v-for="room in rooms" :key="room.id" @click="">
                                    <v-list-tile-content @click="activeModalEdit(room)">
                                        <v-list-tile-title>{{ room.name }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Тип номера: {{ room.room_type.name }}
                                        </v-list-tile-sub-title>
                                        <v-list-tile-sub-title>Количетсво мест: {{ room.quantity }}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn
                                                    slot="activator"
                                                    icon
                                                    ripple
                                                    @click="activeModalEdit(room)"
                                            >
                                                <v-icon color="green lighten-1">edit</v-icon>
                                            </v-btn>
                                            <span>Редактировать</span>
                                        </v-tooltip>
                                    </v-list-tile-action>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn slot="activator" icon ripple @click="activeModalDelete(room)">
                                                <v-icon color="grey lighten-1">delete</v-icon>
                                            </v-btn>
                                            <span>Удалить</span>
                                        </v-tooltip>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </template>
        </v-card>

        <v-dialog v-model="dialogNew" persistent max-width="600px">

            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Создание нового номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogNew = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="newRoom.name" label="Название номера"/>
                    <v-text-field v-model="newRoom.quantity" type="number" label="Количество мест"/>
                    <v-select :items="room_types" v-model="newRoom.room_type_id" item-text="name" item-value="id"
                              label="Тип номера"></v-select>
                    <v-select :items="locations" v-model="newRoom.location" item-text="text" item-value="value"
                              label="Локация"></v-select>
                    <v-select :items="blocks" v-model="newRoom.block" item-text="text" item-value="value"
                              label="Блок"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveNewRoom">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Редактирование типа номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogEdit = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="editRoom.name" label="Название номера"/>
                    <v-text-field v-model="editRoom.quantity" type="number" label="Количество мест"/>
                    <v-select :items="room_types" v-model="editRoom.room_type_id" item-text="name" item-value="id"
                              label="Тип номера"></v-select>
                    <v-select :items="locations" v-model="editRoom.location" item-text="text" item-value="value"
                              label="Локация"></v-select>
                    <v-select :items="blocks" v-model="editRoom.block" item-text="text" item-value="value"
                              label="Блок"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveEditRoom">Обновить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Удаление номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogDelete = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-alert :value="true" type="error" class="mb-3">
                        Не рекомендуется удалять уже использованный номер. На нем могут быть завязаны заявки а так же
                        отчеты. Удаляйте только новые номера, созданные по ошибке.
                    </v-alert>
                    <b>Вы действительно хотите удалить этот номер?</b>
                    <v-text-field v-model="deleteRoom.name" label="Название номера" readonly/>
                    <v-text-field v-model="deleteRoom.quantity" type="number" label="Количество мест" readonly/>
                    <v-select :items="room_types" v-model="deleteRoom.room_type_id" item-text="name" item-value="id"
                              label="Тип номера" readonly></v-select>
                    <v-select :items="locations" v-model="deleteRoom.location" item-text="text" item-value="value"
                              label="Локация"></v-select>
                    <v-select :items="blocks" v-model="deleteRoom.block" item-text="text" item-value="value"
                              label="Блок"></v-select>

                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveDeleteRoom">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "rooms",
        data() {
            return {
                // data
                rooms: [],
                room_types: [],
                //    helpers
                locations: [
                    {
                        text: 'Старая локация',
                        value: 1
                    },
                    {
                        text: 'Новая локация',
                        value: 2
                    },
                ],
                blocks: [
                    {
                        text: 'Корпус 1. Номера №1-9',
                        value: 1
                    },
                    {
                        text: 'Корпус 2. Номера №101-301',
                        value: 2
                    },
                    {
                        text: 'Корпус 3. Номера №401-511',
                        value: 3
                    },
                    {
                        text: 'Корпус 4. Номера №601-700',
                        value: 4
                    },
                ],
                progress: true,
                editRoom: {
                    name: null,
                    quantity: null,
                    room_type_id: null,
                },
                deleteRoom: {
                    name: null,
                    quantity: null,
                    room_type_id: null,
                },
                newRoom: {
                    name: null,
                    quantity: null,
                    room_type_id: null,
                },
                dialogEdit: false,
                dialogDelete: false,
                dialogNew: false
            };
        },
        beforeMount: function () {
        },
        async created() {
            await this.getTypes();
            await this.getRooms();
        },
        methods: {
            getTypes() {
                this.axios.get("room-types").then(response => {
                    this.room_types = response.data.room_types;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            getRooms() {
                this.progress = true;
                this.axios.get("rooms").then(response => {
                    this.rooms = response.data.rooms;
                    this.rooms.sort(function (a, b) {
                        return parseInt(a.name) - parseInt(b.name);
                    });
                    console.log(this.rooms);
                    this.progress = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveNewRoom() {
                this.axios.post("rooms", this.newRoom).then(response => {
                    this.$snotify.success('Тип номера создан', 'Успешно');
                    this.getRooms();
                    this.dialogNew = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveEditRoom() {
                this.axios.patch("rooms/" + this.editRoom.id, this.editRoom).then(response => {
                    this.$snotify.success('Тип номера обновлен', 'Успешно');
                    this.getRooms();
                    this.dialogEdit = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveDeleteRoom() {
                this.axios.delete("rooms/" + this.deleteRoom.id).then(response => {
                    this.$snotify.success('Тип номера удален', 'Успешно');
                    this.getRooms();
                    this.dialogDelete = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            activeModalEdit(Room) {
                this.dialogEdit = true;
                this.editRoom = Room;
            },
            activeModalDelete(Room) {
                this.dialogDelete = true;
                this.deleteRoom = Room;
            },

        }
    };
</script>
