// pages/phonics/interactive/interactive.js
const { OPW_LEVELS } = require('../../../utils/data')
const { speakWord, shuffle, vibrateShort } = require('../../../utils/util')

// 所有Level的单词库
const WORD_POOL = {
  1: [{word:'ant',cn:'蚂蚁',emoji:'🐜'},{word:'cat',cn:'猫',emoji:'🐱'},{word:'dog',cn:'狗',emoji:'🐶'},{word:'egg',cn:'鸡蛋',emoji:'🥚'},{word:'fox',cn:'狐狸',emoji:'🦊'},{word:'sun',cn:'太阳',emoji:'☀️'},{word:'pin',cn:'别针',emoji:'📌'},{word:'cup',cn:'杯子',emoji:'🥤'},{word:'map',cn:'地图',emoji:'🗺️'},{word:'hop',cn:'跳',emoji:'🐸'}],
  2: [{word:'blue',cn:'蓝色',emoji:'🔵'},{word:'clap',cn:'鼓掌',emoji:'👏'},{word:'flag',cn:'旗帜',emoji:'🚩'},{word:'frog',cn:'青蛙',emoji:'🐸'},{word:'step',cn:'步骤',emoji:'👣'},{word:'swim',cn:'游泳',emoji:'🏊'},{word:'trip',cn:'旅行',emoji:'✈️'},{word:'snap',cn:'快照',emoji:'📸'},{word:'desk',cn:'书桌',emoji:'🪑'},{word:'bend',cn:'弯曲',emoji:'🔄'}],
  3: [{word:'cake',cn:'蛋糕',emoji:'🎂'},{word:'kite',cn:'风筝',emoji:'🪁'},{word:'home',cn:'家',emoji:'🏠'},{word:'cube',cn:'方块',emoji:'🟦'},{word:'rain',cn:'雨',emoji:'🌧️'},{word:'tree',cn:'树',emoji:'🌳'},{word:'boat',cn:'船',emoji:'⛵'},{word:'snow',cn:'雪',emoji:'❄️'},{word:'play',cn:'玩耍',emoji:'🎭'},{word:'read',cn:'读书',emoji:'📖'}],
  4: [{word:'oil',cn:'油',emoji:'🫙'},{word:'toy',cn:'玩具',emoji:'🧸'},{word:'out',cn:'外面',emoji:'🚪'},{word:'cow',cn:'牛',emoji:'🐮'},{word:'car',cn:'汽车',emoji:'🚗'},{word:'bird',cn:'鸟',emoji:'🐦'},{word:'her',cn:'她',emoji:'👩'},{word:'burn',cn:'燃烧',emoji:'🔥'},{word:'down',cn:'下面',emoji:'⬇️'},{word:'fort',cn:'堡垒',emoji:'🏰'}],
  5: [{word:'robot',cn:'机器人',emoji:'🤖'},{word:'cabin',cn:'小屋',emoji:'🏡'},{word:'sunset',cn:'日落',emoji:'🌅'},{word:'rainbow',cn:'彩虹',emoji:'🌈'},{word:'garden',cn:'花园',emoji:'🌷'},{word:'basket',cn:'篮子',emoji:'🧺'},{word:'rabbit',cn:'兔子',emoji:'🐰'},{word:'pencil',cn:'铅笔',emoji:'✏️'},{word:'button',cn:'按钮',emoji:'🔘'},{word:'winter',cn:'冬天',emoji:'⛄'}]
}

