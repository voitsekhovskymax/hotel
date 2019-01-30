<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>Типы оплаты</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer/>
                        <v-btn color="success" @click="dialogNew = true;"
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
                                <v-list-tile v-for="payment_type in payment_types" :key="payment_type.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ payment_type.name }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ payment_type.info }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn
                                                    slot="activator"
                                                    icon
                                                    ripple
                                                    @click="activeModalEdit(payment_type)"
                                            >
                                                <v-icon color="green lighten-1">edit</v-icon>
                                            </v-btn>
                                            <span>Редактировать</span>
                                        </v-tooltip>
                                    </v-list-tile-action>

                                    <v-list-tile-action>
                                        <v-tooltip top>
                                            <v-btn slot="activator" icon ripple
                                                   @click="activeModalDelete(payment_type)">
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
                            <v-toolbar-title>Создание нового метода оплаты</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogNew = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="newType.name" label="Название метода оплаты"/>
                    <v-text-field v-model="newType.info" label="Информация метода оплаты"/>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveNewType">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Редактирование метод оплаты</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogEdit = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <v-text-field v-model="editType.name" label="Название метода оплаты"/>
                    <v-textarea v-model="editType.info" auto-grow label="Информация метода оплаты" rows="1"/>
                </v-card-text>
                <v-card-actions >
                    <v-btn color="success" @click="saveEditType">Обновить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
                <v-layout wrap>
                    <v-flex>
                        <v-toolbar flat dense>
                            <v-toolbar-title>Удаление метод оплаты</v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="dialogDelete = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <b>Вы действительно хотите удалить этот метод оплаты?</b>
                    <v-text-field v-model="deleteType.name" label="Название метода оплаты"/>
                    <v-textarea v-model="deleteType.info" auto-grow label="Информация метода оплаты" rows="1"/>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveDeleteType">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "payment_types",
        head() {
            return {
                title: 'Типы отплат'
            }
        },
        data() {
            return {
                // data
                payment_types: [],
                //    helpers
                progress: true,
                editType: {
                    name: null,
                    info: null,
                },
                deleteType: {
                    name: null,
                    info: null,
                },
                newType: {
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
            this.getTypes();
        },
        methods: {
            getTypes() {
                this.progress = true;
                this.axios.get("payment-types").then(response => {
                    this.payment_types = response.data.payment_types;
                    this.progress = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
                ;
            },
            saveNewType() {
                this.axios.post("payment-types", this.newType).then(response => {

                    this.$snotify.success('Метод оплаты создан', 'Успешно');
                    this.getTypes();
                    this.dialogNew = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveEditType() {
                this.axios.patch("payment-types/" + this.editType.id, this.editType).then(response => {
                    this.$snotify.success('Метод оплаты обновлен', 'Успешно');
                    this.getTypes();
                    this.dialogEdit = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            saveDeleteType() {
                this.axios.delete("payment-types/" + this.deleteType.id).then(response => {
                    this.$snotify.success('Метод оплаты удален', 'Успешно');
                    this.getTypes();
                    this.dialogDelete = false;
                }).catch(error => {
                    console.log(error.response);
                    this.$snotify.error(error.response, 'Ошибка');
                });
            },
            activeModalEdit(Type) {
                this.dialogEdit = true;
                this.editType = Type;
            },
            activeModalDelete(Type) {
                this.dialogDelete = true;
                this.deleteType = Type;
            },

        }
    };
</script>
