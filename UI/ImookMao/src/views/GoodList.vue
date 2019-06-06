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
                    <a href="javascript:void(0)" class="default" :class="{'cur': sortBy==='default'}" @click="getGoodsByDefault">Default</a>
                    <a href="javascript:void(0)" class="price" :class="{'cur': sortBy==='price'}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show' : filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd @click="setPriceFilter(-1)">
                                <a href="javascript:void(0)" :class="{'cur': priceScopeIndex===-1}">All</a>
                            </dd>
                            <dd v-for="(item, index) of priceFilter" :key="index">
                                <a href="javascript:void(0)" @click="setPriceFilter(index, item)" :class="{'cur': priceScopeIndex===index}">{{item.startPrice}} - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item of goodsList" :key="item.productId">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                                        <!-- <a href="#"><img v-lazy="'/static/1.jpg'" alt=""></a> -->
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="load-more" v-show="!showAllData" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            <img src="./../assets/loading-spinning-bubbles.svg"/>
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
            priceFilter: [//左侧价格过滤
                {
                    startPrice: '0',
                    endPrice: '500'
                },
                {
                    startPrice: '500',
                    endPrice: '1000'
                },
                {
                    startPrice: '1000',
                    endPrice: '2000'
                },
                {
                    startPrice: '2000',
                    endPrice: '4000'
                }
            ],
            priceScopeIndex: -1,//-1 代表All，0,1,2...代表左侧对应价格范围选项
            filterBy: false,//用于控制 屏幕小时，显示filter by画面
            overlayFlag: false,//用于控制 屏幕小时，显示filter by画面
            sortBy: 'default',
            sortFlag: 1,//1 升序, -1降序
            page: 1,
            pageSize: 8,
            minPrice: 0,
            maxPrice: 4000,
            busy: false,//用于控制load more功能生效与否，false代表生效，true代表失效
            showAllData: false//用于控制当全部数据加载完毕，关闭loading more效果
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
        getGoodsList (flag) {
            var self = this;
            var params = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sortFlag,
                minPrice: this.minPrice,
                maxPrice: this.maxPrice
            }
            // axios.get('/static/mock/goods.json').then((res)=>{
            axios.get('/goods', {
                params: params
            }).then((res)=>{
                var _data = res.data;
                if(_data.status === '0') {
                    if(flag) {
                        self.goodsList = self.goodsList.concat(_data.result.list);
                        if(_data.result.count < 8) {
                            this.busy = true;
                            this.showAllData = true;
                        }else {
                            this.busy = false;
                        }
                    }else {
                        self.goodsList = _data.result.list;
                        // self.goodsList = _data.result;//used for mock data
                    }
                }else {
                    self.goodsList = [];
                }
            }).catch((error)=>{
                console.error('error happened, msg:', error)
            });
        },
        setPriceFilter (idx, item) {
            this.priceScopeIndex = idx;
            this.initPageToOne();
            if(idx < 0) {
                this.minPrice = 0;
                this.maxPrice = 4000;
            }else {
                this.minPrice = item.startPrice;
                this.maxPrice = item.endPrice;
            }
            this.getGoodsList();
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
        },
        getGoodsByDefault () {
            this.sortFlag = 1;
            this.initPageToOne();
            this.pageSize = 8;
            this.sortBy = 'default';
            this.getGoodsList();
        },
        sortGoods () {
            this.sortFlag = -this.sortFlag;
            this.initPageToOne();
            this.sortBy = 'price';
            this.getGoodsList();
        },
        initPageToOne () {
            this.page = 1;
            this.busy = false;
            this.showAllData = false;
        },
        loadMore: function() {
            this.busy = true;
            setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
            }, 1000);
        },
        addCart (productId) {
            axios.post('/goods/addCart', {
                productId: productId
            }).then((res)=>{
                if(res) {
                    alert('购物车添加成功！');
                }
            }).catch((err)=>{
                console.error('add cart error:', err);
            });
        }
    }
}
</script>
