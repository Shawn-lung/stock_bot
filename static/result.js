document.getElementById('generate').addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search);
    const riskType = params.get('riskType');
    const celebType = params.get('celebrityId');
    const investmentAmount = document.getElementById('investment-amount').value;

    console.log("Risk Type:", riskType);
    console.log("Celebrity Type:", celebType);

    // 显示加载图标
    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/generateInvestmentCombo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ riskType, celebType, investmentAmount }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Received result:', result);

        const { investment_combo, shares } = result;

        if (Array.isArray(investment_combo) && Array.isArray(shares) && investment_combo.length === shares.length) {
            const comboDiv = document.getElementById('investment-combo');
            comboDiv.innerHTML = ''; // 清空现有内容

            investment_combo.forEach((stock, index) => {
                const stockElement = document.createElement('div');
                stockElement.innerHTML = `<p>${stock.stock_code}: ${shares[index].toFixed(2)} 股</p>`;
                comboDiv.appendChild(stockElement);
            });
        } else {
            console.error('Mismatch in lengths of investment_combo and shares');
            alert('Mismatch in lengths of investment_combo and shares');
            console.log('investment_combo:', investment_combo);
            console.log('shares:', shares);
        }

    } catch (error) {
        console.error('Error generating investment combo:', error);
        alert('Error generating investment combo: ' + error.message);
    } finally {
        // 隐藏加载图标
        document.getElementById('loading').style.display = 'none';
    }
});

document.getElementById('goBack').addEventListener('click', () => {
    window.location.href = 'pickamethod.html';
});
