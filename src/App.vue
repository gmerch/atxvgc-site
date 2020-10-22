<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <div id="app">
    <Navbar @update-page="updatePageValue" class="xl ml-0 mr-auto"/>
    <div class="solid-gradient">
      <router-view />
    </div>
    <div>
    <AppFooter />
    </div>
  </div>
</template>
<style scoped>
   @import './assets/styles/app.module.css'

</style>
<script>
  import Navbar from './components/Navbar.vue'; 
  import AppFooter from './components/AppFooter.vue';
  import './assets/styles/app.module.css'
  export default {
    components: {
      Navbar,
      AppFooter
    },
    metaInfo: {
      title: 'ATX VGC',
      titleTemplate: '%s | ATX VGC'
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