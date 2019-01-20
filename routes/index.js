var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  const tmp = req.body.report;
  const dateReg = /\d{1,2}月\d{1,2}日/
  // let tmp = ("2019年1月19日广州igc-home店铺日指24000元，日正常业绩10370.35元，日达43%，累指412000元，累总业绩380025.15元，累达92%，日AUS：494，日IPT:2.7，日交易21笔，日客21人，累交易343笔，累客343人，累AUS：1108元，累IPT：3.5件；日新客4人，累新客90人，老客15人，累老客204人，日VIP:2人，累VIP：53人；日鲜花0元，日占0%，累鲜花12438元，累占3％，日永生花0元，日占0%，累永生花8134元，累占2%，日香氛3795元，日占37%，累香氛52128元，累占14%；日家饰家纺6575.35元，日占63%，累家饰145734元，累占38%，日大件家具0元，日占0%，累大件家具161591元，累占43%。\n" +
  //     "日大宗销售0元，累大宗销售0元。                   \n" + 
  //     "日活动业绩0元，累活动业绩0元。\n" +
  //     "日正常业绩10370.35元，累总业绩380025.15元，累达92%\n" +
  //     "最新商品累计销售：\n" +
  //     "[369180246]Oh,Scent! 情侣车载香薰礼盒(Heart+Wink) * 1 \n" +
  //     "[243173647]丝绒睡袍-灰色-ML（含包装） * 1" +
  //     "2019年1月19日,颐堤港店铺日指50000元，日正常业绩89466.1元,（含VVIP高级定制50000)日达179%；累指880000元，累正常业绩692518元，累达79%,去年同期业绩43713.29元，日LFL105%，累LFL-30%.日交易124件，客数48人，日AUS:1864元, 日IPT：2.6件；累交易2328件，累客数576人；累AUS:1202元，累IPT4.0件；日新客13人，累新客142人，日老客21人，累老客261人, 日VIP:13人，累VIP169人\n" +
  //     ".日鲜花销售：1036元，日占1%，累占9%；\n" +
  //     "日香氛销售:5183.5元，日占6%，累占20%；\n" +
  //     "日家饰&家纺销售:24326.5元, 日占27%, 累占36%\n" +
  //     "日家具销售:57100元，日占64%,累占34%.\n" +
  //     "日大宗销售0元，累大宗销售0元。\n" + 
  //     "日活动业绩0元，累活动业绩0元。\n" +
  //     "日总业绩89466元,累总业绩692518元，总进度79%\n" +
  //     "最新商品销售：\n" +
  //     "最新商品累计销售：\n" +
  //     "stay bed - 双人床King size*2\n" +
  //     "金色狮子收纳小碗*1" +
  //     "2019年1月19日，北京颐堤港MS店铺日指20000，日正常业绩总10822.1元，日达54%。累指217000元，累正常业绩248074.45元，累达114%。\n" +
  //     "\n" +
  //     "日客14人，累客381人。\n" +
  //     "日AUS773.01元，日IP3.1。\n" +
  //     "日交44件数，累交易1087件\n" +
  //     "\n" +
  //     "日新客人：5人，累136人。\n" +
  //     "日老客：6人，累125人。\n" +
  //     "日VIP：3人，累102人。\n" +
  //     "匿名客数：0，累匿名客数:6。\n" +
  //     "\n" +
  //     "日鲜花销售3330元，日占31%，累占30%。\n" +
  //     "日永生花销售2880元，日占27%，累占12%。\n" +
  //     "日珠宝销售1580元，日15%，累占23%。\n" +
  //     "日香氛销售170.1元，日占2%，累占10%。\n" +
  //     "日家居服销售0元，日占0%，累占16%。\n" +
  //     "日配饰销售2039元，日占19%。累占9%。\n" +
  //     "\n" +
  //     "\n" +
  //     "日大宗销售0元，累大宗销售0元。\n" +
  //     "日活动业绩0元，累活动业绩0元。\n" +
  //     "日总业绩10822.1元，累正常业绩248074.45元，累达114%。\n" +
  //     "\n" +
  //     "销售早班：于昊楠\n" +
  //     "销售金额：3639元\n" +
  //     "销售晚班：樊明亮\n" +
  //     "销售金额：7183.1元\n").replace(/\n/g, "")
  //
  //颐堤港信息
  let dateStr = tmp.match(dateReg);
  let ydgHomeDay = tmp.match(/颐堤港店铺.*?日正常业绩[:：]?\d.+?元/)
  let ydgHomeSum = tmp.match(/颐堤港店铺.*?累正常业绩[:：]?\d.+?元/)
  let ydgHomeGoal = 1400000
  let ydgHomeAus = tmp.match(/颐堤港店铺.*?日AUS[:：]?\d.+?元/)
  let ydgHomeDLfl = tmp.match(/颐堤港店铺.*?日LFL[-]?\d.+?%/)
  let ydgHomeSLfl = tmp.match(/颐堤港店铺.*?累LFL[-]?\d.+?%/)
  
  let ydgHomeDayM = ydgHomeDay.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let ydgHomeSumM = ydgHomeSum.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let ydgHomeAusM = ydgHomeAus.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let ydgHomeDLflM = ydgHomeDLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")
  let ydgHomeSLflM = ydgHomeSLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")
  
  let ydgHome = dateStr+"  颐堤港HOME"+ydgHomeDayM+"元，累计"+ydgHomeSumM+"，进度"+
      (parseFloat(ydgHomeSumM)*100/ydgHomeGoal).toFixed(1)+"% ，客单"+ydgHomeAusM+"元，日LFL"+
      ydgHomeDLflM+"%，累LFL"+ydgHomeSLflM+"%。"
  
  //Igc-Home信息

  var igcHomeDay = tmp.match(/广州igc.*?日正常业绩[:：]?\d.+?元/)
  let igcHomeSum = tmp.match(/广州igc.*?累总业绩[:：]?\d.+?元/)
  let igcHomeGoal = 550000
  let igcHomeAus = tmp.match(/广州igc.*?日AUS[:：]?\d.+?元/)
  //let igcHomeDLfl = tmp.match(/广州igc.*?日LFL[-]?\d.+?%/)
  //let igcHomeSLfl = tmp.match(/广州igc.*?累LFL[-]?\d.+?%/)

  let igcHomeDayM = igcHomeDay.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let igcHomeSumM = igcHomeSum.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let igcHomeAusM = igcHomeAus.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  //let igcHomeDLflM = igcHomeDLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")
  //let igcHomeSLflM = igcHomeSLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")

  let igcHome = dateStr+"  广州 HOME"+igcHomeDayM+"元，累计"+igcHomeSumM+"，进度"+
      (parseFloat(igcHomeSumM)*100/igcHomeGoal).toFixed(1)+"% ，客单"+igcHomeAusM+"元。"
  // let igcHome = dateStr+"  广州 HOME"+igcHomeDayM+"元，累计"+igcHomeSumM+"，进度"+
  //     parseFloat(igcHomeSumM)*100/igcHomeGoal+"% ，客单"+igcHomeAusM+"元，日LFL"+
  //     igcHomeDLflM+"%，累LFL"+igcHomeSLflM+"%。"
  
  //颐堤港MS信息

  let ydgMSDay = tmp.match(/颐堤港MS店铺.*?日正常业绩总[:：]?\d.+?元/)
  let ydgMSSum = tmp.match(/颐堤港MS店铺.*?累正常业绩[:：]?\d.+?元/)
  let ydgMSGoal = 350000
  let ydgMSAus = tmp.match(/颐堤港MS店铺.*?日AUS[:：]?\d.+?元/)
  //let ydgMSDLfl = tmp.match(/广州igc.*?日LFL[-]?\d.+?%/)
  //let ydgMSSLfl = tmp.match(/广州igc.*?累LFL[-]?\d.+?%/)

  let ydgMSDayM = ydgMSDay.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let ydgMSSumM = ydgMSSum.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  let ydgMSAusM = ydgMSAus.toString().match(/[\d\.]+?元$/).toString().replace("元","")
  //let ydgMSDLflM = ydgMSDLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")
  //let ydgMSSLflM = ydgMSSLfl.toString().match(/[-\d\.]+?%$/).toString().replace("%","")

  let ydgMS = dateStr+"  颐堤港MS"+ydgMSDayM+"元，累计"+ydgMSSumM+"，进度"+
      (parseFloat(ydgMSSumM)*100/ydgMSGoal).toFixed(1)+"% ，客单"+ydgMSAusM+"元。"
  // let ydgHome = dateStr+"  广州 HOME"+ydgMSDayM+"元，累计"+ydgMSSumM+"，进度"+
  //     parseFloat(ydgMSSumM)*100/ydgMSGoal+"% ，客单"+ydgMSAusM+"元，日LFL"+
  //     ydgMSDLflM+"%，累LFL"+ydgMSSLflM+"%。"
  
  let result = ydgHome + "\n\n" +ydgMS +  "\n\n" +igcHome;
  res.end(result)
})

module.exports = router;
/*
1月19日  颐堤港HOME89466元，累计692518，进度49.5% ，客单1864元，日LFL105%，累LFL-30%。

1月19日  MS10822.1元，累计248074.45元，进度70.1%，客单773.01元。 

1月19日  广州 HOME10370.35，累计380025.15，进度69.1%，客单1108元。
*/
