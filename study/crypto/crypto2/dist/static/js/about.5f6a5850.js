(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"218e":function(t,e,a){},"34a0":function(t,e,a){"use strict";a.r(e);var n=a("7a23"),i={class:"home"},c={class:"mb-3"},s=["value"],r={class:"mb-3"},o=["value"],l={class:"mb-3"},u={key:0};function b(t,e,a,b,d,p){var h=Object(n["B"])("line-chart");return Object(n["t"])(),Object(n["g"])("div",i,[Object(n["h"])("div",c,[Object(n["J"])(Object(n["h"])("select",{id:"symbol","onUpdate:modelValue":e[0]||(e[0]=function(t){return d.symbol=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(d.symbolOption,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t,value:t},Object(n["D"])(t),9,s)})),128))],512),[[n["F"],d.symbol]])]),Object(n["h"])("div",r,[Object(n["J"])(Object(n["h"])("select",{id:"interval","onUpdate:modelValue":e[1]||(e[1]=function(t){return d.interval=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(d.intervalOption,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t.text,value:t.value},Object(n["D"])(t.text),9,o)})),128))],512),[[n["F"],d.interval]])]),Object(n["h"])("div",l,[Object(n["h"])("button",{onClick:e[2]||(e[2]=function(){return p.download&&p.download.apply(p,arguments)})},"描画")]),d.showChart?(Object(n["t"])(),Object(n["g"])("div",u,[d.dataCollection?(Object(n["t"])(),Object(n["e"])(h,{key:0,chartId:"dataCollection",chartdata:d.dataCollection,option:t.option},null,8,["chartdata","option"])):Object(n["f"])("",!0),d.oiCollection?(Object(n["t"])(),Object(n["e"])(h,{key:1,chartId:"oiCollection",chartdata:d.oiCollection,option:d.oiOptions},null,8,["chartdata","option"])):Object(n["f"])("",!0),d.frCollection?(Object(n["t"])(),Object(n["e"])(h,{key:2,chartId:"frCollection",chartdata:d.frCollection,option:d.frOptions},null,8,["chartdata","option"])):Object(n["f"])("",!0),d.lsRatioCollection?(Object(n["t"])(),Object(n["e"])(h,{key:3,chartId:"lsRatioCollection",chartdata:d.lsRatioCollection,option:d.lsOptions},null,8,["chartdata","option"])):Object(n["f"])("",!0),d.volumeCollection?(Object(n["t"])(),Object(n["e"])(h,{key:4,chartId:"volumeCollection",chartdata:d.volumeCollection,option:d.volOptions},null,8,["chartdata","option"])):Object(n["f"])("",!0)])):Object(n["f"])("",!0)])}var d=a("1da1"),p=a("b85c"),h=(a("96cf"),a("99af"),a("759f")),O=a("fa1c"),f=a("37b6"),m=a("bc3a").create(),v={name:"Bybt",components:{LineChart:h["a"]},watch:{symbol:function(){this.initData(),this.getOpenInterest(),this.getFundingRate(),this.getLSRatio(),this.getVolume()},interval:function(){this.initData(),this.getOpenInterest(),this.getFundingRate(),this.getLSRatio(),this.getVolume()},setOI:function(t){t&&this.setFr&&this.setLs&&this.setVol&&this.download()},setFr:function(t){t&&this.setFr&&this.setLs&&this.setVol&&this.download()},setLs:function(t){t&&this.setFr&&this.setLs&&this.setVol&&this.download()},setVol:function(t){t&&this.setFr&&this.setLs&&this.setVol&&this.download()}},data:function(){return{symbol:"BTC",symbolOption:["BTC","ETH","EOS","BCH","LTC","XRP","BSV","ETC","TRX","LINK"],interval:2,intervalOption:[{text:"ALL",value:0},{text:"1H",value:2},{text:"4H",value:1},{text:"12H",value:4}],type:"U",chartItem:0,chartItemOption:[{text:"OpenInterest",value:0},{text:"FundingRate",value:1},{text:"LongShortRatio",value:2},{text:"Volume",value:3}],color:{FTX:"rgb(89, 133, 208)",BINANCE:"rgb(255, 159, 0)",BYBIT:"rgb(123, 182, 97)",CME:"rgb(255, 145, 191)",DYDX:"rgb(204, 153, 255)",BITMEX:"rgb(68, 207, 204)",GATE:"rgb(255, 0, 24)"},dataCollection:null,oiCollection:null,oiOptions:{responsive:!0,scales:{yAxes:[]},radius:0},frCollection:null,frOptions:{responsive:!0,scales:{yAxes:[]},radius:0},lsRatioCollection:null,lsOptions:{responsive:!0,scales:{yAxes:[]},radius:0},volumeCollection:null,volOptions:{responsive:!0,scales:{yAxes:[]},radius:0},csvData:[],csvLabels:{date:{title:"日時"},time:{title:"unix時間"},price:{title:"価格"}},showChart:!1}},created:function(){this.getOpenInterest(),this.getFundingRate(),this.getLSRatio(),this.getVolume()},mounted:function(){},methods:{initData:function(){this.dataCollection=null,this.oiCollection=null,this.oiOptions={responsive:!0,scales:{yAxes:[]},radius:0},this.frCollection=null,this.frOptions={responsive:!0,scales:{yAxes:[]},radius:0},this.lsRatioCollection=null,this.lsOptions={responsive:!0,scales:{yAxes:[]},radius:0},this.volumeCollection=null,this.volOptions={responsive:!0,scales:{yAxes:[]},radius:0}},createChart:function(t,e,a,n){var i,c=[],s=Object(p["a"])(t);try{for(s.s();!(i=s.n()).done;){var r=i.value,o=new Date(r),l=Object(O["d"])(o,"M-D h");c.push(l)}}catch(h){s.e(h)}finally{s.f()}var u=[{type:"line",label:"Price",data:e,borderColor:"rgb(255, 99, 132)"}],b=u.concat(a),d={labels:c,datasets:b};0==n?this.oiCollection=d:1==n?this.frCollection=d:2==n?this.lsRatioCollection=d:3==n?this.volumeCollection=d:this.dataCollection=d},getOpenInterest:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var a,n,i,c,s,r,o,l,u,b,d,p,h,O,m,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(0);case 2:a=e.sent,t.$store.dispatch("setOi",{data:a}),n=a.dateList,i=a.priceList,c=[],s=a.dataMap.FTX,r=a.dataMap.Binance,o=a.dataMap.Bybit,l=a.dataMap.CME,u=a.dataMap.dYdX,b=a.dataMap.Bitmex,d=t.createData("line","FTX_OI",s,f["b"].FTX),p=t.createData("line","BINANCE_OI",r,f["b"].BINANCE),h=t.createData("line","BYBIT_OI",o,f["b"].BYBIT),O=t.createData("line","CME_OI",l,f["b"].CME),m=t.createData("line","DYDX_OI",u,f["b"].DYDX),v=t.createData("line","BITMEX_OI",b,f["b"].BITMEX),d&&(c.push(d.dataItem),t.oiOptions.scales.yAxes.push(d.option)),p&&(c.push(p.dataItem),t.oiOptions.scales.yAxes.push(p.option)),h&&(c.push(h.dataItem),t.oiOptions.scales.yAxes.push(h.option)),O&&(c.push(O.dataItem),t.oiOptions.scales.yAxes.push(O.option)),m&&(c.push(m.dataItem),t.oiOptions.scales.yAxes.push(m.option)),v&&(c.push(v.dataItem),t.oiOptions.scales.yAxes.push(v.option)),t.createChart(n,i,c,0);case 26:case"end":return e.stop()}}),e)})))()},getFundingRate:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var a,n,i,c,s,r,o,l,u,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(1);case 2:a=e.sent,t.$store.dispatch("setFr",{data:a}),n=a.dateList,i=a.priceList,c=[],s=a.dataMap.Binance,r=a.dataMap.Bybit,o=a.dataMap.Gate,l=t.createData("bar","BINANCE_FR",s,f["b"].BINANCE),u=t.createData("bar","BYBIT_FR",r,f["b"].BYBIT),b=t.createData("bar","GATE_FR",o,f["b"].GATE),l&&(c.push(l.dataItem),t.frOptions.scales.yAxes.push(l.option)),u&&(c.push(u.dataItem),t.frOptions.scales.yAxes.push(u.option)),b&&(c.push(b.dataItem),t.frOptions.scales.yAxes.push(b.option)),t.createChart(n,i,c,1);case 17:case"end":return e.stop()}}),e)})))()},getLSRatio:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var a,n,i,c,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(2);case 2:a=e.sent,t.$store.dispatch("setLs",{data:a}),n=a.dateList,i=a.priceList,c=[],s=a.longShortRateList,r=t.createData("line","ls",s,f["b"].BINANCE),r&&(c.push(r.dataItem),t.lsOptions.scales.yAxes.push(r.option)),t.createChart(n,i,c,2);case 11:case"end":return e.stop()}}),e)})))()},getVolume:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var a,n,i,c,s,r,o,l,u,b,d,p,h,O;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(3);case 2:a=e.sent,t.$store.dispatch("setVol",{data:a}),n=a.dateList,i=a.priceList,c=[],s=a.dataMap.FTX,r=a.dataMap.Binance,o=a.dataMap.Bybit,l=a.dataMap.dYdX,u=a.dataMap.Bitmex,b=t.createData("bar","FTX_Vol",s,f["b"].FTX),d=t.createData("bar","BINANCE_Vol",r,f["b"].BINANCE),p=t.createData("bar","BYBIT_Vol",o,f["b"].BYBIT),h=t.createData("bar","DYDX_Vol",l,f["b"].DYDX),O=t.createData("bar","BITMEX_Vol",u,f["b"].BITMEX),b&&(c.push(b.dataItem),t.volOptions.scales.yAxes.push(b.option)),d&&(c.push(d.dataItem),t.volOptions.scales.yAxes.push(d.option)),p&&(c.push(p.dataItem),t.volOptions.scales.yAxes.push(p.option)),h&&(c.push(h.dataItem),t.volOptions.scales.yAxes.push(h.option)),O&&(c.push(O.dataItem),t.volOptions.scales.yAxes.push(O.option)),t.createChart(n,i,c,3);case 23:case"end":return e.stop()}}),e)})))()},createData:function(t,e,a,n){if(!a||!a.length)return null;var i=a,c={type:t,label:e,data:i,borderColor:n,backgroundColor:n,yAxisID:e},s={id:e,type:"linear",ticks:{beginAtZero:!0}};return{dataItem:c,option:s}},getData:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m.get("/api/bybt/market?symbol=".concat(this.symbol,"&type=").concat(this.type,"&interval=").concat(this.interval,"&chartItem=").concat(e));case 2:return a=t.sent,n=JSON.parse(a.data),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),download:function(){this.showChart=!0}}},j=(a("5243"),a("6b0d")),g=a.n(j);const y=g()(v,[["render",b],["__scopeId","data-v-47622a2b"]]);e["default"]=y},3530:function(t,e,a){"use strict";a.r(e);var n=a("7a23"),i=function(t){return Object(n["w"])("data-v-bf56ad50"),t=t(),Object(n["u"])(),t},c={class:"home"},s={key:0},r={class:"mb-3"},o={class:"form-group"},l={class:"mb-3"},u=i((function(){return Object(n["h"])("label",{for:"symbol",class:"col-sm-2 col-form-label"},"symbol",-1)})),b=["value"],d={class:"mb-3"},p=i((function(){return Object(n["h"])("label",{id:"interval",for:"interval",class:"col-sm-2 col-form-label"},"interval",-1)})),h=["value"],O={class:"mb-3"},f=i((function(){return Object(n["h"])("label",{for:"chartType",class:"col-sm-2 col-form-label"},"chartType",-1)})),m=["value"],v={key:1},j=i((function(){return Object(n["h"])("p",null,"アクセス権限がありません。",-1)})),g=Object(n["i"])("Topへ戻る");function y(t,e,a,i,y,D){var x=Object(n["B"])("v-date-picker"),_=Object(n["B"])("router-link");return Object(n["t"])(),Object(n["g"])("div",c,[y.canAccess?(Object(n["t"])(),Object(n["g"])("div",s,[Object(n["h"])("div",r,[Object(n["h"])("button",{onClick:e[0]||(e[0]=function(){return D.updataTableData&&D.updataTableData.apply(D,arguments)}),class:"btn btn-primary",type:"button","aria-expanded":"false"}," データ更新 ")]),Object(n["h"])("div",null,[Object(n["h"])("div",o,[Object(n["j"])(x,{modelValue:y.range,"onUpdate:modelValue":e[1]||(e[1]=function(t){return y.range=t}),"min-date":y.minDate,"max-date":y.maxDate,"is-range":""},null,8,["modelValue","min-date","max-date"])]),Object(n["h"])("div",l,[u,Object(n["J"])(Object(n["h"])("select",{id:"symbol","onUpdate:modelValue":e[2]||(e[2]=function(t){return y.symbol=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(y.marketNameList,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t,value:t},Object(n["D"])(t),9,b)})),128))],512),[[n["F"],y.symbol]])]),Object(n["h"])("div",d,[p,Object(n["J"])(Object(n["h"])("select",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return y.interval=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(y.intervalList,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t.val,value:t.val},Object(n["D"])(t.text),9,h)})),128))],512),[[n["F"],y.interval]])]),Object(n["h"])("div",O,[f,Object(n["J"])(Object(n["h"])("select",{id:"chartType","onUpdate:modelValue":e[4]||(e[4]=function(t){return y.chartType=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(y.chartItemOption,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t.value,value:t.value},Object(n["D"])(t.text),9,m)})),128))],512),[[n["F"],y.chartType]])]),Object(n["h"])("button",{onClick:e[5]||(e[5]=function(){return D.doTest&&D.doTest.apply(D,arguments)}),class:"btn btn-primary",type:"button","aria-expanded":"false"}," テスト実行 ")])])):(Object(n["t"])(),Object(n["g"])("div",v,[j,Object(n["j"])(_,{to:"/"},{default:Object(n["I"])((function(){return[g]})),_:1})]))])}var D=a("b85c"),x=a("1da1"),_=(a("96cf"),a("99af"),a("fa1c")),T=a("bc3a").create(),k={name:"Admin",data:function(){return{range:{start:Object(_["c"])(7,_["a"]),end:Object(_["d"])(new Date,_["a"])},minDate:new Date("2019-3-3"),maxDate:Object(_["b"])(new Date,1,_["a"]),canAccess:!1,tableData:[],inputPass:null,chartType:0,chartItemOption:[{text:"OpenInterest",value:0},{text:"FundingRate",value:1},{text:"LongShortRatio",value:2},{text:"Volume",value:3}],futureList:["BTC-PERP","ETH-PERP"],coinList:["USD","BTC","ETH","DOGE","SOL","LINK","BNB","USDT"],marketNameList:["USD","BTC","ETH","DOGE","SOL","LINK","BNB","USDT"],symbol:"BTC",interval:2,type:"U",intervalList:[{text:"ALL",val:0},{text:"1H",val:2},{text:"4H",val:1},{text:"8H",val:6},{text:"12H",val:4},{text:"D1",val:5},{text:"5M",val:3}]}},created:function(){this.$route.query.pass&&(this.inputPass=this.$route.query.pass);var t=this.inputPass?this.inputPass:prompt("Please input password?","");"tyamauchi19880415"==t?(alert("成功"),this.canAccess=!0,this.inputPass=t):alert("エラー")},methods:{doTest:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i,c,s,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e="/api/bybt/market?symbol=".concat(this.symbol,"&interval=").concat(this.interval,"&type=").concat(this.type,"&chartItem=").concat(this.chartType),t.next=3,T.get(e);case 3:if(a=t.sent,n=JSON.parse(a.data),console.log(this.range.start),console.log(this.range.end),console.log(Object(_["j"])(this.range.start)),console.log(Object(_["j"])(this.range.end)),console.log(n),i=n.dateList,i&&0!=i.length){t.next=13;break}return t.abrupt("return");case 13:c=i[0],console.log(n.priceList[0]),console.log(c/1e3),console.log(Object(_["e"])(c/1e3,!0)),s=i[1],r=Object(_["f"])(c,s,"minutes"),console.log(r),o=i[29],console.log(n.priceList[29]),console.log(o/1e3),console.log(Object(_["e"])(o/1e3,!0));case 24:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),updataTableData:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.getFundingRate(),this.getLendingRate(),this.getMarketData(),t.next=5,this.getBybtData();case 5:console.log("finish");case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getFundingRate:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(D["a"])(this.futureList);try{for(e.s();!(a=e.n()).done;)n=a.value,i="/api/admin/ftx/fundingRate?pass=".concat(this.inputPass,"&future=").concat(n),T.get(i)}catch(c){e.e(c)}finally{e.f()}case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getLendingRate:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(D["a"])(this.coinList);try{for(e.s();!(a=e.n()).done;)n=a.value,i="/api/admin/ftx/lendingRate?pass=".concat(this.inputPass,"&coin=").concat(n),this.doRequest(i)}catch(c){e.e(c)}finally{e.f()}case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getMarketData:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(D["a"])(this.marketNameList),t.prev=1,e.s();case 3:if((a=e.n()).done){t.next=10;break}return n=a.value,i="/api/admin/ftx/marketPrice?pass=".concat(this.inputPass,"&market_name=").concat(n),t.next=8,this.doRequest(i);case 8:t.next=3;break;case 10:t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](1),e.e(t.t0);case 15:return t.prev=15,e.f(),t.finish(15);case 18:case"end":return t.stop()}}),t,this,[[1,12,15,18]])})));function e(){return t.apply(this,arguments)}return e}(),getBybtData:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i,c,s,r,o,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(D["a"])(this.coinList),t.prev=1,e.s();case 3:if((a=e.n()).done){t.next=46;break}n=a.value,i=Object(D["a"])(this.chartItemOption),t.prev=6,i.s();case 8:if((c=i.n()).done){t.next=36;break}s=c.value,r=Object(D["a"])(this.intervalList),t.prev=11,r.s();case 13:if((o=r.n()).done){t.next=26;break}return l=o.value,u="/api/admin/bybt?pass=".concat(this.inputPass,"&symbol=").concat(n,"&interval=").concat(l.val,"&chartItem=").concat(s.value),t.prev=16,t.next=19,this.doRequest(u);case 19:t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](16),console.error(t.t0);case 24:t.next=13;break;case 26:t.next=31;break;case 28:t.prev=28,t.t1=t["catch"](11),r.e(t.t1);case 31:return t.prev=31,r.f(),t.finish(31);case 34:t.next=8;break;case 36:t.next=41;break;case 38:t.prev=38,t.t2=t["catch"](6),i.e(t.t2);case 41:return t.prev=41,i.f(),t.finish(41);case 44:t.next=3;break;case 46:t.next=51;break;case 48:t.prev=48,t.t3=t["catch"](1),e.e(t.t3);case 51:return t.prev=51,e.f(),t.finish(51);case 54:case"end":return t.stop()}}),t,this,[[1,48,51,54],[6,38,41,44],[11,28,31,34],[16,21]])})));function e(){return t.apply(this,arguments)}return e}(),doRequest:function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("requestUrl: ".concat(e)),t.next=3,T.get(e);case 3:if(a=t.sent,n={},console.log(a),!a||!a.data){t.next=10;break}if("no item"!=a.data){t.next=9;break}return t.abrupt("return",n);case 9:n=JSON.parse(a.data);case 10:return console.log(n),t.abrupt("return",n);case 12:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}},C=(a("3c03"),a("6b0d")),R=a.n(C);const w=R()(k,[["render",y],["__scopeId","data-v-bf56ad50"]]);e["default"]=w},"3c03":function(t,e,a){"use strict";a("9170")},5178:function(t,e,a){"use strict";a.r(e);var n=a("7a23"),i={class:"home"},c={class:"mb-3"},s=["value"],r={class:"mb-3"};function o(t,e,a,o,l,u){var b=Object(n["B"])("v-date-picker"),d=Object(n["B"])("line-chart");return Object(n["t"])(),Object(n["g"])("div",i,[Object(n["h"])("div",c,[Object(n["J"])(Object(n["h"])("select",{id:"useDb","onUpdate:modelValue":e[0]||(e[0]=function(t){return l.useDb=t})},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(l.useDbOptions,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t.text,value:t.value},Object(n["D"])(t.text),9,s)})),128))],512),[[n["F"],l.useDb]])]),Object(n["h"])("div",r,[Object(n["j"])(b,{modelValue:l.pickerDate,"onUpdate:modelValue":e[1]||(e[1]=function(t){return l.pickerDate=t}),onDayclick:u.convertStartDate},null,8,["modelValue","onDayclick"])]),l.dataCollection?(Object(n["t"])(),Object(n["e"])(d,{key:0,chartId:"dataCollection",chartdata:l.dataCollection,option:l.option},null,8,["chartdata","option"])):Object(n["f"])("",!0),l.fundingRateCollection?(Object(n["t"])(),Object(n["e"])(d,{key:1,chartId:"fundingRateCollection",chartdata:l.fundingRateCollection,option:l.option},null,8,["chartdata","option"])):Object(n["f"])("",!0),l.lendingRateCollection?(Object(n["t"])(),Object(n["e"])(d,{key:2,chartId:"lendingRateCollection",chartdata:l.lendingRateCollection,option:l.option2},null,8,["chartdata","option"])):Object(n["f"])("",!0)])}var l=a("b85c"),u=a("1da1"),b=(a("96cf"),a("99af"),a("759f")),d=a("fa1c"),p=a("bc3a").create(),h={name:"Home",components:{LineChart:b["a"]},data:function(){return{marketData:[],fundingRate:[],lendingRate:[],useDb:!1,useDbOptions:[{text:"リアルタイム",value:!1},{text:"過去",value:!0}],pickerDate:Object(d["c"])(10),startDate:1630861201,endDate:1638677134,dataCollection:null,fundingRateCollection:null,lendingRateCollection:null,option2:{responsive:!0,scales:{yAxes:[{id:"y-axis-1",type:"linear",position:"left",ticks:{beginAtZero:!0}},{id:"y-axis-2",type:"linear",position:"right",ticks:{beginAtZero:!0}}]},radius:0},option:{responsive:!0,scales:{yAxes:[{ticks:{beginAtZero:!0}}]},radius:0}}},created:function(){this.$route.query.start_time&&(this.startDate=this.$route.query.start_time,this.pickerDate=new Date(this.startDate)),this.$route.query.useDb&&(this.useDb=this.$route.query.useDb)},mounted:function(){this.convertStartDate()},methods:{convertStartDate:function(){this.startDate=Object(d["g"])(this.pickerDate).unix(),this.updataMarketData()},onSubmit:function(){this.updataMarketData()},onReset:function(){this.startDate=1630861201,this.endDate=1638677134,this.useDb=!1,this.updataMarketData()},updataMarketData:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i,c,s,r,o,u,b,h,O,f,m,v,j,g,y,D,x,_,T,k,C,R,w,I;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.get("/api/ftx/marketPrice?start_time=".concat(this.startDate,"&use_db=").concat(this.useDb));case 2:return e=t.sent,t.next=5,p.get("/api/ftx/fundingRate?start_time=".concat(this.startDate,"&use_db=").concat(this.useDb));case 5:return a=t.sent,t.next=8,p.get("/api/ftx/lendingRate?start_time=".concat(this.startDate,"&use_db=").concat(this.useDb));case 8:n=t.sent,i=JSON.parse(e.data),c=JSON.parse(a.data),s=JSON.parse(n.data),this.marketData=i,this.fundingRate=c,this.lendingRate=s,r=[],o=[],u=Object(l["a"])(this.marketData);try{for(u.s();!(b=u.n()).done;)h=b.value,O=h.startDate?h.startDate:h.startTime,r.push(Object(d["d"])(new Date(O),"M-D HH")),o.push(h.close)}catch(S){u.e(S)}finally{u.f()}f={labels:r,datasets:[{label:"price",data:o,borderColor:"rgb(255, 99, 132)"}]},this.dataCollection=f,r=[],m=this.fundingRate.reverse(),v=[],j=Object(l["a"])(m);try{for(j.s();!(g=j.n()).done;)y=g.value,r.push(Object(d["d"])(new Date(y.time),"M-D HH")),v.push(y.rate)}catch(S){j.e(S)}finally{j.f()}D={labels:r,datasets:[{label:"fundingRate",data:v,borderColor:"rgb(75, 192, 192)"}]},this.fundingRateCollection=D,r=[],x=this.lendingRate.reverse(),_=[],T=[],k=Object(l["a"])(x);try{for(k.s();!(C=k.n()).done;)R=C.value,r.push(Object(d["d"])(new Date(R.time),"M-D HH")),w=24*R.rate*365*100,w>30&&(w=35),_.push(w),T.push(R.size)}catch(S){k.e(S)}finally{k.f()}I={labels:r,datasets:[{label:"lendingRate",data:_,yAxisID:"y-axis-1",borderColor:"rgb(75, 192, 192)"},{label:"lendingSize",data:T,yAxisID:"y-axis-2",borderColor:"rgb(255, 99, 132)"}]},this.lendingRateCollection=I;case 36:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},O=(a("febf"),a("6b0d")),f=a.n(O);const m=f()(h,[["render",o],["__scopeId","data-v-16944b3c"]]);e["default"]=m},5243:function(t,e,a){"use strict";a("218e")},"57ec":function(t,e,a){"use strict";a("f195")},"841e":function(t,e,a){},9170:function(t,e,a){},cbef:function(t,e,a){"use strict";a.r(e);a("ac1f"),a("841c");var n=a("7a23"),i={class:"btc-alert"},c={class:"mb-3"},s={class:"mb-3"},r=Object(n["h"])("label",{for:"keyword",class:"form-label"},"キーワード",-1),o={class:"mb-3"},l={class:"mb-3"},u=["value"];function b(t,e,a,b,d,p){var h=Object(n["B"])("v-date-picker"),O=Object(n["B"])("TwitterLink");return Object(n["t"])(),Object(n["g"])("div",i,[Object(n["h"])("section",null,[Object(n["h"])("div",c,[Object(n["j"])(h,{modelValue:d.range,"onUpdate:modelValue":e[0]||(e[0]=function(t){return d.range=t}),"min-date":d.minDate,"max-date":d.maxDate,"is-range":""},null,8,["modelValue","min-date","max-date"])]),Object(n["h"])("div",s,[r,Object(n["J"])(Object(n["h"])("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=function(t){return d.keyword=t}),id:"keyword",class:"form-control"},null,512),[[n["G"],d.keyword]])]),Object(n["h"])("div",o,[Object(n["h"])("button",{onClick:e[2]||(e[2]=function(){return p.search&&p.search.apply(p,arguments)})},"検索")]),Object(n["h"])("div",l,[Object(n["J"])(Object(n["h"])("select",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return d.keyword=t}),class:"form-select"},[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(d.alertTypeList,(function(t){return Object(n["t"])(),Object(n["g"])("option",{key:t,value:t},Object(n["D"])(t),9,u)})),128))],512),[[n["F"],d.keyword]])])]),Object(n["h"])("section",null,[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(d.dateList,(function(t){return Object(n["t"])(),Object(n["e"])(O,{key:t,date:t,keyword:d.keyword},null,8,["date","keyword"])})),128))])])}var d={class:"twitter_link"},p=["href"];function h(t,e,a,i,c,s){return Object(n["t"])(),Object(n["g"])("div",d,[Object(n["h"])("h1",null,Object(n["D"])(t.dispDate),1),Object(n["h"])("ul",null,[(Object(n["t"])(!0),Object(n["g"])(n["a"],null,Object(n["z"])(t.timeList,(function(t){return Object(n["t"])(),Object(n["g"])("li",{key:t.time},[Object(n["h"])("a",{href:s.createLink(t),target:"_blank"},Object(n["D"])(t.text),9,p)])})),128))])])}a("99af");var O=a("fa1c"),f={name:"TwitterLink",props:{date:Date,keyword:String},data:function(){return{dispDate:null,searchDate:null,timeList:[{time:0,text:"0:00〜1:00",since:"_0:00:00_JST",until:"_1:00:00_JST"},{time:1,text:"1:00〜2:00",since:"_1:00:00_JST",until:"_2:00:00_JST"},{time:2,text:"2:00〜3:00",since:"_2:00:00_JST",until:"_3:00:00_JST"},{time:3,text:"3:00〜4:00",since:"_3:00:00_JST",until:"_4:00:00_JST"},{time:4,text:"4:00〜5:00",since:"_4:00:00_JST",until:"_5:00:00_JST"},{time:5,text:"5:00〜6:00",since:"_5:00:00_JST",until:"_6:00:00_JST"},{time:6,text:"6:00〜7:00",since:"_6:00:00_JST",until:"_7:00:00_JST"},{time:7,text:"7:00〜8:00",since:"_7:00:00_JST",until:"_8:00:00_JST"},{time:8,text:"8:00〜9:00",since:"_8:00:00_JST",until:"_9:00:00_JST"},{time:9,text:"9:00〜10:00",since:"_9:00:00_JST",until:"_10:00:00_JST"},{time:10,text:"10:00〜11:00",since:"_10:00:00_JST",until:"_11:00:00_JST"},{time:11,text:"11:00〜12:00",since:"_11:00:00_JST",until:"_12:00:00_JST"},{time:12,text:"12:00〜13:00",since:"_12:00:00_JST",until:"_13:00:00_JST"},{time:13,text:"13:00〜14:00",since:"_13:00:00_JST",until:"_14:00:00_JST"},{time:14,text:"14:00〜15:00",since:"_14:00:00_JST",until:"_15:00:00_JST"},{time:15,text:"15:00〜16:00",since:"_15:00:00_JST",until:"_16:00:00_JST"},{time:16,text:"16:00〜17:00",since:"_16:00:00_JST",until:"_17:00:00_JST"},{time:17,text:"17:00〜18:00",since:"_17:00:00_JST",until:"_18:00:00_JST"},{time:18,text:"18:00〜19:00",since:"_18:00:00_JST",until:"_19:00:00_JST"},{time:19,text:"19:00〜20:00",since:"_19:00:00_JST",until:"_20:00:00_JST"},{time:20,text:"20:00〜21:00",since:"_20:00:00_JST",until:"_21:00:00_JST"},{time:21,text:"21:00〜22:00",since:"_21:00:00_JST",until:"_22:00:00_JST"},{time:22,text:"22:00〜23:00",since:"_22:00:00_JST",until:"_23:00:00_JST"},{time:23,text:"23:00〜24:00",since:"_23:00:00_JST",until:"_24:00:00_JST"}]}},created:function(){this.dispDate=Object(O["d"])(this.date,"YYYY年M月D日"),this.searchDate=Object(O["d"])(this.date,"YYYY-M-D")},methods:{createLink:function(t){var e="https://twitter.com/search?q=",a="from:@btc_status ",n=this.keyword?"".concat(this.keyword," "):"",i="since:".concat(this.searchDate).concat(t.since," "),c="until:".concat(this.searchDate).concat(t.until," "),s="&src=typed_query&f=top";return e+=encodeURI(a)+encodeURI(n)+encodeURI(i)+encodeURI(c)+s,e}}},m=(a("57ec"),a("6b0d")),v=a.n(m);const j=v()(f,[["render",h],["__scopeId","data-v-9ea0a4e4"]]);var g=j,y={name:"BtcAlertLinks",components:{TwitterLink:g},data:function(){return{range:{start:Object(O["c"])(7,O["a"]),end:Object(O["d"])(new Date,O["a"])},minDate:new Date("2019-3-3"),maxDate:Object(O["b"])(new Date,1,O["a"]),keyword:"",dateList:[],searched:!1,btcPriceData:[],ethPriceData:[],btcRangePriceData:[],ethRangePriceData:[],alertTypeList:["BTC Derivs Sheet","Binance Futures BTCUSDT","BitVol LXVX","FTX Lending","BTC ドミナンス","Perp OI","Bitcoin Network Status","Binance Derivs Sheet","Bitfinex 監視","Btc - Buy vs Sell","BTC Futures Curve","Deribit BTC Options","IVスマイルカーブ"]}},watch:{marketDataMap:function(t){this.btcPriceData=t.get("BTC"),this.ethPriceData=t.get("ETH")}},computed:{marketDataMap:function(){var t=this.$store.state.marketDataMap;return t}},methods:{search:function(){this.createDateRangeList()},createDateRangeList:function(){this.dateList=[];var t=Object(O["d"])(this.range.start,O["a"]),e=Object(O["d"])(this.range.end,O["a"]);this.dateList=Object(O["h"])(t,e),console.log(this.dateList)}}};const D=v()(y,[["render",b]]);e["default"]=D},f195:function(t,e,a){},febf:function(t,e,a){"use strict";a("841e")}}]);
//# sourceMappingURL=about.5f6a5850.js.map