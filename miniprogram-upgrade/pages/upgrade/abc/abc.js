// pages/upgrade/abc/abc.js
const { ABC_DATA } = require('../../../utils/data')
const { speakWord, shuffle, getStudyData, saveStudyData, vibrateShort } = require('../../../utils/util')

Page({
  data: {
    abcList: ABC_DATA,
    currentLetter: ABC_DATA[0],
    currentIndex: 0,
    activeTab: 'learn',
    learned: new Array(26).fill(false),
    // Quiz
    quizQuestion: {},
    quizOptions: [],
    quizAnswered: false,
    selectedOpt: '',
    quizScore: 0,
    quizIndex: 0,
    quizTotal: 10,
    // Trace
    traceCtx: null,
    traceDrawing: false,
    traceLast: { x: 0, y: 0 }
  },

  onLoad() {
    const studyData = getStudyData()
    this.setData({ learned: studyData.abcProgress || new Array(26).fill(false) })
    this.generateQuiz()
  },

  onReady() {
    this.initTraceCanvas()
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    if (tab === 'quiz') this.generateQuiz()
    if (tab === 'trace') setTimeout(() => this.initTraceCanvas(), 100)
  },

  selectLetter(e) {
    const index = e.currentTarget.dataset.index
    const letter = ABC_DATA[index]
    this.setData({ currentLetter: letter, currentIndex: index })
    speakWord(letter.word)
    vibrateShort()
    // 标记已学
    const learned = [...this.data.learned]
    if (!learned[index]) {
      learned[index] = true
      this.setData({ learned })
      const studyData = getStudyData()
      studyData.abcProgress = learned
      studyData.totalWords = (studyData.totalWords || 0) + 1
      saveStudyData(studyData)
    }
  },

  speakCurrent() {
    speakWord(this.data.currentLetter.word)
    vibrateShort()
  },

  // ── 测验 ──
  generateQuiz() {
    const pool = shuffle(ABC_DATA)
    const question = pool[0]
    // 生成4个选项（1个正确 + 3个干扰）
    const wrongPool = pool.slice(1, 4)
    const options = shuffle([question.letter, ...wrongPool.map(w => w.letter)])
    this.setData({
      quizQuestion: question,
      quizOptions: options,
      quizAnswered: false,
      selectedOpt: ''
    })
  },

  answerQuiz(e) {
    const opt = e.currentTarget.dataset.opt
    const correct = opt === this.data.quizQuestion.letter
    vibrateShort()
    this.setData({
      quizAnswered: true,
      selectedOpt: opt,
      quizScore: correct ? this.data.quizScore + 10 : this.data.quizScore
    })
    if (correct) {
      wx.showToast({ title: '🎉 答对了！', icon: 'none', duration: 800 })
    } else {
      wx.showToast({ title: '❌ 再想想', icon: 'none', duration: 800 })
    }
  },

  nextQuestion() {
    const nextIndex = this.data.quizIndex + 1
    if (nextIndex >= this.data.quizTotal) {
      wx.showModal({
        title: '🎉 测验完成！',
        content: `得分：${this.data.quizScore} / ${this.data.quizTotal * 10}\n${this.data.quizScore >= 80 ? '太厉害了！⭐⭐⭐' : '继续加油！💪'}`,
        showCancel: false,
        confirmText: '再来一次',
        success: () => {
          this.setData({ quizScore: 0, quizIndex: 0 })
          this.generateQuiz()
        }
      })
      return
    }
    this.setData({ quizIndex: nextIndex })
    this.generateQuiz()
  },

  // ── 描写 ──
  initTraceCanvas() {
    const ctx = wx.createCanvasContext('traceCanvas', this)
    ctx.setStrokeStyle('#1976D2')
    ctx.setLineWidth(6)
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    this.traceCtx = ctx
  },

  traceStart(e) {
    this.data.traceDrawing = true
    const touch = e.touches[0]
    const { x, y } = this.getTouchPos(touch)
    this.traceLast = { x, y }
    this.traceCtx.beginPath()
    this.traceCtx.moveTo(x, y)
  },

  traceMove(e) {
    if (!this.data.traceDrawing) return
    const touch = e.touches[0]
    const { x, y } = this.getTouchPos(touch)
    this.traceCtx.lineTo(x, y)
    this.traceCtx.stroke()
    this.traceCtx.draw(true)
    this.traceLast = { x, y }
  },

  traceEnd() {
    this.data.traceDrawing = false
  },

  getTouchPos(touch) {
    return { x: touch.x, y: touch.y }
  },

  traceClear() {
    const ctx = wx.createCanvasContext('traceCanvas', this)
    ctx.clearRect(0, 0, 600, 400)
    ctx.draw()
    this.initTraceCanvas()
  },

  tracePrev() {
    const i = (this.data.currentIndex - 1 + 26) % 26
    this.setData({ currentIndex: i, currentLetter: ABC_DATA[i] })
    this.traceClear()
  },

  traceNext() {
    const i = (this.data.currentIndex + 1) % 26
    this.setData({ currentIndex: i, currentLetter: ABC_DATA[i] })
    this.traceClear()
  }
})
