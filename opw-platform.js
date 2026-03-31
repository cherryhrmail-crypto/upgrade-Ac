// Oxford Phonics World Platform - Learning Progress Management
// 学习进度管理系统

const OWP_Storage = {
    KEY: 'owp_learning_data',
    VERSION: '1.0',
    
    // 获取存储数据
    getData() {
        try {
            const data = localStorage.getItem(this.KEY);
            if (!data) return this.getDefaultData();
            
            const parsed = JSON.parse(data);
            // 检查版本兼容性
            if (!parsed.version || parsed.version !== this.VERSION) {
                return this.migrateData(parsed);
            }
            return parsed;
        } catch (e) {
            console.error('读取学习数据失败:', e);
            return this.getDefaultData();
        }
    },
    
    // 获取默认数据结构
    getDefaultData() {
        return {
            version: this.VERSION,
            levels: {
                1: { progress: 0, units: {}, lastActive: null },
                2: { progress: 0, units: {}, lastActive: null },
                3: { progress: 0, units: {}, lastActive: null },
                4: { progress: 0, units: {}, lastActive: null },
                5: { progress: 0, units: {}, lastActive: null }
            },
            dailyStreak: {
                currentStreak: 0,
                longestStreak: 0,
                lastStudyDate: null,
                studyDays: []
            },
            statistics: {
                totalStudyTime: 0,
                wordsLearned: 0,
                unitsCompleted: 0,
                exercisesCompleted: 0
            },
            achievements: [],
            settings: {
                autoSave: true,
                notifications: true,
                ttsEnabled: true
            }
        };
    },
    
    // 数据迁移（未来版本升级用）
    migrateData(oldData) {
        const newData = this.getDefaultData();
        
        // 迁移已有数据
        if (oldData.levels) {
            for (let level = 1; level <= 5; level++) {
                if (oldData.levels[level]) {
                    newData.levels[level] = {
                        ...newData.levels[level],
                        ...oldData.levels[level]
                    };
                }
            }
        }
        
        // 保存并返回新数据
        this.saveData(newData);
        return newData;
    },
    
    // 保存数据
    saveData(data) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('保存学习数据失败:', e);
            return false;
        }
    },
    
    // 更新级别进度
    updateLevelProgress(level, unitId, progress) {
        const data = this.getData();
        const levelData = data.levels[level];
        
        if (!levelData) {
            console.error(`级别 ${level} 不存在`);
            return false;
        }
        
        // 更新单元完成状态
        levelData.units[unitId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            progress: progress || 100
        };
        
        // 计算级别总进度
        const totalUnits = this.getTotalUnitsForLevel(level);
        const completedUnits = Object.keys(levelData.units).length;
        levelData.progress = Math.round((completedUnits / totalUnits) * 100);
        levelData.lastActive = new Date().toISOString();
        
        // 更新统计
        data.statistics.unitsCompleted = this.getTotalCompletedUnits();
        
        // 更新每日打卡
        this.updateDailyStreak(data);
        
        // 保存更新
        return this.saveData(data);
    },
    
    // 获取级别总单元数
    getTotalUnitsForLevel(level) {
        const unitsByLevel = {
            1: 35, // 26教学 + 8复习 + 1总复习
            2: 31, // 23教学 + 7复习 + 1总复习
            3: 33, // 24教学 + 8复习 + 1总复习
            4: 33, // 24教学 + 8复习 + 1总复习
            5: 33  // 24教学 + 8复习 + 1总复习
        };
        return unitsByLevel[level] || 0;
    },
    
    // 获取总完成单元数
    getTotalCompletedUnits() {
        const data = this.getData();
        let total = 0;
        for (let level = 1; level <= 5; level++) {
            total += Object.keys(data.levels[level].units).length;
        }
        return total;
    },
    
    // 更新每日打卡
    updateDailyStreak(data) {
        const today = new Date().toISOString().split('T')[0];
        const streak = data.dailyStreak;
        
        if (!streak.lastStudyDate || streak.lastStudyDate !== today) {
            // 检查是否连续学习
            const lastDate = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null;
            const todayDate = new Date(today);
            
            if (lastDate) {
                const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    // 连续学习
                    streak.currentStreak++;
                } else if (diffDays > 1) {
                    // 中断了，重置连续天数
                    streak.currentStreak = 1;
                }
            } else {
                // 第一次学习
                streak.currentStreak = 1;
            }
            
            // 更新最长连续记录
            if (streak.currentStreak > streak.longestStreak) {
                streak.longestStreak = streak.currentStreak;
            }
            
            // 添加学习日期
            if (!streak.studyDays.includes(today)) {
                streak.studyDays.push(today);
                // 只保留最近100天的记录
                if (streak.studyDays.length > 100) {
                    streak.studyDays = streak.studyDays.slice(-100);
                }
            }
            
            streak.lastStudyDate = today;
        }
    },
    
    // 获取学习报告
    getLearningReport() {
        const data = this.getData();
        const report = {
            overallProgress: this.getOverallProgress(),
            completedLevels: this.getCompletedLevels(),
            currentStreak: data.dailyStreak.currentStreak,
            longestStreak: data.dailyStreak.longestStreak,
            totalStudyDays: data.dailyStreak.studyDays.length,
            statistics: { ...data.statistics },
            levels: {}
        };
        
        // 各级别详情
        for (let level = 1; level <= 5; level++) {
            const levelData = data.levels[level];
            report.levels[level] = {
                progress: levelData.progress,
                completedUnits: Object.keys(levelData.units).length,
                totalUnits: this.getTotalUnitsForLevel(level),
                lastActive: levelData.lastActive
            };
        }
        
        return report;
    },
    
    // 获取总体进度
    getOverallProgress() {
        const data = this.getData();
        let totalWeight = 0;
        let weightedProgress = 0;
        
        for (let level = 1; level <= 5; level++) {
            const totalUnits = this.getTotalUnitsForLevel(level);
            const levelProgress = data.levels[level].progress;
            weightedProgress += levelProgress * totalUnits;
            totalWeight += totalUnits;
        }
        
        return totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : 0;
    },
    
    // 获取已完成的级别数
    getCompletedLevels() {
        const data = this.getData();
        let completed = 0;
        
        for (let level = 1; level <= 5; level++) {
            if (data.levels[level].progress >= 95) {
                completed++;
            }
        }
        
        return completed;
    },
    
    // 重置学习数据
    resetData() {
        localStorage.removeItem(this.KEY);
        return this.getDefaultData();
    }
};

