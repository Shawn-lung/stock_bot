document.getElementById('generate').addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search);
    const riskType = params.get('riskType');
    const celebType = params.get('celebrityId');

    console.log("Risk Type:", riskType);
    console.log("Celebrity Type:", celebType);

    try {
        const response = await fetch('http://localhost:3000/generateInvestmentCombo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ riskType, celebType }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Received result:', result);

        const { investment_combo, optimal_weights } = result;

        if (Array.isArray(investment_combo) && Array.isArray(optimal_weights) && investment_combo.length === optimal_weights.length) {
            const comboDiv = document.getElementById('investment-combo');
            comboDiv.innerHTML = ''; // 清空现有内容

            investment_combo.forEach((stock, index) => {
                const stockElement = document.createElement('div');
                stockElement.innerHTML = `<p>${stock.stock_code}: ${(optimal_weights[index] * 100).toFixed(2)}%</p>`;
                comboDiv.appendChild(stockElement);
            });
        } else {
            console.error('Mismatch in lengths of investment_combo and optimal_weights');
            alert('Mismatch in lengths of investment_combo and optimal_weights');
            console.log('investment_combo:', investment_combo);
            console.log('optimal_weights:', optimal_weights);
        }
    } catch (error) {
        console.error('Error generating investment combo:', error);
        alert('Error generating investment combo: ' + error.message);
    }
});

document.getElementById('goBack').addEventListener('click', () => {
    window.location.href = 'pickamethod.html';
});
