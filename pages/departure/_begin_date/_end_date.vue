<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>Отчет по выездам</v-toolbar-title>
          <v-spacer />
          <span>C </span>
          <v-dialog
            ref="ref_modal_begin_date"
            v-model="modal_begin_date"
            :return-value.sync="begin_date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="begin_date"
              label="Дата заезда"
              class="ml-3 mr-3 toolbar-input"
              solo
              required
            />
            <v-date-picker
              v-model="begin_date"
              :first-day-of-week="1"
              scrollable
              locale="ru-ru"
            >
              <v-spacer />
              <v-btn flat color="primary" 
@click="modal_begin_date = false;"
                >Закрыть
              </v-btn>
              <v-btn
                color="primary"
                @click="$refs.ref_modal_begin_date.save(begin_date);"
              >
                Подтвердить
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <span>По </span>
          <v-dialog
            ref="ref_modal_end_date"
            v-model="modal_end_date"
            :return-value.sync="end_date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="end_date"
              label="Дата выезда"
              class="ml-2 mr-3 toolbar-input"
              readonly
              solo
              required
            />
            <v-date-picker
              v-model="end_date"
              :first-day-of-week="1"
              :min="begin_date"
              scrollable
              locale="ru-ru"
            >
              <v-spacer />
              <v-btn flat color="primary" 
@click="modal_end_date = false;"
                >Закрыть
              </v-btn>
              <v-btn
                color="primary"
                @click="$refs.ref_modal_end_date.save(end_date);"
                >Подтвердить
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn color="primary" large @click="updateTable"> Подсчитать</v-btn>
        </v-toolbar>

        <table
          id="table"
          ref="table"
          class="table table-striped table-bordered"
          style="width:100%"
        >
          <thead>
            <tr>
              <th class="export">Дата</th>
              <th class="export">Номер комнаты</th>
              <th class="export">ФИО</th>
              <th class="export">Паркоместо</th>
              <th class="export">Количество дней заезда</th>
              <th class="export">Взрослых</th>
              <th class="export">Детей</th>
              <th class="export">Телефон</th>
              <th class="export">Примечание (Выезд)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in response.order_rooms">
              <td data-field="date">{{ room.begin_date }}</td>
              <td data-field="room">{{ room.room.name }}</td>
              <td data-field="fio">{{ room.client.name }}</td>
              <td data-field="parking">{{ room.parking_number }}</td>
              <td data-field="departure_days">{{ room.count_days }}</td>
              <td data-field="adult">{{ room.adult }}</td>
              <td data-field="kids">{{ room.kids }}</td>
              <td data-field="phone">{{ room.client.phone }}</td>
              <td data-field="note">{{ room.info_transfer_back }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialogReservation" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Перейти на бронь?</span>
        </v-card-title>
        <v-card-text>
          {{ selectReservation.begin_date }} \ {{ selectReservation.end_date }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="routeReservation">перейти</v-btn>
          <v-spacer />
          <v-btn @click="dialogReservation = false;">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import $ from "jquery"; // подключаем jQuery
import "datatables.net"; // подключаем сам плагин
import "datatables.net-buttons/js/buttons.html5.min";
import JSZip from "jszip";
import { datePickerFormat } from "~~/libs/utils";

export default {
  name: "Payment",
  data() {
    return {
      // data
      begin_date: null,
      end_date: null,
      response: {},
      // helpers
      modal_begin_date: false,
      modal_end_date: false,
      dialogReservation: false,
      selectReservation: {
        begin_date: null,
        end_date: null
      }
    };
  },
    created(){
        this.begin_date = this.$route.params.begin_date;
        this.end_date = this.$route.params.end_date;
    },
  beforeMount() {
    this.axios
      .post("departure", {
        begin_date: this.$route.params.begin_date,
        end_date: this.$route.params.end_date
      })
      .then(response => {
        this.response = response.data;

        for (let i = 0; i < this.response.order_rooms.length; i++) {
          const begin = new Date(this.response.order_rooms[i].begin_date);
          const end = new Date(this.response.order_rooms[i].end_date);
          this.response.order_rooms[i].count_days = (end - begin) / 86400000;
          console.log(this.response.order_rooms[i].count_days);
        }

        this.begin_date = datePickerFormat(response.data.date_str[0]);
        this.end_date = datePickerFormat(response.data.date_str[1]);
        this.generateTable();
      });
  },
  methods: {
    routeReservation() {},
    getReservation(order_num) {
      this.axios
        .post("data-search", {
          keywords: order_num
        })
        .then(response => {
          console.log(response);
          this.selectReservation = response.data;
          this.dialogReservation = true;
        });
    },
    generateTable() {
      $(document).ready(function() {
        window.JSZip = JSZip;
        const totalHeight = $(window).height() - 250;
        console.log("totalHeight - " + totalHeight);
        const table = $("#table").DataTable({
          paging: false,
          searching: false,
          info: false,
          scrollY: totalHeight + "px",
          scrollX: true,
          scrollCollapse: true,
          dom: "Bfrtip",
          buttons: [
            {
              extend: "excel",
              text: "Выгрузить в Excel",
              className: "v-btn theme--light success",
              exportOptions: {
                modifier: {
                  page: "current"
                }
              },
              filename: "Отель Маяк - Трансфер"
            }
          ]
        });
      });
    },
    updateTable() {
      this.$router.push({
        name: "departure-begin_date-end_date",
        params: { begin_date: this.begin_date, end_date: this.end_date }
      });
    }
  }
};
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped />
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped />
<style scoped>
.selectors > div {
  padding: 0px 15px;
}

#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
