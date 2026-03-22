// pages/phonics/level/level.js
const { OPW_LEVELS } = require('../../../utils/data')
const { speakWord, vibrateShort } = require('../../../utils/util')

Page({
  data: { level: {}, expandedUnit: 0 },
  onLoad(options) {
    const id = parseInt(options.id || 1)
    const level = OPW_LEVELS.find(l => l.id === id) || OPW_LEVELS[0]
    this.setData({ level })
    wx.setNavigationBarTitle({ title: `${level.title} - ${level.subtitle}` })
    wx.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: level.color })
  },
  toggleUnit(e) {
    const i = e.currentTarget.dataset.index
    this.setData({ expandedUnit: this.data.expandedUnit === i ? -1 : i })
  },
  speakSound(e) {
    const sound = e.currentTarget.dataset.sound.replace(/\//g, '').replace(/[æɪɒʌ]/g, s => ({æ:'a',ɪ:'i',ɒ:'o',ʌ:'u'}[s]||s))
    speakWord(sound); vibrateShort()
  },
  speakWord(e) {
    speakWord(e.currentTarget.dataset.word); vibrateShort()
  },
  startPractice() {
    wx.navigateTo({ url: `/pages/phonics/interactive/interactive?level=${this.data.level.id}` })
  }
})
