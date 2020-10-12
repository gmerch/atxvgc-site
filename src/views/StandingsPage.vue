//src/views/StandindgsPage.vue
<template>
  <div>
    <b-table :fields="fields" striped hover :items="items"></b-table>
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
        items: []
      }
    },
    mounted(){
      console.log('testing 123')
      this.fields = ['name','wins','games_played','win_%']
    },
    created () {
      atxAPI
        .get('table')
        .then(response => {
          this.items = response.data
          console.log('what')
          }
        )
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>