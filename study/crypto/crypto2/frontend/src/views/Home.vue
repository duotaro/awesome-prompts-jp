<template>
  <div class="home">
    <!-- 日程設定 -->
    <section>
      <div class="mb-3">
        <v-date-picker v-model="range" :min-date="minDate" :max-date="maxDate" is-range />
      </div>
      <div class="mb-3">
        <button @click="search">検索</button>
      </div>
    </section>
    <line-chart v-if="dataCollection" chartId="dataCollection" :chartdata="dataCollection" :option="option"></line-chart>

  </div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import {COIN_COLOR} from '@/utils/const.js'
import {formatDate, beforeDate, addDate, YYYY_MM_DD_FORMAT, getRangeDateTimeList, getUnixTime} from '@/utils/dateUtils.js'
export default {
  name: 'Home',
  components: {
    LineChart
  },
  data () {
    return {
      /**
       * 日付
       */
      range: {
        start: beforeDate(30, YYYY_MM_DD_FORMAT),
        end: formatDate(new Date(), YYYY_MM_DD_FORMAT)
      },
      minDate: new Date('2019-3-3'),
      maxDate: addDate(new Date(), 1, YYYY_MM_DD_FORMAT),
      dateList: [],
      tmpMarketData: null,
      // tmpBtcMarketData: null,
      // tmpEthMarketData: null
      // チャート
      dataCollection: null,
      option:{
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        scales: {
            btcPrice: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            ethPrice: {
              type: 'linear',
              display: true,
              position: 'right',
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
        },
        radius: 0,
      },
    }
  },
  created (){
    //this.search()
  },
  computed : {
    btcMarketDataMap : function(){
      return this.$store.state.btcMarketDataMap
    },
    ethMarketDataMap : function(){
      return this.$store.state.ethMarketDataMap
    }
  },
  methods: {
    search: function(){
      this.createDateRangeList()
    },
    createDateRangeList: function(){
      this.dateList = []
      let startDate = formatDate(this.range.start,YYYY_MM_DD_FORMAT)
      let endDate = formatDate(this.range.end,YYYY_MM_DD_FORMAT)
      this.dateList = getRangeDateTimeList(startDate, endDate)
      this.getMarketData()
    },
    getMarketData: function(){
      this.tmpMarketData = this.ftxMarketData
      
      let tmpBtcMarketData = this.btcMarketDataMap
      let tmpEthMarketData = this.ethMarketDataMap
      console.log(tmpEthMarketData)
      

      let btcMarketData = []
      let ethMarketData = []
      let labels = []
      for(const date of this.dateList){
        labels.push(date)
        const unixDate = getUnixTime(date)
        const tmpBtc = tmpBtcMarketData.get(unixDate)
        if(tmpBtc) btcMarketData.push(tmpBtc.close)
      }
      for(const date of this.dateList){
        const unixDate = getUnixTime(date)
        const tmpEth = tmpEthMarketData.get(unixDate)
        console.log(tmpEth)
        if(tmpEth) ethMarketData.push(tmpEth.close)
      }

      let dataCollection = {
          labels: labels,
          datasets: [{
            label: 'BTC Price',
            data: btcMarketData,
            borderColor: COIN_COLOR.BTC,
            yAxisID: 'btcPrice',
          },{
            label: 'ETH price',
            data: ethMarketData,
            borderColor: COIN_COLOR.ETH,
            yAxisID: 'ethPrice',
          }]
      }
      // ここで取得したいデータを追加していく

      this.dataCollection = dataCollection


      console.log(btcMarketData)
      console.log(ethMarketData)

      // チャート作る


      
    }
  }
}
</script>
