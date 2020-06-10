<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectedAll" 
                    class="check-button"
                    @click.native="checkClck"/>
      <span>全选</span>
    </div> 
    <div>
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name:"CartButtonBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥'+ this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectedAll() {
      //if(this.$store.state.cartList.length === 0) return false
      //return !(this.$store.state.cartList.filter(item => !item.checked).length)//性能不高，需要遍历完
      if(this.$store.state.cartList.length === 0) return false
      return !(this.$store.state.cartList.find(item => !item.checked))//找到未选中的就停止
    }
  },
  methods: {
    checkClck() {
      if(this.isSelectedAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectedAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height:40px;
    background-color:#eee;
    position: relative;
    line-height:40px;
    display: flex;
  }
  .check-content {
    display:flex;
    align-items: center;
    margin-left:5px;
    width:60px;
  }
  .check-button {
    width: 20px;
    height:20px;
    line-height: 20px;
    margin-right:5px;
  }
  .calculate {
    width:90px;
    background-color: var(--color-tint);
    color:#fff;
    text-align: center;
  }
</style>