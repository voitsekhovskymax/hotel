<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent class="no-shadow">
                    <v-toolbar-title>Статистика Оплат</v-toolbar-title>
                    <v-spacer/>
                    <span>C </span>
                    <v-dialog
                            ref="ref_modal_begin_date"
                            v-model="modal_begin_date"
                            :return-value.sync="begin_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                v-model="begin_date"
                                label="Дата заезда"
                                class="ml-3 mr-3 toolbar-input"
                                solo
                                required
                        />
                        <v-date-picker
                                v-model="begin_date"
                                :first-day-of-week="1"
                                scrollable
                                locale="ru-ru"
                        >
                            <v-spacer/>
                            <v-btn flat color="primary"
                                   @click="modal_begin_date = false;"
                            >Закрыть
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    @click="$refs.ref_modal_begin_date.save(begin_date);"
                            >
                                Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <span>По </span>
                    <v-dialog
                            ref="ref_modal_end_date"
                            v-model="modal_end_date"
                            :return-value.sync="end_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                v-model="end_date"
                                label="Дата выезда"
                                class="ml-2 mr-3 toolbar-input"
                                readonly
                                solo
                                required
                        />
                        <v-date-picker
                                v-model="end_date"
                                :first-day-of-week="1"
                                :min="begin_date"
                                scrollable
                                locale="ru-ru"
                        >
                            <v-spacer/>
                            <v-btn flat color="primary"
                                   @click="modal_end_date = false;"
                            >Закрыть
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    @click="$refs.ref_modal_end_date.save(end_date);"
                            >Подтвердить
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-btn color="primary" large @click="updateTable"> Подсчитать</v-btn>
                </v-toolbar>


            </v-card>
        </v-flex>


    </v-layout>
</template>

<script>

    import {datePickerFormat} from "~~/libs/utils";

    export default {
        name: "Payment",
        head() {
            return {
                title: 'Отчет по оплатам'
            }
        },
        data() {
            return {
                // data
                begin_date: new Date().toISOString().substr(0, 10),
                end_date: new Date().toISOString().substr(0, 10),
                response: null,
                // helpers
                modal_begin_date: false,
                modal_end_date: false,
                dialogReservation: false,
                selectReservation: null
            };
        },
        beforeMount() {
            this.axios
                .post("payment", {
                    begin_date: this.$route.params.begin_date,
                    end_date: this.$route.params.end_date
                })
                .then(response => {
                    this.response = response.data;
                    console.log('init');
                    console.log(this.response);
                    this.begin_date = datePickerFormat(response.data.date_str[0]);
                    this.end_date = datePickerFormat(response.data.date_str[1]);
                });
        },
        methods: {

            updateTable() {
                //2018-01-01/2018-12-29

                //todo что-то не так с датами
                // Возможно следует сделать _begin_date.vue \ _end_date.vue
                console.log(this.begin_date);
                console.log(this.end_date);
                this.axios
                    .post("payment", {
                        begin_date: this.begin_date,
                        end_date: this.end_date
                    })
                    .then(response => {
                        console.log('update');
                        console.log(this.response);
                        this.response = response.data;
                        this.begin_date = datePickerFormat(response.data.date_str[0]);
                        this.end_date = datePickerFormat(response.data.date_str[1]);
                    });
            }
        }
    };
</script>
<style src="~/assets/Bootstrap-4-4.1.1/css/bootstrap.min.css" scoped/>
<style src="~/assets/datatables/css/dataTables.bootstrap4.css" scoped/>

