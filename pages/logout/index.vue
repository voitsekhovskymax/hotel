<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex>
                <v-card class="elevation-12 session-card">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Внимание</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        Вы вышли с приложения.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="/login">Войти снова</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

    export default {
        name: 'logout',
        layout: 'auth',
        data() {
            return {};
        },
        beforeCreate() {
            var token = this.$cookies.get('token');
            if (token != undefined) {
                this.axios.get('logout', {headers: {Authorization: "Bearer " + token}}).then((response) => {
                    console.log('Успешно разлогинен!')
                });
                this.$cookies.remove('token');
            }else{
                this.$router.push('/login');

            }
        },
        methods: {}
    };
</script>

<style>
    .session-card {
        max-width: 400px;
        margin: auto;
    }
</style>
