<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']" 
                 @tabClick="tabClick" 
                 ref="tabControl1"
                 v-show="isTabFixed"
                 />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTo"/>
    
  </div>
</template>

<script>
  /* 子组件的导入 */
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView.vue'
  /* 公共组件 */
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  

  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {debounce} from "common/utils"
  import {itemListenerMixin,backTopMixin} from 'common/mixin'


  export default {
		name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        isShowBackTo:false,
        taboffsetTop: 0,
        isTabFixed:false,
        saveY:0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

       //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      //监听图片加载完成
     /*  this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll.refresh()
      }) */
      //不在这里进行的原因是this.$refs.scroll的值在这个时候可能为空
    },
    mounted() {
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY();
      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      //网络请求相关
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          //console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          /* this.$refs.scroll.scroll.finishPullUp(); */
          this.$refs.scroll.finishPullUp();//pullingUp默认只能执行一次，所以要结束重启
        })
      },
      //事件监听相关
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index ;
        this.$refs.tabControl2.currentIndex = index ;
      },
     
      contentScroll(position) {
        //1.判断是否让BackToTop显示
        this.isShowBackTo = -(position.y) > 1000;
        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.taboffsetTop;
      },
      loadMore() {
        //console.log("上拉加载更多");
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        /* console.log(this.$refs.tabControl.$el.offsetTop); */
        this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

    }
   

   
	}
</script>

<style scoped>
  #home {
    /* padding-top:44px; */
    height: 100vh;
    position:relative;
  } 
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    /* position: fixed;
    left:0px;
    right:0px;
    top:0px;
     */
  }

  .content {
    position: absolute;
    overflow: hidden;
    top:44px;
    bottom:44px;
    left:0;
    right:0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
