// 实现表格排序的脚本（这里只是一个基础示例，可以优化）
document.querySelectorAll('th a').forEach(link => {
    link.addEventListener('click', function (event) {
        const th = event.target;
        th.classList.toggle('sorted');
    });
});
