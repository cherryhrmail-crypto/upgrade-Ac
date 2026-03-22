// pages/upgrade/index.js
const { getStudyData, calcProgress } = require('../../utils/util')
Page({
  data: { modules: [] },
  onShow() {
    const sd = getStudyData()
    this.setData({
      modules: [
        { id:'abc', emoji:'🔤', title:'字母王国', desc:'A-Z 26个字母音值', count:26, bg:'linear-gradient(135deg,#FF6B6B,#FF8E53)', path:'/pages/upgrade/abc/abc', progress: calcProgress((sd.abcProgress||[]).filter(Boolean).length, 26) },
        { id:'numbers', emoji:'🔢', title:'数字乐园', desc:'1-20 数字认读', count:20, bg:'linear-gradient(135deg,#4ECDC4,#44A08D)', path:'/pages/upgrade/numbers/numbers', progress: calcProgress((sd.numbersProgress||[]).filter(Boolean).length, 20) },
        { id:'colors', emoji:'🎨', title:'颜色世界', desc:'10种基础颜色', count:10, bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)', path:'/pages/upgrade/colors/colors', progress: calcProgress((sd.colorsProgress||[]).filter(Boolean).length, 10) },
        { id:'animals', emoji:'🐾', title:'动物王国', desc:'12种可爱动物', count:12, bg:'linear-gradient(135deg,#6BCB77,#4D9DE0)', path:'/pages/upgrade/animals/animals', progress: 0 },
        { id:'body', emoji:'👤', title:'我的身体', desc:'身体部位认识', count:10, bg:'linear-gradient(135deg,#FFD93D,#FF6B35)', path:'/pages/upgrade/body/body', progress: 0 },
        { id:'food', emoji:'🍎', title:'美食世界', desc:'12种食物认读', count:12, bg:'linear-gradient(135deg,#f093fb,#f5576c)', path:'/pages/upgrade/food/food', progress: 0 },
        { id:'greetings', emoji:'👋', title:'问候礼仪', desc:'日常问候用语', count:12, bg:'linear-gradient(135deg,#667eea,#764ba2)', path:'/pages/upgrade/greetings/greetings', progress: 0 }
      ]
    })
  },
  goToModule(e) { wx.navigateTo({ url: e.currentTarget.dataset.path }) }
})
