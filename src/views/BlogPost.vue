//src/components/BlogPage.vue
<template>
  <b-container id="wrapper">

      <b-row>
      <b-col fluid="md" lg=8><h1><div v-html="results.title.rendered"></div></h1></b-col><b-col cols=4></b-col>
      </b-row>
      <b-row><b-col fluid="md" lg=8><div class="excerpt" v-html="results.excerpt.rendered"></div></b-col><b-col cols=4></b-col></b-row>
      <b-row><b-col fluid="md" lg=8><p class="by-line">By <a :href="'/author/' + results._embedded.author[0].name.toLowerCase()">{{results._embedded.author[0].name }}</a></p></b-col></b-row>
      <b-row><br></b-row>

      <b-row>
      <b-col fluid="md" lg=8><div v-html="results.content.rendered"></div></b-col>
      <b-col fluid="sm">
        <ReltatedContent v-if="results.acf['suggested-url']" :related_slug="results.acf['suggested-url']"></ReltatedContent>
        </b-col>
        </b-row>
      <b-row><p></p></b-row>
      <b-row>
        <AuthorCard v-bind:authorid="results.author" />
      </b-row>
  </b-container>
  
</template>
<style>
  .twitter-tweet block a { 
    border: 2px solid black !important;
    border-radius: 5px;
  }
  .tweet-border div{
    border: 2px solid black !important;
    border-radius: 5px;
  }
  .excerpt {
    border-left: 6px solid gold;
    padding-left: 5px;
  }
  figcaption {
    display: block;
    font-style: italic;
    clear: left;
    margin: .75em 0;
    text-align: center;
    font-style: italic;
    line-height: 1.5em;
  }
  img {
    height: auto;
    max-width: 100%;
  }
</style>
<script>
import {wpAPI} from "../api/index"
import AuthorCard from '../components/AuthorCard.vue'
import ReltatedContent from '../components/RelatedContent'
let ROOT_PATH = 'https://atxvgc.com'
export default {
  components: {
      AuthorCard,
      ReltatedContent
    },
  titleTemplate: () => {
  // If undefined or blank then we don't need the hyphen
    return this.results.title.rendered ? `${this.results.title.rendered} - ATX VGC` : 'ATX VGC';
  },
  props: {slug: String, titile: String},
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
    this.author_link = "/"+this.results._embedded[0]['author'].name
    console.log('author', this.author_link)
  },
  processedPosts() {
      let posts = this.results;
      // Add image_url attribute
      let author = posts[0]._embedded['author'][0];
      author.img = author.avatar_urls['96'] ? author.avatar_urls['96'] : "./assets/logo.png"
      author.link = author._embedded[0]['author'].name
      return author;
    },
  methods: {
    fetchPost(){
      console.log('posts?slug=' + this.$route.params.slug+'&_embed')
      wpAPI
        .get('posts?slug=' + this.$route.params.slug+'&_embed')
        .then(response => {
          console.log('Starting now')
          this.results = response.data[0]
          console.log(this.results)
          this.title = this.results.title.rendered
          console.log('testing 1,2', this.results._embedded['wp:featuredmedia'][0].source_url)
          this.imgRoute = this.results._embedded['wp:featuredmedia'][0].source_url
          this.description = this.results.excerpt.rendered
          this.related_slug = this.results.acf['suggested-url']
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  }
}
</script>