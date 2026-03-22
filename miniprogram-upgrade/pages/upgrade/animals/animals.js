// pages/upgrade/animals/animals.js
const { ANIMALS_DATA } = require('../../../utils/data')
const { speakWord, shuffle, vibrateShort } = require('../../../utils/util')
Page({
  data: { words:[], mode:'learn', themeColor:'#6BCB77', selectedWord:{}, score:0, qIndex:0, qTotal:10, question:{}, options:[], answered:false, picked:{}, quizType:'word2cn' },
  onLoad() {
    this.setData({ words: ANIMALS_DATA.map(w => ({...w, color:'#6BCB77', learned:false, selected:false})) })
    this.generateQuiz()
  },
  setMode(e) { this.setData({ mode:e.currentTarget.dataset.mode }); if(e.currentTarget.dataset.mode==='quiz') this.generateQuiz() },
  selectWord(e) {
    const i=e.currentTarget.dataset.index; const w=this.data.words[i]
    speakWord(w.word); vibrateShort()
    this.setData({ words:this.data.words.map((x,idx)=>({...x,selected:idx===i})), selectedWord:w })
  },
  closeDetail() { this.setData({selectedWord:{}}) },
  speakSelected() { speakWord(this.data.selectedWord.word) },
  generateQuiz() {
    const pool=shuffle(ANIMALS_DATA); const q=pool[0]; const opts=shuffle([q,...pool.slice(1,4)])
    this.setData({ question:q, options:opts, answered:false, picked:{}, quizType:Math.random()>0.5?'word2cn':'cn2word' })
  },
  pickAnswer(e) {
    const opt=this.data.options[e.currentTarget.dataset.index]; const correct=opt.word===this.data.question.word; vibrateShort()
    this.setData({ answered:true, picked:opt, score:correct?this.data.score+10:this.data.score })
    wx.showToast({ title:correct?'🎉 正确！':'❌ 再想想', icon:'none', duration:800 })
  },
  nextQ() {
    const next=this.data.qIndex+1
    if(next>=this.data.qTotal){ wx.showModal({title:'🎉 完成！',content:`得分 ${this.data.score}/${this.data.qTotal*10}`,showCancel:false,success:()=>this.setData({score:0,qIndex:0})}); return }
    this.setData({qIndex:next}); this.generateQuiz()
  }
})
