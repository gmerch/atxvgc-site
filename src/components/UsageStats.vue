<template>
  <div>
    <toggle-switch
        :options="myOptions"
        :disabled="false" 
        @change="fetchUsage"
        @selected="selectedMethod()"
        v-model="selected"
        :name="name"
        /> 

    <h2 :v-if="this.format"> {{ format }}</h2>
    <h4 :v-if="this.series"> Series {{ selected }}</h4>
    <b-table :fields="fields" striped hover :items="usage" responsive="sm">
      <template v-slot:cell(name)="pokemon">
        <b class="text-info">{{ pokemon.item.name }}</b>
      </template>
      <template v-slot:cell(usage)="pokemon">
        <b class="text-info">{{ pokemon.item.usage }}</b>
      </template>
    </b-table>
  </div>
</template>
<style scoped>
   @import '../assets/styles/standings-page.module.css'
</style>
<script>
import {atxAPI} from '../api/index.js'

export default {
    data() {
      return {
        fields: [],
        usage: [],
        format: this.format,
        series: this.series,
        selected: '6',
        myOptions: {
            layout: {
                color: 'black',
                backgroundColor: 'lightgray',
                selectedColor: 'white',
                selectedBackgroundColor: 'green',
                borderColor: 'black',
                fontFamily: 'Fjalla One',
                fontWeight: 'normal',
                fontWeightSelected: 'bold',
                squareCorners: false,
                noBorder: false
            },
            items: {
                delay: .4,
                preSelected: '6',
                disabled: false,
                labels: [
                {name: '4', color: 'white'}, 
                {name: '5', color: 'white'}, 
                {name: '6', color: 'white'}
                ]
            }
        }
      }
    },
    mounted(){  
      console.log('testing 123')
      console.log(this.series);
      console.log('one last attempt', this.usage)
      this.fields = [
        {
          key:'name',
          sortable:false
        },
        {
          key:'usage',
          sortable:true
        },
      ]
    },
    created() {
      atxAPI
        .get('usage?series='+this.selected)
        .then(response => {
          this.usage = response.data.pokemon
          this.format = response.data.format
          this.series = response.data.series
          console.log('created', response.data)
          console.log(this)
          console.log(response.data)
          }
        )
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      fetchUsage(){
          console.log('Starting fetch');
          atxAPI
        .get('usage?series='+this.selected)
        .then(response => {
          this.usage = response.data.pokemon
          this.format = response.data.format
          this.series = response.data.series
          console.log('requested', response.data.pokemon)
          console.log(this.usage)
          }
        )
        .catch(e => {
          console.log(e)
        })
      },
      onOpen() {
        this.$refs.tooltip.$emit('open')
      },
      onClose() {
        this.$refs.tooltip.$emit('close')
      }
    }
  }
</script>