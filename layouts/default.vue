<template>
  <v-app :dark="$store.state.developer.options.night_theme">

    <vue-snotify></vue-snotify>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <navbar-list></navbar-list>

      <div class="footer-navbar">
        <v-tooltip top>
          <v-btn
            slot="activator"
            flat icon
            href="https://old.hotel-majak.com.ua"
            target="_blank" tabindex="-1"
          >
            <v-icon color="primary">open_in_new</v-icon>
          </v-btn>

          <span>Предыдущая версия</span>
        </v-tooltip>
      </div>

    </v-navigation-drawer>

    <v-toolbar clipped-left color="primary" dark="" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title" class="ml-3 mr-5 hidden-sm-and-down"/>

      <!--<v-autocomplete v-model="search"-->
      <!--:items="results"-->
      <!--:loading="isLoading"-->
      <!--:search-input.sync="keywords"-->
      <!--return-object-->
      <!--smAndUp-->
      <!--class="mx-3 "-->
      <!--item-text="name"-->
      <!--label="Найти клиента.."-->
      <!--@input="inputChange"-->
      <!--@change="change"-->
      <!--&gt;-->
      <!--</v-autocomplete>-->
      <v-select
        :options="results"
        :label="(results_type == 'clients' ) ? 'name'  : 'order_num'"
        class="search-select"
        @search="onSearch"
        :onChange="inputChange"
      ></v-select>

      <!--<v-combobox-->
      <!--v-model="search"-->
      <!--:search-input.sync="keywords"-->
      <!--:items="results"-->
      <!--label="Найти клиента.."-->
      <!--return-object-->
      <!--@input="inputChange"-->
      <!--@change="change"-->
      <!--item-text="name"-->
      <!--solo-->
      <!--&gt;</v-combobox>-->


      <v-tooltip bottom>
        <v-btn flat slot="activator">
          ₴ {{response.pay_without_prepaid}}
        </v-btn>
        <span>Сумма полученных наличных,    помимо предоплаты, с 1 Января текущего  года по настоящий момент. UAH \ ГРН</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn color="success" :to="{name:'requests-new'}">
        Новая заявка
      </v-btn>
      <v-toolbar-side-icon @click="developer_navbar = !developer_navbar" v-if="$store.state.developer.god_mode"/>

    </v-toolbar>

    <v-navigation-drawer
      temporary
      :right="true"
      v-model="developer_navbar"
      fixed
      v-if="$store.state.developer.god_mode"
    >
      <sidebar-developer></sidebar-developer>

    </v-navigation-drawer>

    <v-content>
      <div class="pa-3">
        <nuxt/>
      </div>
    </v-content>

  </v-app>
</template>

<script>
  import NavbarList from "../components/NavbarList"
  import SidebarDeveloper from "../components/SidebarDeveloper"

  import vSelect from 'vue-select'


  export default {
    middleware: 'auth',
    components: {
      NavbarList,
      SidebarDeveloper,
      vSelect
    },
    data () {
      return {
        clipped: true,
        drawer: null,
        fixed: false,

        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "Отель Маяк",
        loading: false,
        select: null,
        states: [
          'Alabama',

        ],


        snackbar: {
          state: null,
          color: null,
          timeout: null,
          text: null,
        },
        //search data
        isLoading: false,
        search: null,
        results: [],
        results_type: null,
        keywords: '',
        //app data
        response: {
          pay_without_prepaid: null
        }
      };
    },
    computed: {
      developer_navbar: {
        get () {
          return this.$store.state.developer.options.sidebar;
        },
        set (val) {

          this.$store.dispatch('developer/godModeOptions', {type: 'sidebar', value: val})
        }
      },

    },

    watch: {
      '$route': function () {
        this.getData();
      },
      keywords (after, before) {
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

    async created () {
      //Обработка новых заявок
      let app = this;
      await this.axios.get('neworders').then((response) => {
        if (response.data.data.length > 0) {
          this.$store.dispatch('storage/set', {type: 'count_requests', value: response.data.data.length})
          // this.$snotify.success(
          //     "Количество необработаных заявок : " + response.data.data.length,
          //     'Необработаные заявки', {
          //         timeout: 10000,
          //         showProgressBar: false,
          //         closeOnClick: true,
          //         pauseOnHover: true,
          //         // position:'centerCenter',
          //     }).on('click', function () {
          //     app.$router.push({name: 'requests'})
          // });

        }
      });

      await this.getData();

    },

    methods: {
      onSearch (search) {
        console.log('onSearch')
        console.log(search)
        if (search.length > 2) {
          this.axios.post('data-search', {
            keywords: search
          }).then((response) => {
            console.log(response);
            this.results = response.data.clients;
            this.results_type = response.data.type;
            this.isLoading = false;
          })
        }

      },
      getData () {
        this.axios.get('app-load-show').then((response) => {
          this.response = response.data;
          console.log('app-load-show');
        });
      },
      inputChange (val) {
        console.log('inputChange');
        console.log(val);
        if (val) {
          if (this.results_type == 'clients') {
            this.$router.push({name: 'clients-edit-id', params: {id: val.id}})
          }
          if (this.results_type == 'order_rooms') {
            this.$router.push({name: 'reservations-id', params: {id: val.id}})

          }
        }
      },
      change () {


      },
      getSearch () {
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
<style>
  .search-select {
    width: 350px;
    background: white;
  }

  .v-select input[type=search], .v-select input[type=search]:focus {
    color: black;
  }
</style>
