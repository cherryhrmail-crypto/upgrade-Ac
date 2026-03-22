// pages/games/games.js
const { ABC_DATA, ANIMALS_DATA, FOOD_DATA, COLORS_DATA } = require('../../utils/data')
const { shuffle, speakWord, vibrateShort, getStudyData, saveStudyData } = require('../../utils/util')

const ALL_WORDS = [...ABC_DATA.map(w=>({word:w.word,cn:w.cn,emoji:w.emoji})), ...ANIMALS_DATA, ...FOOD_DATA, ...COLORS_DATA]

Page({
  data: {
    totalScore: 0, bestMemory: 0, bestTyping: 0, bestFalling: 0, bestListening: 0,
    activeGame: '', gameTitle: '', gameScore: 0,
    // Memory
    memoryCards: [], memoryFlipped: [], memoryMatched: 0,
    // Typing
    currentWord: {}, typingInput: '', showHint: false,
    // Falling
    fallWord: {}, fallOptions: [], fallAnswered: false, fallPicked: ''
  },

  onShow() {
    const sd = getStudyData()
    this.setData({
      totalScore: sd.totalStars || 0,
      bestMemory: sd.gamesScore?.memory || 0,
      bestTyping: sd.gamesScore?.typing || 0,
      bestFalling: sd.gamesScore?.falling || 0,
      bestListening: sd.gamesScore?.listening || 0
    })
  },

  closeGame() { this.setData({ activeGame: '', gameScore: 0 }) },

  // ── 翻牌游戏 ──
  startMemory() {
    const pool = shuffle(ALL_WORDS).slice(0, 6)
    const pairs = []
    pool.forEach((w, i) => {
      pairs.push({ id: i * 2, content: w.word, pairId: i, flipped: false, matched: false })
      pairs.push({ id: i * 2 + 1, content: w.cn, pairId: i, flipped: false, matched: false })
    })
    this.setData({ activeGame: 'memory', gameTitle: '🃏 记忆翻牌', gameScore: 0, memoryCards: shuffle(pairs), memoryFlipped: [], memoryMatched: 0 })
  },

  flipCard(e) {
    const idx = e.currentTarget.dataset.index
    const cards = [...this.data.memoryCards]
    if (cards[idx].flipped || cards[idx].matched) return
    const flipped = [...this.data.memoryFlipped]
    cards[idx].flipped = true
    flipped.push(idx)
    vibrateShort()
    if (flipped.length === 2) {
      const [a, b] = flipped
      if (cards[a].pairId === cards[b].pairId) {
        cards[a].matched = true; cards[b].matched = true
        const matched = this.data.memoryMatched + 1
        const score = this.data.gameScore + 20
        this.setData({ memoryCards: cards, memoryFlipped: [], memoryMatched: matched, gameScore: score })
        if (matched === 6) {
          wx.showToast({ title: '🎉 全部找到！', icon: 'success' })
          this.saveGameScore('memory', score)
        }
      } else {
        this.setData({ memoryCards: cards, memoryFlipped: flipped })
        setTimeout(() => {
          const c = [...this.data.memoryCards]
          c[a].flipped = false; c[b].flipped = false
          this.setData({ memoryCards: c, memoryFlipped: [] })
        }, 800)
      }
    } else {
      this.setData({ memoryCards: cards, memoryFlipped: flipped })
    }
  },

  // ── 拼写挑战 ──
  startTyping() {
    const word = shuffle(ALL_WORDS)[0]
    this.setData({ activeGame: 'typing', gameTitle: '⌨️ 拼写挑战', gameScore: 0, currentWord: word, typingInput: '', showHint: false })
  },

  onTyping(e) { this.setData({ typingInput: e.detail.value }) },

  checkTyping() {
    const input = this.data.typingInput.trim().toLowerCase()
    const correct = input === this.data.currentWord.word.toLowerCase()
    vibrateShort()
    if (correct) {
      const score = this.data.gameScore + 15
      wx.showToast({ title: '🎉 拼对了！', icon: 'success', duration: 800 })
      this.setData({ gameScore: score })
      this.saveGameScore('typing', score)
      setTimeout(() => {
        const word = shuffle(ALL_WORDS)[0]
        this.setData({ currentWord: word, typingInput: '', showHint: false })
      }, 1000)
    } else {
      wx.showToast({ title: '❌ 再试试', icon: 'none', duration: 800 })
      this.setData({ showHint: true })
    }
  },

  // ── 单词接龙（快答） ──
  startFalling() {
    this.setData({ activeGame: 'falling', gameTitle: '🎯 单词接龙', gameScore: 0 })
    this.nextFall()
  },

  nextFall() {
    const pool = shuffle(ALL_WORDS)
    const w = pool[0]
    const opts = shuffle([w, ...pool.slice(1, 3)])
    speakWord(w.word)
    this.setData({ fallWord: w, fallOptions: opts, fallAnswered: false, fallPicked: '' })
  },

  pickFall(e) {
    const cn = e.currentTarget.dataset.cn
    const correct = cn === this.data.fallWord.cn
    vibrateShort()
    const score = correct ? this.data.gameScore + 10 : this.data.gameScore
    this.setData({ fallAnswered: true, fallPicked: cn, gameScore: score })
    if (correct) this.saveGameScore('falling', score)
    wx.showToast({ title: correct ? '🎉 正确！' : '❌ 再想想', icon: 'none', duration: 700 })
  },

  // ── 听音选词 ──
  startListening() {
    wx.showToast({ title: '即将上线，敬请期待！', icon: 'none' })
  },

  saveGameScore(type, score) {
    const sd = getStudyData()
    if (!sd.gamesScore) sd.gamesScore = {}
    if (score > (sd.gamesScore[type] || 0)) {
      sd.gamesScore[type] = score
      sd.totalStars = (sd.totalStars || 0) + Math.floor(score / 10)
      saveStudyData(sd)
      this.setData({ [`best${type.charAt(0).toUpperCase() + type.slice(1)}`]: score, totalScore: sd.totalStars })
    }
  }
})
