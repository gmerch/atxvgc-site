//src/views/CategoryPage.vue
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <b-container id="wrapper">
    <div></div>
    <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedPosts">
          <b-col l="4">
            <router-link :to="'/blog/'+ data.id + '/' + data.slug" :id="data.id" :slug="data.slug">
              <b-card
                v-bind:title="data.title.rendered"
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
export default {
  props: 
    {page: Number}, 
  data: () => {
    return {
      results: [],
      pid: []
    };
  },
  mounted() {
    this.fetchPosts()
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
        .get(pageCategories[this.$route.fullPath])
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
  filters: {
    strippedContent: function(string) {
           return string.replace(/&#8217;/ig,"'").replace(/<\/?[^>]+>/ig, " "); 
    }
  }
}
const pageCategories = {
  '/': 'posts?_embed&categories=' + process.env.VUE_APP_CATEGORIES_ARTICLES +','+ process.env.VUE_APP_CATEGORIES_VIDEOS,
  '/videos': 'posts?_embed&categories=' +  process.env.VUE_APP_CATEGORIES_VIDEOS,
  '/articles': 'posts?_embed&categories=' + process.env.VUE_APP_CATEGORIES_ARTICLES,
};
</script>