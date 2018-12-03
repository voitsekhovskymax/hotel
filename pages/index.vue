<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-menu :nudge-width="100">
                            <v-toolbar-title slot="activator">
                                <span>Июнь</span>
                                <v-icon>arrow_drop_down</v-icon>
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
                                <v-icon>arrow_drop_down</v-icon>
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

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn color="success" to="/requests/add">
                            Новая заявка
                        </v-btn>


                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>

        </v-card>
        <table id="DataTable" ref="DataTable" class="table table-bordered home" style="width:100%">
            <thead>
            <tr>
                <th></th>
                <th v-for="day in days">{{day}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="room in rooms">
                <td>{{room.name}}</td>
                <template v-for="(day, index) in col_days ">
                    <td v-if="typeof room.day[index+1] !== 'undefined'" :class="[ room.day[index+1].class ]"
                        @click="dialogActivator(day)">
                        <!--{{index + 1}}-->
                    </td>
                    <td v-else></td>

                </template>

            </tr>
            <tr class="green-row">
                <td>Парк.</td>
                <td v-for="park_count in parking">{{settings_parking - park_count}}</td>
            </tr>
            <tr class="red-row">
                <td>Кров.</td>
                <td v-for="bed_count in beds"> {{settings_beds - bed_count}}</td>
            </tr>
            </tbody>
        </table>
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
    import $ from 'jquery';  // подключаем jQuery
    import 'datatables.net'; // подключаем сам плагин
    import 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min'
    import 'datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.min'


    export default {
        components: {},
        data: function () {
            return {
                select_year: 2018,
                select_month: 6,
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
                col_days: '',
                settings_beds: '',
                settings_parking: '',
                API: 'http://test.voitsekhovsky.studio/data.json'

            }
        },
        beforeMount() {

            this.axios.get('table/' + this.select_month + '/' + this.select_year).then((response) => {
                console.log(response.data);
                this.days = response.data.days;
                this.parking = response.data.col_parking;
                this.beds = response.data.col_beds;
                this.rooms = response.data.table;
                this.settings_parking = response.data.settings_parking;
                this.settings_beds = response.data.settings_beds;
                this.col_days = response.data.col_days;
            });


        },
        mounted() {
            //Инициализация  таблицы

            var totalHeight = null;

            totalHeight = $(window).height() - 250;
            console.log("totalHeight - " + totalHeight);
            let DATATABLE = $('#DataTable').DataTable({
                "ordering": false,
                paging: false,
                scrollY: "600px",
                scrollX: true,
                scrollCollapse: true,
            });

            // new $.fn.dataTable.FixedColumns(DATATABLE, {
            //     leftColumns: 1
            // });

            // //Ховер для таблицы
            // $("td").on("mouseover", function () {
            //     var el = $(this),
            //         pos = el.index();
            //     el.parent().find(" td > div").addClass("hover");
            //     $("td ").filter(":nth-child(" + (pos + 1) + ")").children().addClass("hover");
            // }).on("mouseout", function () {
            //     $("td > div").removeClass("hover");
            // });


            //    https://datatables.net/examples/api/highlight.html

            // $('#example tbody')
            //     .on( 'mouseenter', 'td', function () {
            //         var colIdx = table.cell(this).index().column;
            //
            //         $( table.cells().nodes() ).removeClass( 'highlight' );
            //         $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
            //     } );
        },
        updated: function () {
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

