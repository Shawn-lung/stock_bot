document.addEventListener("DOMContentLoaded", function() {
    // 初始化图片路径
    const basePath = '/static/img/';
    document.getElementById('image1').src = basePath + '巴菲特.jpg';
    document.getElementById('image2').src = basePath + '葛拉漢.jpg';
    document.getElementById('image3').src = basePath + 'LBJ.jpg';
    document.getElementById('image4').src = basePath + '麥可.jpg';
    document.getElementById('image5').src = basePath + '隨機.jpg';
});

function selectCelebrity() {
    const riskType = localStorage.getItem('riskType');
    const selectedOption = document.querySelector('input[name="celebrity"]:checked');
    if (selectedOption) {
        const celebrityId = selectedOption.value;
        window.location.href = `celebrityinfo.html?celebrityId=${celebrityId}&riskType=${riskType}`;
    } else {
        alert("請選擇一個名人");
    }
}

function goBack() {
    const riskType = localStorage.getItem('riskType');
    window.location.href = `introduction.html?riskType=${riskType}`;  // 假设返回到 introduction.html 页面
}
