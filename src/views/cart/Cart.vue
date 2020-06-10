<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list />
    <cart-button-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  
  import CartList from './childComps/CartList'
  import CartButtonBar from './childComps/CartButtonBar'

  import {mapGetters} from 'vuex'

  export default {
		name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      /* ...mapGetters(['cartLength']) */
      //下面这个方法可以直接取别名
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
