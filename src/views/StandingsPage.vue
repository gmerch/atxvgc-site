<template>
  <div>
    <b-container id="wrapper">
      <div><h1>ATX VGC Friendlies</h1></div>
      <b-row><b-col>The ATX VGC Monday Night Friendlies happen every week on Monday over on our <a href='https://twitch.tv/atx_vgc'>Twitch channel</a></b-col></b-row>
      <b-row><b-col>If you want to participate please sign up in the Discord! No capture card is required, but if you have one, it'll be much easier to scheudle you.</b-col></b-row>
      <b-row><b-col >Don't have a capture card? Why not check our reccomended capture for the cheapest possible solution <a href="https://amzn.to/37QX6GY">here!</a></b-col></b-row>
      <b-row><br></b-row>

    </b-container>
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
      <template v-slot:cell(win_pct)="player">
        <b class="text-info">{{ player.item.win_pct }}</b>
        </template>
      <template v-slot:head(points)="player">
        <b-span id="tooltip-points-show-event" variant="primary"> {{ player.label }} </b-span>
      </template>
        <template v-slot:cell(points)="player">
          <b class="text-info py-3">{{ player.item.points }}</b>
        </template>
    </b-table>
    <b-modal id="modal" @hidden="clearPlayerInfo">
      <template>
      <PlayerCard :player=player />
      </template>
    </b-modal>
    <b-tooltip ref="tooltip" target="tooltip-points-show-event">
      Wins are worth 10 points while losses subtract 4 points.
    </b-tooltip>
  
  </div>
</template>
<style scoped>
   @import '../assets/styles/standings-page.module.css'
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
        },
        {
          key: 'points',
          label: 'Points',
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
      },
      onOpen() {
        this.$refs.tooltip.$emit('open')
      },
      onClose() {
        this.$refs.tooltip.$emit('close')
      }
    }
  }
</script>