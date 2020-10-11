<template>
  <div id="app">
    <Navbar @update-page="updatePageValue" />
    <HelloWorld :inPage="page" />
  </div>
</template>
<style scoped>
  body {
    background: red;
  }
  .navbar {
    background-color: white;
  }
</style>
<script>
 import HelloWorld from './components/HelloWorld.vue'
  import Navbar from './components/Navbar.vue';  
  export default {
    name: 'navbar',
    components: {
      Navbar,
      HelloWorld
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