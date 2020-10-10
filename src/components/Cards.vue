//src/components/Cards.vue
<template>
  <b-container>
    <div></div>
    <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedPosts">
          <b-col l="4">
            <b-card
              v-bind:title="data.title.rendered"
              v-bind:img-src="data.image_url"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">
              <b-card-text>{{ `${(data.excerpt.rendered.slice(0,100))}...`  | strippedContent }}</b-card-text>
              <b-button href="#" variant="primary">View article</b-button>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>No posts available yet 😢</h5>
    </div>
  </b-container>
</template>

<script>
import axios from "axios"
export default {
  props: 
    {page: String}, 
  data() {
    return {
      results: []
    };
  },
  mounted() {
    this.fetchPosts()
    console.log('page_val', this.page)
    this.tst()
  },
  watch: {
      page: function(newVal, oldVal){
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
    if (this.page == null){
        this.page = 'home'
        console.log('default home')
    }
    let url = buildUrl(this.page)
    console.log(url)
    axios
     .get(url)
     .then(response => this.results = response.data)
    },
    tst(){
        console.log(this.page)
        return this.page
       
    }
  },
  filters: {
    strippedContent: function(string) {
           return string.replace(/&#8217;/ig,"'").replace(/<\/?[^>]+>/ig, " "); 
    }
}
};
console.log("Testing", process.env.VUE_APP_WP_ADDRESS)
const BaseUrl = process.env.VUE_APP_WP_ADDRESS + '/wp-json/wp/v2/';
const PostMapping = {
      'home': BaseUrl + "posts?_embed&categories=4,6",
      'videos': BaseUrl + "posts?_embed&categories=4",
      'articles': BaseUrl + "posts?_embed&categories=6",
      'standings': ''
    };
function buildUrl (path) {
  return PostMapping[path]
}
</script>