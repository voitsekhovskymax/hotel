<template>
    <!-- todo доделать-->
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>Пользователи</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer/>
                        <v-btn color="success" @click="dialogNew = true;"
                        >Новый пользователь
                        </v-btn
                        >
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex>
                        <v-list three-line>
                            <v-list-tile v-for="user in users" :key="user.id">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{
                                        user.email
                                        }}
                                    </v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{
                                        getUserRole(user.role_id)
                                        }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-tooltip top>
                                        <v-btn
                                                slot="activator"
                                                icon
                                                ripple
                                                @click="activeModalEdit(user);"
                                        >
                                            <v-icon color="green lighten-1">edit</v-icon>
                                        </v-btn>
                                        <span>Редактировать</span>
                                    </v-tooltip>
                                </v-list-tile-action>

                                <v-list-tile-action>
                                    <v-tooltip top>
                                        <v-btn slot="activator" icon ripple>
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
        </v-card>

        <v-dialog v-model="dialogNew" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Новый пользователь</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="newUser.name" label="ФИО пользователя"/>
                    <v-text-field v-model="newUser.password" label="Пароль"/>
                    <v-text-field v-model="newUser.email" label="Email"/>

                    <v-select
                            v-model="newUser.role_id"
                            :items="roles"
                            label="Роль пользователя"
                            item-text="name"
                            item-value="id"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveNewUser">Сохранить</v-btn>
                    <v-spacer/>
                    <v-btn @click="dialogNew = false;">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Редактирование письма</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="editUser.title" label="Заголовок письма"/>

                    <v-textarea
                            v-model="editUser.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveEditUser">Обновить</v-btn>
                    <v-spacer/>
                    <v-btn @click="dialogEdit = false;">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
                <v-card-title>
          <span class="headline"
          >Вы действительно хотите удалить это письмо?</span
          >
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="deleteUser.title" label="Заголовок письма"/>
                    <v-textarea
                            v-model="deleteUser.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveDeleteUser">Удалить</v-btn>
                    <v-spacer/>
                    <v-btn @click="dialogDelete = false;">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "users",

        head() {
            return {
                title: 'Пользователи',
            }
        },
        data() {
            return {
                // data
                users: [],
                roles: [],
                //    helpers
                editUser: {
                    name: null,
                    email: null,
                    password: null,
                    role_id: null
                },
                deleteUser: {
                    name: null,
                    email: null,
                    password: null,
                    role_id: null
                },
                newUser: {
                    name: null,
                    email: null,
                    password: null,
                    role_id: null
                },
                dialogEdit: false,
                dialogDelete: false,
                dialogNew: false
            };
        },
        beforeMount: function () {
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                this.axios.get("users").then(response => {
                    this.users = response.data.users;
                    this.roles = response.data.roles;
                });
            },
            saveNewUser() {
                this.axios
                    .post("users", this.newUser)
                    .then(response => {
                        console.log("saveNewUser");
                        console.log(response);
                        console.log("saveNewUser END");
                        this.$notify({
                            group: "global",
                            type: "success",
                            title: "Успешно",
                            text: "Новый пользователь создан"
                        });
                        this.getUsers();
                        this.dialogNew = false;
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.$notify({
                            group: "global",
                            type: "error",
                            title: "Ошибка",
                            text: error.response
                        });
                    });
            },
            saveEditUser() {
            },
            saveDeleteUser() {
            },
            activeModalEdit(user) {
                this.edit_dialog = true;
                this.edit_user = user;
            },
            getUserRole(id) {
                for (let i = 0; i < this.roles.length; i++) {
                    if (this.roles[i].id == id) {
                        return this.roles[i].name;
                    }
                }
            }
        }
    };
</script>
