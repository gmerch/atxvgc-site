//src/views/AuthorPage.vue
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <b-container id="wrapper">
    <div><h1>{{ display_name }}</h1></div>
    <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedPosts">
          <b-col l="4">
            <router-link :to="'/blog/'+data.slug" :slug="data.slug">
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
<script>
import axios from "axios"
import {wpAPI} from "../api/index"
let ROOT_PATH = 'https://atxvgc.com'
export default {
  data: () => {
    return {
      results: [],
      pid: [],
      id: '',
      authorname: '',
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
    this.authorname = this.$route.params.authorname
    console.log(pageCategories[this.authorname])
    this.author_id = pageCategories[this.authorname]['id']
    this.display_name = pageCategories[this.authorname]['display_name']
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
        console.log('posts?author=' + this.author_id+'&_embed')
        wpAPI
          .get('posts?author=' + this.author_id+'&_embed')
          .then(response => {
            this.results = response.data
            console.log('res', this.results)
          }
          )
          .catch(e => {
            console.log(e)
            console.log("WHY")
          });
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
  'atxvgc': {'id':1, 'display_name': "ATX VGC"},
  'gemz': {'id':4, 'display_name': 'Gemz'},
  'playboikartana': {'id':2,'display_name':'Chase Tiedtke'},
  'rollacosta': {'id':3, 'display_name': 'RollAcosta'},
  'waveracer': {'id':7,'display_name':'Waveracer'},
  'wokeflossy': {'id':5,'display_name':'Wokeflossy'}
};
</script>