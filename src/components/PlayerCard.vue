//src/components/PlayerCard.vue
<template>
      <div class="player-card">
        <p><img class="country-flag" :src="require('../assets/flags/'+ player.flag + '.png')" height=15px width=15px>   {{ player.name }} </p>
        <div v-if="player.twitter">
          <p><img class="country-flag" :src="require('../assets/twitter-logo.png')" height=15px width=15px> <a :href="'https://twitter.com/'+player.twitter" target="_blank" rel="noopener noreferrer">{{ player.twitter }}</a></p>
        </div>
        <div v-if="player.twitch">
          <p><img class="country-flag" :src="require('../assets/twitch-logo.png')" height=15px width=15px> <a :href="'https://twitch.com/'+player.twitch" target="_blank" rel="noopener noreferrer">{{ player.twitch }}</a></p>
        </div>
        <div v-if="player.yt">
          <p><img class="country-flag" :src="require('../assets/youtube-logo.png')" height=15px width=15px><a :href="player.yt" target="_blank" rel="noopener noreferrer">Last Battle!</a></p>
        </div>
      </div>

</template>
<style scoped>
  @import '../assets/styles/player-card.module.css'
</style>
<script>

export default {
  props: ['player'],
  data: () => {
    return {
    };
  },
  mounted() {
    console.log('player', this.player)
  },
  methods: {
    clearPlayerInfo(){
        this.player = {};
      }
  }
}
</script>