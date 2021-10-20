<template>
  <div class="btc-alert">
    <section>
      <div class="mb-3">
        <v-date-picker v-model="range" :min-date="minDate" :max-date="maxDate" is-range />
      </div>
      <div class="mb-3">
        <label for="keyword" class="form-label">キーワード</label>
        <input type="text" v-model="keyword" id="keyword" class="form-control"/>
      </div>
      <div class="mb-3">
        <button @click="search">検索</button>
      </div>
      <div class="mb-3">
        <select v-model="keyword" class="form-select">
          <option v-for="alertType in alertTypeList" :key="alertType" :value="alertType">{{alertType}}</option>
        </select>
      </div>
    </section>
    <section>
      <TwitterLink v-for="date in dateList" :key="date" :date="date" :keyword="keyword"/>
    </section>
    
  </div>
</template>

<script>
import TwitterLink from '@/components/common/TwitterLink.vue'
import {formatDate, beforeDate, addDate, YYYY_MM_DD_FORMAT, getRangeDateList} from '@/utils/dateUtils.js'

export default {
  name: 'BtcAlertLinks',
  components: {
    TwitterLink
  },
  data () {
    return {
      range: {
        start: beforeDate(7, YYYY_MM_DD_FORMAT),
        end: formatDate(new Date(), YYYY_MM_DD_FORMAT)
      },
      minDate: new Date('2019-3-3'),
      maxDate: addDate(new Date(), 1, YYYY_MM_DD_FORMAT),
      keyword : '',
      dateList: [],
      searched : false,
      btcPriceData : [],
      ethPriceData : [],
      btcRangePriceData : [],
      ethRangePriceData : [],
      alertTypeList: ['BTC Derivs Sheet', 'Binance Futures BTCUSDT', 'BitVol LXVX', 'FTX Lending', 'BTC ドミナンス', 'Perp OI', 'Bitcoin Network Status', 'Binance Derivs Sheet', 'Bitfinex 監視', 'Btc - Buy vs Sell', 'BTC Futures Curve', 'Deribit BTC Options','IVスマイルカーブ', ]
    }
  },
  watch : {
    marketDataMap : function(val){
      this.btcPriceData = val.get('BTC')
      this.ethPriceData = val.get('ETH')
      // これらを指定レンジで絞り込みたい
    }
  },
  computed: {
    marketDataMap: function () {
      let map = this.$store.state.marketDataMap
      return map
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
      this.dateList = getRangeDateList(startDate, endDate)
      console.log(this.dateList)
    }
  }
}
</script>
