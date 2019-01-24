<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>Статусы номеров</v-toolbar-title>
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
                                <v-list-tile v-for="room_status in room_statuses" :key="room_status.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ room_status.name }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ room_status.info }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn
                                                    slot="activator"
                                                    icon
                                                    ripple
                                                    @click="activeModalEdit(room_status)"
                                            >
                                                <v-icon color="green lighten-1">edit</v-icon>
                                            </v-btn>
                                            <span>Редактировать</span>
                                        </v-tooltip>
                                    </v-list-tile-action>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn slot="activator" icon ripple @click="activeModalDelete(room_status)">
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
                            <v-toolbar-title>Создание нового статуса  номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogNew = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="newStatus.name" label="Название статуса номера"/>
                    <v-text-field v-model="newStatus.info" label="Информация статуса номера"/>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveNewStatus">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Редактирование статуса номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogEdit = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="editStatus.name" label="Название статуса номера"/>
                    <v-textarea v-model="editStatus.info" auto-grow label="Информация статуса номера" rows="1"/>
                </v-card-text>
                <v-card-actions >
                    <v-btn color="success" @click="saveEditStatus">Обновить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Удаление статуса номера</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogDelete = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <b>Вы действительно хотите удалить этот статус номера?</b>
                    <v-text-field v-model="deleteStatus.name" label="Название статуса номера"/>
                    <v-textarea v-model="deleteStatus.info" auto-grow label="Информация статуса номера" rows="1"/>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveDeleteStatus">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "room_statuses",
        data() {
            return {
                // data
                room_statuses: [],
                //    helpers
                progress:true,
                editStatus: {
                    name: null,
                    info: null,
                },
                deleteStatus: {
                    name: null,
                    info: null,
                },
                newStatus: {
                    name: null,
                    info: null,
                },
                dialogEdit: false,
                dialogDelete: false,
                dialogNew: false
            };
        },
        beforeMount: function () {
        },
        mounted() {
            this.getStatuses();
        },
        methods: {
            getStatuses() {
                this.progress = true;
                this.axios.get("room-statuses").then(response => {
                    this.room_statuses = response.data.room_statuses;
                    this.progress = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveNewStatus() {
                this.axios.post("room-statuses", this.newStatus).then(response => {
                    this.$snotify.success('Тип номера создан', 'Успешно');
                    this.getStatuses();
                    this.dialogNew = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveEditStatus() {
                this.axios.patch("room-statuses/" + this.editStatus.id, this.editStatus).then(response => {
                    this.$snotify.success('Тип номера обновлен', 'Успешно');
                    this.getStatuses();
                    this.dialogEdit = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveDeleteStatus() {
                this.axios.delete("room-statuses/"+ this.deleteStatus.id).then(response => {
                    this.$snotify.success('Тип номера удален', 'Успешно');
                    this.getStatuses();
                    this.dialogDelete = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            activeModalEdit(Type) {
                this.dialogEdit = true;
                this.editStatus = Type;
            },
            activeModalDelete(Type) {
                this.dialogDelete = true;
                this.deleteStatus = Type;
            },

        }
    };
</script>
