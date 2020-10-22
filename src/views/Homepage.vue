///src/views/Homepage.vue
<template>
    <b-container class="ml-0 mr-0 full-page">
      <b-row class="mb-3">
        <b-col fluid="md" lg=8>
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <div v-bind:key="data.index" v-for="data in processedPosts">
            <router-link :to="'/blog/'+ data.id + '/' + data.slug" :id="data.id" :slug="data.slug">
              <b-carousel-slide
                v-bind:caption="data.title.rendered"
                v-bind:img-src="data.image_url"
                
              ></b-carousel-slide>
            </router-link>
            </div>
          </b-carousel>
        </b-col>

        <b-col fluid="xs">
          
          <b-card
            title="Resources"
            class="resources-card mb-0 mt-0"
          >
          <p><a href="/blog/13/50-game-test">50 Game Test</a></p>
          <p><a href="/blog/23/vgc-2020">VGC 2020</a></p>
          </b-card>
        </b-col>
        </b-row>
        <b-row>
          <b-col fluid="md" lg=8>
          <a href="https://discord.gg/axJgqGg" target="_blank" rel="noopener noreferrer">
          <b-card
            title="Monday Night Friendlies"
            class="resources-card mb-0 mt-0">
            <p>Want to sign up for our Monday Night Friendlies? Join our discord and find the signups in the #announcements</p>
            <img class="social-icon-center" src="../assets/hype-wak.png">
          </b-card>
          </a>
          </b-col>
        </b-row>
        <b-row>
        </b-row>
      
    <div v-if="videos.length">
        <div v-bind:key="data.index" v-for="data in processedVideos">
          <b-row>
          <b-col fluid="md" lg=8>
            <router-link :to="'/blog/'+ data.id + '/' + data.slug" :id="data.id" :slug="data.slug">
              <b-card
                v-bind:title="data.title.rendered"
                v-bind:img-src="data.image_url"
                img-alt="Image"
                img-bottom
                tag="article"
                style="max-width;"
                class="mb-2"
                >
                <b-card-text><div v-html="data.excerpt.rendered.slice(0,100)"></div></b-card-text>
            </b-card>
            </router-link>
          </b-col>
          </b-row>
        </div>
      
    </div>
    </b-container>
</template>

<style>
.carousel-caption {
    top: 0;
    bottom: auto;
    -webkit-text-stroke: 1px black;
}
.social-icon-center{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.card-body {
  margin-top: 20px;
  border-radius: 25px;
}
.card-title {
  text-align: center;
}
.cards {
  margin-top: 20px;
}
.carousel-inner{
  border-radius: 25px;
}
.carousel {
  border-radius: 25px;
}
.slide {
  border-radius: 25px;
}
.img-fluid {
  border-radius: 25px;
}
.w-100 {
  border-radius: 25px;
}
.card-img-bottom {
  border-radius: 25px;
}
</style>
<script>
import {wpAPI} from "../api/index"
export default {
    data() {
      return {
        results: [],
        videos: [],
        pid: [] 
      }
    },
    created () {
    },
  mounted() {
    this.fetchSliderPosts()
    this.fetchLatestVideo()
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
    processedVideos() {
      console.log(this.videos)
      let vids = this.videos;
      vids.map(vid => {
        let imgObj = vid._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'];
        vid.image_url = imgObj ? imgObj.source_url : './assets/logo.png'
      });
      return vids
    }
  },
  methods: {
    fetchSliderPosts(){
      console.log('posts?_embed ')
      wpAPI
        .get('posts?_embed&categories=6&include=19,17,144,8&orderby=include')
        .then(response => {
          this.results = response.data
          console.log('res', this.results)
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
    fetchLatestVideo(){
      console.log('posts?_embed&categories=2')
      wpAPI
        .get('posts?_embed&categories=2')
        .then(response => {
          console.log
          this.videos = response.data
        })
    },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
}
</script>