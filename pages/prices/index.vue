<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-toolbar-title> Все цены за &nbsp;</v-toolbar-title>
                        <v-menu :nudge-width="100">
                            <v-toolbar-title slot="activator">
                                <span>{{year}}</span>
                                <v-icon>arrow_drop_down</v-icon>
                            </v-toolbar-title>

                            <v-list>
                                <v-list-tile
                                        v-for="y in years"
                                        :key="y"
                                        @click="year = y"
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
                                    v-for="item in periods"
                                    :key="item.id"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.info }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.begin_date }} | {{ item.end_date }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>

                                    <v-btn color="primary" :to="{name:'prices-id', params:{id:item.id}}">
                                        Перейти
                                    </v-btn>

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
                                          :return-value.sync="editPeriod.begin_date" persistent lazy full-width
                                          width="290px">
                                    <v-text-field slot="activator" v-model="editPeriod.begin_date"
                                                  label="Дата начала периода"
                                                  outline required></v-text-field>
                                    <v-date-picker v-model="editPeriod.begin_date" scrollable :first-day-of-week="1"
                                                   locale="ru-ru">
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="edit_begin_date = false">Закрыть
                                        </v-btn>
                                        <v-btn flat color="primary"
                                               @click="$refs.ref_modal_edit_begin_date.save(editPeriod.begin_date)">
                                            Подтвердить
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>

                                <v-dialog ref="ref_modal_edit_end_date" v-model="edit_end_date"
                                          :return-value.sync="editPeriod.end_date" persistent lazy full-width
                                          width="290px">
                                    <v-text-field slot="activator" v-model="editPeriod.end_date" label="Дата выезда"
                                                  readonly outline required></v-text-field>
                                    <v-date-picker v-model="editPeriod.end_date" scrollable :first-day-of-week="1"
                                                   :min="editPeriod.begin_date"
                                                   locale="ru-ru">
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="edit_end_date = false">Закрыть</v-btn>
                                        <v-btn flat color="primary"
                                               @click="$refs.ref_modal_edit_end_date.save(editPeriod.end_date)">
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
                    <v-btn color="success" @click="dialogEdit = false">Сохранить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogEdit = false">Закрыть</v-btn>
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
                                    <v-text-field slot="activator" v-model="newPeriod.end_date" label="Дата выезда"
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
                    <v-btn color="success" @click="dialogNew = false">Сохранить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogNew = false">Закрыть</v-btn>
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
                                <v-list-tile-sub-title>{{ deletePeriod.begin_date }} | {{ deletePeriod.end_date }}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="dialogDelete = false">Удалить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogDelete = false">Закрыть</v-btn>
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
                year: 2018,
                years: [2015, 2016, 2017, 2018, 2019],
                periods: [
                    {
                        id: '1',
                        name: 'Белый',
                        begin_date: '01-06-2017',
                        end_date: '15-07-2017',
                        info: 'Начало сезона'
                    },

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
            openNewDialog(period) {
                this.dialogNew = true;

            }
        }
    };
</script>


