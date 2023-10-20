<template>
  <table class="w-100 myMarqueeLeft">
    <tr>
<!--      <td>-->
<!--        <div style="padding: 5px 5px 5px 10px; width: 40px;">-->
<!--          <img width="w-100" :src="require('@/assets/images/廣播器圖片.svg')">-->
<!--        </div>-->
<!--      </td>-->
<!--      <td width="5"></td>-->
      <td>
        <div class="my-outbox">
          <div class="my-inbox" ref='box'>
            <div class="my-list" v-for="(item,index) in sendVal" :key='index' ref='list'>
              <span class="my-uname">{{item.name}}</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>

</template>

<script>
export default {
  name:'my-marquee-left',
  props:{
    sendVal:Array
  },
  data() {
    return {
      nowTime:null,
      disArr:[],

    }
  },
  mounted:function(){
    var that = this;
    var item = this.$refs.list;
    var len = this.sendVal.length;
    var arr = [];
    var margin = this.getMargin(item[0])
    for(var i = 0;i < len;i++){
      arr.push(item[i].clientWidth + margin)
    }
    this.disArr = arr;
    this.moveLeft();
  },
  beforeDestroy:function(){
    clearInterval(this.nowTime);
    this.nowTime = null;
  },
  methods:{
    getMargin:function(obj){
      var marg = window.getComputedStyle(obj,null)['margin-right'];
      marg = marg.replace('px','')
      return Number(marg)
    },
    moveLeft:function(){
      var outbox = this.$refs.box;
      var that=this;
      var startDis = 0;
      this.nowTime = setInterval(function(){
        startDis -= 0.5;
        if(Math.abs(startDis) > Math.abs(that.disArr[0])){
          that.disArr.push(that.disArr.shift())
          that.sendVal.push(that.sendVal.shift())
          startDis = 0;
        }
        outbox.style = 'transform: translateX('+ startDis +'px)';
      },1000/60)
    }
  }
}
</script>

<style>

.myMarqueeLeft{
  color:#ffffff;
  background: #00000066;
  position: relative;
}
.myMarqueeLeft .my-outbox{
  overflow: hidden;
  height: 35px;
}
.myMarqueeLeft .my-outbox .my-inbox{
  white-space: nowrap;}
.myMarqueeLeft .my-outbox .my-list{
  margin-right: 25px;
  display: inline-block;
  font-size: 13px;
  height: 35px;
  line-height: 35px;}
</style>
