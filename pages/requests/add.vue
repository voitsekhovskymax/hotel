<template>
  <v-layout>
    <v-flex>
      <v-card color="grey lighten-4">
        <v-toolbar prominent>
          <v-toolbar-title>Новая заявка</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-autocomplete v-model="search" :items="results" :loading="isLoading" :search-input.sync="keywords"
                          clearable item-text="name" label="Найти клиента.." solo>
            <template slot="no-data">
              <v-list-tile>
                <v-list-tile-title>
                  Имя, телефон или email
                </v-list-tile-title>
              </v-list-tile>
            </template>
            <!--<v-list-tile-content>-->
            <!--<v-list-tile-title v-text="item.name"></v-list-tile-title>-->
            <!--<v-list-tile-sub-title v-text="item.email"></v-list-tile-sub-title>-->
            <!--</v-list-tile-content>-->

          </v-autocomplete>
          <v-card>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6>

                  <v-text-field
                    v-model="request.full_name"
                    label="ФИО"
                    hint="Вы можете подставить значения, воспользовавшись поиском выше"
                    outline
                    required
                  ></v-text-field>


                  <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                            :return-value.sync="request.begin_date" persistent lazy full-width
                            width="290px">
                    <v-text-field slot="activator" v-model="request.begin_date" label="Дата заезда"
                                  outline required></v-text-field>
                    <v-date-picker v-model="request.begin_date" scrollable :first-day-of-week="1"
                                   locale="ru-ru">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть
                      </v-btn>
                      <v-btn flat color="primary"
                             @click="$refs.ref_modal_begin_date.save(request.begin_date)">
                        Подтвердить
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog ref="ref_modal_end_date" v-model="modal_end_date"
                            :return-value.sync="request.end_date" persistent lazy full-width
                            width="290px">
                    <v-text-field slot="activator" v-model="request.end_date" label="Дата выезда"
                                  readonly outline required></v-text-field>
                    <v-date-picker v-model="request.end_date" scrollable :first-day-of-week="1"
                                   :min="request.begin_date"
                                   locale="ru-ru">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                      <v-btn flat color="primary"
                             @click="$refs.ref_modal_end_date.save(request.end_date)">Подтвердить
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>

                  <v-text-field
                    v-model="request.email"
                    label="Email"
                    hint="Нужен для рассылки писем, и приглашений"
                    outline
                    required
                  ></v-text-field>


                  <v-text-field
                    v-model="request.phone"
                    label="Телефон"
                    outline
                    required
                  ></v-text-field>


                  <v-text-field
                    v-model="request.city"
                    label="Адрес"
                    outline
                  ></v-text-field>

                </v-flex>

                <v-flex xs12 sm12 md6 lg6>

                  <v-select
                    :items="rooms"
                    item-text="name"
                    item-value="name"
                    v-model="request.room"

                    label="Номер отеля"
                    outline
                    required
                  ></v-select>

                  <v-text-field
                    label="Количество взрослых"
                    v-model="request.adult"
                    type="number"
                    outline
                  ></v-text-field>

                  <v-text-field
                    label="Количество детей"
                    v-model="request.kids"
                    type="number"
                    outline
                  ></v-text-field>

                  <v-text-field
                    label="Паркоместа"
                    hint="Количество паркомест"
                    v-model="request.parking"
                    type="number"
                    outline
                  ></v-text-field>

                  <v-text-field
                    label="Доп. кровати"
                    hint="Количество дополнительных кроватей"
                    v-model="request.beds"
                    type="number"
                    outline
                  ></v-text-field>

                </v-flex>
                <v-btn color="success" @click="saveRequests">Сохранить</v-btn>
              </v-layout>

            </v-container>

          </v-card>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: 'reservations-add',
    data() {
      return {

        // data
        request: {
          full_name: '',
          begin_date: '',
          end_date: '',
          email: '',
          phone: '',
          city: '',
          room: '',
          adult: '',
          kids: '',
          parking: '',
          beds: '',
        },
        //    helpers
        rooms: null, //Массив с названиями комнат для заявки
        selected_room: {
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
        modal_begin_date: false,
        modal_end_date: false,
        isLoading: false,
        search: '',
        results: null,
        keywords: null,
        visibleRes: false,
      };
    },
    watch: {
      keywords(after, before) {
        if (this.keywords != null) {
          if (this.keywords.length >= 3) {
            // this.getSearch();
            this.visibleRes = true;
          } else {
            this.visibleRes = false;
            this.results = null;
          }
        } else {
          this.visibleRes = false;
          this.results = null;
          this.keywords = null;
        }
      }
    },
    created() {
      this.axios.get('rooms').then((response) => {
        this.rooms = response.data.rooms;
      })

    },
    methods: {
      saveRequests() {
        this.axios.post('reserves', this.request).then((response) => {
          console.log(response)
        })
      },
      getSearch() {
        this.axios.get('client_search', {
          params: {
            keywords: this.keywords
          }
        }).then((response) => {
          this.results = response.data;
          console.info(' this.results ↓ ↓ ');
          console.log(this.results);
        })
      },
      setClient(result) {
        this.client = result;
        this.keywords = null;
        this.results = null;
        this.visibleRes = false;
      },
    }
  };
</script>
