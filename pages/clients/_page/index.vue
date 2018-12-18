<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>
            Клиенты
            <v-tooltip bottom>
              <span slot="activator"> ( {{response.clients.total}} )</span>
              <span>Всего клиентов</span>
            </v-tooltip>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" :to="{name:'clients-new'}">
            Новый клиент
          </v-btn>
        </v-toolbar>
        <!---->
        <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
               style="width:100%">
          <thead>
          <tr>
            <th class="export">ФИО</th>
            <th class="export">Адрес</th>
            <th class="export">Паспорт</th>
            <th class="export">Почта</th>
            <th class="export">Телефон</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="client in response.clients.data">
            <td>{{client.name}}</td>
            <td>{{client.address}}</td>
            <td>{{client.passport}}</td>
            <td>{{client.email}}</td>
            <td>{{client.phone}}</td>
            <td>
              <v-btn color="success" :to="{name:'clients-edit-id', params:{ id: client.id}}">
                Редактировать
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
    name: 'clients',
    data() {
      return {
        response: {
          date_str: [],
          count: 0,
          clients: []
        },
      };
    },
    beforeMount() {
      this.axios.get('clients', {params: {page: this.$route.params.page}}).then((response) => {
        console.log('clients');
        console.log(response.data);
        this.response = response.data;
        this.generateTable();
      });
    },

    watch: {
      'response.clients.current_page': function (val, oldVal) {
        this.updateTable();
      }
    },
    methods: {
      generateTable() {
        $(document).ready(function () {
          window.JSZip = JSZip;
          let DATATABLE = $('#DataTable').DataTable({
            "paging": false,
            "searching": false,
            "info": false,
            scrollY:  $(window).height() - 250 + "px",
            scrollX: true,
            scrollCollapse: true,
          });
        });


      },
      updateTable() {
        this.$router.push({
          name: 'clients-page',
          params: {page: this.response.clients.current_page}
        });
      },
    }
  };

  function gettanggal(str) {
    console.log(str);
    var arr = str.split('-');
    return arr[0] + '-' + arr[1] + '-' + arr[2];
  }
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
