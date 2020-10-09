//src/components/HelloWorld.vue
<template>
  <div>
    <div v-if="page_type === 'cards'">
      <Cards v-bind:page="inPage" />
    </div>
    <div v-else-if="page_type === 'standings'">
      <Standings />
    </div>
    <div v-else>
      <Cards :page="'home'" />
    </div>
  </div>
</template>

<script>
import Cards from './Cards.vue'
import Standings from './Standings.vue'
export default {
  name:'cards',
  components: {
    Cards,
    Standings
  },
  props: ['inPage'],
  data (){
    return {
      page: this.inPage,
      page_type: pageMapping[this.inPage]
    }
  },
  watch: {
      inPage: function(newVal){
        this.page_type = pageMapping[newVal];
      }
  },
  mounted(){
    this.tst()
    this.page = this.inPage
    this.page_type = pageMapping[this.page];
  },
  methods: {
    tst(){
        console.log(this.inPage)
        console.log(pageMapping[this.inPage])
        return this.inPage
    }
  }
}
const pageMapping = {
  'home':'cards',
  'videos': 'cards',
  'articles': 'cards',
  'standings': 'standings'
};
</script>
<style scoped>
</style>