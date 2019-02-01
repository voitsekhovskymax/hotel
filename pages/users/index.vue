<template>
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
                            <v-list-tile v-for="user in users" :key="user.id"
                                         :to="{name:'users-id', params:{id: user.id}}">
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
                        this.$snotify.success('Новый пользователь создан', 'Успешно');
                        this.getUsers();
                        this.dialogNew = false;
                    })
                    .catch(error => {
                        this.$snotify.error(error.response, 'Ошибка');
                    });
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
