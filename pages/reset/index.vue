<template>
    <v-app id="login">

        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <v-card class="elevation-12 login-card">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Сброс пароля</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="person" name="login" label="Введите свой Email" type="text"
                                              v-model="auth.email"></v-text-field>

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="reset">Сбросить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {

        layout: 'page',
        data: () => ({
            snackbar: false,
            snackbar_text: '',
            snackbar_color: 'error',
            drawer: null,
            auth: {
                email: null,
            }
        }),
        methods:{
            reset(){
                this.axios.post('password/create', this.auth).then((response) => {
                    console.log(response.data)
                }).catch(function (error) {
                    console.log(error.response);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                });
            }
        }
    }

</script>
<style>
    .login-card {
        max-width: 400px;
        margin: auto;
    }
</style>