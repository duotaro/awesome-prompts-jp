<template>
  <main class="container-fluid">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/btc_alert">BTCアラート検索</router-link> |
      <router-link to="/chart">Chart</router-link> |
      <router-link to="/bybt">Bybt</router-link> |
      <router-link to="/admin?pass=tyamauchi19880415">Admin</router-link> |
    </div>
    <router-view/>
    <!-- <button @click="showData()"></button> -->
  </main>
</template>

<script>
import {getUnixTime} from '@/utils/dateUtils.js'
const axios = require('axios').create()
export default {
  name: 'App',
  data () {
    return {
      endTime: getUnixTime(),
      marketNameList : ['BTC','ETH']
    }
  },
  async created() {
    this.setMarketData('BTC')
    this.setMarketData('ETH')
  },
  methods: {
    showData: function(){
      console.log('ファイル出力用だけどデータが大きすぎてできない')
      
        // let str = "HelloWorld!\r\nこんにちは世界！\r\n"; // 出力文字列
        // let ary = str.split(''); // 配列形式に変換（後述のBlobで全要素出力）
        let blob = new Blob(JSON.stringify(this.$store.state.marketDataMap),{type:"text/plan"}); // テキスト形式でBlob定義
        let link = document.createElement('a'); // HTMLのaタグを作成
        link.href = URL.createObjectURL(blob); // aタグのhref属性を作成
        link.download = 'test.txt'; // aタグのdownload属性を作成
        link.click(); // 定義したaタグをクリック（実行）
      
      //console.log(this.$store.state.marketDataMap)
    },
    setMarketData: async function(marketName){
      let endTime = getUnixTime()
      // 直近データ
      let hasData = true
      while(hasData){
        const priceData = await axios.get(`/api/ftx/marketPrice?start_time=0&end_time=${endTime}&market_name=${marketName}`)
        const priceJsonObj = JSON.parse(priceData.data)
        if(!priceJsonObj.length){
          hasData = false
        } else {
          this.$store.dispatch('setMarketData', {marketName: marketName,data: priceJsonObj})
          const lastData = priceJsonObj[0]
          endTime = (lastData.time/1000)-1
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
