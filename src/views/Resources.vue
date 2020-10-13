//src/views/About.vue
<template>
  <b-container id="wrapper">
      <h2>ATX VGC Resources</h2>
      <p>We've compiled a few tools we think might be able to help you out!</p> 
      <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedPosts">
          <b-col l="4">
            <router-link :to="/blog/ + data.id">
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
  .card {
    font-family: 'Fjalla One';
    background: None;
    border: none;
    border-radius: 30px, 30px, 30px, 30px;
  }
  .card-body {
    background: white;
    border: none;
  }
  img{
    border-radius: 25px, 25px, 25px, 25px;
  }
  a, a:hover {
    color: #707070;
    text-decoration: none;
    border: none;
  }
  
</style>
<script>
import {wpAPI} from "../api/index"
export default {
  props: 
    {page: String}, 
  data: () => {
    return {
      results: [],
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
        let imgObj = post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium'];
        post.image_url = imgObj ? imgObj.source_url : "./assets/logo.png";
      });
      
      return posts;
    },
  },
  methods: {
    fetchPosts(){
        console.log('posts?_embed&categories=4')
      wpAPI
        .get('posts?_embed&categories=4')
        .then(response => {
          this.results = response.data
          console.log(this.results)
          console.log(this.results[0].id)
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  }
}
</script>