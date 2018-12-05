<template>
    <v-layout>
        <v-flex >
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Статистика Предоплат                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <span>C </span>
                    <v-dialog ref="ref_modal_begin_date" v-model="modal_begin_date"
                              :return-value.sync="request.begin_date" persistent lazy full-width
                              width="290px">

                        <v-text-field slot="activator" v-model="request.begin_date" label="Дата заезда"
                                      class="ml-3 mr-3 toolbar-input" solo required></v-text-field>
                        <v-date-picker v-model="request.begin_date" scrollable :first-day-of-week="1"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_begin_date.save(request.begin_date)">
                                Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <span>По </span>
                    <v-dialog ref="ref_modal_end_date" v-model="modal_end_date" :return-value.sync="request.end_date"
                              persistent lazy full-width width="290px">
                        <v-text-field slot="activator" v-model="request.end_date" label="Дата выезда"
                                      class="ml-2 mr-3 toolbar-input" readonly solo required></v-text-field>
                        <v-date-picker v-model="request.end_date" scrollable :first-day-of-week="1"
                                       :min="request.begin_date"
                                       locale="ru-ru">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                            <v-btn color="primary"
                                   @click="$refs.ref_modal_end_date.save(request.end_date)">Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-btn color="primary" large>
                        Подсчитать
                    </v-btn>

                </v-toolbar>
                <v-alert :value="true" color="grey">
                    С 01-01-2018 по 31-12-2018 число. Всего 477375 грн.
                </v-alert>
                <table id="DataTable" ref="DataTable" class="table table-striped table-bordered"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th class="export">Номер</th>
                        <th class="export">Дата предоплаты</th>
                        <th class="export">ФИО</th>
                        <th class="export">Сумма  предоплаты</th>
                        <th class="export">Информация</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="res in response">
                        <td>{{res.room}}</td>
                        <td>{{res.date}}</td>
                        <td>{{res.name}}</td>
                        <td>{{res.summ}}</td>
                        <td>{{res.info}}</td>
                    </tr>
                    </tbody>
                </table>
                <v-alert :value="true" color="grey">
                    С 01-01-2018 по 31-12-2018 число. Всего 477375 грн.
                </v-alert>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name:'clients',
        data() {
            return {
                request: {
                    begin_date: '',
                    end_date: '',
                },
                response: [{
                    "room": "205",
                    "date": "19-06-2018",
                    "name": "Тараненко Екатерина Анатольевна",
                    'summ': '1400',
                    'info': 'Добрый день Хотим забронировать и оплатить номер 1 на 30.08-01.09. 2 взрослых, 1 ребенок. Старая ссылка на бронь номера 4 не работает. Ту бронь, пожалуйста, снимите.'
                }]
            };
        }
    };
</script>