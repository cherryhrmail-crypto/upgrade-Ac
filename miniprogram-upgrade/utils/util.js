// utils/util.js — 工具函数

/**
 * 播放单词发音（使用微信 innerAudioContext）
 */
function speakWord(word) {
  // 优先使用 TTS（若接入云端）
  // 此处用 wx.createInnerAudioContext 播放本地音频示例
  // 生产中应接入有道/科大讯飞 TTS API
  try {
    const ctx = wx.createInnerAudioContext()
    // 可替换为真实TTS URL
    // ctx.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`
    ctx.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`
    ctx.play()
  } catch (e) {
    console.log('speak error:', e)
  }
}

/**
 * 随机打乱数组
 */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * 从数组中随机取 n 个
 */
function randomPick(arr, n) {
  return shuffle(arr).slice(0, n)
}

/**
 * 格式化日期
 */
function formatDate(date) {
  const d = date || new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * 震动反馈
 */
function vibrateShort() {
  wx.vibrateShort({ type: 'light' })
}

function vibrateLong() {
  wx.vibrateLong()
}

/**
 * 显示成功 Toast
 */
function showSuccess(title = '太棒了！🎉') {
  wx.showToast({ title, icon: 'success', duration: 1500 })
}

/**
 * 计算百分比进度
 */
function calcProgress(done, total) {
  if (!total) return 0
  return Math.round((done / total) * 100)
}

/**
 * 获取学习数据
 */
function getStudyData() {
  return wx.getStorageSync('upgradeStudyData') || {}
}

/**
 * 保存学习数据
 */
function saveStudyData(data) {
  wx.setStorageSync('upgradeStudyData', data)
}

/**
 * 标记单词已学
 */
function markWordLearned(module, index) {
  const data = getStudyData()
  if (!data[`${module}Progress`]) data[`${module}Progress`] = []
  data[`${module}Progress`][index] = true
  data.totalWords = (data.totalWords || 0) + 1
  saveStudyData(data)
}

module.exports = {
  speakWord,
  shuffle,
  randomPick,
  formatDate,
  vibrateShort,
  vibrateLong,
  showSuccess,
  calcProgress,
  getStudyData,
  saveStudyData,
  markWordLearned
}
