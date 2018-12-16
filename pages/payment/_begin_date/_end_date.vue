<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>Статистика Оплат</v-toolbar-title>
          <v-spacer></v-spacer>
          <span>C </span>
          <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                    :return-value.sync="begin_date" persistent lazy full-width
                    width="290px">

            <v-text-field slot="activator" v-model="begin_date" label="Дата заезда"
                          class="ml-3 mr-3 toolbar-input" solo required></v-text-field>
            <v-date-picker v-model="begin_date" scrollable :first-day-of-week="1"
                           locale="ru-ru">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть</v-btn>
              <v-btn color="primary"
                     @click="$refs.ref_modal_begin_date.save(begin_date)">
                Подтвердить
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <span>По </span>
          <v-dialog ref="ref_modal_end_date" v-model="modal_end_date"
                    :return-value.sync="end_date"
                    persistent lazy full-width width="290px">
            <v-text-field slot="activator" v-model="end_date" label="Дата выезда"
                          class="ml-2 mr-3 toolbar-input" readonly solo required></v-text-field>
            <v-date-picker v-model="end_date" scrollable :first-day-of-week="1"
                           :min="begin_date"
                           locale="ru-ru">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
              <v-btn color="primary"
                     @click="$refs.ref_modal_end_date.save(end_date)">Подтвердить
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn color="primary" large @click="updateTable">
            Подсчитать
          </v-btn>

        </v-toolbar>

        <v-layout  wrap class="selectors">
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего дней" outline :value="response.days_count"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего сумма нал" outline :value="response.nal_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего сумма карта" outline :value="response.card_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего сумма б\н" outline :value="response.besnal_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего (без вычета скидки)" outline :value="response.cur_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего (с вычетом скидки)" outline :value="response.cur_sum - response.discount_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего скидка" outline :value="response.discount_sum"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего без предоплат" outline :value="response.sum_without_pred"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field label="Всего предоплат" outline :value="response.sum_pred"></v-text-field>
          </v-flex>
        </v-layout>
        <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
               style="width:100%">
          <thead>
          <tr>
            <th class="export">Номер</th>
            <th class="export">Дней</th>
            <th class="export">Сумма нал</th>
            <th class="export">Сумма карта</th>
            <th class="export">Сумма б\н</th>
            <th class="export">Сумма</th>
            <th class="export">Оплачено всего</th>
            <th class="export">Сумма скидки</th>
            <th class="export">Получено без предоплат</th>
            <th class="export">Сумма предоплат</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="room in response.order_rooms">
            <td data-field="room">{{room.room.name}}</td>
            <td data-field="days">{{room.days_count}}</td>
            <td data-field="sum_nal" v-if="room.payment_type_id == 1">{{room.sum_nal}}</td>
            <td data-field="sum_nal" v-else>0</td>
            <td data-field="sum_card" v-if="room.payment_type_id == 3">{{room.sum_nal}}</td>
            <td data-field="sum_card" v-else>0</td>
            <td data-field="sum_besnal">{{room.sum_besnal}}</td>
            <td data-field="total_payment">{{room.total_payment}}</td>
            <td data-field="payed_all">{{room.was_payed + room.was_prepaid}}</td>
            <td data-field="discount">{{room.discount}}</td>
            <td data-field="was_payed">{{room.was_payed}}</td>
            <td data-field="was_prepaid">{{room.was_prepaid}}</td>
          </tr>
          </tbody>
        </table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import $ from 'jquery';  // подключаем jQuery
  import 'datatables.net'; // подключаем сам плагин
  import 'datatables.net-buttons/js/buttons.html5.min';
  import 'datatables.net-buttons/js/buttons.html5.min';
  import JSZip from 'jszip';
  import {datePickerFormat} from '~~/libs/utils';

  export default {
    name: 'payment',
    data() {
      return {
        //data
        begin_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        response: {
          date_str: [],
          count: 0,
          clients: []
        },
        //helpers
        modal_begin_date: false,
        modal_end_date: false,
      };
    },
    beforeMount() {
      this.axios.post('payment', {
        begin_date: this.$route.params.begin_date,
        end_date: this.$route.params.end_date
      }).then((response) => {
        this.response = response.data;
        this.begin_date = datePickerFormat(response.data.date_str[0]);
        this.end_date = datePickerFormat(response.data.date_str[1]);
        this.generateTable();
      });

    },
    methods: {
      generateTable() {
        $(document).ready(function () {
          window.JSZip = JSZip;
          var totalHeight = $(window).height() - 250;
          console.log("totalHeight - " + totalHeight);
          let DATATABLE = $('#DataTable').DataTable({
            "paging": false,
            "searching": false,
            "info": false,
            scrollY: totalHeight + "px",
            scrollX: true,
            scrollCollapse: true,
            dom: 'Bfrtip',
            buttons: [
              {
                extend: 'excel',
                text: 'Выгрузить в Excel',
                className: 'v-btn theme--light success',
                exportOptions: {
                  modifier: {
                    page: 'current'
                  },
                  columns: '.export'
                },
                filename: 'Отель Маяк - Статистика Оплат ' ,
              }
            ]
          });
        });
      },
      updateTable() {
        this.$router.push({
          name: 'payment-begin_date-end_date',
          params: {begin_date: this.begin_date, end_date: this.end_date}
        });
      },
    }
  };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
<style scoped>
  .selectors>div{
    padding: 0px 15px;
  }
</style>
