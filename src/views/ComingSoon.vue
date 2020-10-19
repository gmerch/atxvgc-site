///src/views/Homepage.vue
<template>
  <div>
  
      <b-row class="text-center">
          <b-col><h2>Comming Soon!</h2></b-col>
      </b-row>
      <b-row class="ml-auto mr-auto text-center">
          <b-col cols=1.5 class="ml-auto">
            <countdown :time="time" :interval="100" tag="p">
              <template slot-scope="props"><b-card>{{ props.days }}<br>Day</b-card></template>
            </countdown>
          </b-col>
          <b-col cols=1.5 class="">
            <countdown :time="time" :interval="100" tag="p">
              <template slot-scope="props"><b-card>{{ props.hours }}<br>Hours</b-card></template>
            </countdown>
          </b-col>
          <b-col cols=1.5 class="mr-auto">
            <countdown :time="time" :interval="100" tag="p">
              <template slot-scope="props"><b-card>{{ props.minutes }}<br>Minutes</b-card></template>
            </countdown>
          </b-col>
      </b-row>
      <b-row>
        <b-col fluid="md">
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
              <b-carousel-slide
                img-src="http://stagging.atxvgc.com/wp-content/uploads/2020/10/ATXVGC_Friendlies_S01E41.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="http://stagging.atxvgc.com/wp-content/uploads/2020/10/ATXVGC_Friendlies_S01E40.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="http://stagging.atxvgc.com/wp-content/uploads/2020/10/ATXVGC_Friendlies_S01E39.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="http://stagging.atxvgc.com/wp-content/uploads/2020/10/ATXVGC_Friendlies_S01E38.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="http://stagging.atxvgc.com/wp-content/uploads/2020/10/ATXVGC_Friendlies_S01E37.png"
              ></b-carousel-slide>
  
          </b-carousel>
        </b-col>
      </b-row>
      <b-row class="text-center">
          <b-col><h2>We can't wait to show you what we've been working on!</h2></b-col>
      </b-row>
  </div>
</template>

<style>
.center {
  margin: auto;
  width: 50%;
}
</style>
<script>
export default {

    data() {
      var now = new Date();
      var nowAgain = new Date();
      var launchDate = new Date(now.setDate(21));
      launchDate = new Date(launchDate.setHours(10));
      launchDate = new Date(launchDate.setMinutes(0));

      return {
          counting: false,
          time: launchDate - nowAgain,
          posts: []
      }
    },
    mounted() {
      this.posts = posts;
    },
    methods: {
        startCountdown: function () {
          this.counting = true;
        },
        handleCountdownEnd: function () {
          this.counting = false;
        }
    }
}
const posts = [
        '../assets/images/ATXVGC_Friendlies_S01E36.png',
        '../assets/images/ATXVGC_Friendlies_S01E37.png',
        '../assets/images/ATXVGC_Friendlies_S01E38.png',
        '../assets/images/ATXVGC_Friendlies_S01E39.png',
        '../assets/images/ATXVGC_Friendlies_S01E40.png',
        '../assets/images/ATXVGC_Friendlies_S01E41.png',
      ]
</script>