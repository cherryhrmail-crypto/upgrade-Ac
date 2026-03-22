// utils/data.js — 所有教学内容数据

// ── 字母数据（26个） ──
const ABC_DATA = [
  { letter: 'A', word: 'Apple', cn: '苹果', emoji: '🍎', color: '#FF6B6B', sound: '/a/' },
  { letter: 'B', word: 'Ball', cn: '球', emoji: '⚽', color: '#FF8E53', sound: '/b/' },
  { letter: 'C', word: 'Cat', cn: '猫', emoji: '🐱', color: '#FFD93D', sound: '/k/' },
  { letter: 'D', word: 'Dog', cn: '狗', emoji: '🐶', color: '#6BCB77', sound: '/d/' },
  { letter: 'E', word: 'Elephant', cn: '大象', emoji: '🐘', color: '#4D96FF', sound: '/e/' },
  { letter: 'F', word: 'Fish', cn: '鱼', emoji: '🐟', color: '#845EC2', sound: '/f/' },
  { letter: 'G', word: 'Grapes', cn: '葡萄', emoji: '🍇', color: '#FF6B6B', sound: '/g/' },
  { letter: 'H', word: 'Hat', cn: '帽子', emoji: '🎩', color: '#FF8E53', sound: '/h/' },
  { letter: 'I', word: 'Ice cream', cn: '冰淇淋', emoji: '🍦', color: '#FFD93D', sound: '/ɪ/' },
  { letter: 'J', word: 'Juice', cn: '果汁', emoji: '🧃', color: '#6BCB77', sound: '/dʒ/' },
  { letter: 'K', word: 'Kite', cn: '风筝', emoji: '🪁', color: '#4D96FF', sound: '/k/' },
  { letter: 'L', word: 'Lion', cn: '狮子', emoji: '🦁', color: '#845EC2', sound: '/l/' },
  { letter: 'M', word: 'Moon', cn: '月亮', emoji: '🌙', color: '#FF6B6B', sound: '/m/' },
  { letter: 'N', word: 'Nest', cn: '鸟巢', emoji: '🪺', color: '#FF8E53', sound: '/n/' },
  { letter: 'O', word: 'Orange', cn: '橙子', emoji: '🍊', color: '#FFD93D', sound: '/ɒ/' },
  { letter: 'P', word: 'Panda', cn: '熊猫', emoji: '🐼', color: '#6BCB77', sound: '/p/' },
  { letter: 'Q', word: 'Queen', cn: '女王', emoji: '👑', color: '#4D96FF', sound: '/kw/' },
  { letter: 'R', word: 'Rainbow', cn: '彩虹', emoji: '🌈', color: '#845EC2', sound: '/r/' },
  { letter: 'S', word: 'Sun', cn: '太阳', emoji: '☀️', color: '#FF6B6B', sound: '/s/' },
  { letter: 'T', word: 'Tiger', cn: '老虎', emoji: '🐯', color: '#FF8E53', sound: '/t/' },
  { letter: 'U', word: 'Umbrella', cn: '雨伞', emoji: '☂️', color: '#FFD93D', sound: '/ʌ/' },
  { letter: 'V', word: 'Violin', cn: '小提琴', emoji: '🎻', color: '#6BCB77', sound: '/v/' },
  { letter: 'W', word: 'Whale', cn: '鲸鱼', emoji: '🐋', color: '#4D96FF', sound: '/w/' },
  { letter: 'X', word: 'Xylophone', cn: '木琴', emoji: '🎵', color: '#845EC2', sound: '/ks/' },
  { letter: 'Y', word: 'Yacht', cn: '帆船', emoji: '⛵', color: '#FF6B6B', sound: '/j/' },
  { letter: 'Z', word: 'Zebra', cn: '斑马', emoji: '🦓', color: '#FF8E53', sound: '/z/' }
]

