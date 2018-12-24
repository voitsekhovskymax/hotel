<template>
  <div class="elevation-3">
    <template v-if="progress">
      <v-card-text class="progress_loader">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-card-text>
    </template>
    <template v-else>
      <v-card>
        <v-layout wrap>
          <v-flex sm6 md6 xs12>
            <v-toolbar class="no-shadow">
              <v-btn icon class="hidden-xs-only" @click="routerBack">
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
          <v-btn color="success" @click="newClient">Добавить</v-btn>

        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        progress: false,
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
    methods: {
      newClient() {
        this.progress = true;
        console.log(this.client);

        this.axios.post('clients', this.client).then((response) => {
          console.log(response);
          this.progress = false;

          this.$router.push({name: 'clients-edit', params: {id: response.client.id}});
        }).catch((error) => {
          console.log(error);


        });

      },
      routerBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
