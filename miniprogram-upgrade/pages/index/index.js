// pages/index/index.js
const { ABC_DATA, NUMBERS_DATA, COLORS_DATA, ANIMALS_DATA, BODY_DATA, FOOD_DATA, OPW_LEVELS } = require('../../utils/data')
const { getStudyData, calcProgress } = require('../../utils/util')

Page({
  data: {
    studyData: {},
    dailyWord: {},
    upgradeModules: [],
    phonicsLevels: []
  },

  onLoad() {
    this.initData()
  },

  onShow() {
    // 每次显示时刷新学习数据
    this.setData({ studyData: getStudyData() })
  },

  initData() {
    const studyData = getStudyData()

    // 每日推荐词（按日期轮换）
    const dayIndex = new Date().getDate() % ABC_DATA.length
    const dailyWord = ABC_DATA[dayIndex]

    // 启蒙模块数据
    const upgradeModules = [
      {
        id: 'abc', emoji: '🔤', title: '字母王国', count: 26, bg: 'linear-gradient(135deg,#FF6B6B,#FF8E53)',
        path: '/pages/upgrade/abc/abc',
        progress: calcProgress((studyData.abcProgress || []).filter(Boolean).length, 26)
      },
      {
        id: 'numbers', emoji: '🔢', title: '数字乐园', count: 20, bg: 'linear-gradient(135deg,#4ECDC4,#44A08D)',
        path: '/pages/upgrade/numbers/numbers',
        progress: calcProgress((studyData.numbersProgress || []).filter(Boolean).length, 20)
      },
      {
        id: 'colors', emoji: '🎨', title: '颜色世界', count: 10, bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
        path: '/pages/upgrade/colors/colors',
        progress: calcProgress((studyData.colorsProgress || []).filter(Boolean).length, 10)
      },
      {
        id: 'animals', emoji: '🐾', title: '动物王国', count: 12, bg: 'linear-gradient(135deg,#6BCB77,#4D9DE0)',
        path: '/pages/upgrade/animals/animals',
        progress: calcProgress((studyData.animalsProgress || []).filter(Boolean).length, 12)
      },
      {
        id: 'body', emoji: '👤', title: '我的身体', count: 10, bg: 'linear-gradient(135deg,#FFD93D,#FF6B35)',
        path: '/pages/upgrade/body/body',
        progress: 0
      },
      {
        id: 'food', emoji: '🍎', title: '美食世界', count: 12, bg: 'linear-gradient(135deg,#f093fb,#f5576c)',
        path: '/pages/upgrade/food/food',
        progress: 0
      },
      {
        id: 'greetings', emoji: '👋', title: '问候礼仪', count: 12, bg: 'linear-gradient(135deg,#667eea,#764ba2)',
        path: '/pages/upgrade/greetings/greetings',
        progress: 0
      }
    ]

    // OPW Level数据（取颜色和基本信息）
    const phonicsLevels = OPW_LEVELS.map(l => ({
      id: l.id,
      title: l.title,
      subtitle: l.subtitle,
      weeks: l.weeks,
      icon: l.icon,
      color: `linear-gradient(135deg, ${l.color}, ${l.color}99)`
    }))

    this.setData({ studyData, dailyWord, upgradeModules, phonicsLevels })
  },

  goToUpgrade() {
    wx.switchTab({ url: '/pages/upgrade/index' })
  },

  goToPhonics() {
    wx.switchTab({ url: '/pages/phonics/overview/overview' })
  },

  goToModule(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.path })
  },

  goToLevel(e) {
    wx.navigateTo({ url: `/pages/phonics/level/level?id=${e.currentTarget.dataset.id}` })
  },

  goToInteractive() {
    wx.navigateTo({ url: '/pages/phonics/interactive/interactive' })
  },

  goToGames() {
    wx.switchTab({ url: '/pages/games/games' })
  },

  goToProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  goToLessonPlan() {
    wx.navigateTo({ url: '/pages/phonics/overview/overview?tab=lesson' })
  },

  goToDaily() {
    wx.navigateTo({ url: '/pages/upgrade/abc/abc' })
  }
})
