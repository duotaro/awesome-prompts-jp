<template>
  <div class="home">
    <div class="mb-3">
      <select id="symbol" v-model="symbol" class="form-select">
        <option v-for="op in symbolOption" :key="op" :value="op">{{op}}</option>
      </select>
    </div>
    <div class="mb-3">
      <select id="interval" v-model="interval" class="form-select">
        <option v-for="op in intervalOption" :key="op.text" :value="op.value">{{op.text}}</option>
      </select>
    </div>
    <div class="mb-3">
      <button @click="download">描画</button>
    </div>
    <div v-if="showChart">
      <!-- default -->
      <line-chart v-if="dataCollection" chartId="dataCollection" :chartdata="dataCollection" :option="option"></line-chart>
      <!-- oi -->
      <line-chart v-if="oiCollection" chartId="oiCollection" :chartdata="oiCollection" :option="oiOptions"></line-chart>
      <!-- fr -->
      <line-chart v-if="frCollection" chartId="frCollection" :chartdata="frCollection" :option="frOptions"></line-chart>
      <!-- ls -->
      <line-chart v-if="lsRatioCollection" chartId="lsRatioCollection" :chartdata="lsRatioCollection" :option="lsOptions"></line-chart>
      <!-- vol -->
      <line-chart v-if="volumeCollection" chartId="volumeCollection" :chartdata="volumeCollection" :option="volOptions"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import {formatDate} from '@/utils/dateUtils.js'
