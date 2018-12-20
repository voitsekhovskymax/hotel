<template>
  <div class="elevation-3">
    <v-card>
      <v-layout wrap>
        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-btn icon @click="routerBack">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Бронь <b>{{response.orderRoom.order_num}}</b></v-toolbar-title>
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
      <v-card-text class="card-content">
        <!-- SUBTITLE INFO-->
        <v-layout wrap>
          <v-flex lg6 sm6 md6 xs12>
            <v-text-field
              v-model="response.orderRoom.room.name"
              label="Номер отеля"
              box
              readonly
            ></v-text-field>
          </v-flex>
          <v-flex lg6 sm6 md6 xs12>
            <v-text-field
              v-model="response.orderRoom.id"
              label="Порядковый номер "
              box
              readonly
            ></v-text-field>
          </v-flex>
        </v-layout>


        <!--ORDER INFO-->
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-text-field label="ФИО" v-model="response.client.name"></v-text-field>

            <v-text-field label="Почта" v-model="response.client.email"></v-text-field>

            <v-text-field label="Телефон" v-model="response.client.phone"></v-text-field>

            <v-text-field label="Сумма без скидки" v-model="response.orderRoom.total_payment"></v-text-field>

            <v-text-field label="Скидка" v-model="response.orderRoom.discount"></v-text-field>

            <v-text-field label="Количество дней предоплаты" v-model="response.orderRoom.col_prepaid_days"></v-text-field>

            <v-text-field label="Сумма предоплаты" v-model="response.orderRoom.sum_prepaid"></v-text-field>

            <v-text-field label="Получена предоплата" v-model="response.orderRoom.was_prepaid"></v-text-field>

            <v-text-field label="Доплата" v-model="response.orderRoom.was_payed"></v-text-field>

            <v-text-field label="Уплачено всего" v-model="response.orderRoom.sum_payed"></v-text-field>

            <v-text-field label="Способ оплаты" v-model="response.orderRoom.payment_type.name"
                          :hint="response.orderRoom.payment_type.info"></v-text-field>

            <v-text-field label="Статус номера" v-model="response.orderRoom.room_status.name"
                          :hint="response.orderRoom.room_status.info"></v-text-field>

          </v-flex>

          <v-flex sm6 md6 xs12>

            <v-text-field label="Дата заезда" v-model="response.orderRoom.begin_date"></v-text-field>

            <v-text-field label="Дата выезда" v-model="response.orderRoom.end_date"></v-text-field>

            <v-text-field label="Взрослые" v-model="response.orderRoom.adult"></v-text-field>

            <v-text-field label="Дети" v-model="response.orderRoom.kids"></v-text-field>

            <v-text-field label="Паркоместа (не готово)"></v-text-field>

            <v-text-field label="Дополнительные кровати" v-model="response.orderRoom.beds"></v-text-field>

            <v-textarea
              label="Информация"
              v-model="response.orderRoom.info"
              auto-grow
              rows="1"
            ></v-textarea>

            <template>
              <v-card color="grey lighten-3">

                <v-card-title>Трансфер на вьезд</v-card-title>
                <v-card-text>
                  <v-text-field label="Сумма" v-model="response.orderRoom.sum_transfer"></v-text-field>
                  <v-textarea
                    label="Информация"
                    v-model="response.orderRoom.info_transfer"
                    hint="Информация о трансфере на вьезд"
                    auto-grow
                    rows="1"
                  ></v-textarea>
                  <v-text-field label="Дата" v-model="response.orderRoom.date_transfer"></v-text-field>
                </v-card-text>
              </v-card>
            </template>

            <template >
              <v-card color="grey lighten-3 mt-2">

                <v-card-title>Трансфер на выезд</v-card-title>
                <v-card-text>
                  <v-text-field label="Сумма" v-model="response.orderRoom.sum_transfer_back"></v-text-field>
                  <v-textarea
                    label="Информация"
                    v-model="response.orderRoom.info_transfer_back"
                    hint="Информация о трансфере на выезд"
                    auto-grow
                    rows="1"
                  ></v-textarea>
                  <v-text-field label="Дата" v-model="response.orderRoom.date_transfer_back"></v-text-field>
                </v-card-text>
              </v-card>
            </template>
          </v-flex>
        </v-layout>


      </v-card-text>
    </v-card>
  </div>

</template>

<script>
  export default {
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
        params_id: this.$route.params.id
      };
    },
    mounted() {
      console.log(this.$route.params.id );
      // this.axios.get('orders/' + this.$route.params.id + '/edit').then((response) => {
      //   console.log(response);
      //   this.response = response.data;
      // });
    },
    methods: {
      routerBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .card-content .flex {
    padding: 10px !important;
  }
</style>
