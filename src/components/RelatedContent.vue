//src/components/ReltatedContent.vue
<template>
    <b-container>
        <div class="related"><p><strong>Related: </strong><a :href="'/blog/'+related_slug">{{ title }}</a></p>
        <img class="related-thumbnail" :src="featured_image">
        </div>
    </b-container>
</template>
<style>
    .related {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .related-thumbnail img{
      display: in-line;
      max-width: 360px;
    }
</style>
<script>
import {wpAPI} from "../api/index"
export default {
    props: ['related_slug'],
    data: () => {
    return {
      title: '',
      results: []
    };
  },
  mounted() {
    this.fetchTitle()

  },
  methods: {
    fetchTitle(){
      console.log("slug", this.related_slug)
      wpAPI
        .get('posts?_embed&slug=' + this.related_slug)
        .then(response => {
          this.result = response.data[0]
          console.log(this.result)
          this.title = this.domDecoder(this.result.title.rendered)
          this.featured_image = this.result._embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium'].source_url
          console.log(this.featured_image)
          console.log(this.title)

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