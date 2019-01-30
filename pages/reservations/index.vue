<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title>
                            Все бронирования
                            <v-tooltip bottom>
                                <span slot="activator"> ( {{response.total}} )</span>
                                <span>Всего клиентов</span>
                            </v-tooltip>
                        </v-toolbar-title>
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
                                    v-for="order in response.data"
                                    :key="order.id"
                                    avatar
                                    :to="{name:'reservations-id', params:{id: order.id}}"
                            >

                                <v-list-tile-avatar>
                                    <v-icon :class="getClass(order.room_status_id)" dark>{{
                                        getIcon(order.room_status_id)}}
                                    </v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ order.client.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ order.order_num }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ order.begin_date }} | {{ order.end_date }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                            </v-list-tile>
                        </v-list>
                        <v-pagination
                                v-model="response.current_page"
                                :length="response.last_page"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

    export default {
        name: 'reservations',
        head() {
            return {
                title: 'Все бронирования'
            }
        },
        data() {
            return {
                response: {
                    current_page: 1,
                    data: [],
                    first_page_url: null,
                    from: null,
                    last_page: null,
                    last_page_url: null,
                    next_page_url: null,
                    path: null,
                    per_page: null,
                    prev_page_url: null,
                    to: null,
                    total: null
                },
            };
        },
        watch: {
            'response.current_page': function (val, oldVal) {
                this.updateTable();
            }
        },
        created() {
            this.updateTable();
        },
        methods: {
            updateTable() {
                this.axios.get('orders', {params: {page: this.response.current_page}}).then((response) => {
                    this.response = response.data;
                });
            },
            getClass(status) {
                switch (status) {
                    case 1:
                        return 'red ';
                        break;
                    case 2:
                        return 'yellow darken-2 ';
                        break;
                    case 3:
                        return 'green ';
                        break;
                    default:
                        return 'blue ';
                        break;
                }
            },
            getIcon(status) {
                switch (status) {
                    case 1:
                        return 'close';
                        break;
                    case 2:
                        return 'credit_card ';
                        break;
                    case 3:
                        return 'check';
                        break;
                    default:
                        return 'info ';
                        break;
                }
            },
        }
    };
</script>


