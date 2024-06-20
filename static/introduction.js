document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const scoreRange = params.get('scoreRange') || 'unknown';

    const contentElement = document.getElementById('content');
    let content = '';

    switch (scoreRange) {
        case '4-7':
            content = `
                <h1>雪天型人格</h1>
                <img src="/static/img/snowbabi.png" alt="雪天型人格">
                <p>雪天型人格者是一類謹慎、穩健且注重安全和穩定的人。他們在風險管理和長期規劃方面表現出色，但在應變性和創新方向可能會遭到挑戰。理解並接受自己的性格特徵，可以幫助他們在發揮優勢的同時，不斷提升適應和創新能力，從而在各方面取得更大的成功。</p>
                <h2>優勢：</h2>
                <ul>
                    <li><strong>謹慎和細心：</strong>他們能長識別和管理風險，能夠在決策過程中考慮到潛在的風險因素，並制定相應的應對策略。</li>
                    <li><strong>穩定性：</strong>他們的穩定性使得他們在團隊中往往是值得信賴的成員，能夠穩定地為團隊提供長期的支持。</li>
                    <li><strong>長期規劃：</strong>雪天型人格者通常具有長期規劃，能夠看到長遠的利益，並會做出持久的努力和投入。</li>
                </ul>
                <h2>挑戰：</h2>
                <ul>
                    <li><strong>適應性不足：</strong>由於他們變化的抗拒，他們在快速變化的環境中可能會感到困難，需要更多的時間來適應新情況。</li>
                    <li><strong>創新能力受限：</strong>穩重和保守的性格可能限制他們的創新能力和應變精神，使他們在變化和創新的領域中表現不佳。</li>
                    <li><strong>過度依賴傳統：</strong>他們可能會過於依賴傳統和穩定的策略，無法充分發揮自己的潛力。</li>
                </ul>
                <div class="buttons">
                    <button onclick="retakeTest()">返回重測</button>
                    <button onclick="recommend()">讓名人幫你選股！</button>
                </div>
            `;
            break;
        case '8-10':
            content = `
                <h1>陰天型人格</h1>
                <img src="/static/img/cloudi.png" alt="陰天型人格">
                <p>陰天型人格者是一類在風險和回報之間尋求平衡的個體。他們既不完全避免風險，也不過度冒險，而是講求精打細算的風險管理。...</p>
                <h2>優勢：</h2>
                <ul>
                    <li><strong>平衡和審慎：</strong>他們能夠有效地管理和控制風險，在達成回報的同時保持謹慎，避免過度冒險。</li>
                    <li><strong>應變性強：</strong>他們的適應性和靈活性使其能夠在多變的環境中迅速調整策略，保持穩定性。</li>
                    <li><strong>決策理性：</strong>他們在決策時能夠平衡風險和回報，確保在穩健的基礎上實現收益。</li>
                </ul>
                <h2>挑戰：</h2>
                <ul>
                    <li><strong>決策猶豫：</strong>由於他們注重風險和回報的平衡，決策過程可能會較為緩慢，需要更多時間來做出最優選擇。</li>
                    <li><strong>創新精神不足：</strong>他們在變化和創新方面可能需要更多的勇氣和支持，才能夠在競爭中脫穎而出。</li>
                    <li><strong>過度依賴傳統：</strong>他們可能會過於依賴傳統策略和方法，忽視了潛在的新機會。</li>
                </ul>
                <div class="buttons">
                    <button onclick="retakeTest()">返回重測</button>
                    <button onclick="recommend()">讓名人幫你選股！</button>
                </div>
            `;
            break;
        case '11-14':
            content = `
                <h1>晴天型人格</h1>
                <img src="/static/img/sunni.png" alt="晴天型人格">
                <p>晴天型人格者是在風險和回報之間尋求理性平衡的個體。在決策時既謹慎又靈活。...</p>
                <h2>優勢：</h2>
                <ul>
                    <li><strong>理性和審慎：</strong>晴天型人格者的決策往往品質很高，能夠綜合考慮各種因素，並做出最合理的選擇。</li>
                    <li><strong>風險管理能力：</strong>他們能夠有效地識別和管理風險，在追求回報的同時，保持風險的可控性。</li>
                    <li><strong>靈活應變性：</strong>無論是穩定還是變動的市場，他們的靈活應變性使其能夠在不同環境中都表現出色。</li>
                </ul>
                <h2>挑戰：</h2>
                <ul>
                    <li><strong>決策過程漫長：</strong>由於他們在決策時需進行詳細的風險和回報分析，決策過程可能較為漫長，影響其快速反應的能力。</li>
                    <li><strong>平衡策略：</strong>在某些特殊情況下，找到風險和回報的最佳平衡可能會非常困難，這需要他們更強的判斷力和決策能力。</li>
                    <li><strong>中庸風險：</strong>有時候，他們可能因為過於追求平衡而採取過於中庸的策略，錯失一些高收益的機會。</li>
                </ul>
                <div class="buttons">
                    <button onclick="retakeTest()">返回重測</button>
                    <button onclick="recommend()">讓名人幫你選股！</button>
                </div>
            `;
            break;
        case '15-17':
            content = `
                <h1>雷雨型人格</h1>
                <img src="/static/img/raini.png" alt="雷雨型人格">
                <p>雷雨型人格者是一類在風險承擔上具備高度靈活性和動態平衡能力的個體。他們能夠在應對風險時展示出強大的適應力和創新能力。...</p>
                <h2>優勢：</h2>
                <ul>
                    <li><strong>自信與膽識：</strong>他們能夠應對不同的情況，無論是穩定還是動盪的環境，都能保持有效的操作。</li>
                    <li><strong>高效的應變力：</strong>在急需的情境下，他們能夠有效地適應和應對，以保持高效的回報。</li>
                    <li><strong>創新和冒險精神：</strong>他們具有創新精神和冒險精神，無論是風險還是回報，這使得他們能夠在競爭中脫穎而出。</li>
                </ul>
                <h2>挑戰：</h2>
                <ul>
                    <li><strong>決策壓力：</strong>由於需要在高風險之間找到平衡，他們在做決策時可能需要面臨極大的壓力。</li>
                    <li><strong>風險管理能力：</strong>高度的風險承擔策略中，他們的風險管理能力需要不斷提升，確保能夠應對市場的變化。</li>
                    <li><strong>潛在的不穩定性：</strong>雖然他們能夠承擔風險，但這些策略的實施可能帶來不穩定性，需要進一步的策略管理。</li>
                </ul>
                <div class="buttons">
                    <button onclick="retakeTest()">返回重測</button>
                    <button onclick="recommend()">讓名人幫你選股！</button>
                </div>
            `;
            break;
        case '18-20':
            content = `
                <h1>閃電型人格</h1>
                <img src="/static/img/lightni.png" alt="閃電型人格">
                <p>閃電型人格者是一類勇於冒險、富有創新精神和自信心的個體。他們在風險和挑戰面前表現非常出色，能夠快速決策並達到高回報。...</p>
                <h2>優勢：</h2>
                <ul>
                    <li><strong>高回報精神：</strong>由於敢於承擔高風險，他們能夠獲得極高平均水平的回報。</li>
                    <li><strong>創新精神：</strong>他們的創新能力使其能夠在競爭激烈的市場中保持領先，並推動新的發展和變革。</li>
                    <li><strong>強大適應力：</strong>他們能夠迅速應變化的環境，並在不斷變化的市場中找到機會。</li>
                </ul>
                <h2>挑戰：</h2>
                <ul>
                    <li><strong>風險管理：</strong>由於高風險高回報，他們有時候可能會忽視風險管理的重要性，導致潛在的巨大損失。</li>
                    <li><strong>決策波動性：</strong>快速決策和頻繁變動策略可能會導致企業決策的不穩定性，需要強有力的管理。</li>
                    <li><strong>壓力管理：</strong>高風險帶來高壓力，他們需要具備強大的心理素質來承受來自市場和競爭的壓力，並保持穩定的動力和表現。</li>
                </ul>
                <div class="buttons">
                    <button onclick="retakeTest()">返回重測</button>
                    <button onclick="recommend()">讓名人幫你選股！</button>
                </div>
            `;
            break;
        default:
            content = '<p>無法判斷您的風險類型。</p>';
            break;
    }

    contentElement.innerHTML = content;
});

function retakeTest() {
    window.location.href = 'post.html';  // 返回重測到 post.html
}

function recommend() {
    window.location.href = 'pickamethod.html';  // 讓名人幫你選股到 pickamethod.html
}
