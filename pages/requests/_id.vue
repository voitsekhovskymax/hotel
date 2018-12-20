<template>
  <div>


    <div class="elevation-3">
      <v-card>
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-btn icon @click="routerBack">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-toolbar-title>Номер заявки №<b>{{ getOrderNum(response.data.room,
                response.data.begin_date,response.data.end_date) }}</b></v-toolbar-title>
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
        <template v-if="progress">
          <v-card-text class="progress_loader">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
          </v-card-text>
        </template>

        <template v-else>


          <v-card-text class="card-content">
            <v-alert v-if="response.errors" :value="true" type="error">
              {{response.errors}}
            </v-alert>

            <v-alert v-if="response.errors" :value="true" color="info" icon="info" outline>
              Измените данные, и обновите заявку.
            </v-alert>

            <v-layout wrap>
              <v-flex lg6 sm6 md6 xs12>
                <v-text-field label="ФИО" v-model="response.data.full_name"></v-text-field>

                <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                          :return-value.sync="response.data.begin_date" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="response.data.begin_date" label="Дата заезда"
                                required></v-text-field>
                  <v-date-picker v-model="response.data.begin_date" scrollable :first-day-of-week="1"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть
                    </v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_begin_date.save(response.data.begin_date)">
                      Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

                <v-dialog ref="ref_modal_end_date" v-model="modal_end_date"
                          :return-value.sync="response.data.end_date" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="response.data.end_date" label="Дата выезда"
                                readonly required></v-text-field>
                  <v-date-picker v-model="response.data.end_date" scrollable :first-day-of-week="1"
                                 :min="response.data.begin_date"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_end_date.save(response.data.end_date)">Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>


                <v-text-field label="Почта" v-model="response.data.email"></v-text-field>
                <v-text-field label="Телефон" v-model="response.data.phone"></v-text-field>
                <v-text-field label="Предоплата" v-model="response.prepaid"></v-text-field>
                <v-text-field label="Скидка" v-model="discount"></v-text-field>


              </v-flex>

              <v-flex lg6 sm6 md6 xs12>
                <v-select label="Номер отеля" v-model="select_room" :items="rooms" item-text="name"
                          return-object></v-select>

                <v-text-field label="Взрослые" v-model="response.data.adult"></v-text-field>
                <v-text-field label="Дети" v-model="response.data.kids"></v-text-field>
                <v-text-field label="Паркоместа" v-model="response.data.parking"></v-text-field>
                <v-text-field label="Доп. кровати" v-model="response.data.beds"></v-text-field>
                <!--<v-text-field label="Статус номера" v-model="response.data.beds"></v-text-field>-->
                <v-textarea label="Сообщение от клиента" v-model="response.data.message" auto-grow
                            rows="1"></v-textarea>

              </v-flex>
              <v-flex lg12 sm12 md12 xs12>
                <v-select
                  label="Название письма"
                  hint="Выберите письмо из списка, и его содержимое добавится"
                  v-model="mail_select"
                  :items="messages"
                  item-text="title"
                  return-object

                ></v-select>

                <v-textarea
                  v-model="mail_select.info"
                  auto-grow
                  label="Содержимое письма"
                  rows="1"
                ></v-textarea>

              </v-flex>
            </v-layout>
          </v-card-text>

          <v-layout wrap>
            <v-flex>

              <v-toolbar class="no-shadow">
                <template v-if="!response.errors">
                  <v-tooltip top>
                    <v-btn slot="activator" color="success" @click="saveRequest">Принять заявку</v-btn>
                    <span>Заявка будет принята, и перейдет в брони</span>
                  </v-tooltip>
                </template>

                <template v-if="response.errors">
                  <v-tooltip top>
                    <v-btn slot="activator" color="warning" @click="updateRequest">Обновить</v-btn>
                    <span>Заявка будет обновлена, и пересчитана</span>
                  </v-tooltip>
                </template>

                <v-spacer></v-spacer>
                <v-tooltip top>
                  <v-btn slot="activator" color="primary" @click="queueRequest">В очередь</v-btn>
                  <span>Заявка будет отправлена в очередь</span>
                </v-tooltip>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </template>
      </v-card>


      <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-layout wrap>
            <v-flex sm6 md6 xs12>
              <v-toolbar class="no-shadow" color="error" dark>
                <v-toolbar-title>
                  <v-icon>error_outline</v-icon>
                  В базе данных есть совпадение клиента
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-flex>
            <v-flex sm6 md6 xs12>
              <v-toolbar class="no-shadow" color="error" dark>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar>
            </v-flex>
          </v-layout>
          <v-card-text>
            <div class="comparison-table">
              <div class="comparison-column">
                <div class="comparison-title" style="background: #4caf50">Клиент в заявке</div>
                <div class="comparison-content">
                  <v-text-field label="ID" v-model="compare_client.id"></v-text-field>
                  <v-text-field label="ФИО" v-model="response.data.full_name"></v-text-field>
                  <v-text-field label="Почта" v-model="response.data.email"></v-text-field>
                  <v-text-field label="Телефон" v-model="response.data.phone"></v-text-field>
                  <v-text-field label="Паспорт" v-model="response.data.phone"></v-text-field>
                  <v-text-field label="Адрес" v-model="response.data.city"></v-text-field>
                  <v-textarea label="Информация" auto-grow rows="1" v-model="compare_client.info"></v-textarea>
                  <v-text-field label="Дата создания" v-model="compare_client.created_at"></v-text-field>

                </div>
                <div class="comparison-actions">
                  <v-tooltip top>
                    <v-btn small slot="activator" :color="new_client.btn_color" @click="dialog = false">
                      {{new_client.btn_text}}
                    </v-btn>
                    <span>{{new_client.tooltip}}</span>
                  </v-tooltip>
                </div>
              </div>


              <div class="comparison-column" v-for="compare in response.find_data">
                <div class="comparison-title">Клиент в базе</div>
                <div class="comparison-content">
                  <v-text-field label="ID" v-model="compare.id"></v-text-field>
                  <v-text-field label="ФИО" v-model="compare.name"></v-text-field>
                  <v-text-field label="Почта" v-model="compare.email"></v-text-field>
                  <v-text-field label="Телефон" v-model="compare.phone"></v-text-field>
                  <v-text-field label="Паспорт" v-model="compare.phone"></v-text-field>
                  <v-text-field label="Адрес" v-model="compare.city"></v-text-field>
                  <v-textarea label="Информация" v-model="compare.info" auto-grow rows="1"></v-textarea>

                  <v-text-field label="Дата создания" hint="дата создания клиента"
                                v-model="compare.created_at"></v-text-field>
                </div>
                <div class="comparison-actions">
                  <v-layout wrap>
                    <v-tooltip top>
                      <v-btn slot="activator" small color="success"
                             :to="{name:'clients-edit-id', params:{ id: compare.id}}"
                             target="_blank">Обновить
                      </v-btn>
                      <span>Обновить профиль этого клиента</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <v-btn slot="activator" small :to="{name:'clients-edit-id', params:{ id: compare.id}}"
                             target="_blank">Профиль
                      </v-btn>
                      <span>Открыть профиль в новой вкладке браузера</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn small slot="activator" color="primary" @click="updateClient(compare)">Выбрать</v-btn>
                      <span>Подставить в заявку этого клиента (новый клиент не будет создан)</span>
                    </v-tooltip>
                  </v-layout>
                </div>
              </div>

            </div>


          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        progress: true,
        mail_select: {
          info: null
        },
        messages: null,
        modal_begin_date: false,
        modal_end_date: false,
        select_room: {
          "id": null,
          "name": null,
          "room_type_id": null,
          "quantity": null,
          "type": null,
          "created_at": null,
          "updated_at": null,
          "room_type": {
            "id": null,
            "name": null,
            "info": null,
            "created_at": null,
            "updated_at": null
          }
        },
        rooms: null,
        discount: '',
        response: {
          data: {
            "id": null,
            "full_name": null,
            "email": null,
            "phone": null,
            "city": null,
            "message": null,
            "begin_date": '',
            "end_date": '',
            "room": '',
            "adult": null,
            "kids": null,
            "parking": null,
            "beds": null,
            "is_get": null,
            "is_queue": null,
            "is_answer": null
          },
          "total_sum": null,
          "prepaid": null,
          "find_data": [
            {
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
            }
          ],
          "errors": null
        },
        compare_client: {
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
        new_client: {
          btn_color: 'success',
          btn_text: 'Создать новый профиль клиента',
          state: true, // true = создание нового клиента, false = обновление данных с базы
          tooltip: 'Будет создан новый клиент с такими параметрами',
        }
      }
    },
    watch: {
      select_room(after, before) {
        console.log('watcher select_room');
        console.log('----');
        console.log(before);
        console.log(after);
        console.log('----');

      },
      mail_select(after, before) {
        console.log('watcher mail_select');
        console.log('----');
        console.log(before);
        console.log(after);
        console.log('----');
        let order_num = 'Ваш номер брони - ' + this.getOrderNum(this.response.data.room, this.response.data.begin_date, this.response.data.end_date) + "; ";
        let begin_date = 'Дата заезда - ' + this.formatDate(this.response.data.begin_date) + "; ";
        let end_date = 'Дата выезда - ' + this.formatDate(this.response.data.end_date) + "; ";
        let adult = 'Взрослых - ' + this.response.data.adult + "; ";
        let kids = 'Детей  - ' + this.response.data.kids + "; ";
        let parking = 'Парковочных мест - ' + this.response.data.parking + "; ";
        let beds = 'Дополнительных кроватей - ' + this.response.data.adult + "; ";
        this.mail_select.info = after.info + ' | ' + order_num + begin_date + end_date + adult + kids + parking + beds;
      }
    },
    created() {
      this.axios.get('reserves/' + this.$route.params.id + '/edit').then((response) => {
        console.log(response);
        this.response = response.data;
        this.getRooms();

      }).catch((error) => {
        console.log(error.response);
        this.response = error.response.data;
        this.getRooms();
      });

      this.axios.get('messages').then((response) => {
        this.messages = response.data.messages;
      })


    },
    mounted() {
      if (this.response.find_data) {
        this.dialog = true;
      }
    },
    methods: {
      updateClient(client) {

        this.response.data.full_name = client.name;
        this.response.data.email = client.email;
        this.response.data.phone = client.phone;
        this.response.data.city = client.address;

        // Если этот обьект будет не пустым - вставим client_id,  в создание брони
        this.compare_client = client;
        this.new_client.btn_text = 'Обновить данные';
        this.new_client.btn_color = 'primary';
        this.new_client.state = false;
        this.new_client.tooltip = 'Подставлен клиент с базы (новый клиент не будет создан)'


      },
      queueRequest() {

      },
      updateRequest() {
        this.progress = true;
        this.axios.patch('reserves/' + this.response.data.id, this.response.data).then((response) => {
          console.log(response.data);
          let id = response.data.id;
          this.axios.get('reserves/' + id + '/edit').then((response) => {
            console.log(response);
            this.response = response.data;
            this.progress = false;

          }).catch((error) => {
            console.log(error.response);
            this.response = error.response.data;
            this.progress = false;

          });
        });

      },
      saveRequest() {
        this.progress = true;
        let new_order = this.response.data;

        new_order.order_num = this.getOrderNum();
        new_order.discount = this.discount;
        new_order.prepaid = this.response.prepaid;


        new_order.begin_date = this.formatDate(this.response.data.begin_date);
        new_order.end_date = this.formatDate(this.response.data.end_date);


        if (this.compare_client.id !== null) {
          new_order.client_id = this.compare_client.id;
          this.postRequest(new_order);
        } else {
          //  Создать клиента и уже потом создать бронь с этим клиентом

          let client = {};
          client.name = this.response.data.full_name;
          client.passport = '';
          client.phone = this.response.data.phone;
          client.email = this.response.data.email;
          client.address = this.response.data.city;
          client.info = '';

          this.axios.post('clients', client).then((response) => {
            new_order.client_id = response.data.client.id;
            this.postRequest(new_order);
          }).catch((error) => {
            console.log(error);
          });
        }

      },
      postRequest(new_order) {
        this.axios.post('orders', new_order).then((response) => {
          this.$router.push({name:'reservations-id', params:{id: response.data.id}})
        }).catch((error) => {
          console.log(error.response);
          console.log(error.response.data);
        });
      },
      getRooms() {
        this.axios.get('rooms').then((response) => {
          this.rooms = response.data.rooms;
          for (let i = 0; i < this.rooms.length; i++) {
            if (parseInt(this.rooms[i].name) == this.response.data.room) {
              this.select_room = this.rooms[i];
            }
          }
          this.progress = false;
        })
      },
      getOrderNum() {
        let format_date = '';
        format_date = this.response.data.room + this.formatDateOrder(this.response.data.begin_date) + this.formatDateOrder(this.response.data.end_date);
        return format_date;
      },
      formatDateOrder(date) {
        let date_formatted = '';
        let arr_date = date.split("-");
        date_formatted = arr_date[2] + arr_date[1] + arr_date[0];
        return date_formatted;
      },
      formatDate(date) {
        let date_formatted = '';
        let arr_date = date.split("-");
        date_formatted = arr_date[2] + '-' + arr_date[1] + '-' + arr_date[0];
        return date_formatted;
      },
      routerBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

  .comparison-table {
    display: flex;
    overflow: auto;
  }

  .comparison-column {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 5px;
    min-width: 350px;

  }

  .comparison-title {
    font-size: 18px;
    background: #ff5252;
    margin: -15px -15px 0px -15px;
    padding: 5px;
    text-align: center;
    color: white;
  }

  .comparison-content {
  }

  .card-content .flex {
    padding: 10px !important;
  }

  .progress_loader {
    height: 200px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
</style>
