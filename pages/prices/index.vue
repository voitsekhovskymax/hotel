<template>
  <div class="elevation-3">
    <v-card>
      <v-layout wrap>
        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-toolbar-title> Все цены за &nbsp;</v-toolbar-title>
            <v-menu :nudge-width="100">
              <v-toolbar-title slot="activator">
                <span>{{currentYear}}</span>
                <v-icon>arrow_drop_down</v-icon>
              </v-toolbar-title>

              <v-list>
                <v-list-tile
                  v-for="y in years"
                  :key="y"
                  @click="currentYear = y"
                >
                  <v-list-tile-title v-text="y"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-flex>

        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="openNewDialog">
              Новый период
            </v-btn>

            <v-btn icon>
              <v-icon>help_outline</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-card-text>


        <v-layout row wrap>
          <v-flex>
            <v-list three-line>
              <v-list-tile
                v-for="period in response"
                :key="period.id"
                v-if="period.period == currentYear"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ period.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ period.info }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ period.begin }} | {{ period.end }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>

                  <v-btn color="primary" :to="{name:'prices-id', params:{id:period.id}}">
                    Перейти
                  </v-btn>

                </v-list-tile-action>

                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn icon ripple slot="activator" @click="openEditDialog(period)">
                      <v-icon color="success">edit</v-icon>
                    </v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn icon ripple slot="activator" @click="openDeleteDialog(period)">
                      <v-icon color="grey lighten-1">delete</v-icon>
                    </v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>

    </v-card>

    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Редактирование периода цен <b>{{editPeriod.name}}</b></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Название Периода" v-model="editPeriod.name" outline
                              required></v-text-field>

                <v-dialog ref="ref_modal_edit_begin_date" v-model="edit_begin_date"
                          :return-value.sync="editPeriod.begin" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="editPeriod.begin"
                                label="Дата начала периода"
                                outline required></v-text-field>
                  <v-date-picker v-model="editPeriod.begin" scrollable :first-day-of-week="1"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edit_begin_date = false">Закрыть
                    </v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_edit_begin_date.save(editPeriod.begin)">
                      Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

                <v-dialog ref="ref_modal_edit_end_date" v-model="edit_end_date"
                          :return-value.sync="editPeriod.end" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="editPeriod.end" label="Дата окончания периода"
                                readonly outline required></v-text-field>
                  <v-date-picker v-model="editPeriod.end" scrollable :first-day-of-week="1"
                                 :min="editPeriod.begin"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edit_end_date = false">Закрыть</v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_edit_end_date.save(editPeriod.end)">
                      Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field label="Информация" v-model="editPeriod.info" outline
                              required></v-text-field>

              </v-flex>
            </v-layout>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogEdit = false">Закрыть</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="saveEditPeriod">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNew" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Создание нового периода цен</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Название Периода" v-model="newPeriod.name" outline
                              required></v-text-field>

                <v-dialog ref="ref_modal_new_begin_date" v-model="new_begin_date"
                          :return-value.sync="newPeriod.begin_date" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="newPeriod.begin_date"
                                label="Дата начала периода"
                                outline required></v-text-field>
                  <v-date-picker v-model="newPeriod.begin_date" scrollable :first-day-of-week="1"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="new_begin_date = false">Закрыть
                    </v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_new_begin_date.save(newPeriod.begin_date)">
                      Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

                <v-dialog ref="ref_modal_new_end_date" v-model="new_end_date"
                          :return-value.sync="newPeriod.end_date" persistent lazy full-width
                          width="290px">
                  <v-text-field slot="activator" v-model="newPeriod.end_date" label="Дата окончания периода"
                                readonly outline required></v-text-field>
                  <v-date-picker v-model="newPeriod.end_date" scrollable :first-day-of-week="1"
                                 :min="newPeriod.begin_date"
                                 locale="ru-ru">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="new_end_date = false">Закрыть</v-btn>
                    <v-btn flat color="primary"
                           @click="$refs.ref_modal_new_end_date.save(newPeriod.end_date)">
                      Подтвердить
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field label="Информация" v-model="newPeriod.info" outline
                              required></v-text-field>

              </v-flex>
            </v-layout>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogNew = false">Закрыть</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="saveNewPeriod">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Вы действительно хотите удалить этот период цен?</span>
        </v-card-title>
        <v-card-text>
          <v-list three-line>
            <v-list-tile
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ deletePeriod.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ deletePeriod.info }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ deletePeriod.begin }} | {{ deletePeriod.end }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="dialogDelete = false">Закрыть</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteSelectedPeriod">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>

  export default {
    name: 'prices',
    data() {
      return {
        // data
        currentYear: null,
        years: [],
        response: [
          {
            "id": null,
            "name": null,
            "begin": null,
            "end": null,
            "info": null,
            "period": null,
            "created_at": null,
            "updated_at": null
          }
        ],
        newPeriod: {
          name: '',
          begin_date: '',
          end_date: '',
          info: '',
        },
        editPeriod: {
          name: '',
          begin_date: '',
          end_date: '',
          info: '',
        },
        deletePeriod: {
          name: '',
          begin_date: '',
          end_date: '',
          info: '',

        },
        //    helpers
        dialogNew: false,
        dialogEdit: false,
        dialogDelete: false,
        edit_end_date: false,
        edit_begin_date: false,
        new_end_date: false,
        new_begin_date: false,
      };
    },
    created() {
      this.currentYear = new Date().getFullYear();

      this.axios.get('periods',).then((response) => {
        this.response = response.data;

        //Заполнения массива лет (years) для выбора периодов за определенный год
        for (let i = 0; i <= this.response.length; i++) {
          let isset = false;
          for (let j = 0; j < this.years.length; j++) {
            if (this.response[i].period === this.years[j]) {
              isset = true;
            }
          }
          if (!isset) {
            this.years.push(this.response[i].period)
          }
        }


        console.log(this.response)
      });
    },
    beforeMount: function () {
    },
    mounted() {

    },
    methods: {
      openEditDialog(period) {
        this.dialogEdit = true;
        this.editPeriod = period;

      },
      openDeleteDialog(period) {
        this.dialogDelete = true;
        this.deletePeriod = period;

      },
      openNewDialog() {
        this.dialogNew = true;
      },
      saveNewPeriod() {
        this.dialogNew = false;
        this.axios.post('periods', this.newPeriod).then((response) => {
          console.log(response)
        });
      },
      saveEditPeriod(){
        this.dialogEdit = false;
        this.axios.put('periods', this.editPeriod).then((response) => {
          console.log(response)
        });
      },
      deleteSelectedPeriod(){
        this.dialogDelete = false;
        this.axios.delete('periods', this.deletePeriod).then((response) => {
          console.log(response)
        });
      }
    }
  };
</script>


