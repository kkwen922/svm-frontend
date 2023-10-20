<template>
  <div class="app-container" style="margin-left: 2%;margin-right: 2%;">

    <!--    <div class="ImportantContent">-->
    <!--      <div class="Marquee">-->
    <!--        <marqueeLeft :send-val='send' v-if='send'></marqueeLeft >-->
    <!--      </div>-->
    <!--    </div>-->

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane :label="$t('message.home_cloud_arch')" name="Cloud服務架構圖">
        <img height="95%" src="../.././assets/images/cloud.png" alt="">

      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_vm_arch')" name="VM服務架構圖">
        <img  height="95%" src="../.././assets/images/simple.png" alt="">
      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_diagram')" name="Diagram">
        <img width= '100%' height="95%" src="../.././assets/images/diagram.svg" alt="">
      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_er_model')" name="實體關聯性模型圖">
        <img height="95%" src="../.././assets/images/er.png" alt="">
      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_ui_ux')" name="前端設計方針">

        <h2>設計方針</h2>

        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item title="# RWD" name="1">
            <div>本系統採用RWD響應式網頁設計，又稱為回應式網站設計，其是指網站能跨平台使用，自動偵測使用者上網的裝置尺寸，能針對不同螢幕的大小而自動調整網頁圖文內容。</div>
          </el-collapse-item>
          <el-collapse-item title="# SEO" name="2">
            <div>本系統需登入後才能使用，故無須提升網站的能見度與流量。</div>
          </el-collapse-item>

        </el-collapse>

        <br>

        <el-table :data="tableData" style="width: 60%">
          <el-table-column prop="item" :label="$t('message.item')" width="80px"></el-table-column>
          <el-table-column prop="description" :label="$t('message.point')"></el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_front_end')" name="前端框架技術">
        <el-table :data="tableData_f" style="width: 60%">
          <el-table-column prop="item" :label="$t('message.item')" width="80px"></el-table-column>
          <el-table-column prop="description" :label="$t('message.tech')"></el-table-column>
          <el-table-column prop="url" :label="$t('message.reference')"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="$t('message.home_backend')" name="後端框架技術">
        <el-table :data="tableData_b" style="width: 60%">
          <el-table-column prop="item" :label="$t('message.item')" width="80px"></el-table-column>
          <el-table-column prop="description" :label="$t('message.tech')"></el-table-column>
          <el-table-column prop="url" :label="$t('message.reference')"></el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>

    <VueBotUI 
    :messages="messageData" 
    :bot-typing="botTyping"
    :input-disable="inputDisable"
    :options="botOptions" 
    :is-open="false"
    @init="botStart"
    @msg-send="msgSend"/>

  </div>
</template>

<script>

import BotIcon from '../../assets/images/bot.png'
import marqueeLeft from "../../components/HomeMarquee/HomeMarquee";
import BackToTop from 'vue-backtotop'
import { VueBotUI } from 'vue-bot-ui'
import { messageService } from '../../helpers/message'

