// 实时更新时间
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("zh-CN", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    timeElement.textContent = `⏰ 当前时间：${formattedTime}`;
}

// 每秒更新时间
setInterval(updateTime, 1000);
updateTime();

// 让按钮渐入，按顺序出现
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
        }, (index + 1) * 300); // 依次延迟
    });
});


// 书籍名人名言数组
const quotes = [
    "书籍是人类进步的阶梯。——高尔基",
    "读书使人充实，讨论使人机智，写作使人精确。——弗朗西斯·培根",
    "一本好书就是一位伟大的导师。——查尔斯·爱德华·布朗宁",
    "书籍是唯一可以在寂静的夜晚陪伴你的朋友。——安东·契诃夫",
    "书是唯一的朋友，它能让我们永远不孤单。——巴尔扎克",
    "人活在世上就像在大海中航行，而书籍是航行的指南针。——威廉·莎士比亚",
    "没有书籍，生活是没有光彩的。——乔治·赫伯特",
    "读书破万卷，下笔如有神。——杜甫",
    "书籍是培养心灵的工具。——约瑟夫·艾迪生",
    "读书能改变人生。——林语堂",
    "知识就是力量。——弗朗西斯·培根",
    "书籍是思想的源泉。——拉尔夫·沃尔多·爱默生",
    "一个人通过读书可以走遍全世界。——哈里·卡斯特尔",
    "书籍是世间最伟大的宝藏。——安娜·卡列尼娜",
    "所有的书籍都是对知识的积累。——卡尔·马克思",
    "读书改变命运。——余华",
    "读书使人明智。——亚里士多德",
    "书籍是帮助我们思考的工具。——赫尔曼·黑塞",
    "当你沉浸于书籍时，世界变得更加广阔。——约翰·米尔顿",
    "书籍是我们与伟大心灵的桥梁。——弗朗茨·卡夫卡"
];


// 获取随机名人名言
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// 自动更换书籍名人名言
document.addEventListener("DOMContentLoaded", function () {
    const quoteText = document.getElementById("quote-text");
    const quoteContainer = document.getElementById("quote-container");

    // 初始名言
    quoteText.innerHTML = `“${getRandomQuote()}”`;

    // 每3秒更换一次名人名言并添加淡入淡出特效
    setInterval(() => {
        // 先添加淡出效果
        quoteText.classList.add('fade-out');

        // 等待1秒后（淡出动画结束）更换名言
        setTimeout(() => {
            // 更换名人名言
            const newQuote = getRandomQuote();
            quoteText.innerHTML = `“${newQuote}”`;

            // 移除淡出效果，添加淡入效果
            quoteText.classList.remove('fade-out');
            quoteText.classList.add('fade-in');
        }, 1000);  // 1秒后更换名言

    }, 8000);  // 每3000毫秒（即3秒）更换一次名人名言
});
