// pages/profile/profile.js
const { getStudyData, saveStudyData, calcProgress } = require('../../utils/util')

Page({
  data: { sd: {}, currentLevel: 1, progressList: [], badges: [] },

  onShow() {
    const sd = getStudyData()
    const abcDone = (sd.abcProgress || []).filter(Boolean).length
    const numDone = (sd.numbersProgress || []).filter(Boolean).length
    const colDone = (sd.colorsProgress || []).filter(Boolean).length

    const progressList = [
      { id:'abc', emoji:'🔤', title:'字母王国', done:abcDone, total:26, pct:calcProgress(abcDone,26), color:'#FF6B6B', bg:'linear-gradient(135deg,#FF6B6B,#FF8E53)' },
      { id:'num', emoji:'🔢', title:'数字乐园', done:numDone, total:20, pct:calcProgress(numDone,20), color:'#4ECDC4', bg:'linear-gradient(135deg,#4ECDC4,#44A08D)' },
      { id:'col', emoji:'🎨', title:'颜色世界', done:colDone, total:10, pct:calcProgress(colDone,10), color:'#a18cd1', bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
      { id:'opw', emoji:'🔤', title:'OPW拼读', done: sd.phonicsLevel || 0, total:5, pct:calcProgress(sd.phonicsLevel||0,5), color:'#1976D2', bg:'linear-gradient(135deg,#1976D2,#42A5F5)' }
    ]

    const totalWords = sd.totalWords || 0
    const totalDays = sd.totalDays || 0
    const currentLevel = Math.min(5, Math.floor((sd.phonicsLevel || 0)) + 1)

    const badges = [
      { id:1, emoji:'🌱', name:'初学者', cond:'开始学习', unlocked: totalWords >= 1 },
      { id:2, emoji:'📖', name:'词汇达人', cond:'学满50词', unlocked: totalWords >= 50 },
      { id:3, emoji:'🔥', name:'坚持7天', cond:'连续7天', unlocked: (sd.studyStreak||0) >= 7 },
      { id:4, emoji:'⭐', name:'百星学者', cond:'获100颗星', unlocked: (sd.totalStars||0) >= 100 },
      { id:5, emoji:'🏆', name:'字母征服者', cond:'完成26字母', unlocked: abcDone >= 26 },
      { id:6, emoji:'🎓', name:'拼读专家', cond:'完成5个Level', unlocked: (sd.phonicsLevel||0) >= 5 }
    ]

    this.setData({ sd, currentLevel, progressList, badges })
  },

  clearData() {
    wx.showModal({
      title: '确定要重置？',
      content: '所有学习记录将被清空，此操作不可撤销。',
      confirmText: '确定重置',
      confirmColor: '#E53935',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('upgradeStudyData')
          wx.showToast({ title: '已重置', icon: 'success' })
          setTimeout(() => this.onShow(), 500)
        }
      }
    })
  }
})
