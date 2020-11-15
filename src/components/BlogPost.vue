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
let ROOT_PATH = 'https://atxvgc.com'
export default {
  titleTemplate: () => {
  // If undefined or blank then we don't need the hyphen
    return this.results.title.rendered ? `${this.results.title.rendered} - ATX VGC` : 'ATX VGC';
  },
  props: {id: String, slug: String, titile: String},
  data: () => {
    return {
      post: null,
      error: null,
      title: null,
      imgRoute: null,
      description: null,
      results: [],
      logo: ROOT_PATH + require('../assets/logo.png')
    };
  },
  metaInfo() {
      return {
        meta: [
            // Twitter Card
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:title', content: this.title},
            {name: 'twitter:description', content: this.description},
            {name: 'twitter:image', content: this.imgRoute},
            // Facebook OpenGraph
            {property: 'og:title', content: this.title},
            {property: 'og:site_name', content: 'ATX VGC'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content:  this.imgRoute},
            {property: 'og:description', content: this.description}
        ]
      }
    },
  mounted() {
    this.fetchPost()
  },
  processedPosts() {
      let posts = this.results;
      // Add image_url attribute
      posts.map(post => {
        let imgObj = post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'];
        post.image_url = imgObj ? imgObj.source_url : "./assets/logo.png";
      });
      return posts;
    },
  methods: {
    fetchPost(){
      console.log('posts', this.$route)
      wpAPI
        .get('posts/' + this.$route.params.id+'?_embed')
        .then(response => {
          this.results = response.data
          this.title = this.results.title.rendered
          console.log('testing 1,2', this.results._embedded['wp:featuredmedia'][0].source_url)
          this.imgRoute = this.results._embedded['wp:featuredmedia'][0].source_url
          this.description = this.results.excerpt.rendered
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  }
}
</script>