//src/components/BlogPage.vue
<template>
  <b-container id="wrapper">
      <h1> {{ results.title.rendered }} </h1>
      <div v-html="results.content.rendered"></div>
  </b-container>
  
</template>
<style scoped>
.twitter-tweet block a { 
  border: 2px solid black !important;
  border-radius: 5px;
}
.tweet-border div{
  border: 2px solid black !important;
  border-radius: 5px;
}
</style>
<script>
import {wpAPI} from "../api/index"

export default {
  props: {id: Number, slug: String},
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
      console.log("fetching!")
      return this.results

    },
    
  },
  methods: {
    fetchPost(){
      console.log('posts', this.$route)
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
  }
}
</script>