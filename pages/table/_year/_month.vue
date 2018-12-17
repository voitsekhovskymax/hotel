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

                <v-btn flat color="primary" @click="modal_update = false">Закрыть</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="getUpdate(date_update)">Подтвердить</v-btn>
              </v-date-picker>
            </v-dialog>
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

    </v-card>
    <div class="loader-table">
      <loading :active.sync="loader" :is-full-page="false"></loading>
      <table id="DataTable" ref="dataTable" class="table table-bordered home" style="width:100%">
        <thead>
        <tr>
          <th>#</th>
          <th v-for="day in response.days">{{day}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="room in response.table">
          <td>{{room.name}}</td>
          <template v-for="(day, index) in response.days">
            <td v-if="typeof room.day !== 'undefined' && typeof room.day[index+1] !== 'undefined'"
                :class="[ room.day[index+1].class, 'order_table' ]"
                @click="getOrder(room.day[index+1].id)">
              <!--{{index + 1}}-->
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

    <v-dialog v-model="dialog" max-width="290" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card v-if="progress" class="progress_loader">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-card>

      <v-card v-else>
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-btn icon @click="routerBack">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-toolbar-title>Бронь <b>{{order.orderRoom.order_num}}</b></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-flex>

          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-flex>
        </v-layout>
        <v-card-text class="card-content">
          <v-layout wrap>
            <v-flex sm6 md6 xs12>
              <v-text-field
                label="id"
                box
                v-model="order.orderRoom.id"
              ></v-text-field>


              <v-text-field
                label="ФИО"
                v-model="order.client.name"
              ></v-text-field>

                  <v-text-field
                label="Почта"
                v-model="order.client.email"
              ></v-text-field>



            </v-flex>

            <v-flex sm6 md6 xs12>
            </v-flex>
          </v-layout>
        </v-card-text>
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
  // import 'datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.min'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';


  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        //data
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
        order: {
          "orderRoom": {
            "id": null,
            "room_id": null,
            "client_id": null,
            "room_status_id": null,
            "payment_type_id": null,
            "date_checkin": null,
            "date_prepaid": null,
            "days_count": null,
            "discount": null,
            "order_num": null,
            "total_payment": null,
            "sum_nal": null,
            "sum_besnal": null,
            "sum_payed": null,
            "sum_prepaid": null,
            "was_payed": null,
            "was_prepaid": null,
            "info_prepaid": null,
            "is_payed": null,
            "is_close": null,
            "parking": null,
            "parking_current_count": null,
            "parking_number": null,
            "adult": null,
            "kids": null,
            "beds": null,
            "begin_date": null,
            "end_date": null,
            "date_transfer": null,
            "sum_transfer": null,
            "info_transfer": null,
            "date_transfer_back": null,
            "sum_transfer_back": null,
            "info_transfer_back": null,
            "col_prepaid_days": null,
            "info": null,
            "order_author": null,
            "is_queue": null,
            "deleted_at": null,
            "created_at": null,
            "updated_at": null,
            "room": {
              "id": null,
              "name": null,
              "room_type_id": null,
              "quantity": null,
              "type": null,
              "created_at": null,
              "updated_at": null
            },
            "room_status": {
              "id": null,
              "name": null,
              "info": null,
              "created_at": null,
              "updated_at": null
            },
            "payment_type": {
              "id": null,
              "name": null,
              "info": null,
              "created_at": null,
              "updated_at": null
            }
          },
          "client": {
            "id": null,
            "name": null,
            "passport": null,
            "phone": null,
            "email": null,
            "address": null,
            "info": null,
            "is_black_list": null,
            "deleted_at": null,
            "created_at": null,
            "updated_at": null
          },
          "parking": [],
          "order_parking": [],
          "busy_parking": [],
          "states": {
            "1": "Весенняя скидка",
            "2": "Майские праздники",
            "9": "бронь",
            "13": "Тест отправки письма",
            "14": "очередь",
            "15": "предоплата получена",
            "16": "замена номера",
            "17": "снятие брони",
            "18": "Трансфер",
            "19": "освободился номер",
            "20": "отсутствие предоплаты",
            "21": "уточнение брони"
          },
          "liq_prepaid": null,
          "liq_paid": null
        },
        not_data: {},
        col_days: '',
        settings_beds: '',
        settings_parking: '',
        //helpers
        date_update: new Date().toISOString().substr(0, 7),
        modal_update: false,
        loader: false,
        progress: false,
      }
    },
    created() {
      this.loader = true;
    },
    beforeMount() {
    },
    mounted() {
      console.log('created');
      this.axios.get('table/' + this.$route.params.month + '/' + this.$route.params.year).then((response) => {
        console.log('Данные получены');
        console.log(response.data);
        this.response = response.data;
        this.date_update = new Date(this.response.current_year, this.response.current_month).toISOString().substr(0, 7);
        this.generateTable();
      });
    },
    updated: function () {
    },
    methods: {
      generateTable() {
        $(document).ready(function () {
          let DATATABLE = $('#DataTable').DataTable({
            "ordering": false,
            paging: false,
            scrollY: $(window).height() - 250 + 'px',
            "scrollX": true,
            scrollCollapse: true,
            fixedHeader: true,
          });

          new $.fn.dataTable.FixedColumns(DATATABLE, {
            leftColumns: 1,
            heightMatch: 'auto'
          });
        });
        this.loader = false;
      },
      getOrder(order_id) {
        this.dialog = true;
        this.progress = true;
        this.axios.get('orders/' + order_id + '/edit').then((response) => {
          this.order = response.data;
          this.progress = false;
        });
      },
      getUpdate(date_update) {
        console.log(date_update);
        let arrayDATE = date_update.split("-");
        this.$router.push({name: 'table-year-month', params: {year: arrayDATE[0], month: arrayDATE[1]}});
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
.progress_loader{
  height: 200px;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
