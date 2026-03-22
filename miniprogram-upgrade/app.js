// app.js — UpGrade 优格德幼儿英语小程序
App({
  onLaunch() {
    // 初始化学习记录
    const storage = wx.getStorageSync('upgradeStudyData')
    if (!storage) {
      wx.setStorageSync('upgradeStudyData', {
        totalDays: 0,
        totalWords: 0,
        totalStars: 0,
        abcProgress: new Array(26).fill(false),
        numbersProgress: new Array(20).fill(false),
        colorsProgress: new Array(10).fill(false),
        animalsProgress: new Array(12).fill(false),
        phonicsLevel: 1,
        phonicsProgress: {},
        gamesScore: {},
        lastStudyDate: '',
        studyStreak: 0
      })
    }
    // 更新连续学习天数
    this.checkStudyStreak()
  },

  checkStudyStreak() {
    const data = wx.getStorageSync('upgradeStudyData') || {}
    const today = new Date().toLocaleDateString('zh-CN')
    if (data.lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('zh-CN')
      data.studyStreak = data.lastStudyDate === yesterday ? (data.studyStreak || 0) + 1 : 1
      data.lastStudyDate = today
      data.totalDays = (data.totalDays || 0) + 1
      wx.setStorageSync('upgradeStudyData', data)
    }
  },

  // 全局方法：更新学习数据
  addStar(count = 1) {
    const data = wx.getStorageSync('upgradeStudyData') || {}
    data.totalStars = (data.totalStars || 0) + count
    wx.setStorageSync('upgradeStudyData', data)
  },

  addWord(count = 1) {
    const data = wx.getStorageSync('upgradeStudyData') || {}
    data.totalWords = (data.totalWords || 0) + count
    wx.setStorageSync('upgradeStudyData', data)
  },

  globalData: {
    userInfo: null,
    themeColor: '#1976D2',
    version: '1.0.0'
  }
})
