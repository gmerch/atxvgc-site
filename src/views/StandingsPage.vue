<template>
  <div>
    <b-table :fields="fields" striped hover :items="players" responsive="sm">
      <template v-slot:cell(name)="player">
        <b class="text-info" v-b-modal="'modal'" @click="loadPlayerInfo(player.item)">{{ player.item.name }}</b>
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
    <b-modal id="modal" @hidden="clearPlayerInfo">
      <template>
      <PlayerCard :player=player />
      </template>
    </b-modal>
  </div>
</template>
<style scoped>
   @import '../assets/styles/standing-page.module.css'
</style>
<script>
import {atxAPI} from '../api/index.js'
import PlayerCard from '../components/PlayerCard.vue'
export default {
    name: 'player-card',
    components: {
      PlayerCard,
    },
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
        this.$bvModal.show('modal')
      },
      clearPlayerInfo(){
        this.player = {};
      }
    }
  }
</script>