//src/views/CategoryPage.vue
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <b-container id="wrapper">
    <div><h1>{{ name }}</h1></div>
    <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedPosts">
          <b-col l="4">
            <router-link :to="'/blog/'+ data.id + '/' + data.slug" :id="data.id" :slug="data.slug">
              <b-card
                v-bind:title="domDecoder(data.title.rendered)"
                v-bind:img-src="data.image_url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
                <b-card-text><div v-html="data.excerpt.rendered.slice(0,100)"></div></b-card-text>
            </b-card>
            </router-link>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>No posts available yet 😢</h5>
    </div>
  </b-container>
</template>
<style scoped>
  @import '../assets/styles/category-page.module.css'
</style>
<script>
import axios from "axios"
import {wpAPI} from "../api/index"
let ROOT_PATH = 'https://atxvgc.com'
export default {
  props: 
    {page: Number}, 
  data: () => {
    return {
      results: [],
      pid: [],
      name: '',
      logo: ROOT_PATH + require('../assets/logo.png')
    };
  },
  metaInfo() {
      return {
        meta: [
            // Twitter Card
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:title', content: 'ATX VGC '+this.name +' Category Page'},
            {name: 'twitter:description', content: 'The '+this.name+'Category Page for ATX VGC'},
            {name: 'twitter:image', content: this.logo},
            // Facebook OpenGraph
            {property: 'og:title', content: 'ATX VGC '+this.name +' Category Page'},
            {property: 'og:site_name', content: 'ATX VGC'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content:  this.logo},
            {property: 'og:description', content: 'The '+this.name+'Category Page for ATX VGC'}
        ]
      }
    },
  mounted() {
    this.fetchPosts()
    this.name = pageCategories[this.$route.fullPath].name
  },
  watch: {
      $route : function(newVal, oldVal){
          this.fetchPosts()
          console.log("Breaking up with ", oldVal, newVal, " is my only friend")
      }
     
  },
  computed: {
    processedPosts() {
      let posts = this.results;
      // Add image_url attribute
      posts.map(post => {
        let imgObj = post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'];
        post.image_url = imgObj ? imgObj.source_url : "./assets/logo.png";
      });
      
      return posts;
    },
  },
  methods: {
    fetchPosts(){
      console.log("route", this.$route.fullPath)
      wpAPI
        .get(pageCategories[this.$route.fullPath].api)
        .then(response => {
          this.results = response.data
          console.log(this.results)
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
    domDecoder (str) {
      let parser = new DOMParser();
      let dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');
      return dom.body.textContent;
    }
  },
  filters: {
    strippedContent: function(string) {
           return string.replace(/&#8217;/ig,"'").replace(/<\/?[^>]+>/ig, " "); 
    }
  }
}
const pageCategories = {
  '/': {'api':'posts?_embed&categories=2,3','name':'Home'},
  '/videos': {'api':'posts?_embed&categories=2', 'name':'Videos'},
  '/articles': {'api':'posts?_embed&categories=3', 'name':'Articles'},
  '/team-reports': {'api': 'posts?_embed&categories=5', 'name': 'Team Reports'}
};
</script>