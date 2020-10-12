<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fjalla+One:300,400,700" type='text/css'>
    <Navbar @update-page="updatePageValue" />
    <div class="solid-gradient">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
  .navbar {
    background-color: white !important;
  }
  .solid-gradient{
    font-family: 'Fjalla One';
    background: rgb(248,248,248);
    background: rgb(233,232,235);
    background: -moz-linear-gradient(90deg, rgba(233,232,235,1) 0%, rgba(248,248,248,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(233,232,235,1) 0%, rgba(248,248,248,1) 100%);
    background: linear-gradient(90deg, rgba(233,232,235,1) 0%, rgba(248,248,248,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e9e8eb",endColorstr="#f8f8f8",GradientType=1);
    border-radius: 50px 0px 0px 0px;
    overflow: hidden;
    perspective: 1px;
    padding-top: 25px;
    padding-left: 50px;
  }
  
  .wrapper{
    padding-top: 25px;
  }

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