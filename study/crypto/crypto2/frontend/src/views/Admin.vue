<template>
  <div class="home">
    <div v-if="canAccess">
      <div class="mb-3">
        <button
          @click="updataTableData"
          class="btn btn-primary"
          type="button"
          aria-expanded="false" 
        >
          データ更新
        </button>
      </div>
      <div>
        <div class="form-group">
          <v-date-picker v-model="range" :min-date="minDate" :max-date="maxDate" is-range />
        </div>
        <div class="mb-3">
          <label for="symbol" class="col-sm-2 col-form-label">symbol</label>
          <select id="symbol" v-model="symbol" class="form-select">
            <option v-for="item in marketNameList" :key="item" :value="item">{{item}}</option>
          </select>
        </div>
        <div class="mb-3">
          <label id="interval" for="interval" class="col-sm-2 col-form-label">interval</label>
          <select v-model="interval" class="form-select">
            <option v-for="item in intervalList" :key="item.val" :value="item.val">{{item.text}}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="chartType" class="col-sm-2 col-form-label">chartType</label>
          <select id="chartType" v-model="chartType" class="form-select">
            <option v-for="item in chartItemOption" :key="item.value" :value="item.value">{{item.text}}</option>
          </select>
        </div>
        <button
          @click="doTest"
          class="btn btn-primary "
          type="button"
          aria-expanded="false" 
        >
          テスト実行
        </button>
      </div>
    </div>
    <div v-else>
      <p>アクセス権限がありません。</p>
      <router-link to="/">Topへ戻る</router-link>
    </div>
  </div>
</template>