// ── 数字数据（1-20） ──
const NUMBERS_DATA = [
  { num: 1, word: 'One', cn: '一', emoji: '1️⃣' },
  { num: 2, word: 'Two', cn: '二', emoji: '2️⃣' },
  { num: 3, word: 'Three', cn: '三', emoji: '3️⃣' },
  { num: 4, word: 'Four', cn: '四', emoji: '4️⃣' },
  { num: 5, word: 'Five', cn: '五', emoji: '5️⃣' },
  { num: 6, word: 'Six', cn: '六', emoji: '6️⃣' },
  { num: 7, word: 'Seven', cn: '七', emoji: '7️⃣' },
  { num: 8, word: 'Eight', cn: '八', emoji: '8️⃣' },
  { num: 9, word: 'Nine', cn: '九', emoji: '9️⃣' },
  { num: 10, word: 'Ten', cn: '十', emoji: '🔟' },
  { num: 11, word: 'Eleven', cn: '十一', emoji: '1️⃣1️⃣' },
  { num: 12, word: 'Twelve', cn: '十二', emoji: '1️⃣2️⃣' },
  { num: 13, word: 'Thirteen', cn: '十三', emoji: '1️⃣3️⃣' },
  { num: 14, word: 'Fourteen', cn: '十四', emoji: '1️⃣4️⃣' },
  { num: 15, word: 'Fifteen', cn: '十五', emoji: '1️⃣5️⃣' },
  { num: 16, word: 'Sixteen', cn: '十六', emoji: '1️⃣6️⃣' },
  { num: 17, word: 'Seventeen', cn: '十七', emoji: '1️⃣7️⃣' },
  { num: 18, word: 'Eighteen', cn: '十八', emoji: '1️⃣8️⃣' },
  { num: 19, word: 'Nineteen', cn: '十九', emoji: '1️⃣9️⃣' },
  { num: 20, word: 'Twenty', cn: '二十', emoji: '💯' }
]

// ── 颜色数据 ──
const COLORS_DATA = [
  { word: 'Red', cn: '红色', hex: '#F44336', emoji: '🔴' },
  { word: 'Blue', cn: '蓝色', hex: '#2196F3', emoji: '🔵' },
  { word: 'Yellow', cn: '黄色', hex: '#FFEB3B', emoji: '🟡' },
  { word: 'Green', cn: '绿色', hex: '#4CAF50', emoji: '🟢' },
  { word: 'Orange', cn: '橙色', hex: '#FF9800', emoji: '🟠' },
  { word: 'Purple', cn: '紫色', hex: '#9C27B0', emoji: '🟣' },
  { word: 'Pink', cn: '粉色', hex: '#E91E8C', emoji: '🌸' },
  { word: 'Brown', cn: '棕色', hex: '#795548', emoji: '🟤' },
  { word: 'White', cn: '白色', hex: '#F5F5F5', emoji: '⚪' },
  { word: 'Black', cn: '黑色', hex: '#212121', emoji: '⚫' }
]

// ── 动物数据 ──
const ANIMALS_DATA = [
  { word: 'Cat', cn: '猫', emoji: '🐱', sound: 'Meow' },
  { word: 'Dog', cn: '狗', emoji: '🐶', sound: 'Woof' },
  { word: 'Bird', cn: '鸟', emoji: '🐦', sound: 'Tweet' },
  { word: 'Fish', cn: '鱼', emoji: '🐟', sound: '...' },
  { word: 'Rabbit', cn: '兔子', emoji: '🐰', sound: '...' },
  { word: 'Bear', cn: '熊', emoji: '🐻', sound: 'Roar' },
  { word: 'Lion', cn: '狮子', emoji: '🦁', sound: 'Roar' },
  { word: 'Elephant', cn: '大象', emoji: '🐘', sound: 'Trumpet' },
  { word: 'Monkey', cn: '猴子', emoji: '🐒', sound: 'Ooh ooh' },
  { word: 'Duck', cn: '鸭子', emoji: '🦆', sound: 'Quack' },
  { word: 'Horse', cn: '马', emoji: '🐴', sound: 'Neigh' },
  { word: 'Cow', cn: '牛', emoji: '🐮', sound: 'Moo' }
]

// ── 身体部位 ──
const BODY_DATA = [
  { word: 'Head', cn: '头', emoji: '👤' },
  { word: 'Eyes', cn: '眼睛', emoji: '👀' },
  { word: 'Nose', cn: '鼻子', emoji: '👃' },
  { word: 'Mouth', cn: '嘴巴', emoji: '👄' },
  { word: 'Ears', cn: '耳朵', emoji: '👂' },
  { word: 'Hair', cn: '头发', emoji: '💇' },
  { word: 'Hands', cn: '手', emoji: '👐' },
  { word: 'Feet', cn: '脚', emoji: '🦶' },
  { word: 'Belly', cn: '肚子', emoji: '🫃' },
  { word: 'Back', cn: '背', emoji: '🔙' }
]

