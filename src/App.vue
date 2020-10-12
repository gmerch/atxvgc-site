<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fjalla+One:300,400,700" type='text/css'>
    <Navbar @update-page="updatePageValue" />
    <HelloWorld :inPage="page" />
  </div>
</template>
<style scoped>
  .navbar {
    background-color: white;
  }
  body{
    font-family: 'Fjalla One';
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