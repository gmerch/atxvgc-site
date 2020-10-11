<template>
  <div>
  <b-navbar toggleable="lg" type="light" variant="faded">
    <b-navbar-brand href="#"><img src="../assets/logo.png" alt="Logo" width="89.5" height="120"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mr-auto" fill>
        <b-nav-item href="#" @click="updatePageValue('home')">Home</b-nav-item>
        <b-nav-item href="#" @click="updatePageValue('videos')">Videos</b-nav-item>
        <b-nav-item href="#" @click="updatePageValue('articles')">Articles</b-nav-item>
        <b-nav-item href="#" @click="updatePageValue('resources')">Resources</b-nav-item>
        <b-nav-item href="#" @click="updatePageValue('standings')">Standings</b-nav-item>
        <b-nav-item href="#" @click="updatePageValue('about')">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</div> 
</template>
<style>
  .navbar {
    height: 125px;
    font-family: 'Fjalla One';
    font-size: 37px;
    background-color: white;
  };

</style>
<script>
export default {
    data() {
        return {
            posts: ''
        }
    },
    methods: {
    updatePageValue(val) {
        this.$emit('update-page',val)
    }
  }
}    
</script>