// UI 更新功能
const OWP_UI = {
    // 更新进度显示
    updateProgressDisplay(selector = '#overallProgress') {
        const report = OWP_Storage.getLearningReport();
        const progressEl = document.querySelector(selector);
        
        if (progressEl) {
            progressEl.style.width = `${report.overallProgress}%`;
            progressEl.textContent = `${report.overallProgress}%`;
        }
        
        // 更新统计数字
        this.updateStatistics(report);
        
        // 更新级别卡片进度
        this.updateLevelCards(report);
    },
    
    // 更新统计数字
    updateStatistics(report) {
        const stats = {
            '#completedUnits': report.statistics.unitsCompleted,
            '#completedLevels': report.completedLevels,
            '#studyDays': report.totalStudyDays,
            '#masteredWords': report.statistics.wordsLearned || 0,
            '#currentStreak': report.currentStreak,
            '#longestStreak': report.longestStreak
        };
        
        for (const [selector, value] of Object.entries(stats)) {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = value;
            }
        }
    },
    
    // 更新级别卡片
    updateLevelCards(report) {
        for (let level = 1; level <= 5; level++) {
            const levelData = report.levels[level];
            const levelProgress = document.querySelector(`#level${level}Progress`);
            const levelFill = document.querySelector(`#level${level}Fill`);
            
            if (levelProgress) {
                levelProgress.textContent = `${levelData.progress}%`;
            }
            
            if (levelFill) {
                levelFill.style.width = `${levelData.progress}%`;
            }
        }
    },
    
    // 显示学习通知
    showNotification(message, type = 'success') {
        if (Notification.permission === 'granted') {
            new Notification('Oxford Phonics World', {
                body: message,
                icon: 'favicon.ico'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification(message, type);
                }
            });
        }
        
        // 显示页面内通知
        this.showToast(message, type);
    },
    
    // 显示Toast通知
    showToast(message, type = 'success') {
        // 移除现有toast
        const existing = document.querySelector('.owp-toast');
        if (existing) existing.remove();
        
        // 创建新toast
        const toast = document.createElement('div');
        toast.className = `owp-toast owp-toast-${type}`;
        toast.innerHTML = `
            <div class="owp-toast-content">
                <span class="owp-toast-icon">${this.getToastIcon(type)}</span>
                <span class="owp-toast-message">${message}</span>
            </div>
        `;
        
        // 添加样式
        if (!document.querySelector('#owp-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'owp-toast-styles';
            style.textContent = `
                .owp-toast {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 12px;
                    padding: 16px 20px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                    z-index: 9999;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    max-width: 320px;
                    border-left: 4px solid #4CAF50;
                }
                .owp-toast-success { border-color: #4CAF50; }
                .owp-toast-info { border-color: #2196F3; }
                .owp-toast-warning { border-color: #FF9800; }
                .owp-toast-error { border-color: #F44336; }
                .owp-toast.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                .owp-toast-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .owp-toast-icon {
                    font-size: 1.2rem;
                }
                .owp-toast-message {
                    font-size: 0.95rem;
                    color: #333;
                }
                @media (max-width: 480px) {
                    .owp-toast {
                        left: 20px;
                        right: 20px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    getToastIcon(type) {
        const icons = {
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || 'ℹ️';
    },
    
    // 初始化学习进度UI
    initProgressUI() {
        this.updateProgressDisplay();
        
        // 定期更新进度
        setInterval(() => {
            this.updateProgressDisplay();
        }, 5000);
    }
};

// 单元学习功能
const OWP_Unit = {
    // 标记单元为已完成
    completeUnit(level, unitId, score = 100) {
        const success = OWP_Storage.updateLevelProgress(level, unitId, score);
        
        if (success) {
            const report = OWP_Storage.getLearningReport();
            const unitCount = report.levels[level].completedUnits;
            const totalUnits = report.levels[level].totalUnits;
            
            // 显示成功通知
            OWP_UI.showNotification(
                `恭喜完成 Level ${level} 第 ${unitCount}/${totalUnits} 单元！`,
                'success'
            );
            
            // 检查是否完成级别
            if (report.levels[level].progress >= 95) {
                setTimeout(() => {
                    OWP_UI.showNotification(
                        `🎉 恭喜完成 Level ${level} 所有单元！`,
                        'success'
                    );
                }, 1000);
            }
            
            // 更新UI
            OWP_UI.updateProgressDisplay();
            
            return true;
        }
        
        OWP_UI.showNotification('保存学习记录失败，请重试', 'error');
        return false;
    },
    
    // 获取单元详情
    getUnitInfo(level, unitId) {
        const data = OWP_Storage.getData();
        return data.levels[level]?.units[unitId] || null;
    },
    
    // 检查单元是否已学习
    isUnitLearned(level, unitId) {
        const unitInfo = this.getUnitInfo(level, unitId);
        return unitInfo?.completed || false;
    }
};

// 成就系统
const OWP_Achievements = {
    achievements: [
        { id: 'first_unit', name: '学习起步', description: '完成第一个学习单元', unlocked: false },
        { id: 'level1_complete', name: '字母大师', description: '完成 Level 1 所有单元', unlocked: false },
        { id: '5_day_streak', name: '坚持之星', description: '连续学习5天', unlocked: false },
        { id: '10_units', name: '学习达人', description: '完成10个学习单元', unlocked: false },
        { id: 'level2_complete', name: '拼读新手', description: '完成 Level 2 所有单元', unlocked: false },
        { id: '30_day_streak', name: '坚持不懈', description: '连续学习30天', unlocked: false },
        { id: 'all_levels', name: '自然拼读专家', description: '完成所有5个级别', unlocked: false }
    ],
    
    // 检查并解锁成就
    checkAchievements() {
        const report = OWP_Storage.getLearningReport();
        const unlocked = [];
        
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                const unlockedNow = this.checkAchievement(achievement.id, report);
                if (unlockedNow) {
                    achievement.unlocked = true;
                    unlocked.push(achievement);
                    
                    // 显示成就解锁通知
                    OWP_UI.showNotification(
                        `🎊 成就解锁：${achievement.name} - ${achievement.description}`,
                        'success'
                    );
                }
            }
        });
        
        return unlocked;
    },
    
    checkAchievement(achievementId, report) {
        switch (achievementId) {
            case 'first_unit':
                return report.statistics.unitsCompleted >= 1;
            case 'level1_complete':
                return report.levels[1].progress >= 95;
            case '5_day_streak':
                return report.currentStreak >= 5;
            case '10_units':
                return report.statistics.unitsCompleted >= 10;
            case 'level2_complete':
                return report.levels[2].progress >= 95;
            case '30_day_streak':
                return report.currentStreak >= 30;
            case 'all_levels':
                return report.completedLevels >= 5;
            default:
                return false;
        }
    }
};

// 导出全局对象
window.OWP = {
    Storage: OWP_Storage,
    UI: OWP_UI,
    Unit: OWP_Unit,
    Achievements: OWP_Achievements,
    
    // 初始化平台
    init() {
        console.log('Oxford Phonics World Platform v1.0 初始化...');
        
        // 初始化UI
        this.UI.initProgressUI();
        
        // 检查成就
        setTimeout(() => {
            this.Achievements.checkAchievements();
        }, 1000);
        
        // 添加全局样式
        this.addGlobalStyles();
        
        console.log('平台初始化完成');
    },
    
    // 添加全局样式
    addGlobalStyles() {
        if (document.querySelector('#owp-global-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'owp-global-styles';
        style.textContent = `
            .owp-progress-card {
                background: white;
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                margin-bottom: 20px;
            }
            
            .owp-level-card {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 16px;
                padding: 20px;
                margin-bottom: 16px;
            }
            
            .owp-level-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            
            .owp-level-title {
                font-family: 'Fredoka One', cursive;
                font-size: 1.2rem;
                color: #333;
            }
            
            .owp-progress-bar {
                height: 12px;
                background: #e0e0e0;
                border-radius: 6px;
                overflow: hidden;
                margin: 8px 0;
            }
            
            .owp-progress-fill {
                height: 100%;
                border-radius: 6px;
                transition: width 0.6s ease;
            }
            
            .owp-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 16px;
                margin-top: 20px;
            }
            
            .owp-stat-item {
                text-align: center;
                padding: 16px;
                background: #f8f9fa;
                border-radius: 12px;
            }
            
            .owp-stat-value {
                font-family: 'Fredoka One', cursive;
                font-size: 1.8rem;
                color: #FF6B00;
                line-height: 1;
            }
            
            .owp-stat-label {
                font-size: 0.85rem;
                color: #666;
                margin-top: 6px;
            }
            
            /* 学习按钮样式 */
            .owp-learn-btn {
                background: linear-gradient(135deg, #FF6B00, #2B4FC8);
                color: white;
                border: none;
                border-radius: 12px;
                padding: 12px 24px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            
            .owp-learn-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255,107,0,0.3);
            }
            
            .owp-learn-btn.completed {
                background: linear-gradient(135deg, #27AE60, #1a7a42);
            }
        `;
        
        document.head.appendChild(style);
    }
};

// 自动初始化
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.OWP) {
            window.OWP.init();
        }
    });
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OWP;
}