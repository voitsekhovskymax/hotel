<template>
    <div class="elevation-3">
        <v-card>
            <v-layout wrap>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon :to="{name:'prices'}">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title> Цены типов номеров периода "{{period.name}}", за 2018 год</v-toolbar-title>
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
                                    <v-list-tile-title>{{ item.type }}</v-list-tile-title>
                                    <v-list-tile-sub-title> Цена - {{ item.price }}</v-list-tile-sub-title>
                                </v-list-tile-content>

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
                                        v-model="newPrice.type"
                                        :items="types"
                                        label="Тип номера"
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
                    <v-btn color="success" @click="dialogNew = false">Сохранить</v-btn>
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
                                        v-model="editPrice.type"
                                        :items="types"
                                        label="Тип номера"
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
                    <v-btn color="success" @click="dialogEdit = false">Сохранить</v-btn>
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
                                <v-list-tile-title>{{ deletePrice.type }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ deletePrice.price }}</v-list-tile-sub-title>
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
        name: 'prices-id',
        data() {
            return {
                // data
                year: 2018,
                years: [2015, 2016, 2017, 2018, 2019],
                period: {
                    id: '1',
                    name: 'Белый',
                    begin_date: '01-06-2017',
                    end_date: '15-07-2017',
                    info: 'Начало сезона'
                },
                prices: [
                    {type: 'Люкс 2-м', price: '500',},
                    {type: 'Люкс 3-м', price: '600',},
                    {type: 'Люкс 4-м', price: '700',},
                ],


                types: [
                    'Люкс 2-м',
                    'Люкс 3-м',
                    'Люкс 4-м'
                ],
                newPrice: {
                    type: '',
                    price: '',
                },
                editPrice: {
                    id:'',
                    type: '',
                    price: '',
                },
                deletePrice: {
                    id:'',
                    type: '',
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
        beforeMount: function () {
        },
        mounted() {

        },
        methods: {
            openEditDialog(Price) {
                this.dialogEdit = true;
                this.editPrice = Price;

            },
            openDeleteDialog(Price) {
                this.dialogDelete = true;
                this.deletePrice = Price;

            },
            openNewDialog(Price) {
                this.dialogNew = true;

            }
        }
    };
</script>


