<template>
    <div class="elevation-3 settings-page">

        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar flat>
                        <v-toolbar-title>Настройки</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>

                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn icon @click="startTour">
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>
            <template v-if="progress">
                <div class="progress-container">
                    <v-progress-circular
                            :size="70"
                            :width="7"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </template>
            <template v-else>
                <v-card-text>
                    <v-text-field
                            v-model="settings.parking_col"
                            type="number"
                            label="Количество парковочных мест"
                            class="step-1"
                    ></v-text-field>

                    <v-text-field
                            v-model="settings.beds_col"
                            type="number"
                            label="Количество дополнительных кроватей"
                            class="step-2"

                    ></v-text-field>

                    <v-text-field
                            v-model="settings.service_email"
                            label="Почта администратора на которую дублируется вся почта"
                            class="step-3"

                    ></v-text-field>

                    <v-dialog ref="dialog_begin" v-model="modal_begin_date" :return-value.sync="settings.begin"
                              persistent lazy
                              full-width
                              width="290px">
                        <v-text-field slot="activator" v-model="settings.begin" label="Начальная дата базового периода"
                                      readonly class="step-4"></v-text-field>
                        <v-date-picker v-model="settings.begin" scrollable locale="ru-ru">
                            <v-btn flat color="primary" @click="modal_begin_date = false">Закрыть</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="$refs.dialog_begin.save(settings.begin)">Обновить</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog ref="dialog_end" v-model="modal_end_date" :return-value.sync="settings.end"
                              persistent lazy
                              full-width
                              width="290px">
                        <v-text-field slot="activator" v-model="settings.end" label="Конечная дата базового периода"
                                      readonly class="step-5"></v-text-field>
                        <v-date-picker v-model="settings.end" scrollable locale="ru-ru">
                            <v-btn flat color="primary" @click="modal_end_date = false">Закрыть</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="$refs.dialog_end.save(settings.end)">Обновить</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-text-field
                            v-model="settings.col_prepaid_days"
                            type="number"
                            label="Количество дней за которые берется предоплата"
                            class="step-6"
                    ></v-text-field>

                </v-card-text>
            </template>

            <v-card-actions>
                <v-btn color="success" @click="save">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {STEPS} from '../../utils/tours/settings'

    export default {
        name: 'settings',
        head() {
            return {
                title: 'Настройки'
            }
        },
        data() {
            return {
                settings: {
                    "id": null,
                    "beds_col": null,
                    "parking_col": null,
                    "service_email": null,
                    "begin": null,
                    "end": null,
                    "col_prepaid_days": null,
                    "created_at": null,
                    "updated_at": null
                },
                // helpers
                progress: true,
                modal_begin_date: false,
                modal_end_date: false,
                date_begin: new Date().toISOString().substr(0, 10),


            };
        },
        created() {
            this.getData();
        },
        mounted: function () {
        },
        methods: {

            getData() {
                this.axios.get('settings').then((response) => {
                    this.settings = response.data.data;

                    this.progress = false;
                }).catch((error) => {
                    console.log(error.response);
                });
            },
            save() {
                this.progress = true;
                this.axios.patch('settings/' + this.settings.id, this.settings).then((response) => {
                    this.progress = false;
                }).catch((error) => {
                    console.log(error.response);
                });
            },
            startTour() {

                this.$intro().setOptions({
                    'nextLabel': 'Далее',
                    'prevLabel': 'Назад',
                    'skipLabel': 'Пропустить',
                    'doneLabel': 'Прочитал',
                    steps: STEPS
                }).start(); // start the guide
                this.$intro().showHints(); // show hints
            }
        }
    };
</script>

<style scoped>
    .settings-page {
        max-width: 500px;
    }
</style>