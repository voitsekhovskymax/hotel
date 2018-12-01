<template>
    <div class="elevation-3">
        <v-card>
                <v-layout  wrap>
                    <v-flex sm6  md6 xs12 >
                        <v-toolbar class="no-shadow">
                            <v-menu :nudge-width="100">
                                <v-toolbar-title slot="activator">
                                    <span>Июнь</span>
                                    <v-icon dark>arrow_drop_down</v-icon>
                                </v-toolbar-title>

                                <v-list>
                                    <v-list-tile
                                            v-for="mount in mounts"
                                            :key="mount"
                                            @click=""
                                    >
                                        <v-list-tile-title v-text="mount"></v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                            <v-menu :nudge-width="100">
                                <v-toolbar-title slot="activator">
                                    <span>2018</span>
                                    <v-icon dark>arrow_drop_down</v-icon>
                                </v-toolbar-title>

                                <v-list>
                                    <v-list-tile
                                            v-for="year in years"
                                            :key="year"
                                            @click=""
                                    >
                                        <v-list-tile-title v-text="year"></v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>

                            <v-spacer></v-spacer>

                        </v-toolbar>
                    </v-flex>

                    <v-flex sm6  md6 xs12>
                        <v-toolbar class="no-shadow">
                            <v-spacer></v-spacer>
                            <v-btn color="success">
                                Новая заявка
                            </v-btn>


                            <v-btn icon>
                                <v-icon>help_outline</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>
                </v-layout>

        </v-card>
        <table id="DataTable" ref="DataTable" class="table table-striped table-bordered" style="width:100%">
            <thead>
            <tr>
                <th></th>
                <th v-for="day in days">{{day}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="room in rooms">
                <td>{{room.name}}</td>
                <td v-for="day in room.days" :class="[day.class]" @click="dialogActivator(day)"></td>

            </tr>
            <tr class="green-row">
                <td>Парк.</td>
                <td v-for="park_count in parking">{{park_count}}</td>
            </tr>
            <tr class="red-row">
                <td>Кров.</td>
                <td v-for="bed_count in beds"> {{bed_count}}</td>
            </tr>
            </tbody>
        </table>
        <v-dialog v-model="dialog" max-width="290" persistent>
            <v-card>
                <v-card-title class="headline">ID - {{dialogWindow.id}}</v-card-title>
                <v-card-title class="headline">Class = {{dialogWindow.class}}</v-card-title>
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
    import $ from 'jquery';  // подключаем jQuery
    import 'datatables.net'; // подключаем сам плагин
    // import 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min'
    import 'datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.min'
    import {DATA} from '../assets/data'

    export default {
        components: {},
        data: function () {
            return {
                years: [2015, 2016, 2017, 2018, 2019],
                mounts: ['Май', 'Июнь', 'Июль', 'Август', "Сентябрь"],
                days: [],
                rooms: [],
                parking: [],
                beds: [],
                dialog: false,
                dialogWindow: {
                    class: '',
                    id: ""
                },
                API: 'http://test.voitsekhovsky.studio/data.json'

            }
        },
        beforeMount: function () {

            this.rooms = DATA.rooms;
            this.parking = DATA.parking;
            this.days = DATA.days;
            this.beds = DATA.beds;

            //AXIOS DEMO
            // this.axios.get(this.API).then((response) => {
            //     console.log(response.data);
            //     let DATA = response.data;
            //     this.rooms = DATA.rooms;
            //     this.parking = DATA.parking;
            //     this.days = DATA.days;
            //     this.beds = DATA.beds;
            // })

            // var rooms = [];
            // for (let i = 0; i < 10; i++) {
            //     let days = [];
            //
            //     for (let j = 0; j < 30; j++) {
            //         var colors = ['red', 'orange', 'green', 'blue', 'red_evening', 'orange_evening', 'green_evening', 'blue_evening', 'red_morning', 'orange_morning', 'green_morning', 'blue_morning', 'blue_evening blue_morning', 'orange_evening blue_morning'];
            //         days.push({
            //             class: colors[Math.floor(colors.length * Math.random())],
            //             id: '_' + Math.random().toString(36).substr(2, 9)
            //         });
            //     }
            //     var room = {
            //         name: 'room #' + i,
            //         days: days
            //     }
            //     rooms.push(room);
            // }
            // this.rooms = rooms;
            //
            //
            // var arr = [];
            // for (let i = 0; i < 30; i++) {
            //     arr.push(i + 1);
            // }
            // this.days = arr;
            //
            //
            // var parking = [];
            // for (let i = 0; i < 30; i++) {
            //     parking.push(Math.floor(Math.random() * (50 - 30)) + 30);
            // }
            // this.parking = parking;
            //
            // var beds = [];
            // for (let i = 0; i < 30; i++) {
            //     beds.push(Math.floor(Math.random() * (20 - 2)) + 2);
            // }
            // this.beds = beds;

        },
        mounted() {
            //Инициализация  таблицы
            var totalHeight = null;

            totalHeight = $(window).height() - 250;
            console.log("totalHeight - " + totalHeight);
            let DATATABLE = $('#DataTable').DataTable({
                "ordering": false,
                paging: false,
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                paging: false,

            });
            new $.fn.dataTable.FixedColumns(DATATABLE, {
                leftColumns: 1
            });


            //Ховер для таблицы
            $("td").on("mouseover", function () {
                var el = $(this),
                    pos = el.index();
                el.parent().find(" td > div").addClass("hover");
                $("td ").filter(":nth-child(" + (pos + 1) + ")").children().addClass("hover");
            }).on("mouseout", function () {
                $("td > div").removeClass("hover");
            });
        },
        methods: {
            dialogActivator(day) {
                this.dialogWindow = day;
                this.dialog = true;
            }
        }
    }
</script>


<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
<style src="~/node_modules/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.min.css" scoped/>
<style src="~/assets/css/home.css" scoped/>
<style>
    .dataTables_info, .dataTables_filter {
        display: none !important;
    }
</style>

