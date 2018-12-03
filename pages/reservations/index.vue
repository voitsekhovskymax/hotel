<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title> Все бронирования</v-toolbar-title>
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
                                    v-for="item in reservations"
                                    :key="item.id"
                                    avatar
                                    @click=""
                            >

                                <v-list-tile-avatar>

                                    <v-icon :class="getClass(item.status)" dark>{{ getIcon(item.status)}}</v-icon>


                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.client }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.order }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.begin_date }} | {{ item.end_date }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-tooltip top>
                                        <v-btn icon ripple slot="activator">
                                            <v-icon color="grey lighten-1">info</v-icon>
                                        </v-btn>
                                        <span>{{getToolTip(item.status)}}</span>
                                    </v-tooltip>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-card-text>

        </v-card>

    </div>
</template>

<script>

    export default {
        name: 'reservations',
        data() {
            return {
                reservations: [
                    {
                        id: '1',
                        order: '3032706201713022017',
                        client: 'Ирина  Владимировна Селеменева',
                        begin_date: '27-06-2017',
                        end_date: '01-07-2017',
                        status: 1
                    },
                    {
                        id: '2',
                        order: '3032706201713022017',
                        client: 'Ирина  Владимировна Селеменева',
                        begin_date: '27-06-2017',
                        end_date: '01-07-2017',
                        status: 2
                    },
                    {
                        id: '3',
                        order: '3032706201713022017',
                        client: 'Ирина  Владимировна Селеменева',
                        begin_date: '27-06-2017',
                        end_date: '01-07-2017',
                        status: 3
                    }, {
                        id: '4',
                        order: '3032706201713022017',
                        client: 'Ирина  Владимировна Селеменева',
                        begin_date: '27-06-2017',
                        end_date: '01-07-2017',
                        status: 4
                    },
                    {
                        id: '5',
                        order: '3032706201713022017',
                        client: 'Ирина  Владимировна Селеменева',
                        begin_date: '27-06-2017',
                        end_date: '01-07-2017',
                        status: 2
                    },

                ]
            };
        },
        beforeMount: function () {
        },
        mounted() {

        },
        methods: {
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
            getToolTip(status) {
                switch (status) {
                    case 1:
                        return 'Не оплачено';
                        break;
                    case 2:
                        return 'Внесена предоплата ';
                        break;
                    case 3:
                        return 'Оплачено';
                        break;
                    default:
                        return 'Ожидается информация';
                        break;

                }
            }
        }
    };
</script>