export default {

  components: {
    BotIcon,
    marqueeLeft,
    BackToTop,
    VueBotUI,
  },

  data() {

    return {

      drawer: false,
      messageData :[],
      botTyping: false,
      inputDisable: false,
      data: [], // See Data example below
      botOptions: {
        
        botAvatarImg: BotIcon,
        boardContentBg: '#f4f4f4',
        msgBubbleBgBot: '#fff',
        inputPlaceholder: 'Type hereeee...',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'Hit the buttons above to respond'
      },

      send: [
        { name: "資安不分 day and night，病毒駭客 say goodbye。" },
        { name: "密碼123，盜用好簡單。" },
        { name: "網路無國界，個資須警戒。" },
        { name: "資訊恆久遠，一漏久流傳。" },
        { name: "網路飆網停看聽，隱私保護有信心。" },
        { name: "機密檔案保管好，不會洩密惹煩惱。" },
        { name: "網際網路無國界，慎防機密由此洩。" },
      ],

      activeNames: 1,
      activeName: 'Cloud服務架構圖',

      tableData: [
        { item: '1', description: '用戶體驗(User experience) : 確保用戶能夠輕鬆、順暢地使用應用程式。' },
        { item: '2', description: '可用性(Usability) : 確保應用程式易於使用和理解。' },
        { item: '3', description: '美觀(Aesthetics) : 確保應用程式的外觀和感覺美觀。' },
        { item: '4', description: '一致性(Consistency) : 確保應用程式的元素和操作保持一致。' },
        { item: '5', description: '簡單性(Simplicity) : 確保應用程式易於使用和理解。' },
        { item: '6', description: '訪問性(Accessibility) : 確保應用程式能夠被所有用戶使用，包括有障礙的用戶。' },
        { item: '7', description: '易於更新(Easy to maintain) : 確保應用程式易於維護和更新。' }
      ],
      tableData_f: [
        { item: '1', description: '前端框架 #vue。', url: '\https://vuejs.org/' },
        { item: '2', description: '路由框架 #vue-router', url: '\https://router.vuejs.org/' },
        { item: '3', description: '多國語言 #vue-i18n', url: '\https://kazupon.github.io/vue-i18n/' },
        { item: '4', description: '全局狀態管理框架 #Vuex', url: '\https://vuex.vuejs.org/' },
        { item: '5', description: '前端UI框架 #Element', url: '\https://element.eleme.io/' },
        { item: '6', description: '前端HTTP框架 # Axios', url: '\https://github.com/axios/axios' },
        { item: '7', description: 'Echarts的圖表框架 #eChart', url: '\https://v-charts.js.org/' },
        { item: '8', description: 'cookie管理工具 #Js-cookie', url: '\https://github.com/js-cookie/js-cookie' }
      ],
      tableData_b: [
        { item: '1', description: '容器+MVC框架 #SpringBoot #Spring Cloud', url: '\https://spring.io/' },
        { item: '2', description: '認證和授權框架 #SpringSecurity', url: '\https://spring.io/projects/spring-security' },
        { item: '3', description: 'ORM框架 #MyBatis', url: '\http://www.mybatis.org/mybatis-3/zh/index.html' },
        { item: '4', description: '消息佇列 #RabbitMQ', url: '\https://www.rabbitmq.com/' },
        { item: '5', description: 'API文件產生工具 # openapi-ui', url: '\https://github.com/swagger-api/swagger-ui' },
        { item: '6', description: 'JWT登入支援 #jwt', url: '\https://jwt.io/' },
      ]
    }
  },
  created() {
    console.info("created=====>" + localStorage.getItem('locale'));

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    botStart () {
      // Get token if you want to build a private bot
      // Request first message here

      // Fake typing for the first message
      this.botTyping = true
      setTimeout(() => {
        this.botTyping = false
        this.messageData.push({
          agent: 'bot',
          type: 'text',
          text: '歡迎使用，請問有什ㄇ需要嗎？'
        })
      }, 1000)
    },

    msgSend (value) {
      // Push the user's message to board
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })

      this.getResponse()
    },

    // Submit the message from user to bot API, then get the response from Bot
    getResponse () {
      // Loading
      this.botTyping = true

      // Post the message from user here
      // Then get the response as below

      // Create new message from fake data
      messageService.createMessage()
        .then((response) => {
          const replyMessage = {
            agent: 'bot',
            ...response
          }

          this.inputDisable = response.disableInput
          this.messageData.push(replyMessage)

          // finish
          this.botTyping = false
        })
    }
  
  },


}
</script>

<style lang= "scss" scoped>

.el-collapse-item__Bos {
  font-size: 16px !important;
  margin-left: 20px !important;
}

.el-tabs__item.is-active {
  color: rgb(73, 178, 82);
}

.el-tabs__active-bar {
  background-color: rgb(73, 178, 82);
}

.el-tab-pane {
  height: calc(100vh - 110px);
  overflow-y: auto;
}
</style>
