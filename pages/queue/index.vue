<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent class="no-shadow">
          <v-toolbar-title>Очереди</v-toolbar-title>
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
          <tr v-for="queue in response" :class="queue.is_answer ? 'green accent-2' : ''">
            <td>{{queue.full_name}}</td>
            <td>{{queue.begin_date}}</td>
            <td>{{queue.end_date}}</td>
            <td>{{queue.email}}</td>
            <td>{{queue.phone}}</td>
            <td>{{queue.city}}</td>
            <td>{{queue.room}}</td>
            <td>{{queue.adult}}</td>
            <td>{{queue.kids}}</td>
            <td>{{queue.parking}}</td>
            <td>{{queue.beds}}</td>
            <td>
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="success"
                  @click="openDialogMail(queue)"
                >
                  <v-icon>mail_outline</v-icon>
                </v-btn>
                <span>Отправить письмо</span>
              </v-tooltip>
            </td>
            <td>
              <v-btn color="primary">Перейти</v-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialog_mail" width="500">
      <v-card>
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-toolbar-title>Отправка письма</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
          </v-flex>

          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-spacer/>
              <v-btn icon @click="dialog_mail = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-flex>
        </v-layout>
        <v-card-text>
          <v-alert :value="selected_queue.is_answer ? true : false" type="success">По этой заявке уже было отослано
            сообщение
          </v-alert>
          <v-text-field v-model="selected_queue.full_name" label="ФИО" readonly/>
          <v-text-field v-model="selected_queue.email" label="Почта" readonly/>
          <v-layout align-center justify-space-around row fill-height>
            <v-select
              v-model="mail_select"
              :items="messages"
              label="Название письма"
              hint="Выберите письмо из списка, и его содержимое добавится"
              item-text="title"
              return-object
            />
            <v-btn flat icon @click="deleteMailSelect">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>

          <v-textarea
            v-model="mail_select.info"
            auto-grow
            label="Содержимое письма"
            rows="1"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="success" @click="sendMail"> Отправить</v-btn>
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
    name: 'queue',
    data() {
      return {
        response: [],
        dialog_mail: false,
        mail_select: {
          info: null
        },
        messages: null,
        selected_queue: {
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
        }
      };
    },
    beforeMount() {
     this.getQueue();

    },
    methods: {
      getQueue(){
        this.axios.get('queue').then((response) => {
          this.response = response.data.queue;
          this.generateTable();
        });
        this.axios.get("messages").then(response => {
          this.messages = response.data.messages;
        });
      },
      sendMail() {
        const request = {
          email_client: this.selected_queue.email,
          email_content: this.mail_select.info
        };
        console.log(this.selected_queue);
        // this.axios.post("send-single-email", request).then(response => {
          this.selected_queue.is_answer = 1;
          this.axios.patch("queue/" + this.selected_queue.id, this.selected_queue).then(response => {
            this.dialog_mail = false;
            this.$notify({
              group: "global",
              type: "success",
              title: "Успешно",
              text: 'Письмо отослано'
            });
            console.log(response);
            this.$router.push({name:'queue'});

          }).catch(error => {
            console.log(error.response);
            this.response = error.response.data;
            this.$notify({
              group: "global",
              type: "error",
              title: "Ошибка",
              text: error.response.data
            });
          });
        // }).catch(error => {
        //   console.log(error.response);
        //   this.response = error.response.data;
        //   this.$notify({
        //     group: "global",
        //     type: "error",
        //     title: "Ошибка",
        //     text: error.response.data
        //   });
        // });
      },
      deleteMailSelect() {
        this.mail_select = {
          info: null
        };
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
      openDialogMail(queue) {
        this.dialog_mail = true;
        this.selected_queue = queue;
      }
    }
  };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>
