<template>
  <div class="home">
    <div class="mb-3">
      <select id="useDb" v-model="useDb">
        <option v-for="op in useDbOptions" :key="op.text" :value="op.value">{{op.text}}</option>
      </select>
    </div>
    <div class="mb-3">
      <v-date-picker v-model="pickerDate" @dayclick="convertStartDate"/>
    </div>
    <!-- <div class="form-group">
      <button @click="onSubmit" variant="primary">検索</button>
    </div> -->
    
    <!-- <h1>This is a chart page</h1> -->
    <line-chart v-if="dataCollection" chartId="dataCollection" :chartdata="dataCollection" :option="option"></line-chart>
    <line-chart v-if="fundingRateCollection" chartId="fundingRateCollection" :chartdata="fundingRateCollection" :option="option"></line-chart>
    <line-chart v-if="lendingRateCollection" chartId="lendingRateCollection" :chartdata="lendingRateCollection" :option="option2"></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import {formatDate, getMomentDate, beforeDate} from '@/utils/dateUtils.js'
const axios = require('axios').create()
export default {
  name: 'Home',
  components: {
    LineChart
  },
  data () {
    return {
      marketData: [],
      fundingRate: [],
      lendingRate: [],
      useDb : false,
      useDbOptions: [
        { text: 'リアルタイム', value: false },
        { text: '過去', value: true },
      ],
      pickerDate : beforeDate(10),
      startDate: 1630861201,
      endDate: 1638677134,
      dataCollection: null,
      fundingRateCollection:null,
      lendingRateCollection: null,
      option2:{
        responsive: true,
        scales: {
            yAxes: [{
                id: "y-axis-1",   // Y軸のID
                type: "linear",   // linear固定 
                position: "left", // どちら側に表示される軸か？
                ticks: {          // スケール
                    beginAtZero:true
                },
            }, {
                id: "y-axis-2",
                type: "linear", 
                position: "right",
                ticks: {
                    beginAtZero:true
                },
            }]
        },
        radius: 0,
      },
      option:{
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        radius: 0,
      }
    }
  },
  created () {
    if(this.$route.query.start_time){
      this.startDate = this.$route.query.start_time
      this.pickerDate = new Date(this.startDate)
    }
    if(this.$route.query.useDb){
      this.useDb = this.$route.query.useDb
    }
  },
  mounted () {
    this.convertStartDate()
  },
  methods: {
    convertStartDate(){
      this.startDate = getMomentDate(this.pickerDate).unix()
      this.updataMarketData()
    },
    onSubmit() {
      this.updataMarketData()
    },
    onReset() {
      this.startDate = 1630861201
      this.endDate = 1638677134
      this.useDb = false
      this.updataMarketData()
    },
    updataMarketData: async function () {
      const priceData = await axios.get(`/api/ftx/marketPrice?start_time=${this.startDate}&use_db=${this.useDb}`)
      const fundingRate = await axios.get(`/api/ftx/fundingRate?start_time=${this.startDate}&use_db=${this.useDb}`)
      const lendingRate = await axios.get(`/api/ftx/lendingRate?start_time=${this.startDate}&use_db=${this.useDb}`)
      const priceJsonObj = JSON.parse(priceData.data)
      const fundingRateJsonObj = JSON.parse(fundingRate.data)
      const lendingRateJsonObj = JSON.parse(lendingRate.data)
      this.marketData = priceJsonObj 
      this.fundingRate = fundingRateJsonObj
      this.lendingRate = lendingRateJsonObj

      // チャートデータセット
      let labels = []
      let chartData = []
      for(let data of this.marketData) {
        let dt = data.startDate ? data.startDate : data.startTime
        labels.push(formatDate(new Date(dt), 'M-D HH'))

        // データにclose追加
        chartData.push(data.close)
      }
      // チャート描画用
      let dataCollection = {
          labels: labels,
          datasets: [{
            label: 'price',
            data: chartData,
            borderColor: "rgb(255, 99, 132)"
          }]
      }
      this.dataCollection = dataCollection

      labels = []
      var revFund = this.fundingRate.reverse();
      let fundData = []
      for(let data of revFund) {
        labels.push(formatDate(new Date(data.time), 'M-D HH'))
        fundData.push(data.rate)
      }
      // チャート描画用
      let fundingRateCollection = {
          labels: labels,
          datasets: [{
            label: 'fundingRate',
            data: fundData,
            borderColor: "rgb(75, 192, 192)"
          }]
      }
      this.fundingRateCollection = fundingRateCollection

      labels = []
      var revLend = this.lendingRate.reverse();
      let lendData = []
      let sizeData = []
      for(let data of revLend) {
        labels.push(formatDate(new Date(data.time), 'M-D HH'))
        // 年率換算
        let yearRate = data.rate*24*365*100
        // 最大定義
        if(yearRate > 30){
          yearRate = 35
        }
        lendData.push(yearRate)
        sizeData.push(data.size)
      }
      
      // チャート描画用
      let lendingRateCollection = {
          labels: labels,
          datasets: [{
            label: 'lendingRate',
            data: lendData,
            yAxisID: "y-axis-1",
            borderColor: "rgb(75, 192, 192)"
          },{
            label: 'lendingSize',
            data: sizeData,
            yAxisID: "y-axis-2",
            borderColor: "rgb(255, 99, 132)"
          }]
      }
      this.lendingRateCollection = lendingRateCollection
      
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