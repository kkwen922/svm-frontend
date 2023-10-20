<template>

  <div class="app-container" style="margin-top: 0.2%; margin-left: 2%;margin-right: 2%;">

    <div class="cell">
      <div class="cell-tool">
        <div class="bk-button-group">
          <button @click="cellCountFn(item.number)" v-for="(item, index) in iconArr" :key="index_9">{{ item.number }}</button>
        </div>
      </div>
      <div class="player">
        <div :class="cellClass(index2)" v-for="(i, index2) in cellCountArr" :key="index2">
          <playVideo :str1="index2 + 1"></playVideo>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import playVideo from './components/playVideo.vue'

export default {
  name: 'App',
  components: {
    playVideo
  },
  data() {
    return {
      cellCount: 4,  //默认从4开始
      cellCountArr: [
        {
          index: 1,
          data: null,
          isShow: false
        },
        {
          index: 2,
          data: null,
          isShow: false
        },
        {
          index: 3,
          data: null,
          isShow: false
        },
        {
          index: 4,
          data: null,
          isShow: false
        },
      ],
      iconArr: [             //1 2 3 4 6 9 16宫格 icon 样式
        {
          number: 1,   //必须是int（number） 类型
          name: 'el-icon-s-platform',
          tips: '1画面'
        },
        {
          number: 2,   //必须是int（number） 类型
          name: 'el-icon-s-platform',
          tips: '2画面'
        },
        {
          number: 3,   //必须是int（number） 类型
          name: 'el-icon-s-platform',
          tips: '3画面'
        },
        {
          number: 4,   //必须是int（number） 类型
          name: 'el-icon-menu',
          tips: '4画面'
        },
        {
          number: 6,   //必须是int（number） 类型
          name: 'el-icon-s-grid',
          tips: '6画面'
        },
        {
          number: 8,   //必须是int（number） 类型
          name: 'el-icon-s-grid',
          tips: '8画面'
        },
        {
          number: 9,   //必须是int（number） 类型
          name: 'el-icon-s-grid',
          tips: '9画面'
        },
        {
          number: 16,  //必须是int（number） 类型
          name: 'el-icon-s-grid',
          tips: '16画面'
        },
        // {
        //   number: 0,   //必须是int（number） 类型  根据业务需求
        //   name: 'el-icon-delete',
        //   tips: '删除所有视频'
        // },
      ],
    }
  },
  methods: {
    // 点击事件
    cellCountFn(number) {
      this.cellCount = number
      this.cellCountArr.length = number
    }
  },
  computed: {
    // 计算类样式属性
    cellClass() {
      return function (index) {
        switch (this.cellCount) {
          case 1:
            return ['player-w1']
          case 2:
            return ['player-w2']
          case 3:
            if (index_ok == 0)
              return ['player-w3-1']
            return ['player-w3-2']
          case 4:
            return ['player-w4']
          case 6:
            if (index_ok == 0)
              return ['player-w6-1']
            return ['player-w6-2']
          case 8:
            if (index_ok == 0)
              return ['player-w8-1']
            return ['player-w8-2']
          case 9:
            return ['player-9']
          case 16:
            return ['player-16']
          default:
            break;
        }

      }
    },
  },
}
</script>


<style scoped>

.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
  height: 800px;
}


.cell {
  display: flex;
  flex-direction: column;
  height: 100%
}

.cell-tool {
  height: 40px;
  line-height: 30px;
  padding: 0 7px;
}

.player {
  height: 200px;
}

.player-w1 {
  width: 100%;
  height: 300%;
  box-sizing: border-box;
}

.player-w2 {
  width: 50%;
  height: 300%;
  box-sizing: border-box;
  float: left;
}

.player-w3-1 {
  width: 100%;
  height: 150%;
  box-sizing: border-box;
  float: left;
}

.player-w3-2 {
  width: 50%;
  height: 150%;
  box-sizing: border-box;
  float: left;
}

.player-w4 {
  width: 50%;
  height: 150% !important;
  box-sizing: border-box;
  /**可有可无 */
  float: left;
}

.player-w6-1 {
  width: 66.66%;
  height: 300% !important;
  /*这里小一点 注意点 */
  box-sizing: border-box;
  float: left;
}

.player-w6-2 {
  width: 33.33%;
  height: 150% !important;
  box-sizing: border-box;
  /*display: inline-table;*/
  /**可有可无 */
  float: left;
}

.player-w8-1 {
  width: 75%;
  height: 300% !important;
  box-sizing: border-box;
  float: left;
}

.player-w8-2 {
  width: 25%;
  height: 100% !important;
  box-sizing: border-box;
  /*display: inline-table;*/
  /**可有可无 */
  float: left;
}

.player-9 {
  width: 33.33%;
  height: 120% !important;
  box-sizing: border-box;
  float: left;
}

.player-16 {
  width: 25%;
  height: 100% !important;
  box-sizing: border-box;
  float: left;
}
</style>


