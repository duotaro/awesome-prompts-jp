<template>
  <div class="twitter_link">
    <h1>{{ dispDate }}</h1>
    <ul>
      <li v-for="item in timeList" :key="item.time">
        <a :href="createLink(item)" target="_blank" >{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from '@/utils/dateUtils.js'
export default {
  name: 'TwitterLink',
  props: {
    date: Date,
    keyword: String
  },
  data: function(){
    return {
      dispDate: null,
      searchDate: null,
      timeList:[
        {time: 0, text: '0:00〜1:00', since: '_0:00:00_JST', until: '_1:00:00_JST'},
        {time: 1, text: '1:00〜2:00', since: '_1:00:00_JST', until: '_2:00:00_JST'},
        {time: 2, text: '2:00〜3:00', since: '_2:00:00_JST', until: '_3:00:00_JST'},
        {time: 3, text: '3:00〜4:00', since: '_3:00:00_JST', until: '_4:00:00_JST'},
        {time: 4, text: '4:00〜5:00', since: '_4:00:00_JST', until: '_5:00:00_JST'},
        {time: 5, text: '5:00〜6:00', since: '_5:00:00_JST', until: '_6:00:00_JST'},
        {time: 6, text: '6:00〜7:00', since: '_6:00:00_JST', until: '_7:00:00_JST'},
        {time: 7, text: '7:00〜8:00', since: '_7:00:00_JST', until: '_8:00:00_JST'},
        {time: 8, text: '8:00〜9:00', since: '_8:00:00_JST', until: '_9:00:00_JST'},
        {time: 9, text: '9:00〜10:00', since: '_9:00:00_JST', until: '_10:00:00_JST'},
        {time: 10, text: '10:00〜11:00', since: '_10:00:00_JST', until: '_11:00:00_JST'},
        {time: 11, text: '11:00〜12:00', since: '_11:00:00_JST', until: '_12:00:00_JST'},
        {time: 12, text: '12:00〜13:00', since: '_12:00:00_JST', until: '_13:00:00_JST'},
        {time: 13, text: '13:00〜14:00', since: '_13:00:00_JST', until: '_14:00:00_JST'},
        {time: 14, text: '14:00〜15:00', since: '_14:00:00_JST', until: '_15:00:00_JST'},
        {time: 15, text: '15:00〜16:00', since: '_15:00:00_JST', until: '_16:00:00_JST'},
        {time: 16, text: '16:00〜17:00', since: '_16:00:00_JST', until: '_17:00:00_JST'},
        {time: 17, text: '17:00〜18:00', since: '_17:00:00_JST', until: '_18:00:00_JST'},
        {time: 18, text: '18:00〜19:00', since: '_18:00:00_JST', until: '_19:00:00_JST'},
        {time: 19, text: '19:00〜20:00', since: '_19:00:00_JST', until: '_20:00:00_JST'},
        {time: 20, text: '20:00〜21:00', since: '_20:00:00_JST', until: '_21:00:00_JST'},
        {time: 21, text: '21:00〜22:00', since: '_21:00:00_JST', until: '_22:00:00_JST'},
        {time: 22, text: '22:00〜23:00', since: '_22:00:00_JST', until: '_23:00:00_JST'},
        {time: 23, text: '23:00〜24:00', since: '_23:00:00_JST', until: '_24:00:00_JST'},
      ]
    }
  },
  created (){
    this.dispDate = formatDate(this.date, 'YYYY年M月D日')
    this.searchDate = formatDate(this.date, 'YYYY-M-D')
  },
  methods: {
    createLink: function(item){
      let url = 'https://twitter.com/search?q='
      let account = 'from:@btc_status '
      let keyword = this.keyword ? `${this.keyword} ` : ''
      let since = `since:${this.searchDate}${item.since} `
      let until = `until:${this.searchDate}${item.until} `
      let afterUrl = '&src=typed_query&f=top'
      url += (encodeURI(account) + encodeURI(keyword) + encodeURI(since) + encodeURI(until) + afterUrl)
      return url
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
