<template>
    <v-layout row>
        <v-flex>
            <v-card>
                <v-list two-line>
                    <template v-for="(item, index) in versions">
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <span :class="['version', item.status]"> {{item.version}}</span>
                                 {{item.title}}
                                </v-list-tile-title>
                                <v-list-tile-sub-title class="text--primary">{{item.description}}
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title>{{item.date}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider
                                v-if="index + 1 < versions.length"
                                :key="index"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                versions: [
                    {
                        title: 'Локализация',
                        description: 'Установка пакетов для локализации',
                        version: '2.2.2',
                        date: '3 февраля 2018',
                        status:'info'
                    },
                    {
                        title: 'Баги',
                        description: 'Устранение багов.',
                        version: '2.2.1',
                        date: '2 февраля 2018',
                        status:'info'
                    },
                    {
                        title: 'Система логирования',
                        description: 'Добавлена система логирования',
                        version: '2.2.0',
                        date: '30 января 2018',
                        status:'success'
                    },
                    {
                        title: 'Аналитика',
                        description: 'добавил аналитику. включил sentry',
                        version: '2.1.4',
                        date: '28 января 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Восстановление удаленных Броней, Отчет по выездам, Поправка дат на отчетах',
                        version: '2.1.3',
                        date: '25 января 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'добавлен селектор локаций и блоков у комнат',
                        version: '2.1.3',
                        date: '24 января 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Типы оплат,  Статусы номеров, Типы номеров, Номера, Настройки,',
                        version: '2.1.2',
                        date: '5-15 января2018',
                        status:'info'
                    },
                    {
                        title: 'Роутер',
                        description: 'router: mode: hash, размещение на статическом сервере.',
                        version: '2.1.1',
                        date: '30 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'middleware, лоадеры, лайоут для аутентификации, периоды и цены на номера, удаление заявки и брони, Переписал меню. добавлены письма',
                        version: '2.1.0',
                        date: '27 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'уведомления, LIQPAY API',
                        version: '2.0.10',
                        date: '26 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'сделан поиск при создании новой заявки, поиск в хедере, рассылка писем, прелоадеры и прочее.',
                        version: '2.0.9',
                        date: '24 декабря 2018',
                        status:'info'
                    },

                    {
                        title: 'Функционал',
                        description: 'Создание клиента, фильтр на совпадение клиента, ',
                        version: '2.0.8',
                        date: '20 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Новые страницы',
                        version: '2.0.7',
                        date: '18 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Страница бронирования',
                        version: '2.0.6',
                        date: '17 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'datatables.net',
                        version: '2.0.5',
                        date: '16 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Доработка главной таблицы',
                        version: '2.0.4',
                        date: '5 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Появилось API на главную страницу, добавлены вьюхи для отчетов и остального',
                        version: '2.0.3',
                        date: '3 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Главная таблица',
                        description: 'Добавлена главная таблица',
                        version: '2.0.2',
                        date: '1 декабря 2018',
                        status:'info'
                    },
                    {
                        title: 'Функционал',
                        description: 'Axios, регистрация, авторизация, простой middleware',
                        version: '2.0.1',
                        date: '27 ноября 2018',
                        status:'info'
                    },
                    {
                        title: 'Vue.js, Nuxt, REST API.',
                        description: 'Инициализация новового приложения',
                        version: '2.0.0',
                        date: '23 ноября 2018',
                        status:'success'
                    },
                    {
                        title: 'Задачи',
                        description: 'Постановка задач для нофого функционала приложения',
                        version: '1.1.0',
                        date: '15 ноября 2018 - 19 нобря 2018',
                        status:'info'
                    },
                    {
                        title: 'Баг трекер',
                        description: 'Исправление багов приложения',
                        version: '1.1.0',
                        date: 'Февраль 2018 - Май 2018',
                        status:'info'
                    },

                    {
                        title: 'Расширение буферной базы',
                        description: 'Для сайта визитки и модуля бронирования на Wordpress',
                        version: '1.0.1',
                        date: 'Декабрь 2017 - Январь 2018',
                        status:'info'
                    },

                    {
                        title: 'Worksection',
                        description: 'Переезд со скайпа в Worksection для ведения разработки',
                        version: '1.0.0',
                        date: '5 декабря 2017',
                        status:'info'
                    },
                    {
                        title: 'Laravel + Bootstrap',
                        description: 'Первая версия рабочая версия',
                        version: '1.0.0',
                        date: '29 ноября 2017',
                        status:'success'
                    },

                    {
                        title: 'Допы',
                        description: 'Функционал дополнительных заданий',
                        version: '0.3.0',
                        date: 'Июль 2017',
                        status:'info'
                    },
                    {
                        title: 'Импорт данных',
                        description: 'Перенос данных со старой базы данных',
                        version: '0.2.0',
                        date: 'Июнь 2017',
                        status:'info'
                    },
                    {
                        title: 'Связь с сайтов',
                        description: 'Получение заявок с сайта Отеля',
                        version: '0.0.2',
                        date: '21 апреля 2017',
                        status:'info'
                    },
                    {
                        title: 'Старт проекта',
                        description: 'Проектирование базы данных',
                        version: '0.0.1',
                        date: 'Весна 2017',
                        status:'info'
                    }
                ]
            }
        }
    }
</script>

<style>
.version{
    color: white;
    padding: 0px 10px;
    border-radius: 9px;
    margin-right: 15px
}
</style>