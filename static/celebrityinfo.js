document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const celebrityId = params.get('celebrityId');
    
    const celebrities = {
        1: { name: '巴菲特', intro: '巴菲特的介紹...', img: '/static/img/巴菲特.jpg' },
        2: { name: '葛拉漢', intro: '葛拉漢的介紹...', img: '/static/img/葛拉漢.jpg' },
        3: { name: 'LBJ', intro: 'LBJ的介紹...', img: '/static/img/LBJ.jpg' },
        4: { name: '麥可', intro: '麥可的介紹...', img: '/static/img/麥可.jpg' },
        5: { name: '隨機', intro: '隨機的介紹...', img: '/static/img/隨機.jpg' }
    };

    const celebrity = celebrities[celebrityId];

    if (celebrity) {
        document.getElementById('celebrity-name').innerText = celebrity.name;
        document.getElementById('celebrity-intro').innerText = celebrity.intro;
        document.getElementById('celebrity-image').src = celebrity.img;
    } else {
        document.getElementById('celebrity-name').innerText = '未找到名人';
        document.getElementById('celebrity-intro').innerText = '無法顯示名人介紹';
    }
});

function goBack() {
    window.location.href = 'pickamethod.html';
}
function forward() {
    const params = new URLSearchParams(window.location.search);
    const celebrityId = params.get('celebrityId');
    const riskType = params.get('riskType');
    window.location.href = `result.html?celebrityId=${celebrityId}&riskType=${riskType}`;
}

