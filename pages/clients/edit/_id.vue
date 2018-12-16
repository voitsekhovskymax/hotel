<template>
  <div class="elevation-3">
    <v-card>
      <v-layout wrap>
        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-btn icon class="hidden-xs-only" :to="{name:'clients-page', params:{page:1}}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Новый клиент</v-toolbar-title>
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
      <v-card-text>

        <v-layout row wrap>
          <v-flex>
            <v-text-field
              v-model="client.name"
              label="Имя"
              required
              hint="Введите фамилию, имя, отчество клиента"
            ></v-text-field>

            <v-text-field
              v-model="client.passport"
              label="Паспорт"
              required
              hint="Введите паспортные данные клиента"
            ></v-text-field>

            <v-text-field
              v-model="client.phone"
              label="Телефон"
              required
              hint="Ограничений нет. Можно внести два номера"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="client.email"
              label="Email"
              required
              hint="Email нужен для отправки клиенту писем подтвержения бронирования"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="client.address"
              label="Адрес"
              required
              hint="Адрес клиента"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="client.info"
              label="Информация о клиенте"
              required
              hint="Краткая информация о клиенте. Используется внутри-корпоративно."
            ></v-text-field>

          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="updateClient">Обновить</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="dialog = true">Удалить</v-btn>

      </v-card-actions>
    </v-card>


    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">Вы действительно хотите удалить клиента?</v-card-title>

        <v-card-text>
          У клиента могут быть активные заявки, или бронирования. Так же к клиенту привязывается основная таблица. <b>Удаляйте
          осознанно!</b>


          <v-text-field
            v-model="client.name"
            label="Имя"
            required
            hint="Введите фамилию, имя, отчество клиента"
          ></v-text-field>

          <v-text-field
            v-model="client.passport"
            label="Паспорт"
            required
            hint="Введите паспортные данные клиента"
          ></v-text-field>

          <v-text-field
            v-model="client.phone"
            label="Телефон"
            required
            hint="Ограничений нет. Можно внести два номера"
          ></v-text-field>

          <v-text-field
            type="email"
            v-model="client.email"
            label="Email"
            required
            hint="Email нужен для отправки клиенту писем подтвержения бронирования"
          ></v-text-field>

          <v-text-field
            type="email"
            v-model="client.address"
            label="Адрес"
            required
            hint="Адрес клиента"
          ></v-text-field>

          <v-text-field
            type="email"
            v-model="client.info"
            label="Информация о клиенте"
            required
            hint="Краткая информация о клиенте. Используется внутри-корпоративно."
          ></v-text-field>

        </v-card-text>

        <v-card-actions>
          <v-btn
            color="error"
            flat
            @click="dialog = false"
          >
            Удалить клиента
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="success"

            @click="deleteClient"
          >
            Закрыть форму
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        client: {
          name: "",
          passport: "",
          phone: "",
          email: "",
          address: "",
          info: "",
        },
      };
    },
    mounted() {
      this.axios.get('clients/' + this.$route.params.id + '/edit').then((response) => {
        console.log(response);
        this.client = response.data.client;
      });
    },
    methods: {
      updateClient() {
        this.axios.post('clients', {client: this.client}).then((response) => {
          console.log(response);
        });

      },
      deleteClient() {
        this.dialog = false;
        this.axios.delete('clients/' + this.$route.params.id ).then((response) => {
          console.log(response);
          this.$router.push()
        });
      }
    }
  }
</script>
