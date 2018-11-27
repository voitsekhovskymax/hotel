<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
        >
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
                    <!-- Единичная ссылка -->
                    <v-list-tile v-else :key="item.text" @click="initializationRouter(item)">
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
            <v-toolbar-side-icon @click="drawer = !drawer;"/>
            <v-toolbar-title v-text="title" class="ml-3 mr-5"/>
            <v-autocomplete
                    :loading="loading"
                    :items="search_items"
                    :search-input.sync="search"
                    v-model="select"
                    cache-items
                    class="mx-3"
                    flat
                    clearable
                    hide-no-data
                    label="Поиск.."
                    solo-inverted
            ></v-autocomplete>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <div class="pa-3">
                <no-ssr>
                    <nuxt/>
                </no-ssr>
            </div>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
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
                            {icon: 'add', text: 'Новые заявки', src: 'requests'},
                            {icon: 'add', text: 'Все брони', src: 'reservations'},
                        ]
                    },
                    {icon: 'attach_money', text: 'Цены на номера', src: 'prices'},
                    {icon: 'list', text: 'Очередь', src: "queue"},
                    {
                        icon: 'keyboard_arrow_up',
                        'icon-alt': 'calendar_view_day',
                        text: 'Отчеты',
                        model: false,
                        children: [
                            {icon: 'directions_car', text: 'Трансфер', src: 'transfer'},
                            {icon: 'local_parking', text: 'Паркоместа', src: 'parking'},
                            {icon: 'donut_large', text: 'Статистика предоплат', src: 'prepaid'},
                            {icon: 'donut_small', text: 'Статистика оплат', src: 'payment'},
                            {icon: 'supervised_user_circle', text: 'Клиенты', src: 'clients'}
                        ]
                    },
                    {icon: 'mail_outline', text: 'Рассылка писем', src: 'messages'},
                    {
                        icon: 'keyboard_arrow_up',
                        'icon-alt': 'settings_applications',
                        text: 'Параметры приложения',
                        model: false,
                        children: [
                            {icon: 'person', text: 'Пользователи', src: 'users'},
                            {icon: 'local_grocery_store', text: 'Тип оплаты', src: 'payment_types'},
                            {icon: 'home', text: 'Тип номеров', src: 'room_types'},
                            {icon: 'done_all', text: 'Статус номеров', src: 'room_statuses'},
                            {icon: 'local_hotel', text: 'Все номера', src: 'rooms'},
                            {icon: 'backup', text: 'Восстановление данных', src: 'backup'},
                        ]
                    },
                    {icon: 'settings', text: 'Настройки', src: 'settings'},
                    {icon: 'exit_to_app', text: 'Выйти', src: 'logout'}
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: "Отель Маяк",
                loading: false,
                search: null,
                search_items: [],
                select: null,
                states: [
                    'Alabama',
                    'Alaska',
                    'American Samoa',
                    'Arizona',
                    'Arkansas',
                    'California',
                    'Colorado',
                    'Connecticut',
                    'Delaware',
                    'District of Columbia',
                    'Federated States of Micronesia',
                    'Florida',
                    'Georgia',
                    'Guam',
                    'Hawaii',
                    'Idaho',
                    'Illinois',
                    'Indiana',
                    'Iowa',
                    'Kansas',
                    'Kentucky',
                    'Louisiana',
                    'Maine',
                    'Marshall Islands',
                    'Maryland',
                    'Massachusetts',
                    'Michigan',
                    'Minnesota',
                    'Mississippi',
                    'Missouri',
                    'Montana',
                    'Nebraska',
                    'Nevada',
                    'New Hampshire',
                    'New Jersey',
                    'New Mexico',
                    'New York',
                    'North Carolina',
                    'North Dakota',
                    'Northern Mariana Islands',
                    'Ohio',
                    'Oklahoma',
                    'Oregon',
                    'Palau',
                    'Pennsylvania',
                    'Puerto Rico',
                    'Rhode Island',
                    'South Carolina',
                    'South Dakota',
                    'Tennessee',
                    'Texas',
                    'Utah',
                    'Vermont',
                    'Virgin Island',
                    'Virginia',
                    'Washington',
                    'West Virginia',
                    'Wisconsin',
                    'Wyoming'
                ]
            };
        },
        beforeCreate() {
            var token = this.$cookies.get('token');
            if (token != undefined) {
                console.log(token);
                this.$store.commit('set', {type: 'token', value: token})

            } else {
                this.$router.push('/login');

            }
        },
        watch: {
            search(val) {
                val && val !== this.select && this.querySelections(val)
            }
        },
        methods: {
            initializationRouter(src) {
                console.log(src);
            },
            querySelections(v) {
                this.loading = true;
                // Simulated ajax query
                setTimeout(() => {
                    this.search_items = this.states.filter(e => {
                        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            }
        }
    };
</script>
