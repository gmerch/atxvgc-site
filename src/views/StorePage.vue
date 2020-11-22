//src/views/CategoryPage.vue
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <b-container id="wrapper">
    <div><h1>{{ name }}</h1></div>
    <div v-if="results.length">
      <b-row>
        <div v-bind:key="data.index" v-for="data in processedProducts">
          <b-col l="4">
            <router-link :to="'/product/' + data.slug" :id="data.id" :slug="data.slug">
              <b-card
                v-bind:title="domDecoder(data.name)"
                v-bind:img-src="data.image_url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
                <b-card-text><div v-html="data.short_description"></div></b-card-text>
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
import {wcAPI} from "../api/index"

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
    this.fetchProducts()
  },
  watch: {

    },
  computed: {
    processedProducts() {
      let posts = this.results;
      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.images[0];
        post.image_url = imgObj ? imgObj.src : "./assets/logo.png";
      });
      
      return posts;
    },
  },
  methods: {
    fetchProducts(){
      wcAPI
        .get('products')
        .then(response => {
          console.log('is it working son?')
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
  }
}
</script>