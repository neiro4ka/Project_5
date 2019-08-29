let product = {
    props: ['img', 'product'],
    template: `<div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                <h3> {{ product.product_name }}</h3>
                <p>{{ product.price }} руб.</p>
                <button class="buy-btn" @click="$parent.addProduct (product)">Купить</button>
    </div>
</div>`
}

let products = {
    props: [],
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
		    imgCatalog: 'https://placehold.it/200x150',
            API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        }
    },

    components: {
        product
    },

    methods: {
        addProduct(product) {
            this.$root.$refs.cart.addProduct(product)
        },
    },

    template: `
        <div class="products>
            <product
                v-for="product of filtered"
                :key="product.id_product"
                :img="imgCatalog"
                :product="product">
            </product>
    </div>`,

    mounted() {
		this.getJSON(`${API_URL + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el)
					this.filtered.push(el)
				}
			})
    },
}

export default products