Page({
  data: {
    activeLevel: 1, mode: 'quiz',
    score: 0, combo: 0, qIndex: 0, qTotal: 10,
    question: {}, picked: '', answered: false,
    buildWord: {}, buildLetters: [], buildSlots: [],
    blendWord: {}, blendPhonemes: []
  },

  onLoad(options) {
    const level = parseInt(options.level || 1)
    this.setData({ activeLevel: level })
    this.initMode()
  },

  switchLevel(e) {
    this.setData({ activeLevel: e.currentTarget.dataset.level, score: 0, combo: 0, qIndex: 0 })
    this.initMode()
  },

  setMode(e) {
    this.setData({ mode: e.currentTarget.dataset.mode })
    this.initMode()
  },

  initMode() {
    const { mode } = this.data
    if (mode === 'quiz') this.genQuiz()
    if (mode === 'build') this.genBuild()
    if (mode === 'blend') this.genBlend()
  },

  // ── 拼读测验 ──
  genQuiz() {
    const level = this.data.activeLevel
    const pool = shuffle(WORD_POOL[level] || WORD_POOL[1])
    const q = pool[0]
    // 取第一个字母作为音素
    const sound = q.word[0].toUpperCase()
    const correct = q.word
    const wrongs = pool.slice(1, 3).map(w => w.word)
    const options = shuffle([correct, ...wrongs, pool[3]?.word || 'big'])
    this.setData({ question: { sound, answer: correct, options }, answered: false, picked: '' })
  },

  answerQuiz(e) {
    const opt = e.currentTarget.dataset.opt
    const correct = opt === this.data.question.answer
    vibrateShort()
    const combo = correct ? this.data.combo + 1 : 0
    const bonus = combo >= 3 ? 15 : 10
    this.setData({ answered: true, picked: opt, combo, score: correct ? this.data.score + bonus : this.data.score })
    wx.showToast({ title: correct ? (combo >= 3 ? `🔥 连对x${combo}！` : '🎉 正确！') : '❌ 再想想', icon: 'none', duration: 800 })
  },

  nextQ() {
    const next = this.data.qIndex + 1
    if (next >= this.data.qTotal) {
      wx.showModal({ title: '🎉 练习完成！', content: `得分：${this.data.score}分\n最高连击：${this.data.combo}`, showCancel: false, confirmText: '再来', success: () => this.setData({ score: 0, combo: 0, qIndex: 0 }) })
      return
    }
    this.setData({ qIndex: next })
    this.genQuiz()
  },

  // ── 构词游戏 ──
  genBuild() {
    const pool = shuffle(WORD_POOL[this.data.activeLevel] || WORD_POOL[1])
    const w = pool[0]
    const letters = shuffle(w.word.split('').map((c, i) => ({ char: c.toUpperCase(), index: i, used: false })))
    this.setData({
      buildWord: w,
      buildLetters: letters,
      buildSlots: new Array(w.word.length).fill('')
    })
  },

  pickLetter(e) {
    const idx = e.currentTarget.dataset.index
    const letters = [...this.data.buildLetters]
    const slots = [...this.data.buildSlots]
    const emptySlot = slots.findIndex(s => s === '')
    if (emptySlot === -1) return
    slots[emptySlot] = letters[idx].char
    letters[idx].used = true
    this.setData({ buildLetters: letters, buildSlots: slots })
    vibrateShort()
  },

  removeSlot(e) {
    const i = e.currentTarget.dataset.index
    const slots = [...this.data.buildSlots]
    const char = slots[i]
    if (!char) return
    const letters = this.data.buildLetters.map(l => l.char === char && l.used ? { ...l, used: false } : l)
    slots[i] = ''
    this.setData({ buildSlots: slots, buildLetters: letters })
  },

  clearBuild() {
    this.setData({
      buildSlots: new Array(this.data.buildWord.word.length).fill(''),
      buildLetters: this.data.buildLetters.map(l => ({ ...l, used: false }))
    })
  },

  checkBuild() {
    const answer = this.data.buildSlots.join('').toLowerCase()
    const correct = answer === this.data.buildWord.word
    vibrateShort()
    if (correct) {
      wx.showToast({ title: '🎉 拼对了！', icon: 'success', duration: 1200 })
      this.setData({ score: this.data.score + 20 })
      setTimeout(() => this.genBuild(), 1500)
    } else {
      wx.showToast({ title: '❌ 再试一次', icon: 'none', duration: 800 })
    }
  },

  // ── 音素拼读 ──
  genBlend() {
    const pool = shuffle(WORD_POOL[this.data.activeLevel] || WORD_POOL[1])
    const w = pool[0]
    // 简单分解：每个字母一个音素（实际应按拼读规则分解）
    const phonemes = w.word.split('')
    this.setData({ blendWord: w, blendPhonemes: phonemes })
  },

  speakPhoneme(e) {
    speakWord(e.currentTarget.dataset.ph); vibrateShort()
  },

  speakBlendWord() {
    speakWord(this.data.blendWord.word); vibrateShort()
  },

  nextBlend() {
    this.genBlend()
  }
})
