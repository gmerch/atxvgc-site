<template>
  <div>
  <b-navbar toggleable="lg" type="light" variant="faded">
    <b-navbar-brand href="#"><img src="../assets/logo.png" alt="Logo" width="89.5" height="120"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="m-auto" fill>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/videos">Videos</b-nav-item>
        <b-nav-item to="/articles">Articles</b-nav-item>
        <b-nav-item to="/resources">Resources</b-nav-item>
        <b-nav-item to="/standings">Standings</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</div> 
</template>
<style>
  @import '../assets/styles/navbar.module.css'
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
        this.val = val
        this.$emit('update-page',val)
    }
  }
}    
</script>