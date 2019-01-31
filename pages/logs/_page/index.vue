<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-toolbar prominent class="no-shadow" color="grey lighten-4">
                    <v-toolbar-title>
                        Журнал действий
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <!---->
                <v-card-actions>
                    <table
                            id="table"
                            ref="table"
                            class="table"
                            style="width:100%"
                    >
                        <thead>
                        <tr>
                            <th class="export">Тип записи</th>
                            <th class="export">Модель Записи</th>
                            <th class="export">Пользователь</th>
                            <th class="export">Дата записи</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in response.data" :class="[getColor(item.type), 'type_row']"
                            @click="getRouterType(item)">
                            <td data-field="date">{{ getType(item.type) }}</td>
                            <td data-field="room"> {{ getModel(item.model) }}</td>
                            <td data-field="fio">
                                <template v-if="item.user !== null">{{
                                    item.user.name}}
                                </template>
                            </td>
                            <td data-field="parking">{{ item.created_at }}</td>

                        </tr>
                        </tbody>
                    </table>


                </v-card-actions>
                <v-pagination
                        v-model="response.current_page"
                        :length="response.last_page"
                ></v-pagination>
            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name: 'logs',
        head() {
            return {
                title: 'Журнал действий'
            }
        },
        data() {
            return {
                response: {},
            };
        },
        beforeMount() {
            this.axios.get('logs', {params: {page: this.$route.params.page}}).then((response) => {
                console.log('logs');
                console.log(response.data);
                this.response = response.data.logs;
            });
        },
        watch: {
            'response.current_page':
                function (val, oldVal) {
                    console.log('current_page');
                    this.updateTable();
                }
        },
        methods: {
            getRouterType(item) {
                console.log(item);

                let router_type = 'logs-';
                switch (item.type) {
                    case 'created':
                        router_type += 'created';
                        break;
                    case 'updated':
                        router_type += 'updated';
                        break;
                    case 'deleted':
                        router_type += 'deleted';
                        break;
                    default:
                        router_type += 'type_undefined';
                        break;
                }

                router_type += '-';
                switch (item.model) {
                    case 'OrderRoom':
                        router_type += 'order';
                        break;
                    case 'Queue':
                        router_type += 'queue';
                        break;
                    default:
                        router_type += 'model_undefined';
                        break;
                }
                router_type += '-id';
                console.log(router_type);
                this.$router.push({
                    name: router_type,
                    params: {id: item.id}
                });
            },
            getColor(type) {

                switch (type) {
                    case 'created':
                        return 'type_created';
                    case 'updated':
                        return 'type_updated';
                    case 'deleted':
                        return 'type_deleted';
                    default:
                        return 'type_undefined'

                }
            },
            getType(type) {

                switch (type) {
                    case 'created':
                        return 'Создание';
                    case 'updated':
                        return 'Обновление';
                    case 'deleted':
                        return 'Удаление';
                    default:
                        return '(тип записи не обнаружен)'

                }
            },
            getModel(Model) {

                switch (Model) {
                    case 'OrderRoom':
                        return 'Брони';
                    case 'Queue':
                        return 'Очереди';
                    default:
                        return '(Модель записи не обнаружена)'
                }
            },
            updateTable() {
                console.log('updateTable');
                this.$router.push({
                    name: 'logs-page',
                    params: {page: this.response.current_page}
                });
            },
        }
    };

</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
<style scoped>
    .type_created {
        background: rgba(40, 167, 69, 0.1);;
    }

    .type_updated {
        background: rgb(240, 248, 255);
    }

    .type_deleted {
        background: rgba(255, 0, 0, 0.5);
    }

    .type_row {
        border: 2px solid transparent;
        cursor: pointer;
    }

    .type_row:hover {
        border-left: 2px solid red;
        border-bottom: 2px solid #ccc;
        border-top: 2px solid #ccc;
    }
</style>