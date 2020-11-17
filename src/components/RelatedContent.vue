//src/components/AuthorCard.vue
<template>
    <b-container class="related">
        <p><strong>Related:</strong><a :href="'/blog/'+related_slug">{{ domDecoder(title.rendered) }}</a></p>
    </b-container>
</template>
<style scoped>
    .related b-container{
        border-top: 3px solid grey;
        padding-top: 2px;
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
    this.fetchAuthor()

  },
  methods: {
    fetchAuthor(){
      wpAPI
        .get('posts?_embedded_&slug=' + this.related_slug)
        .then(response => {
          this.result = response.data
          this.title = this.result.title.rendered

          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  }
}
</script>