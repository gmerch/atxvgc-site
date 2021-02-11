<template>
  <b-container class="footer ml-0 mr-0">
    <b-row class="mb-3">
    <b-col cols=4><img class='footer-img' src='../assets/logo-vertical-new.png'></b-col>
    </b-row>
    <b-row class="mb-0">
      <b-col cols=8><p class='footer-txt'>ATX VGC is Home to Austin Texas' VGC Community! Feel free to join us on all of the socials and get involved!</p></b-col>
    </b-row>
    <b-row class="mb-0">
      <b-col cols=8>Content&copy; 2020 ATX VGC, LLC All Rights Reserved</b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
  .footer {
    background: black;
    color:white;
    max-width: none;
  }
  .footer-img {
    max-width: 250px;
  }
  .footer-txt {
    color:white;
  }
</style>
<script>
export default {
    data: () => {
      return {
        results: [],
      };
    },

}
</script>