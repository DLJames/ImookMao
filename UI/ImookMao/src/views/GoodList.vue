<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show' : filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd @click="setPriceChecked('all')">
                                <a href="javascript:void(0)" :class="{'cur': priceChecked==='all'}">All</a>
                            </dd>
                            <dd v-for="(item, index) of priceFilter" :key="index">
                                <a href="javascript:void(0)" @click="setPriceChecked(index)" :class="{'cur': priceChecked===index}">{{item.startPrice}} - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item of goodsList" :key="item.productId">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'/static/' + item.prodcutImg" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.prodcutPrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import axios from 'axios'

export default {
    data () {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0',
                    endPrice: '100'
                },
                {
                    startPrice: '100',
                    endPrice: '500'
                },
                {
                    startPrice: '500',
                    endPrice: '1000'
                },
                {
                    startPrice: '1000',
                    endPrice: '2000'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overlayFlag: false
        }
    },
    components: {
        NavHeader,
        NavBread,
        NavFooter
    },
    mounted () {
        this.getGoodsList();
    },
    methods: {
        getGoodsList () {
            var self = this;

            // axios.get('/static/mock/goods.json').then((res)=>{
            axios.get('/goods').then((res)=>{
                var _data = res.data;
                self.goodsList = _data.result;
            }).catch((error)=>{
                console.error('error happened, msg:', error)
            });
        },
        setPriceChecked (priceType) {
            this.priceChecked = priceType;
            this.closePop();
        },
        showFilterPop () {
            this.filterBy = true;
            this.overlayFlag = true;
        },
        goToCartPage() {
            // this.$router.push('/cart');
            this.$router.push({path: '/cart?goodid=8990'});
        },
        closePop () {
            this.overlayFlag = false;
            this.filterBy = false;
        }
    },
}
</script>