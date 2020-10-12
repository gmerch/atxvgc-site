//src/components/BlogPage.vue
<template>
  <b-container id="wrapper">
      <h1> {{ results.title.rendered }} </h1>
      <div v-html="results.content.rendered"></div>
  </b-container>
</template>
<style scoped>

  
</style>
<style lang="scss">
</style>
<script>
import {wpAPI} from "../api/index"
export default {
  data: () => {
    return {
      results: [],
    };
  },
  mounted() {
    this.fetchPost()
  },
  computed: {
    post (){
      this.fetchPost()  
      return this.results
    }
  },
  methods: {
    fetchPost(){
      console.log("route", 'posts/' + this.$route.params.id)
      wpAPI
        .get('posts/' + this.$route.params.id)
        .then(response => {
          this.results = response.data
          console.log(this.results)
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>