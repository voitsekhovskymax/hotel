<template>

</template>

<script>
  export default {
    data() {
      return {
        year:0,
        month:0,
      }
    },
    created(){},
    mounted(){
      console.log(this.$route.params.year);
      console.log(this.$route.params.month);
    },
    methods:{

    }
  }
</script>
