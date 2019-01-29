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
      <loading :active.sync="loader" :is-full-page="false" :backgroundColor="'#ffffff'" :opacity="1"></loading>

      <v-alert
        :value="true"
        type="warning"
        v-if="error.text != null"
      >
        {{error.text}}
      </v-alert>

      <table id="HomeTable" ref="dataTable" class="table table-bordered home" style="width:100%">
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
                @click="getOrder(room.day[index+1])">
              {{room.day[index+1].id}}
            </td>
            <td v-else></td>
            <!--<td>{{typeof room.day}}</td>-->
          </template>

        </tr>
        </tbody>
        <tfoot>
        <tr class="parking-row">
          <td>Парк.</td>
          <template v-for="(item, index) in response.col_parking ">
            <td>
              {{response.settings_parking - item}}
            </td>
          </template>
        </tr>
        <tr class="beds-row">
          <td>Кров.</td>
          <template v-for="(item, index) in response.col_beds ">
            <td>
              {{response.settings_beds - item}}
            </td>
          </template>
        </tr>
        </tfoot>

      </table>
    </div>

    <v-dialog v-model="dialog" max-width="290" persistent fullscreen hide-overlay
              transition="dialog-bottom-transition">
      <v-card v-if="progress" class="progress_loader">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-card>

      <v-card v-else>
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">

              <v-toolbar-title>Бронь <b>{{order.orderRoom.order_num}}</b> | id: {{order.orderRoom.id}}
              </v-toolbar-title>
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
        <v-card-text class="card-content ">
          <v-layout wrap>
            <v-flex sm6 md6 xs12>
              <v-text-field label="ФИО" v-model="order.client.name"></v-text-field>

              <v-text-field label="Почта" v-model="order.client.email"></v-text-field>

              <v-text-field label="Телефон" v-model="order.client.phone"></v-text-field>

              <v-text-field label="Сумма без скидки"
                            v-model="order.orderRoom.total_payment"></v-text-field>

              <v-text-field label="Скидка" v-model="order.orderRoom.discount"></v-text-field>

              <v-text-field label="Количество дней предоплаты"
                            v-model="order.orderRoom.col_prepaid_days"></v-text-field>

              <v-text-field label="Сумма предоплаты" v-model="order.orderRoom.sum_prepaid"></v-text-field>

              <v-text-field label="Получена предоплата"
                            v-model="order.orderRoom.was_prepaid"></v-text-field>

              <v-text-field label="Доплата" v-model="order.orderRoom.was_payed"></v-text-field>

              <v-text-field label="Уплачено всего" v-model="order.orderRoom.sum_payed"></v-text-field>

              <v-text-field label="Способ оплаты" v-model="order.orderRoom.payment_type.name"
                            :hint="order.orderRoom.payment_type.info"></v-text-field>

              <v-text-field label="Статус номера" v-model="order.orderRoom.room_status.name"
                            :hint="order.orderRoom.room_status.info"></v-text-field>

            </v-flex>

            <v-flex sm6 md6 xs12>

              <v-text-field label="Дата заезда" v-model="order.orderRoom.begin_date"></v-text-field>

              <v-text-field label="Дата выезда" v-model="order.orderRoom.end_date"></v-text-field>

              <v-text-field label="Взрослые" v-model="order.orderRoom.adult"></v-text-field>

              <v-text-field label="Дети" v-model="order.orderRoom.kids"></v-text-field>

              <v-text-field label="Паркоместа (не готово)"></v-text-field>

              <v-text-field label="Дополнительные кровати" v-model="order.orderRoom.beds"></v-text-field>

              <v-textarea
                label="Информация"
                v-model="order.orderRoom.info"
                auto-grow
                rows="1"
              ></v-textarea>

              <template>
                <v-card color="grey lighten-3">

                  <v-card-title>Трансфер на вьезд</v-card-title>
                  <v-card-text>
                    <v-text-field label="Сумма"
                                  v-model="order.orderRoom.sum_transfer"></v-text-field>
                    <v-textarea
                      label="Информация"
                      v-model="order.orderRoom.info_transfer"
                      hint="Информация о трансфере на вьезд"
                      auto-grow
                      rows="1"
                    ></v-textarea>
                    <v-text-field label="Дата"
                                  v-model="order.orderRoom.date_transfer"></v-text-field>
                  </v-card-text>
                </v-card>
              </template>

              <template>
                <v-card color="grey lighten-3 mt-2">

                  <v-card-title>Трансфер на выезд</v-card-title>
                  <v-card-text>
                    <v-text-field label="Сумма"
                                  v-model="order.orderRoom.sum_transfer_back"></v-text-field>
                    <v-textarea
                      label="Информация"
                      v-model="order.orderRoom.info_transfer_back"
                      hint="Информация о трансфере на выезд"
                      auto-grow
                      rows="1"
                    ></v-textarea>
                    <v-text-field label="Дата"
                                  v-model="order.orderRoom.date_transfer_back"></v-text-field>
                  </v-card-text>
                </v-card>
              </template>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import $ from 'jquery' // подключаем jQuery
  import 'datatables.net' // подключаем сам плагин
  import 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min'
  // import 'datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.min'
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'

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
          'orderRoom': {
            'id': null,
            'room_id': null,
            'client_id': null,
            'room_status_id': null,
            'payment_type_id': null,
            'date_checkin': null,
            'date_prepaid': null,
            'days_count': null,
            'discount': null,
            'order_num': null,
            'total_payment': null,
            'sum_nal': null,
            'sum_besnal': null,
            'sum_payed': null,
            'sum_prepaid': null,
            'was_payed': null,
            'was_prepaid': null,
            'info_prepaid': null,
            'is_payed': null,
            'is_close': null,
            'parking': null,
            'parking_current_count': null,
            'parking_number': null,
            'adult': null,
            'kids': null,
            'beds': null,
            'begin_date': null,
            'end_date': null,
            'date_transfer': null,
            'sum_transfer': null,
            'info_transfer': null,
            'date_transfer_back': null,
            'sum_transfer_back': null,
            'info_transfer_back': null,
            'col_prepaid_days': null,
            'info': null,
            'order_author': null,
            'is_queue': null,
            'deleted_at': null,
            'created_at': null,
            'updated_at': null,
            'room': {
              'id': null,
              'name': null,
              'room_type_id': null,
              'quantity': null,
              'type': null,
              'created_at': null,
              'updated_at': null
            },
            'room_status': {
              'id': null,
              'name': null,
              'info': '',
              'created_at': null,
              'updated_at': null
            },
            'payment_type': {
              'id': null,
              'name': null,
              'info': '',
              'created_at': null,
              'updated_at': null
            }
          },
          'client': {
            'id': null,
            'name': null,
            'passport': null,
            'phone': null,
            'email': null,
            'address': null,
            'info': null,
            'is_black_list': null,
            'deleted_at': null,
            'created_at': null,
            'updated_at': null
          },
          'parking': [],
          'order_parking': [],
          'busy_parking': [],
          'states': {
            '1': 'Весенняя скидка',
            '2': 'Майские праздники',
            '9': 'бронь',
            '13': 'Тест отправки письма',
            '14': 'очередь',
            '15': 'предоплата получена',
            '16': 'замена номера',
            '17': 'снятие брони',
            '18': 'Трансфер',
            '19': 'освободился номер',
            '20': 'отсутствие предоплаты',
            '21': 'уточнение брони'
          },
          'liq_prepaid': null,
          'liq_paid': null
        },
        not_data: {},
        col_days: '',
        settings_beds: '',
        settings_parking: '',
        //helpers
        date_update: new Date().toISOString().substr(0, 7),
        modal_update: false,
        loader: true,
        progress: false,
        error: {
          text: null,
        },
        //    tests
        start_time: null
      }
    },

    created () {
      this.start_time = new Date()
      console.time()
      console.log('Таймер запущен')
      console.log('Страница создана. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
    },
    beforeMount () {

    },
    mounted () {
      console.log('Страница монтируется. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
      let app = this
      console.log('Запрос данных... | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
      this.axios.get('table/' + this.$route.params.month + '/' + this.$route.params.year).then((response) => {
        this.response = response.data
        this.date_update = new Date(this.response.current_year, this.response.current_month).toISOString().substr(0, 7)
        console.log('Запрос данных завершен. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
        this.generateTable()
      }).catch(function (error) {
        console.log(error.response)
        app.loader = false
        app.error.text = error.response.data.message
        console.log('Ошибка получения данных таблицы. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
      })
      console.log('Страница смонтирована. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())

    },
    updated: function () {
    },
    methods: {
      generateTable () {
        console.log('Создаем таблицу. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())

        $(document).ready(function () {
          let DATATABLE = $('#HomeTable').DataTable({
            'ordering': false,
            paging: false,
            scrollY: $(window).height() - 250 + 'px',
            'scrollX': true,
            scrollCollapse: true,
            fixedHeader: true,
          })

          new $.fn.dataTable.FixedColumns(DATATABLE, {
            leftColumns: 1,
            heightMatch: 'auto'
          })
          console.log('Таблица создана. | ' + new Date().toLocaleString() + ':' + new Date().getUTCMilliseconds())
          console.log('Таймер остановлен')
          console.timeEnd()

        })
        this.loader = false
      },
      getOrder (order) {

        console.log('выбранная клетка')
        console.log(order)
        this.dialog = true
        this.progress = true
        this.axios.get('orders/' + order.id + '/edit').then((response) => {
          console.log('Полученный номер с бекенда')
          console.log( response.data)

          this.order = response.data
          this.progress = false
        })
      },
      getUpdate (date_update) {
        let arrayDATE = date_update.split('-')
        this.$router.push({ name: 'table-year-month', params: { year: arrayDATE[0], month: arrayDATE[1] } })
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


  #HomeTable ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  #HomeTable ::-webkit-scrollbar-button {
    width: 5px;
    height: 5px;
  }

  #HomeTable ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 5px none #ffffff;
    border-radius: 50px;
  }

  /*::-webkit-scrollbar-thumb:hover {*/
  /*background: #ffffff;*/
  /*}*/
  /*::-webkit-scrollbar-thumb:active {*/
  /*background: #000000;*/
  /*}*/
  #HomeTable ::-webkit-scrollbar-track {
    background: #666666;
    border: 0px none #ffffff;
    border-radius: 50px;
  }

  #HomeTable ::-webkit-scrollbar-track:hover {
    background: #666666;
  }

  #HomeTable ::-webkit-scrollbar-track:active {
    background: #333333;
  }

  #HomeTable ::-webkit-scrollbar-corner {
    background: transparent;
  }

</style>
