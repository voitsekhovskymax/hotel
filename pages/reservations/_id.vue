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
          <v-flex lg6 sm6 md6 xs12>

            <v-text-field v-model="response.client.name" label="ФИО"></v-text-field>

            <v-text-field v-model="response.client.email" label="Почта"></v-text-field>

            <v-text-field v-model="response.client.phone" label="Телефон"></v-text-field>

            <v-text-field v-model="response.orderRoom.total_payment" label="Сумма без скидки"></v-text-field>

            <v-text-field v-model="response.orderRoom.discount" label="Скидка"></v-text-field>

            <v-text-field v-model="response.orderRoom.discount" label="Скидка"></v-text-field>

          </v-flex>
          <v-flex lg6 sm6 md6 xs12>
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
      };
    },
    mounted() {
      this.axios.get('orders/' + this.$route.params.id + '/edit').then((response) => {
        console.log(response);
        this.response = response.data;
      });
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