<script>
const axios = require('axios').create()
import {getUnixTime, formatDate, beforeDate, addDate, getDiff, YYYY_MM_DD_FORMAT, getDateFromUnixTime} from '@/utils/dateUtils.js'
export default {
  name: 'Admin',
  data () {
    return {
      range: {
        start: beforeDate(7, YYYY_MM_DD_FORMAT),
        end: formatDate(new Date(), YYYY_MM_DD_FORMAT)
      },
      minDate: new Date('2019-3-3'),
      maxDate: addDate(new Date(), 1, YYYY_MM_DD_FORMAT),
      canAccess: false,
      tableData: [],
      inputPass: null,
      chartType : 0,
      chartItemOption :[
        {text: 'OpenInterest', value: 0},
        {text: 'FundingRate', value: 1},
        {text: 'LongShortRatio', value: 2},
        {text: 'Volume', value: 3},
      ],
      futureList : [
        'BTC-PERP', 'ETH-PERP'
      ],
      coinList : [
        'USD','BTC','ETH','DOGE','SOL','LINK','BNB','USDT'
      ],
      marketNameList : [
        'USD','BTC','ETH','DOGE','SOL','LINK','BNB','USDT'
      ],
      symbol: 'BTC',
      interval: 2,
      type: 'U',
      intervalList: [
        {text: 'ALL', val: 0},
        {text: '1H', val: 2},
        {text: '4H', val: 1},
        {text: '8H', val: 6},
        {text: '12H', val: 4},
        {text: 'D1', val: 5},
        {text: '5M', val: 3}
      ]
    }
  },
  created(){
    if(this.$route.query.pass){
      this.inputPass = this.$route.query.pass
    }
    let inputPass = this.inputPass ? this.inputPass : prompt('Please input password?', '');
    if(inputPass == process.env.VUE_APP_ADMIN_PASS) {
      alert('成功')
      this.canAccess = true
      this.inputPass = inputPass
    } else {
      alert('エラー')
    }
  },
  methods: {
    doTest : async function(){
      // typeは固定にしている
      let apiUrl = `/api/bybt/market?symbol=${this.symbol}&interval=${this.interval}&type=${this.type}&chartItem=${this.chartType}`
      const res = await axios.get(apiUrl)
      const jsonRes = JSON.parse(res.data)
      
      console.log(this.range.start)
      console.log(this.range.end)


      console.log(getUnixTime(this.range.start))
      console.log(getUnixTime(this.range.end))

      console.log(jsonRes)

      const dateList = jsonRes.dateList
      if(!dateList || dateList.length == 0){
        return;
      }
      let firstDate = dateList[0]
      console.log(jsonRes.priceList[0])
      console.log(firstDate/1000)
      console.log(getDateFromUnixTime(firstDate/1000, true))
      let secondDate = dateList[1]
      let diffDate = getDiff(firstDate, secondDate, 'minutes')
      console.log(diffDate)




      let lastDate = dateList[29]
      console.log(jsonRes.priceList[29])
      console.log(lastDate/1000)
      console.log(getDateFromUnixTime(lastDate/1000, true))

    },
    updataTableData: async function () {
      this.getFundingRate()
      this.getLendingRate()
      this.getMarketData()
      await this.getBybtData()
      console.log('finish')
    },
    getFundingRate: async function() {
      // 直近データ
      for(let future of this.futureList) {
        // 直近データ取得
        let apiUrl = `/api/admin/ftx/fundingRate?pass=${this.inputPass}&future=${future}`
        axios.get(apiUrl)

        // 過去データ
        // apiUrl = `/api/admin/ftx/fundingRate?pass=${this.inputPass}&is_latest=False&future=${future}`
        // let oldRes = null
        // while (oldRes == []) {
        //   oldRes = this.doRequest(apiUrl)
        // }
      }
    },
    getLendingRate: async function() {
      // 直近データ
      for(let coin of this.coinList) {
        // 直近データ取得
        let apiUrl = `/api/admin/ftx/lendingRate?pass=${this.inputPass}&coin=${coin}`
        this.doRequest(apiUrl)

        // 過去データ
        // apiUrl = `/api/admin/ftx/lendingRate?pass=${this.inputPass}&is_latest=False&coin=${coin}`
        // let oldRes = null
        // while (oldRes != []) {
        //   oldRes = this.doRequest(apiUrl)
        //   console.log(oldRes)
        // }
      }
    },
    getMarketData: async function() {
      // 直近データ
      for(let marketName of this.marketNameList) {
        // 直近データ取得
        let apiUrl = `/api/admin/ftx/marketPrice?pass=${this.inputPass}&market_name=${marketName}`
        //let res = await this.doRequest(apiUrl)
        await this.doRequest(apiUrl)

        // 過去データcsv作成
        // apiUrl = `/api/ftx/marketPrice?pass=${this.inputPass}&market_name=${marketName}&start_time=0&use_db=True`
        // res = await this.doRequest(apiUrl)

        // let data = JSON.parse(res.data)

        // var csv = '\ufeff' + 'date,unix_time,market_name,open,close,high,low,volume\n'
        // data.forEach((el) => {
        //   let dt = new Date(el.time)
        //   let fdt = formatDate(dt, 'YYYY-MM-DD hh:mm:ss') 
        //   var line = fdt
        //     + ',' + el.time
        //     + ',' + el.market_name
        //     + ',' + el.open
        //     + ',' + el.close
        //     + ',' + el.high
        //     + ',' + el.low
        //     + ',' + el.volume
        //     + '\n'
        //   csv += line
        // })
        // let blob = new Blob([csv], { type: 'text/csv' })
        // let link = document.createElement('a')
        // link.href = window.URL.createObjectURL(blob)
        // link.download = `marketData_${marketName}.csv`
        // link.click()
      }
    },
    /**
     * bybt apiから取得したデータを更新します
     */
    getBybtData: async function() {
      // 直近データ
      for(let coin of this.coinList) {
        // 直近データ取得
        for(let chartItem of this.chartItemOption){
          for(let interval of this.intervalList) {
            let apiUrl = `/api/admin/bybt?pass=${this.inputPass}&symbol=${coin}&interval=${interval.val}&chartItem=${chartItem.value}`
            try {
              await this.doRequest(apiUrl)
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    },
    doRequest: async function(apiUrl){
      console.log(`requestUrl: ${apiUrl}`)
      const res = await axios.get(apiUrl)
      let resObj = {}
      console.log(res)
      if(res && res.data){
        if(res.data == 'no item'){
          return resObj
        }
        resObj = JSON.parse(res.data)
      }
      console.log(resObj)
      return resObj
    }
  }
}
</script>
<style scoped>
.data-table {
  width: 80%;
  margin: auto;
}
</style>