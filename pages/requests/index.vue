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
            <th class="export">Взрослые</th>
            <th class="export">Дети</th>
            <th class="export">Парко. места</th>
            <th class="export">Доп. кровати</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="request in response.data">
            <td>{{request.full_name}}</td>
            <td>{{request.begin_date}}</td>
            <td>{{request.end_date}}</td>
            <td>{{request.email}}</td>
            <td>{{request.phone}}</td>
            <td>{{request.city}}</td>
            <td>{{request.room}}</td>
            <td>{{request.adult}}</td>
            <td>{{request.kids}}</td>
            <td>{{request.parking}}</td>
            <td>{{request.beds}}</td>
            <td>
              <v-btn color="primary" :to="{name:'requests-id', params:{id:request.id}}">Бронь</v-btn>
            </td>
            <td>
              <v-btn icon @click="dialogDeleteReservation(request)">
                <v-icon color="grey">delete_outline</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-layout wrap>
          <v-flex>
            <v-toolbar class="no-shadow warning " dark>
              <v-toolbar-title>Внимание</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogDelete = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-flex>
        </v-layout>
        <v-card-text>
          Вы действительно хотите удалить заявку?
        </v-card-text>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>ФИО:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.full_name }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Дата заезда:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.begin_date }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Дата выезда:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.end_date }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Email:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.email }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Телефон:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.phone }}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>Адресс:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.city }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Номер комнаты:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.room }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Сообщение от клиента:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{deleteReservation.message }}</v-list-tile-content>
          </v-list-tile>

        </v-list>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="deleteRequest"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          "id": null,
          "full_name": null,
          "email": null,
          "phone": null,
          "city": null,
          "message": null,
          "begin_date": null,
          "end_date": null,
          "room": null,
          "adult": null,
          "kids": null,
          "parking": null,
          "beds": null,
          "is_get": null,
          "is_queue": null,
          "is_answer": null
        },
        dialogDelete: false,
        deleteReservation: {
          "id": null,
          "full_name": null,
          "email": null,
          "phone": null,
          "city": null,
          "message": null,
          "begin_date": null,
          "end_date": null,
          "room": null,
          "adult": null,
          "kids": null,
          "parking": null,
          "beds": null,
          "is_get": null,
          "is_queue": null,
          "is_answer": null
        },
      };
    },
    beforeMount() {
      this.axios.get('neworders').then((response) => {
        this.response = response.data;
        this.generateTable();
      });
    },

    methods: {
      dialogDeleteReservation(reservation) {
        this.dialogDelete = true;
        this.deleteReservation = reservation;
      },
      deleteRequest() {

      },
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
    }
  };


</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