// ── 食物数据 ──
const FOOD_DATA = [
  { word: 'Apple', cn: '苹果', emoji: '🍎' },
  { word: 'Banana', cn: '香蕉', emoji: '🍌' },
  { word: 'Orange', cn: '橙子', emoji: '🍊' },
  { word: 'Grapes', cn: '葡萄', emoji: '🍇' },
  { word: 'Bread', cn: '面包', emoji: '🍞' },
  { word: 'Rice', cn: '米饭', emoji: '🍚' },
  { word: 'Milk', cn: '牛奶', emoji: '🥛' },
  { word: 'Egg', cn: '鸡蛋', emoji: '🥚' },
  { word: 'Cake', cn: '蛋糕', emoji: '🎂' },
  { word: 'Cookie', cn: '饼干', emoji: '🍪' },
  { word: 'Juice', cn: '果汁', emoji: '🧃' },
  { word: 'Water', cn: '水', emoji: '💧' }
]

// ── 问候语 ──
const GREETINGS_DATA = [
  { word: 'Hello', cn: '你好', emoji: '👋', usage: '通用问候' },
  { word: 'Hi', cn: '嗨', emoji: '😊', usage: '日常问候' },
  { word: 'Good morning', cn: '早上好', emoji: '🌅', usage: '早晨' },
  { word: 'Good afternoon', cn: '下午好', emoji: '☀️', usage: '下午' },
  { word: 'Good evening', cn: '晚上好', emoji: '🌙', usage: '晚上' },
  { word: 'Good night', cn: '晚安', emoji: '😴', usage: '睡前' },
  { word: 'Goodbye', cn: '再见', emoji: '👋', usage: '离别' },
  { word: 'See you later', cn: '回见', emoji: '🙂', usage: '临别' },
  { word: 'Thank you', cn: '谢谢', emoji: '🙏', usage: '感谢' },
  { word: 'You\'re welcome', cn: '不客气', emoji: '😄', usage: '回应感谢' },
  { word: 'Please', cn: '请', emoji: '🤲', usage: '礼貌请求' },
  { word: 'Sorry', cn: '对不起', emoji: '😢', usage: '道歉' }
]

