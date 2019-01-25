<template>
    <v-app>

        <vue-snotify></vue-snotify>
        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <navbar-list></navbar-list>
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
                <v-btn flat slot="activator">
                    {{$store.state.pay_without_prepaid}}
                </v-btn>
                <span>Сумма полученных наличных,    помимо предоплаты, с 1 Января текущего  года по настоящий момент</span>
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
    import NavbarList from "../components/NavbarList"

    export default {
        middleware: 'auth',
        components: {
            NavbarList
        },
        data() {
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

        created() {

            this.axios.get('app-load-show').then((response) => {
                this.$store.commit('set', {type: 'pay_without_prepaid', value: response.data.pay_without_prepaid});
            });
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
