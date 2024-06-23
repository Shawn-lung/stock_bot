import sys
import json
import numpy as np
import pandas as pd
import yfinance as yf
import os

# 獲取當前腳本所在目錄
current_dir = os.path.dirname(os.path.abspath(__file__))
high_risk_file = os.path.join(current_dir, 'high_risk_stock_data.csv')
medium_risk_file = os.path.join(current_dir, 'medium_risk_stock_data.csv')
low_risk_file = os.path.join(current_dir, 'low_risk_stock_data.csv')
log_file = os.path.join(current_dir, 'stock_data.log')

# 讀取 CSV 文件
high_risk_stock_data = pd.read_csv(high_risk_file)
medium_risk_stock_data = pd.read_csv(medium_risk_file)
low_risk_stock_data = pd.read_csv(low_risk_file)

# 風險偏好設定
risk_preferences = {
    "雪天型人格": {"low": 6, "medium": 3, "high": 1},
    "陰天型人格": {"low": 5, "medium": 4, "high": 1},
    "晴天型人格": {"low": 4, "medium": 4, "high": 2},
    "雷雨型人格": {"low": 3, "medium": 4, "high": 3},
    "閃電型人格": {"low": 2, "medium": 3, "high": 5},
}

# 名人投資方式對應的列名
celebrity_columns = {
    "1": "Buffet_Score",
    "2": "Graham_Score",
    "3": "OShaughnessy_Score",
    "4": "Murphy_Score"
}

def log_message(message):
    with open(log_file, 'a') as f:
        f.write(message + '\n')

def get_stock_data(stock_code):
    try:
        stock = yf.Ticker(stock_code)
        hist = stock.history(period="1y")  # 下載一年的數據
        if hist.empty:
            raise ValueError(f"No data found for {stock_code}")
        returns = hist['Close'].pct_change().dropna()
        expected_return = returns.mean()
        volatility = returns.std()
        log_message(f"Data for {stock_code}: expected_return={expected_return}, volatility={volatility}")
        return expected_return, volatility
    except Exception as e:
        log_message(f"Error fetching data for {stock_code}: {e}")
        return None, None

def select_stocks(risk_type, celeb_type):
    preference = risk_preferences[risk_type]
    score_column = celebrity_columns[celeb_type]

    selected_stocks = []

    # 選擇低風險股票
    low_risk_stocks = low_risk_stock_data.nlargest(preference["low"], score_column)
    for index, row in low_risk_stocks.iterrows():
        expected_return, volatility = get_stock_data(row['stock_code'])
        if expected_return is not None and volatility is not None:
            selected_stocks.append({
                "stock_code": row['stock_code'],
                "expected_return": expected_return,
                "volatility": volatility
            })

    # 選擇市場風險股票
    medium_risk_stocks = medium_risk_stock_data.nlargest(preference["medium"], score_column)
    for index, row in medium_risk_stocks.iterrows():
        expected_return, volatility = get_stock_data(row['stock_code'])
        if expected_return is not None and volatility is not None:
            selected_stocks.append({
                "stock_code": row['stock_code'],
                "expected_return": expected_return,
                "volatility": volatility
            })

    # 選擇高風險股票
    high_risk_stocks = high_risk_stock_data.nlargest(preference["high"], score_column)
    for index, row in high_risk_stocks.iterrows():
        expected_return, volatility = get_stock_data(row['stock_code'])
        if expected_return is not None and volatility is not None:
            selected_stocks.append({
                "stock_code": row['stock_code'],
                "expected_return": expected_return,
                "volatility": volatility
            })

    return selected_stocks

def monte_carlo_optimization(investment_combo, num_simulations=10000):
    num_assets = len(investment_combo)
    results = np.zeros((3, num_simulations))

    returns = np.array([stock['expected_return'] for stock in investment_combo])
    volatilities = np.array([stock['volatility'] for stock in investment_combo])

    all_weights = np.zeros((num_simulations, num_assets))  # 儲存每次模擬的權重

    for i in range(num_simulations):
        weights = np.random.random(num_assets)
        weights /= np.sum(weights)  # 確保權重之和為1

        portfolio_return = np.sum(returns * weights)
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(np.diag(volatilities ** 2), weights)))

        results[0, i] = portfolio_return
        results[1, i] = portfolio_volatility
        results[2, i] = results[0, i] / results[1, i]  # Sharpe ratio

        all_weights[i, :] = weights  # 記錄權重

    max_sharpe_idx = np.argmax(results[2])
    optimal_weights = all_weights[max_sharpe_idx, :]

    return optimal_weights.tolist()

def main():
    risk_type = sys.argv[1]
    celeb_type = sys.argv[2]

    investment_combo = select_stocks(risk_type, celeb_type)
    if not investment_combo:
        print(json.dumps({"error": "No valid stock data found"}))
        return

    optimal_weights = monte_carlo_optimization(investment_combo)

    result = {
        "investment_combo": investment_combo,
        "optimal_weights": optimal_weights
    }

    print(json.dumps(result))

if __name__ == "__main__":
    main()
