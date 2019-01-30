<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>Статистика Предоплат</v-toolbar-title>
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
        <v-alert :value="true" color="grey ">
          С {{response.date_str[0]}} по {{response.date_str[1]}}. Всего {{response.count}} грн.
        </v-alert>
        <!---->
        <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
               style="width:100%">
          <thead>
          <tr>
            <th class="export">Номер</th>
            <th class="export">Дата предоплаты</th>
            <th class="export">ФИО</th>
            <th class="export">Сумма предоплаты</th>
            <th class="export">Информация</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="client in response.clients">
            <td>{{client.room.name}}</td>
            <td>{{client.date_prepaid}}</td>
            <td>{{client.client.name}}</td>
            <td>{{client.sum_prepaid}}</td>
            <td>{{client.info}}</td>
          </tr>
          </tbody>
        </table>
        <v-alert :value="true" color="grey">
          С {{response.date_str[0]}} по {{response.date_str[1]}}. Всего {{response.count}} грн.
        </v-alert>
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
    name: 'prepaid',
      head() {
          return {
              title: 'Отчет по предоплатам'
          }
      },
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
      this.axios.post('prepaid', {
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
        let app = this;
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
                filename: 'Отель Маяк - Статистика Предоплат',
              }
            ]
          });
        });
      },
      updateTable() {
        this.$router.push({
          name: 'prepaid-begin_date-end_date',
          params: {begin_date: this.begin_date, end_date: this.end_date}
        });
      },
    }
  };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
