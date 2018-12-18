<template>
  <v-app>
    <nuxt/>
  </v-app>
</template>

<script>
  export default {

    data() {
      return {};
    },
    beforeCreate() {
      var token = this.$cookies.get('token');
      if (token != undefined) {
        console.log('токен найден в куки');
        this.$store.commit('set', {type: 'token', value: token});
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth() + 1;
        this.$router.push({name: 'table-year-month', params: {year: currentYear, month: currentMonth}});
      }
    }
  }
</script>
