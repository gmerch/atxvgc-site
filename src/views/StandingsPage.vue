//src/views/StandindgsPage.vue
<template>
  <div>
    <b-table :fields="fields" striped hover :items="players" responsive="sm">
      <template v-slot:cell(name)="player">
        <b class="text-info" v-b-modal="'modal-1'" @click="loadPlayerInfo(player.item)">{{ player.item.name }}</b>
      </template>
      <template v-slot:cell(wins)="player">
        <b class="text-info">{{ player.item.wins }}</b>
      </template>
      <template v-slot:cell(games_played)="player">
        <b class="text-info">{{ player.item.games_played }}</b>
      </template>
      <template v-slot:cell(win_pct)="data">
        <b class="text-info">{{ data.item.win_pct }}</b>
        </template>
    </b-table>
    <b-modal id="modal-1" @hidden="clearPlayerInfo">
      <template>
        <p>Name: {{ player.name }} </p>
        <p>Twitter: <a :href="'https://twitter.com/'+player.twitter">{{ player.twitter }}</a></p>
        <p>Twitch: <a :href="'https://twitch.com/'+player.twitch">{{ player.twitch }}</a></p>
      </template>
    </b-modal>
  </div>
</template>
<style scoped>
  .b-table {
    font-family: 'Fjalla One';
  }
</style>
<script>
import {atxAPI} from '../api/index.js'

export default {
    data() {
      return {
        fields: [],
        players: [],
        playerInfo: [],
        player: {}
      }
    },
    mounted(){
      console.log('testing 123')
      this.players = [];
      console.log('one last attempt', this.playerData)
      this.fields = [
        {
          key:'name',
          sortable:false
        },
        {
          key:'wins',
          sortable:true
        },
        {
          key:'games_played',
          sortable:true
        },
        {
          key:'win_pct',
          label: 'Win Percentage',
          sortable:true
        }
      ]
    },
    created () {
      atxAPI
        .get('table')
        .then(response => {
          this.players = response.data
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      loadPlayerInfo(item){
        console.log('Loading!')
        console.log(this)
        this.player = item
        console.log('player', this.player)
        this.$bvModal.show('modal-1')
      },
      clearPlayerInfo(){
        this.player = {};
      }
    }
  }
</script>