<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>Все заявки</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
               style="width:100%">
          <thead>
          <tr>
            <th class="export">ФИО</th>
            <th class="export">Заезд</th>
            <th class="export">Выезд</th>
            <th class="export">Почта</th>
            <th class="export">Телефон</th>
            <th class="export">Город</th>
            <th class="export">Номер</th>
            <th class="export">Кол. мест</th>
            <th class="export">Взрослые</th>
            <th class="export">Дети</th>
            <th class="export">Парко. места</th>
            <th class="export">Доп. кровати</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="request in response.data" v-if="request.room_status_id == 3">
            <td>{{request.client.name}}</td>
            <td>{{request.begin_date}}</td>
            <td>{{request.end_date}}</td>
            <td>{{request.client.email}}</td>
            <td>{{request.client.phone}}</td>
            <td>{{request.client.address}}</td>
            <td>{{request.room.name}}</td>
            <td>{{request.adult + request.kids }}</td>
            <td>{{request.adult}}</td>
            <td>{{request.kids}}</td>
            <td>{{request.parking}}</td>
            <td>{{request.beds}}</td>
            <td>
              <v-btn color="primary">Бронь</v-btn>
            </td>
            <td>
              <v-btn color="gray" icon>
                <v-icon>delete_outline</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </table>
        <v-pagination
          v-model="response.clients.current_page"
          :length="response.clients.last_page"
        ></v-pagination>
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

  export default {
    name: 'requests',
    data() {
      return {
        response: {
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
      };
    },
    beforeMount() {
      this.axios.get('orders', {params: {id: this.$route.params.id}}).then((response) => {
        this.response = response.data;
        this.generateTable();
      });
    },

    methods: {
      generateTable() {
        $(document).ready(function () {
          window.JSZip = JSZip;
          let DATATABLE = $('#DataTable').DataTable({
            "paging": false,
            "searching": false,
            "info": false,
            scrollY: $(window).height() - 250 + "px",
            scrollX: true,
            scrollCollapse: true,
          });
        });
      },
      updateTable() {
        this.$router.push({
          name: 'requests-id',
          params: {id: this.response.current_page}
        });
      },
    }
  };


</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
