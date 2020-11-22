//src/components/AuthorCard.vue
<template>
    <b-container class="author-card">
        <div><img class="headshot" :src=imgRoute> {{ authorname }}<p> {{ description}}</p></div>
    </b-container>
</template>
<style scoped>
    .headshot {
      display: inline-block;
      border-radius:50%;
      }
    .author-card {
        border-top: 3px solid grey;
        padding-top: 2px;
    }
</style>
<script>
import {wpAPI} from "../api/index"
export default {
    props: ['authorid'],
    data: () => {
    return {
      post: null,
      error: null,
      title: null,
      imgRoute: null,
      description: null,
      results: []
    };
  },
  mounted() {
    this.fetchAuthor()

  },
  methods: {
    fetchAuthor(){
      console.log('users/' + this.authorid)
      wpAPI
        .get('users/' + this.authorid)
        .then(response => {
          this.result = response.data
          this.authorname = this.result.name
          this.imgRoute = this.result.avatar_urls['96']
          this.description = this.result.description

          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  }
}
</script>