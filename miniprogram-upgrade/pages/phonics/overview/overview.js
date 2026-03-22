// pages/phonics/overview/overview.js
const { OPW_LEVELS } = require('../../../utils/data')
const { getStudyData } = require('../../../utils/util')

Page({
  data: { levels: [] },
  onShow() {
    const sd = getStudyData()
    this.setData({
      levels: OPW_LEVELS.map(l => ({
        ...l,
        progress: sd.phonicsProgress?.[l.id] || 0
      }))
    })
  },
  goToLevel(e) { wx.navigateTo({ url: `/pages/phonics/level/level?id=${e.currentTarget.dataset.id}` }) },
  goToInteractive() { wx.navigateTo({ url: '/pages/phonics/interactive/interactive' }) },
  goToLesson() {
    wx.showToast({ title: '教案模板即将上线', icon: 'none' })
  }
})
