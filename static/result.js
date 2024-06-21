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

        const investmentCombo = await response.json();
        console.log('Investment Combo:', investmentCombo);

        const comboDiv = document.getElementById('investment-combo');
        comboDiv.innerHTML = '';

        if (Array.isArray(investmentCombo)) {
            investmentCombo.forEach(stock => {
                const stockElement = document.createElement('div');
                stockElement.innerHTML = `
                    <p>${stock.stock_code}</p>
                `;
                comboDiv.appendChild(stockElement);
            });
        } else {
            console.error('Expected an array but got:', investmentCombo);
        }
    } catch (error) {
        console.error('Error generating investment combo:', error);
    }
});
