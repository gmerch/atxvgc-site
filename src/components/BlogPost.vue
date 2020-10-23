//src/components/BlogPage.vue
<template>
  <b-container id="wrapper">

      <b-row>
      <b-col fluid="md" lg=8><h1><div v-html="results.title.rendered"></div></h1></b-col><b-col cols=4></b-col>
      </b-row>
      <b-row><br></b-row>
      <b-row>
      <b-col fluid="md" lg=8><div v-html="results.content.rendered"></div></b-col><b-col cols=4></b-col>
        </b-row>
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
  titleTemplate: () => {
  // If undefined or blank then we don't need the hyphen
    return this.results.title.rendered ? `${this.results.title.rendered} - ATX VGC` : 'ATX VGC';
  },
  metaInfo(){
      this.fetchPost()
      console.log('tesing meta stuff', this.post.title)
      return {
        title: this.title,
         meta: [
          // Twitter Card
          {name: 'twitter:card', content: 'summary'},
          {name: 'twitter:title', content: this.post.title},
          {name: 'twitter:description', content: this.post.excerpt.rendered},
          // image must be an absolute path
          {name: 'twitter:image', content: this.post.embedded["wp:featuredmedia"][0].full.source_url},
          // Facebook OpenGraph
          {property: 'og:title', content: this.post.title.rendered},
          {property: 'og:site_name', content: 'ATX VGC'},
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content:  this.post.embedded["wp:featuredmedia"][0].full.source_url},
          {property: 'og:description', content: this.post.excerpt.rendered}
      ]
      }

    },
  props: {id: Number, slug: String},
  data: () => {
    return {
      results: []
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