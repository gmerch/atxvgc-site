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
      }
    },
    mounted() {
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
</script>