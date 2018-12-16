<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">

                        <v-dialog
                                ref="dialog_update"
                                v-model="modal_update"
                                :return-value.sync="date_update"
                                persistent
                                lazy
                                full-width
                                width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="date_update"
                                    label="Выбор даты"
                                    prepend-icon="event"
                                    solo
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="date_update" type="month" scrollable locale="ru" :no-title="true">

                                <v-btn color="success" @click="getUpdate(date_update)">Подтвердить</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modal_update = false">Закрыть</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="update">
                            Update
                        </v-btn>
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>

        </v-card>




        <div class="loader-table">
            <!--<loading :active.sync="loader" :is-full-page="false"></loading>-->
            <table id="dataTable" ref="dataTable"   style="width:100%">
                <thead>
                <tr>
                    <th width="200"></th>
                    <th width="50" v-for="day in response.days">{{day}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="room in response.table">
                    <td>{{room.name}}</td>
                    <template v-for="(day, index) in response.days">
                        <td v-if="typeof room.day !== 'undefined' && typeof room.day[index+1] !== 'undefined'"
                            :class="[ room.day[index+1].class, 'order_table' ]"
                            @click="getOrder(room.day[index+1].id)">
                            {{day}}
                        </td>
                        <td v-else></td>
                        <!--<td>{{typeof room.day}}</td>-->
                    </template>

                </tr>
                </tbody>
                <tfoot>
                <!--<tr class="parking-row">-->
                <!--<td>Парк.</td>-->
                <!--<template v-for="(day, index) in col_days ">-->
                <!--<td v-if="typeof parking[index] !== 'undefined'">-->
                <!--{{parking[index]}}-->
                <!--</td>-->
                <!--<td v-else></td>-->
                <!--</template>-->
                <!--</tr>-->
                <!--<tr class="beds-row">-->
                <!--<td>Кров.</td>-->
                <!--<td v-for="bed_count in beds"> {{settings_beds - bed_count}}</td>-->
                <!--</tr>-->
                <!--<tr>-->

                <!--<th></th>-->
                <!--<th v-for="day in days">{{day}}</th>-->
                <!--</tr>-->
                </tfoot>

            </table>
        </div>

        <v-dialog v-model="dialog" max-width="290" persistent>
            <v-card>
                <v-card-title class="headline">ID - {{dialogWindow.id}}</v-card-title>
                <v-card-actions>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>

    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Tabulator from "tabulator-tables"; //import Tabulator library


    export default {
        name:'home',
        components: {
            Loading
        },
        data: function () {
            return {
                //data
                select_year: 2018,
                select_month: 9,
                years: [2015, 2016, 2017, 2018, 2019],
                mounts: ['Май', 'Июнь', 'Июль', 'Август', "Сентябрь"],
                response: {
                    days: [],
                    col_days: '',
                    col_beds: [],
                    col_parking: [],
                    month: '',
                    settings_beds: 0,
                    settings_parking: 0,
                    table: {}
                },
                dialog: false,
                dialogWindow: {
                    class: '',
                    id: ""
                },
                not_data: {},
                col_days: '',
                settings_beds: '',
                settings_parking: '',
                //helpers
                date_update: new Date().toISOString().substr(0, 7),
                menu_update: false,
                modal_update: false,

                loader: false,

                tabulator: null, //variable to hold your table
                tableData: [], //data for table to display

            }
        },
        created() {
            this.loader = true;
        },
        beforeMount() {


        },
        mounted() {
            console.log('created');
            this.axios.get('table/' + this.select_month + '/' + this.select_year).then((response) => {
                console.log('Данные получены');
                console.log(response.data);
                this.response = response.data;
                this.date_update = response.data.current_year + '-' + response.data.current_month;

                setTimeout(this.generateTable(), 1000);

            });
        },
        updated: function () {
        },
        methods: {
            generateTable() {
                this.tabulator = new Tabulator('#dataTable', {});
                this.loader = false;
            },
            update() {
            },
            getOrder(order_id) {
                this.dialogWindow.id = order_id;
                this.dialog = true;
            },
            getUpdate(date_update) {
                this.loader = true;
                console.log(date_update);
                let arrayDATE = date_update.split("-");
                var year = arrayDATE[0];
                var month = arrayDATE[1];

                this.$refs.dialog_update.save(this.date_update);
                this.axios.get('table/' + month + '/' + year).then((response) => {
                    console.log('Данные получены');
                    console.log(response.data);
                    this.response = response.data;
                    this.loader = false;
                    this.date_update = response.data.current_year + '-' + response.data.current_month;

                });
            }
        }
    }
</script>

<style src="~/assets/css/home.css" scoped/>
<style>
    @import "../../node_modules/tabulator-tables/dist/css/tabulator.min.css";

</style>