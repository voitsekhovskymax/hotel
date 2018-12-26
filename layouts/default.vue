<template>
  <v-app>


    <notifications group="global"
                   position="top center"
                   :duration="-1">
      <template slot="body" slot-scope="props">
        <v-card class="notification-card">
          <v-toolbar flat :class="[props.item.type ,'white--text']">
            <div>{{props.item.title}}</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="props.close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            {{props.item.text}}
          </v-card-text>
        </v-card>

      </template>
    </notifications>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile>
          <nuxt-link to="/" class="navigation-link">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Главная
              </v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>
        </v-list-tile>
        <v-divider/>

        <template v-for="item in items">
          <!--  выпадающий список-->
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <nuxt-link :to="child.src" class="navigation-link">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </nuxt-link>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <nuxt-link :to="item.src" class="navigation-link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar clipped-left color="primary" dark="" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title" class="ml-3 mr-5 hidden-sm-and-down"/>

      <v-autocomplete v-model="search"
                      :items="results"
                      :loading="isLoading"
                      :search-input.sync="keywords"
                      return-object
                      flat
                      solo-inverted
                      class="mx-3"
                      clearable
                      :item-text="(results_type == 'clients' ) ? 'name' : 'order_num'"
                      label="Найти клиента.."
                      @input="inputChange"
                      @change="change"
      >
        <!--<template-->
        <!--slot="item"-->
        <!--slot-scope="{ item }"-->
        <!--&gt;-->
        <!--<v-list-tile-content>-->
        <!--<v-list-tile-title>item</v-list-tile-title>-->
        <!--</v-list-tile-content>-->
        <!--</template>-->
      </v-autocomplete>


      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon>credit_card</v-icon>
          33333
        </v-btn>
        <span>Сумма полученных наличных денег, помимо предоплаты, с 1 Января текущего  года по настоящий момент</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn color="success" :to="{name:'requests-new'}">
        Новая заявка
      </v-btn>
    </v-toolbar>

    <v-content>
      <div class="pa-3">
        <nuxt/>
      </div>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: true,
        drawer: null,
        fixed: false,
        items: [
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'notifications',
            text: 'Заявки',
            model: false,
            children: [
              {icon: 'add', text: 'Новые заявки', src: {name: 'requests'}},
              {icon: 'add', text: 'Все брони', src: {name: 'reservations'}},
            ]
          },
          {icon: 'attach_money', text: 'Цены на номера', src: {name: 'prices'}},
          {icon: 'list', text: 'Очередь', src: {name: "queue"}},
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'calendar_view_day',
            text: 'Отчеты',
            model: false,
            children: [
              {
                icon: 'directions_car',
                text: 'Трансфер',
                src: {
                  name: 'transfer-begin_date-end_date',
                  params: {begin_date: this.currentYear + '-01-01', end_date: this.currentDateISO} // Переход на текущий календарный год
                }
              },
              {
                icon: 'local_parking',
                text: 'Паркоместа',
                src: {
                  name: 'parking-begin_date-end_date',
                  params: {
                    begin_date: this.currentYear + '-01-01',
                    end_date: this.currentDateISO
                  } // Переход на текущий календарный год
                }
              },
              {
                icon: 'donut_large',
                text: 'Статистика предоплат',
                src: {
                  name: 'prepaid-begin_date-end_date',
                  params: {
                    begin_date: this.currentYear + '-01-01',
                    end_date: this.currentDateISO
                  } // Переход на текущий календарный год
                }
              },
              {
                icon: 'donut_small',
                text: 'Статистика оплат',
                src: {
                  name: 'payment-begin_date-end_date',
                  params: {
                    begin_date: this.currentYear + '-01-01',
                    end_date: this.currentDateISO
                  } // Переход на текущий календарный год
                }
              },
              {
                icon: 'supervised_user_circle',
                text: 'Клиенты',
                src: {
                  name: 'clients-page',
                  params: {
                    page: 1
                  }
                }
              }
            ]
          },
          {icon: 'mail_outline', text: 'Рассылка писем', src: {name: 'messages'}},
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'settings_applications',
            text: 'Параметры приложения',
            model: false,
            children: [
              {icon: 'person', text: 'Пользователи', src: {name: 'users'}},
              {icon: 'local_grocery_store', text: 'Тип оплаты', src: {name: 'payment_types'}},
              {icon: 'home', text: 'Тип номеров', src: {name: 'room_types'}},
              {icon: 'done_all', text: 'Статус номеров', src: {name: 'room_statuses'}},
              {icon: 'local_hotel', text: 'Все номера', src: {name: 'rooms'}},
              {icon: 'backup', text: 'Восстановление данных', src: {name: 'backup'}},
            ]
          },
          {icon: 'settings', text: 'Настройки', src: {name: 'settings'}},
          {icon: 'exit_to_app', text: 'Выйти', src: {name: 'logout'}}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "Отель Маяк",
        loading: false,
        select: null,
        states: [
          'Alabama',

        ],
        currentYear: null,
        currentMonth: null,
        currentDay: null,
        currentDateISO: null,

        snackbar: {
          state: null,
          color: null,
          timeout: null,
          text: null,
        },
        //search data
        isLoading: false,
        search: {},
        results: [],
        results_type: null,
        keywords: null,
      };
    },
    watch: {
      keywords(after, before) {
        if (this.keywords != null) {
          if (this.keywords.length > 2) {
            this.isLoading = true;
            this.getSearch();
          } else {
            this.results = [];
            this.results_type = null;
          }
        } else {
          this.results = [];
          this.keywords = "";
          this.results_type = null;
        }
      }
    },
    beforeCreate() {
      var token = this.$cookies.get('token');
      if (token != undefined) {
        console.log('токен найден в куки');
        this.$store.commit('set', {type: 'token', value: token});
      }
    },
    created() {

    },

    methods: {

      inputChange(val) {
        console.log('inputChange');
        console.log(val);
        if (this.results_type == 'clients') {
          this.$router.push({name: 'clients-edit-id', params: {id: val.id}})
        }
        if (this.results_type == 'order_rooms') {
          this.$router.push({name: 'reservations-id', params: {id: val.id}})

        }
      },
      change() {


      },
      getSearch() {
        this.axios.post('data-search', {
          keywords: this.keywords
        }).then((response) => {
          console.log(response);
          this.results = response.data.clients;
          this.results_type = response.data.type;
          this.isLoading = false;
        })
      },
    }
  };
</script>
