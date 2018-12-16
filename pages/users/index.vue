<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>Пользователи</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
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
                            <v-list-tile
                                    v-for="user in response.users"
                                    :key="user.id"
                            >


                                <v-list-tile-content>
                                    <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ getUserRole(user.role_id) }}</v-list-tile-sub-title>
                                </v-list-tile-content>


                                <v-list-tile-action>
                                    <v-tooltip top>
                                        <v-btn icon ripple slot="activator" @click="activeModalEdit(user)">
                                            <v-icon color="green lighten-1">edit</v-icon>
                                        </v-btn>
                                        <span>Редактировать</span>
                                    </v-tooltip>
                                </v-list-tile-action>


                                <v-list-tile-action>
                                    <v-tooltip top>
                                        <v-btn icon ripple slot="activator">
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

        <v-dialog v-model="editDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-text-field label="Логин *" v-model="edit_user.name" required></v-text-field>
            <v-text-field label="Email *" v-model="edit_user.email" required></v-text-field>
            <v-select label="Роль" v-model="edit_user.role_id" :items="response.roles"  item-text="name"  item-value="id"></v-select>
            <v-text-field label="Пароль *" type="password" hint="Введите здесь новый пароль для пользователя" required></v-text-field>


        </v-dialog>

    </div>
</template>

<script>

    export default {
        name: 'users',
        data() {
            return {
                //data
                response: {},
                //    helpers
                edit_dialog: false,
                edit_user: {},
            };
        },
        beforeMount: function () {
        },
        mounted() {
            this.axios.get('users').then((response) => {
                this.response = response.data;
            });
        },
        methods: {
            activeModalEdit(user) {
                this.edit_dialog = true;
                this.edit_user = user;

            },
            getUserRole(id) {
                for (let i = 0; i < this.response.roles.length; i++) {
                    if (this.response.roles[i].id == id) {
                        return this.response.roles[i].name;
                    }
                }
            }

        }
    };
</script>


