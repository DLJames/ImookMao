<template>
    <div>
        this is goodlist page: <br>
        <span>{{$route.params.goodid}}</span><br>
        <span>{{$route.params.name}}</span><br>
        <router-link to="/good/title">go to good title</router-link>
        <router-link to="/good/image">go to good image</router-link>
        <div>
            <router-view></router-view>
        </div>
        <router-link to="/cart">go to cart page</router-link>
        <button @click="goToCartPage">go to cart page</button>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        goToCartPage() {
            // this.$router.push('/cart');
            this.$router.push({path: '/cart?goodid=8990'});
        }
    },
}
</script>