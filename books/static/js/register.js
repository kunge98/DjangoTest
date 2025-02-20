// 表单输入框动画
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input, button");
    inputs.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, (index + 1) * 300); // 依次延迟
    });
});
