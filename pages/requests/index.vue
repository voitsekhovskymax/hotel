<template>
    <v-layout>
        <v-flex>
            <v-card color="grey lighten-4">
                <v-toolbar prominent>
                    <v-toolbar-title>Все заявки</v-toolbar-title>
                    <v-tooltip bottom>
                        <v-btn slot="activator" flat icon color="success" @click="exportDataAsExcel()">
                            <v-icon>cloud_download</v-icon>
                        </v-btn>
                        <span>Скачать Excel файл</span>
                    </v-tooltip>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Новая заявка</v-btn>
                </v-toolbar>



            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name: 'requests',
        data() {
            return {
                gridOptions: {},
                columns: [

                    {headerName: 'ФИО', field: 'name'},
                    {headerName: 'Заезд', field: 'datein'},
                    {headerName: 'Выезд', field: 'dateout'},
                    {headerName: 'Почта', field: 'mail'},
                    {headerName: 'Телефон', field: 'phone'},
                    {headerName: 'Город', field: 'city'},
                    {headerName: 'Количество мест', field: 'size_room', width: 140},
                    {headerName: 'Взрослые', field: 'old', width: 80},
                    {headerName: 'Дети', field: 'junior', width: 80},
                    {headerName: 'Паркоместа', field: 'parking', width: 80},
                    {headerName: 'Допкровати', field: 'beds', width: 80},

                ],
                rowData: [

                    {
                        "name": "Brandi Eaton",
                        "datein": "Thursday, March 12, 2015 11:12 PM",
                        "dateout": "Monday, February 12, 2018 9:28 PM",
                        "mail": "brandi eaton}@voitsekhovsky.studio",
                        "phone": "+1 (822) 408-3575",
                        "city": "Ryderwood",
                        "size_room": 2,
                        "old": 3,
                        "junior": 2,
                        "parking": 1,
                        "beds": 3
                    },
                    {
                        "name": "Booker Wolfe",
                        "datein": "Thursday, September 15, 2016 11:21 AM",
                        "dateout": "Wednesday, September 23, 2015 5:35 AM",
                        "mail": "booker wolfe}@voitsekhovsky.studio",
                        "phone": "+1 (950) 508-3307",
                        "city": "Kiskimere",
                        "size_room": 2,
                        "old": 1,
                        "junior": 2,
                        "parking": 3,
                        "beds": 2
                    },
                    {
                        "name": "Pat Christian",
                        "datein": "Tuesday, February 25, 2014 5:57 PM",
                        "dateout": "Friday, April 27, 2018 1:13 PM",
                        "mail": "pat christian}@voitsekhovsky.studio",
                        "phone": "+1 (887) 544-3282",
                        "city": "Westmoreland",
                        "size_room": 2,
                        "old": 2,
                        "junior": 2,
                        "parking": 2,
                        "beds": 3
                    },
                    {
                        "name": "Dora Haney",
                        "datein": "Saturday, October 24, 2015 6:33 AM",
                        "dateout": "Friday, October 6, 2017 11:33 AM",
                        "mail": "dora haney}@voitsekhovsky.studio",
                        "phone": "+1 (959) 550-3977",
                        "city": "Venice",
                        "size_room": 3,
                        "old": 1,
                        "junior": 3,
                        "parking": 1,
                        "beds": 3
                    },
                    {
                        "name": "Barbara Burnett",
                        "datein": "Monday, January 1, 2018 5:24 AM",
                        "dateout": "Tuesday, March 6, 2018 1:42 PM",
                        "mail": "barbara burnett}@voitsekhovsky.studio",
                        "phone": "+1 (881) 522-3468",
                        "city": "Makena",
                        "size_room": 1,
                        "old": 1,
                        "junior": 2,
                        "parking": 1,
                        "beds": 3
                    },
                    {
                        "name": "Christy Pena",
                        "datein": "Thursday, January 29, 2015 2:45 AM",
                        "dateout": "Wednesday, December 14, 2016 10:10 PM",
                        "mail": "christy pena}@voitsekhovsky.studio",
                        "phone": "+1 (990) 471-3761",
                        "city": "Gorst",
                        "size_room": 1,
                        "old": 1,
                        "junior": 2,
                        "parking": 1,
                        "beds": 3
                    },
                    {
                        "name": "Pauline Head",
                        "datein": "Wednesday, March 26, 2014 11:41 PM",
                        "dateout": "Sunday, February 2, 2014 8:26 PM",
                        "mail": "pauline head}@voitsekhovsky.studio",
                        "phone": "+1 (833) 592-2925",
                        "city": "Jardine",
                        "size_room": 1,
                        "old": 1,
                        "junior": 3,
                        "parking": 3,
                        "beds": 1
                    },
                    {
                        "name": "Morrison Delaney",
                        "datein": "Sunday, November 30, 2014 6:31 AM",
                        "dateout": "Saturday, February 17, 2018 6:01 PM",
                        "mail": "morrison delaney}@voitsekhovsky.studio",
                        "phone": "+1 (820) 595-3980",
                        "city": "Sussex",
                        "size_room": 3,
                        "old": 3,
                        "junior": 1,
                        "parking": 2,
                        "beds": 2
                    },
                    {
                        "name": "Farmer Joseph",
                        "datein": "Monday, October 8, 2018 6:59 PM",
                        "dateout": "Wednesday, October 22, 2014 11:12 PM",
                        "mail": "farmer joseph}@voitsekhovsky.studio",
                        "phone": "+1 (823) 413-3817",
                        "city": "Lopezo",
                        "size_room": 2,
                        "old": 2,
                        "junior": 1,
                        "parking": 2,
                        "beds": 2
                    },
                    {
                        "name": "Stewart Ayala",
                        "datein": "Sunday, November 4, 2018 8:26 PM",
                        "dateout": "Wednesday, December 31, 2014 8:05 PM",
                        "mail": "stewart ayala}@voitsekhovsky.studio",
                        "phone": "+1 (831) 436-2997",
                        "city": "Valmy",
                        "size_room": 2,
                        "old": 1,
                        "junior": 1,
                        "parking": 1,
                        "beds": 2
                    }

                ],
            };
        },
        methods: {
            exportDataAsExcel() {
                this.gridOptions.api.exportDataAsCsv();
            }
        }
    };
</script>
