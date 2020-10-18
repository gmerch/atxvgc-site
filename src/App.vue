<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fjalla+One:300,400,700" type='text/css'>
    <Navbar @update-page="updatePageValue" class="xl ml-0 mr-0"/>
    <div class="solid-gradient">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
   @import './assets/styles/app.module.css'
</style>
<script>
  import Navbar from './components/Navbar.vue';  
  
  export default {
    name: 'navbar',
    components: {
      Navbar,
    },
    data() {
      return {
        page: this.page
      };
    },
    mounted() {
      this.page = 'home'
      console.log("page has been set as home", this.page)
    },
    methods: {
      updatePageValue(e){
        console.log(this.page);
        this.page = e;
      }
    }
}
</script>