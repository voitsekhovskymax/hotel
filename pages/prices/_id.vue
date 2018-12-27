<template>
  <div class="elevation-3">
    <v-card>
      <v-layout wrap>
        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-btn icon :to="{name:'prices'}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title> Цены на номера периода <b>{{period.name}}</b>, за <b>{{ period.period}}</b> год
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-flex>

        <v-flex sm6 md6 xs12>
          <v-toolbar class="no-shadow">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="openNewDialog">
              Добавить
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
                v-for="item in prices"
                :key="item.id"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.room_type.name }}</v-list-tile-title>
                  <v-list-tile-sub-title> {{ item.room_type.info }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn flat="" ripple slot="activator">
                      {{ item.price }}
                    </v-btn>
                    <span>Цена за номер </span>
                  </v-tooltip>
                </v-list-tile-action>


                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn icon ripple slot="activator" @click="openEditDialog(item)">
                      <v-icon color="success">edit</v-icon>
                    </v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn icon ripple slot="activator" @click="openDeleteDialog(item)">
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


    <v-dialog v-model="dialogNew" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавить новую цену категории периода</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-select
                  v-model="newPrice.room_type_id"
                  :items="room_types"
                  label="Тип номера"
                  item-text="name"
                  item-value="id"
                  outline
                ></v-select>

                <v-text-field
                  v-model="newPrice.price"
                  label="Цена"
                  outline
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="saveNewPrice">Добавить</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="dialogNew = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Редактирование периода цен <b>{{editPrice.name}}</b></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-select
                  v-model="editPrice.room_type_id"
                  :items="room_types"
                  label="Тип номера"
                  item-text="name"
                  item-value="id"
                  outline
                ></v-select>

                <v-text-field
                  v-model="editPrice.price"
                  label="Цена"
                  outline
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="saveEditPrice">Сохранить</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="dialogEdit = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Вы действительно хотите удалить эту категорию цен?</span>
        </v-card-title>
        <v-card-text>
          <v-list three-line>
            <v-list-tile
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ deletePrice.room_type.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ deletePrice.room_type.info }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Цена за номер {{ deletePrice.price }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="saveDeletePrice">Удалить</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="dialogDelete = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>

  export default {
    name: 'prices-id',
    data() {
      return {
        // data
        room_types: [],
        period: {
          "id": null,
          "name": null,
          "begin": null,
          "end": null,
          "info": null,
          "period": null,
          "created_at": null,
          "updated_at": null
        },
        prices: [],


        newPrice: {
          room_type_id: '',
          price: '',
        },
        editPrice: {
          id: '',
          room_type_id: '',
          price: '',
        },
        deletePrice: {
          id: '',
          room_type: {
            "id": null,
            "name": null,
            "info": null,
            "created_at": null,
            "updated_at": null
          },
          price: '',
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
      this.getPrices();
    },
    methods: {
      saveDeletePrice() {
        this.axios.delete('prices/' + this.deletePrice.id).then((response) => {
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Успешно',
            text: "Цена за номер удалена",
          });
          this.dialogDelete = false;
          this.getPrices();
        }).catch((error) => {
          console.log(error.response);
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Ошибка',
            text: error.response.data.status,
          });
        });

      },
      saveEditPrice() {
        console.log(this.editPrice);
        this.axios.patch('prices/' + this.editPrice.id, this.editPrice).then((response) => {
          console.log(response.data);
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Успешно',
            text: "Цена за номер обновлена",
          });
          this.dialogEdit = false;
          this.getPrices();
        }).catch((error) => {
          console.log(error.response);
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Ошибка',
            text: error.response.data.status,
          });
        });
      },
      saveNewPrice() {
        this.newPrice.period_id = this.period.id;
        this.axios.post('prices', this.newPrice).then((response) => {
          console.log(response.data);
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Успешно',
            text: "Создана новая цена категории",
          });
          this.dialogNew = false;
          this.getPrices();
        }).catch((error) => {
          console.log(error.response);
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Ошибка',
            text: error.response.data.status,
          });
        });
      },
      getPrices() {
        this.axios.get('prices/' + this.$route.params.id).then((response) => {
          this.prices = response.data.prices;
          this.period = response.data.period;
          this.room_types = response.data.room_types;
          console.log(response.data);
        })
      },
      openEditDialog(Price) {
        this.dialogEdit = true;
        this.editPrice = Price;

      },
      openDeleteDialog(Price) {
        this.dialogDelete = true;
        this.deletePrice = Price;

      },
      openNewDialog() {
        this.dialogNew = true;

      }
    }
  };
</script>


