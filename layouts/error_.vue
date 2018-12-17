<template>
  <section>
    <!-- В случае если любая страница вернет ошибку -->
    <h1>Ошибка</h1>
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>{{error}}</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </section>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page

  }
</script>
