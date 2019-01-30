<template>
    <div>

    </div>
</template>


<script>
    export default {
        created() {
            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1;
            this.$router.push({name: 'table-year-month', params: {year: currentYear, month: currentMonth}});
        }
    }
</script>
