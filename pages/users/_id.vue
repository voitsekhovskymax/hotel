<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm12 md612 xs12>
                    <v-toolbar flat>
                        <v-toolbar-title>Пользователь</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                </v-flex>

            </v-layout>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex>
                        <v-text-field
                                label="ФИО"
                                v-model="user.name"
                        ></v-text-field>
                        <v-text-field
                                label="Email"
                                v-model="user.email"
                        ></v-text-field>
                        <v-select
                                :items="roles"
                                label="Права доступа"
                                v-model="user.role_id"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                        <v-text-field
                                label="Пароль"
                                v-model="user.password"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="saveUser">Сохранить</v-btn>
            </v-card-actions>
        </v-card>


    </div>
</template>

<script>
    export default {
        name: "users-id",

        head() {
            return {
                title: 'Пользователи',
            }
        },
        data() {
            return {
                // data
                user: {
                    "id": 1,
                    "name": "vanobo",
                    "email": "ivan47@gmail.com",
                    "email_verified_at": null,
                    "role_id": 1,
                    "created_at": "2018-11-27 15:20:43",
                    "updated_at": "2018-11-28 18:08:54"
                },
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
            this.getUser();
            this.getRoles();
        },
        methods: {
            getUser() {
                this.axios.get("users/" + this.$route.params.id + "/edit").then(response => {
                    this.user = response.data.user;
                });
            },
            getRoles() {
                this.axios.get("users").then(response => {
                    this.users = response.data.users;
                    this.roles = response.data.roles;
                });
            },
            saveUser() {
                this.axios.patch("users/" + this.user.id, this.user).then(response => {
                    this.$snotify.success('Пользователь сохранен', 'Успешно');
                    this.$router.push({name: 'users'})
                }).catch((error) => {
                    this.$snotify.error(error.response, 'Ошибка');
                });
            }
        }
    };
</script>
