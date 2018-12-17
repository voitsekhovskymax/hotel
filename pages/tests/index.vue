<template>
  <v-card>
    <v-layout wrap>
      <v-flex sm6 md6 xs12>
        <v-toolbar class="no-shadow">
          <v-btn icon @click="routerBack">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>Бронь <b>{{order.orderRoom.order_num}}</b></v-toolbar-title>
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
    <v-card-text class="card-content">
      <v-layout wrap>
        <v-flex sm6 md6 xs12>
          <v-text-field
            label="id"
            box
            v-model="order.orderRoom.id"
          ></v-text-field>


          <v-text-field
            label="ФИО"
            v-model="order.client.name"
          ></v-text-field>

          <v-text-field
            label="Почта"
            v-model="order.client.email"
          ></v-text-field>

          <v-text-field
            label="Телефон"
            v-model="order.client.phone"
          ></v-text-field>

          <v-text-field
            label="Сумма без скидки"
            v-model="order.orderRoom.total_payment"
          ></v-text-field>

          <v-text-field
            label="Скидка"
            v-model="order.orderRoom.discount"
          ></v-text-field>

          <v-text-field
            label="Количество дней предоплаты"
            v-model="order.orderRoom.col_prepaid_days"
          ></v-text-field>

          <v-text-field
            label="Сумма предоплаты"
            v-model="order.orderRoom.sum_prepaid"
          ></v-text-field>

          <v-text-field
            label="Получена предоплата"
            v-model="order.orderRoom.was_prepaid"
          ></v-text-field>


          <v-text-field
            label="Доплата"
            v-model="order.orderRoom.was_payed"
          ></v-text-field>

          <v-text-field
            label="Уплачено всего"
            v-model="order.orderRoom.sum_payed"
          ></v-text-field>

          <v-text-field
            label="Способ оплаты"
            v-model="order.orderRoom.payment_type.name"
            :hint="order.orderRoom.payment_type.info"
          ></v-text-field>

          <v-text-field
            label="Статус номера"
            v-model="order.orderRoom.room_status.name"
            :hint="order.orderRoom.room_status.info"
          ></v-text-field>

        </v-flex>

        <v-flex sm6 md6 xs12>

          <v-text-field
            label="Дата заезда"
            v-model="order.orderRoom.begin_date"
          ></v-text-field>

          <v-text-field
            label="Дата выезда"
            v-model="order.orderRoom.end_date"
          ></v-text-field>

          <v-text-field
            label="Взрослые"
            v-model="order.orderRoom.adult"
          ></v-text-field>

          <v-text-field
            label="Дети"
            v-model="order.orderRoom.kids"
          ></v-text-field>

          <v-text-field
            label="Паркоместа"
            v-model="order.orderRoom.kids"
          ></v-text-field>



        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      order: {
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
        "liq_paid": null,
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
      dialog:true,
    }
  },
  mounted(){
    this.axios.get('orders/' + 3 + '/edit').then((response) => {
      this.order = response.data;
    });
  }
}
</script>

<style scoped>
  .card-content .flex {
    padding: 10px;
  }
</style>
