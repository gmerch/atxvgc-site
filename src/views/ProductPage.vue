//src/components/BlogPage.vue
<template>
  <b-container id="wrapper">
        <b-row>
        <b-col fluid="sm" cols=4><div class="img-container"><figure><p><img v-bind:src="img.src" v-bind:alt="img.alt"><figcaption>{{ img.caption }}</figcaption></figure></div></b-col>
        <b-col fluid="md" cols=6><div class="prod-details"><h1>{{ title }}</h1><p><p><bdi><span class="woocommerce-Price-currencySymbol">$</span>{{ results.price }}</bdi></p><p v-html="results.description"><p></p><p>{{ results.stock_quantity }} in stock!</p>
        <form class="cart">
			<div class="quantity">
				<label class="screen-reader-text">ATX VGC Sticker quantity</label>
		<input type="number" id="quantity_5fba223b360cd" class="input-text qty text" step="1" min="1" max="160" name="quantity" value="1" title="Qty" size="4" placeholder="" inputmode="numeric">
			</div>
	
		<button type="submit" name="add-to-cart" value="605" class="single_add_to_cart_button button alt">Add to cart</button>

		</form>
        </div></b-col>

        </b-row>
  </b-container>


</template>
<style scoped>
.twitter-tweet block a { 
  border: 2px solid black !important;
  border-radius: 5px;
}
.tweet-border div{
  border: 2px solid black !important;
  border-radius: 5px;
}
img {
    max-width: 100%;
}
.img-container {
    align-content: center;
    text-align: center;
    font-style: italic;
    font-size-adjust: .8rem;
}
.quantity .qty {
    width: 4.235801032em;
    text-align: center;
}
.input-text, input[type=email], input[type=number], input[type=password], input[type=search], input[type=tel], input[type=text], input[type=url], textarea {
    padding: .6180469716em;
    background-color: #f2f2f2;
    color: #43454b;
    border: 0;
    -webkit-appearance: none;
    box-sizing: border-box;
    font-weight: 400;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.125);
}
.single-product div.product form.cart {
    margin-bottom: 1.618em;
    padding: 1em 0;
}
button.alt, input[type="button"].alt, input[type="reset"].alt, input[type="submit"].alt, .button.alt, .widget-area .widget a.button.alt {
    background-color: #333333;
    border-color: #333333;
    color: #ffffff;
}
added_to_cart.alt, .added_to_cart.cta, .button.alt, .button.cta, .wc-block-grid__products .wc-block-grid__product .wp-block-button__link.alt, .wc-block-grid__products .wc-block-grid__product .wp-block-button__link.cta, button.alt, button.cta, input[type=button].alt, input[type=button].cta, input[type=reset].alt, input[type=reset].cta, input[type=submit].alt, input[type=submit].cta {
    background-color: #2c2d33;
    border-color: #2c2d33;
}
bdi {
    unicode-bidi: -webkit-isolate;
}
.single-product div.product p.price {
    font-size: 1.41575em;
    margin: 1.41575em 0;
}
</style>
<script>
import {wcAPI} from "../api/index"
let ROOT_PATH = 'https://atxvgc.com'
export default {
  titleTemplate: () => {
  // If undefined or blank then we don't need the hyphen
    return this.results.title.rendered ? `${this.results.title.rendered} - ATX VGC` : 'ATX VGC';
  },
  props: {id: String, slug: String, titile: String},
  data: () => {
    return {
      post: null,
      error: null,
      title: null,
      img: null,
      description: null,
      results: [],
      logo: ROOT_PATH + require('../assets/logo.png')
    };
  },
  metaInfo() {
      return {
        meta: [
            // Twitter Card
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:title', content: this.title},
            {name: 'twitter:description', content: this.description},
            {name: 'twitter:image', content: this.imgRoute},
            // Facebook OpenGraph
            {property: 'og:title', content: this.title},
            {property: 'og:site_name', content: 'ATX VGC'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content:  this.imgRoute},
            {property: 'og:description', content: this.description}
        ]
      }
    },
  mounted() {
    this.fetchProduct()
  },
  processedProduct() {
      let posts = this.results;
      // Add image_url attribute
      posts.map(post => {
        let imgObj = post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'];
        post.image_url = imgObj ? imgObj.source_url : "./assets/logo.png";
      });
      return posts;
    },
  methods: {
    fetchProduct(){
      console.log('products', this.$route.params)
      wcAPI
        .get('products?slug=' + this.$route.params.slug)
        .then(response => {
          this.results = response.data[0]
          console.log(this.results)
          this.title = this.results.name
          this.img = this.results.images[0]
          console.log(this.results)

          }
        )
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>