import {EXCAHNGE_COLOR} from '@/utils/const.js'
//import {kmgt} from '@/utils/numberUtils.js'
const axios = require('axios').create()
export default {
  name: 'Bybt',
  components: {
    LineChart
  },
  watch :{
    symbol :function(){
      this.initData()
      this.getOpenInterest()
      this.getFundingRate()
      this.getLSRatio()
      this.getVolume()
    },
    interval :function(){
      this.initData()
      this.getOpenInterest()
      this.getFundingRate()
      this.getLSRatio()
      this.getVolume()
    },
    setOI: function(val){
      if(val && this.setFr && this.setLs && this.setVol) {
        this.download()
      }
    },
    setFr: function(val){
      if(val && this.setFr && this.setLs && this.setVol) {
        this.download()
      }
    },
    setLs: function(val){
      if(val && this.setFr && this.setLs && this.setVol) {
        this.download()
      }
    },
    setVol: function(val){
      if(val && this.setFr && this.setLs && this.setVol) {
        this.download()
      }
    }
  },
  data () {
    return {
      symbol : 'BTC',
      symbolOption: ['BTC', 'ETH', 'EOS', 'BCH', 'LTC', 'XRP', 'BSV', 'ETC', 'TRX', 'LINK'],
      interval : 2,
      intervalOption :[
        {text: 'ALL', value: 0},
        {text: '1H', value: 2},
        {text: '4H', value: 1},
        {text: '12H', value: 4},
      ],
      type : 'U',
      chartItem: 0,
      chartItemOption :[
        {text: 'OpenInterest', value: 0},
        {text: 'FundingRate', value: 1},
        {text: 'LongShortRatio', value: 2},
        {text: 'Volume', value: 3},
      ],
      color: {
        FTX : "rgb(89, 133, 208)",
        BINANCE: "rgb(255, 159, 0)",
        BYBIT: "rgb(123, 182, 97)",
        CME: "rgb(255, 145, 191)",
        DYDX: "rgb(204, 153, 255)",
        BITMEX: "rgb(68, 207, 204)",
        GATE: "rgb(255, 0, 24)",
      },
      dataCollection: null,
      oiCollection: null,
      oiOptions:{
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      },
      frCollection: null,
      frOptions:{
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      },
      lsRatioCollection: null,
      lsOptions:{
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      },
      volumeCollection: null,
      volOptions:{
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      },
      // csvデータ
      csvData: [],
      csvLabels: {
        date: { title: "日時" },
        time: { title: "unix時間" },
        price: { title: "価格" }
      },
      showChart : false
    }
  },
  created () {
    this.getOpenInterest()
    this.getFundingRate()
    this.getLSRatio()
    this.getVolume()
  },
  mounted () {
  },
  methods: {
    initData: function(){
      this.dataCollection=null,
      this.oiCollection=null,
      this.oiOptions={
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      }
      this.frCollection=null,
      this.frOptions={
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      }
      this.lsRatioCollection=null,
      this.lsOptions={
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      }
      this.volumeCollection=null,
      this.volOptions = {
        responsive: true,
        scales: {
            yAxes: []
        },
        radius: 0,
      }
    },
    createChart(dateList, priceList, dataList, chartType) {
      let labels = []
      for(let date of dateList) {
        let dt = new Date(date)
        let fdt = formatDate(dt, 'M-D h')
        labels.push(fdt)
      }
      const price = [
        {
          type: 'line',
          label: 'Price',
          data: priceList,
          borderColor: "rgb(255, 99, 132)"
        }
      ]
      let data = price.concat(dataList)

      // チャート描画用
      let dataCollection = {
          labels: labels,
          datasets: data
      }
      // typeごとに
      if(chartType == 0){
        // oi
        this.oiCollection = dataCollection
      } else if(chartType == 1){
        // fr
        this.frCollection = dataCollection
      } else if(chartType == 2){
        // ls ratio
        this.lsRatioCollection = dataCollection
      } else if(chartType == 3){
        // volume
        this.volumeCollection = dataCollection
      } else {
        // その他
        this.dataCollection = dataCollection
      }
    },
    /**
     * oi取得します
     */
    async getOpenInterest() {
      const res = await this.getData(0)
      this.$store.dispatch('setOi', {data: res})
      const dateLiet = res.dateList
      const priceList = res.priceList

      let dataList = []

      const ftx = res.dataMap.FTX
      const binance = res.dataMap.Binance
      const bybit = res.dataMap.Bybit
      const cme = res.dataMap.CME
      const dydx = res.dataMap.dYdX
      const bitmex = res.dataMap.Bitmex

      let ftxItem = this.createData('line', 'FTX_OI', ftx, EXCAHNGE_COLOR.FTX);
      let binanceItem = this.createData('line', 'BINANCE_OI', binance, EXCAHNGE_COLOR.BINANCE);
      let bybitItem = this.createData('line', 'BYBIT_OI', bybit, EXCAHNGE_COLOR.BYBIT);
      let cmeItem = this.createData('line', 'CME_OI', cme, EXCAHNGE_COLOR.CME);
      let dydxItem = this.createData('line', 'DYDX_OI', dydx, EXCAHNGE_COLOR.DYDX);
      let bitmexItem = this.createData('line', 'BITMEX_OI', bitmex, EXCAHNGE_COLOR.BITMEX);
      
      if(ftxItem){
        dataList.push(ftxItem.dataItem)
        this.oiOptions.scales.yAxes.push(ftxItem.option)
      }
      if(binanceItem){
        dataList.push(binanceItem.dataItem)
        this.oiOptions.scales.yAxes.push(binanceItem.option)
      }
      if(bybitItem){
        dataList.push(bybitItem.dataItem)
        this.oiOptions.scales.yAxes.push(bybitItem.option)
      }
      if(cmeItem){
        dataList.push(cmeItem.dataItem)
        this.oiOptions.scales.yAxes.push(cmeItem.option)
      }
      if(dydxItem){
        dataList.push(dydxItem.dataItem)
        this.oiOptions.scales.yAxes.push(dydxItem.option)
      }
      if(bitmexItem){
        dataList.push(bitmexItem.dataItem)
        this.oiOptions.scales.yAxes.push(bitmexItem.option)
      }

      this.createChart(dateLiet, priceList, dataList, 0)
    },
    /**
     * FRを取得します
     */
    async getFundingRate() {
      const res = await this.getData(1)
      this.$store.dispatch('setFr', {data: res})
      const dateLiet = res.dateList
      const priceList = res.priceList

      let dataList = []

      const binance = res.dataMap.Binance
      const bybit = res.dataMap.Bybit
      const gate = res.dataMap.Gate

      let binanceItem = this.createData('bar', 'BINANCE_FR', binance, EXCAHNGE_COLOR.BINANCE);
      let bybitItem = this.createData('bar', 'BYBIT_FR', bybit, EXCAHNGE_COLOR.BYBIT);
      let gateItem = this.createData('bar', 'GATE_FR', gate, EXCAHNGE_COLOR.GATE);
      if(binanceItem){
        dataList.push(binanceItem.dataItem)
        this.frOptions.scales.yAxes.push(binanceItem.option)
      }
      if(bybitItem){
        dataList.push(bybitItem.dataItem)
        this.frOptions.scales.yAxes.push(bybitItem.option)
      }
      if(gateItem){
        dataList.push(gateItem.dataItem)
        this.frOptions.scales.yAxes.push(gateItem.option)
      }
      this.createChart(dateLiet, priceList, dataList, 1)
    },
    /**
     * ls比を取得します
     */
    async getLSRatio() {
      const res = await this.getData(2)
      this.$store.dispatch('setLs', {data: res})
      const dateLiet = res.dateList
      const priceList = res.priceList

      let dataList = []

      const longShortRateList = res.longShortRateList

      let longShortRateItem = this.createData('line', 'ls', longShortRateList, EXCAHNGE_COLOR.BINANCE);
      if(longShortRateItem){
        dataList.push(longShortRateItem.dataItem)
        this.lsOptions.scales.yAxes.push(longShortRateItem.option)
      }
      this.createChart(dateLiet, priceList, dataList, 2)
    },
    /**
     * volumeを取得します
     */
    async getVolume() {
      const res = await this.getData(3)
      this.$store.dispatch('setVol', {data: res})
      const dateLiet = res.dateList
      const priceList = res.priceList

      let dataList = []

      const ftx = res.dataMap.FTX
      const binance = res.dataMap.Binance
      const bybit = res.dataMap.Bybit
      const dydx = res.dataMap.dYdX
      const bitmex = res.dataMap.Bitmex

      let ftxItem = this.createData('bar', 'FTX_Vol', ftx, EXCAHNGE_COLOR.FTX);
      let binanceItem = this.createData('bar', 'BINANCE_Vol', binance, EXCAHNGE_COLOR.BINANCE);
      let bybitItem = this.createData('bar', 'BYBIT_Vol', bybit, EXCAHNGE_COLOR.BYBIT);
      let dydxItem = this.createData('bar', 'DYDX_Vol', dydx, EXCAHNGE_COLOR.DYDX);
      let bitmexItem = this.createData('bar', 'BITMEX_Vol', bitmex, EXCAHNGE_COLOR.BITMEX);
      
      if(ftxItem){
        dataList.push(ftxItem.dataItem)
        this.volOptions.scales.yAxes.push(ftxItem.option)
      }
      if(binanceItem){
        dataList.push(binanceItem.dataItem)
        this.volOptions.scales.yAxes.push(binanceItem.option)
      }
      if(bybitItem){
        dataList.push(bybitItem.dataItem)
        this.volOptions.scales.yAxes.push(bybitItem.option)
      }
      if(dydxItem){
        dataList.push(dydxItem.dataItem)
        this.volOptions.scales.yAxes.push(dydxItem.option)
      }
      if(bitmexItem){
        dataList.push(bitmexItem.dataItem)
        this.volOptions.scales.yAxes.push(bitmexItem.option)
      }
      this.createChart(dateLiet, priceList, dataList, 3)
    },
    createData: function(type, label, list, color){
      if(!list || !list.length) {
        return null
      }

      let formatList = list
      //let formatList = []
      // for(let val of list) {
      //   let tmpVal = kmgt(val)
      //   formatList.push(tmpVal)
      // }

      let dataItem = {
        type: type,
        label: label,
        data: formatList,
        borderColor: color,
        backgroundColor: color,
        yAxisID: label,
      }

      let option = {
        id: label,
        type: "linear", 
        ticks: {
            beginAtZero:true
        }
      }

      return {dataItem, option}
    },
    getData: async function (chartType) {
      const res = await axios.get(`/api/bybt/market?symbol=${this.symbol}&type=${this.type}&interval=${this.interval}&chartItem=${chartType}`)
      const result = JSON.parse(res.data)
      return result
    },
    download: function(){

      // let frItem = this.$store.state.frData

      // let dateList = frItem.dateList
      // let priceList = frItem.priceList
      // const binanceFr = frItem.dataMap.Binance
      // const bybitFr = frItem.dataMap.Bybit
      // const gateFr = frItem.dataMap.Gate

      // var csv = '\ufeff' + 'date,unix_time,price,binance_fr,bybit_fr,gate_fr\n'
      // dateList.forEach((el,index) => {
      //   let dt = new Date(el)
      //   let fdt = formatDate(dt, 'YYYY-MM-DD hh:mm:ss') 
      //   var line = fdt
      //     + ',' + el
      //     + ',' + priceList[index] 
      //     + ',' + binanceFr[index]
      //     + ',' + bybitFr[index]
      //     + ',' + gateFr[index]
      //     + '\n'
      //   csv += line
      // })
      // let blob = new Blob([csv], { type: 'text/csv' })
      // let link = document.createElement('a')
      // link.href = window.URL.createObjectURL(blob)
      // link.download = `fr_${this.interval}.csv`
      // link.click()
    
      // let volItem = this.$store.state.volData
      // console.log(volItem)
      // dateList = volItem.dateList
      // priceList = volItem.priceList
      // const ftxVol = volItem.dataMap.FTX
      // const binanceVol = volItem.dataMap.Binance
      // const bybitVol = volItem.dataMap.Bybit
      // const dydxVol = volItem.dataMap.dYdX
      // const bitmexVol = volItem.dataMap.Bitmex

      // csv = '\ufeff' + 'date,unix_time,price,ftx_vol,binance_vol,bybit_vol,dydx_vol,bitmex_vol\n'
      // dateList.forEach((el,index) => {
      //   let dt = new Date(el)
      //   let fdt = formatDate(dt, 'YYYY-MM-DD hh:mm:ss') 
      //   var line = fdt
      //     + ',' + el
      //     + ',' + priceList[index] 
      //     + ',' + ftxVol[index]
      //     + ',' + binanceVol[index]
      //     + ',' + bybitVol[index]
      //     + ',' + dydxVol[index]
      //     + ',' + bitmexVol[index]
      //     + '\n'
      //   csv += line
      // })

      // let testData  = ftxVol[0]
      // console.log(typeof testData)

      // blob = new Blob([csv], { type: 'text/csv' })
      // link = document.createElement('a')
      // link.href = window.URL.createObjectURL(blob)
      // link.download = `vol_${this.interval}.csv`
      // link.click()

      this.showChart = true

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