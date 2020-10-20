<template>
  <b-row width=100%>
  <b-navbar toggleable="lg" type="light" variant="faded" stciky=true class="fluid container-fluid">
    <b-col cols=2>
    <b-navbar-brand href="#"><img src="../assets/logo.png" alt="Logo" width="89.5" height="120"></b-navbar-brand>
    </b-col>
    <b-col fluid="md" cols=8>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="m-auto" fill>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/videos">Videos</b-nav-item>
        <b-nav-item to="/articles">Articles</b-nav-item>
        <b-nav-item to="/resources">Resources</b-nav-item>
        <b-nav-item-dropdown id="friendlies-drop-down"
          text="Friendlies"
          toggle-class="nav-link-custom"
          right>
            <b-dropdown-item to="/friendlies/standings">Standings</b-dropdown-item>
            <b-dropdown-item to="/friendlies/usage">Usage Stats</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
    </b-collapse>
    </b-col>
    <b-col fluid="sm" cols=2>
    <a href="https://twitch.tv/atx_vgc" target="_blank" rel="noopener noreferrer"><img class="social-icon" src="../assets/logos/twitch-circle-logo.png"></a>
    <a href="https://twitter.com/atxvgc" target="_blank" rel="noopener noreferrer"><img class="social-icon" src="../assets/logos/twitter-circle-logo.png"></a>
    <a href="https://discord.gg/axJgqGg" target="_blank" rel="noopener noreferrer"><img class="social-icon" src="../assets/logos/discord-circle-logo.png"></a>
    <a href="https://www.youtube.com/channel/UC3cJmoST6hTn_tFLLsskSLw" target="_blank" rel="noopener noreferrer"><img class="social-icon" src="../assets/logos/youtube-circle-logo.png"></a>
    
  </b-col>
  </b-navbar>
  </b-row>
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