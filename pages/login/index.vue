<template>
    <v-app id="login">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <v-card class="elevation-12 login-card">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Авторизация</v-toolbar-title>
                        </v-toolbar>

                        <template v-if="progress">
                            <v-card-text class="progress_loader">
                                <v-progress-circular :size="70" :width="7" color="purple"
                                                     indeterminate></v-progress-circular>
                            </v-card-text>
                        </template>

                        <template v-else>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="login" label="Email" type="text"
                                                  v-model="auth.email"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль"
                                                  type="password" v-model="auth.password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login">Вход</v-btn>
                                <!--<v-spacer></v-spacer>-->
                                <!--<v-btn outline  color="success" to="/login/reset">Сбросить пароль</v-btn>-->
                            </v-card-actions>
                        </template>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar v-model="snackbar" :color="snackbar_color">
            {{ snackbar_text}}
            <v-btn dark flat @click="snackbar = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    export default {

        layout: 'auth',
        name: 'login',
        head() {
            return {
                title: 'Авторизация'
            }
        },
        data: () => ({
            progress: false,
            snackbar: false,
            snackbar_text: '',
            snackbar_color: 'error',
            drawer: null,
            auth: {
                email: null,
                password: null,
            }
        }),
        methods: {
            login() {
                this.progress = true;
                let app = this;
                this.axios.post('login', this.auth).then((response) => {
                    if (response.data.token) {
                        console.log("Успешная авторизация");
                        this.$store.dispatch('auth/saveToken', {token: response.data.token})
                        this.progress = false;
                        let currentDate = new Date();
                        let currentYear = currentDate.getFullYear();
                        let currentMonth = currentDate.getMonth() + 1;
                        if (currentMonth < 10) {
                            currentMonth = '0' + currentMonth;
                        }
                        this.$router.push({name: 'table-year-month', params: {year: currentYear, month: currentMonth}});
                    }
                }).catch(function (error) {
                    app.progress = false;
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response);
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);

                        // Сервер обработал запрос, поля неверные
                        if (error.response.data == 'Password missmatch') {
                            app.snackbar = true;
                            app.snackbar_text = 'Неверный пароль';
                            app.snackbar_color = 'error';

                        } else if (error.response.data == 'User does not exist') {
                            app.snackbar = true;
                            app.snackbar_text = 'Такого пользователя нет в базе данных';
                            app.snackbar_color = 'error';

                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
            }
        }
    }
</script>

<style scoped>
    .login-card {
        max-width: 400px;
        margin: auto;
    }

    #login {
        /*background: url('../../assets/img/pattern.jpg');*/
        /*background-size: cover;*/
        /*background-position: center;*/
        /*background-repeat: repeat;*/
        /*background-size: auto;*/
    }
</style>
