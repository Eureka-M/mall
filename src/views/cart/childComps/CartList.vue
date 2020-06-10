<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(index,item) in cartlist" 
                      :key="index" 
                      :item-info="item" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name:CartList,
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .cart {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>