// ── OPW Level 数据 ──
const OPW_LEVELS = [
  {
    id: 1,
    title: 'Level 1',
    subtitle: '字母音值',
    desc: '学习26个字母的发音规则，奠定拼读基础',
    weeks: 26,
    words: 150,
    age: '5-6岁',
    color: '#FF6B6B',
    colorLight: '#FFF0F0',
    icon: '🔤',
    units: [
      { name: 'Short Vowels', sounds: ['a /æ/', 'e /e/', 'i /ɪ/', 'o /ɒ/', 'u /ʌ/'], words: ['ant', 'egg', 'ink', 'ox', 'up'] },
      { name: 'Consonants Set 1', sounds: ['s /s/', 't /t/', 'p /p/', 'n /n/', 'i /ɪ/'], words: ['sit', 'tip', 'pin', 'nip', 'pit'] },
      { name: 'Consonants Set 2', sounds: ['a /æ/', 'm /m/', 'd /d/', 'g /g/', 'o /ɒ/'], words: ['mad', 'dam', 'dog', 'got', 'map'] },
      { name: 'Consonants Set 3', sounds: ['c /k/', 'k /k/', 'e /e/', 'u /ʌ/', 'r /r/'], words: ['cat', 'kit', 'red', 'run', 'cup'] },
      { name: 'Consonants Set 4', sounds: ['h /h/', 'b /b/', 'f /f/', 'l /l/', 'j /dʒ/'], words: ['hat', 'bat', 'fan', 'leg', 'jam'] },
      { name: 'Consonants Set 5', sounds: ['v /v/', 'w /w/', 'x /ks/', 'y /j/', 'z /z/'], words: ['van', 'web', 'box', 'yak', 'zip'] }
    ]
  },
  {
    id: 2,
    title: 'Level 2',
    subtitle: '辅音组合',
    desc: '掌握L/R/S/词尾辅音组合，提升拼读流利度',
    weeks: 20,
    words: 200,
    age: '5-6岁',
    color: '#4ECDC4',
    colorLight: '#F0FFFE',
    icon: '🔡',
    units: [
      { name: 'L-Blends', sounds: ['bl', 'cl', 'fl', 'gl', 'pl', 'sl'], words: ['blue', 'clap', 'flag', 'glad', 'play', 'slip'] },
      { name: 'R-Blends', sounds: ['br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr'], words: ['brag', 'crab', 'drum', 'frog', 'grip', 'pray', 'trip'] },
      { name: 'S-Blends', sounds: ['sc', 'sk', 'sm', 'sn', 'sp', 'st', 'sw'], words: ['scam', 'skip', 'smug', 'snap', 'spin', 'step', 'swim'] },
      { name: 'Ending Blends', sounds: ['-ct', '-ft', '-ld', '-lt', '-nd', '-nk', '-nt', '-sk'], words: ['fact', 'left', 'bold', 'melt', 'bend', 'rink', 'dent', 'desk'] }
    ]
  },
  {
    id: 3,
    title: 'Level 3',
    subtitle: '短元音家族',
    desc: '通过CVC结构掌握5大短元音词族',
    weeks: 20,
    words: 300,
    age: '6岁',
    color: '#667eea',
    colorLight: '#F3F4FF',
    icon: '📖',
    units: [
      { name: 'Short a /æ/', sounds: ['-at', '-an', '-ap', '-ad', '-ag'], words: ['cat', 'can', 'cap', 'bad', 'bag'] },
      { name: 'Short e /e/', sounds: ['-et', '-en', '-ed', '-eg', '-ell'], words: ['pet', 'hen', 'bed', 'leg', 'bell'] },
      { name: 'Short i /ɪ/', sounds: ['-it', '-in', '-ig', '-ip', '-ill'], words: ['sit', 'bin', 'big', 'dip', 'fill'] },
      { name: 'Short o /ɒ/', sounds: ['-ot', '-op', '-og', '-ob', '-ock'], words: ['hot', 'hop', 'log', 'rob', 'sock'] },
      { name: 'Short u /ʌ/', sounds: ['-ut', '-ug', '-un', '-ub', '-uff'], words: ['cut', 'bug', 'run', 'hub', 'puff'] }
    ]
  },
  {
    id: 4,
    title: 'Level 4',
    subtitle: '长元音规则',
    desc: '学习魔法e和元音组合，突破长元音发音',
    weeks: 20,
    words: 500,
    age: '6-7岁',
    color: '#f093fb',
    colorLight: '#FFF0FF',
    icon: '✨',
    units: [
      { name: 'Magic e (CVCe)', sounds: ['a_e', 'i_e', 'o_e', 'u_e'], words: ['cake', 'kite', 'home', 'cube'] },
      { name: 'Vowel Teams ai/ay', sounds: ['ai', 'ay'], words: ['rain', 'tail', 'day', 'play'] },
      { name: 'Vowel Teams ee/ea', sounds: ['ee', 'ea'], words: ['tree', 'green', 'eat', 'beach'] },
      { name: 'Vowel Teams oa/ow', sounds: ['oa', 'ow'], words: ['boat', 'coat', 'low', 'snow'] }
    ]
  },
  {
    id: 5,
    title: 'Level 5',
    subtitle: '高级规则',
    desc: '掌握双元音、R控元音和多音节词，完成体系',
    weeks: 24,
    words: 800,
    age: '7岁+',
    color: '#FFD200',
    colorLight: '#FFFDE7',
    icon: '🏆',
    units: [
      { name: 'Diphthongs oi/oy', sounds: ['oi', 'oy'], words: ['oil', 'coin', 'boy', 'toy'] },
      { name: 'Diphthongs ou/ow', sounds: ['ou', 'ow'], words: ['out', 'cloud', 'cow', 'down'] },
      { name: 'R-Controlled Vowels', sounds: ['ar', 'or', 'er', 'ir', 'ur'], words: ['car', 'fort', 'her', 'bird', 'burn'] },
      { name: 'Multi-syllable Words', sounds: ['open syllable', 'closed syllable', 'VCe', 'vowel team'], words: ['robot', 'cabin', 'sunrise', 'rainbow'] }
    ]
  }
]

// ── 问候语课程 ──
const CLASSROOM_PHRASES = [
  { word: 'Sit down, please', cn: '请坐下', emoji: '🪑' },
  { word: 'Stand up, please', cn: '请起立', emoji: '🧍' },
  { word: 'Be quiet', cn: '请安静', emoji: '🤫' },
  { word: 'Look at me', cn: '看我', emoji: '👁️' },
  { word: 'Listen carefully', cn: '仔细听', emoji: '👂' },
  { word: 'Open your book', cn: '打开书本', emoji: '📖' },
  { word: 'Repeat after me', cn: '跟我重复', emoji: '🔄' },
  { word: 'Very good!', cn: '非常好！', emoji: '👍' }
]

module.exports = {
  ABC_DATA,
  NUMBERS_DATA,
  COLORS_DATA,
  ANIMALS_DATA,
  BODY_DATA,
  FOOD_DATA,
  GREETINGS_DATA,
  CLASSROOM_PHRASES,
  OPW_LEVELS
}
