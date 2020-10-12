//src/components/Standindgs.vue
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
import axios from "axios"
export default {
    data() {
      return {
        items: []
      }
    },
    mounted(){
      console.log('testing 123')
      this.getTable()
      this.fields = ['name','wins','games_played','win_%']
    },
    methods: {
      getTable(){
        axios
          .get('https://api.atxvgc.com/api/v1/table')
          .then(response => this.items = response.data)
          .catch( error => { console.log(error); });
      }
    }
  }
</script>