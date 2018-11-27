<template>
    <div class="">
        <v-card>
            <v-card-text>
                <button @click="gridOptions.api.selectAll()">Select All</button>

                <ag-grid-vue class="ag-theme-balham"
                             :gridOptions="gridOptions"
                             :columnDefs="columnDefs"
                             :rowData="rowData"
                             :enableColResize="true"
                             :enableSorting="true"
                             :enableFilter="true"
                             :groupHeaders="true"
                             :suppressRowClickSelection="true"
                             rowSelection="multiple"
                >
                </ag-grid-vue>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        components: {
            AgGridVue
        },
        data() {
            return {
                gridOptions: null,
                columnDefs: null,
                rowData: null,
            };
        },
        methods: {
            createRowData() {
                var rowData = [];

                for (let i = 0; i < 100; i++) {
                    rowData.push({
                        name: '#10' + i,

                    });
                }

                this.rowData = rowData;
            },
            createColumnDefs() {
                var colData = [];
                colData.push({
                    headerName: 'Rooms',
                    field: 'name',
                    pinned: true,
                    width: 90
                });
                for (let i = 0; i < 30; i++) {
                    colData.push({
                        headerName: i,
                        field: 'name',
                        width: 60,
                        cellClass: createColor()
                    });
                }
                this.columnDefs = colData;
            },
        },
        beforeMount() {
            this.gridOptions = {};
            this.createRowData();
            this.createColumnDefs();
        }
    };
    function createColor() {
        var randomArray  =[
            'blue',
            'orange',
            'red',
            'green',
        ];
        var randomClass = Math.floor(Math.random()*randomArray.length);
        return randomArray[randomClass];
    }
</script>
<style>
    @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
    @import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
</style>
