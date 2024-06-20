import json
import pandas as pd

def load_data(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return pd.DataFrame(data)

def recommend_stocks(user_type, selected_celebrity):
    risk_preferences = {
        '雪天型人格': {'low': 6, 'medium': 3, 'high': 1},
        '陰天型人格': {'low': 5, 'medium': 4, 'high': 1},
        '晴天型人格': {'low': 4, 'medium': 4, 'high': 2},
        '雷雨型人格': {'low': 3, 'medium': 4, 'high': 3},
        '閃電型人格': {'low': 2, 'medium': 3, 'high': 5}
    }

    celebrity_scores = {
        '巴菲特': 'Buffet_Score',
        '葛拉漢': 'Graham_Score',
        'LBJ': 'OShaughnessy_Score',
        '麥可': 'Murphy_Score'
    }

    low_risk_df = load_data('low_risk_stock_data.json')
    medium_risk_df = load_data('medium_risk_stock_data.json')
    high_risk_df = load_data('high_risk_stock_data.json')

    risk_allocation = risk_preferences.get(user_type)
    if not risk_allocation:
        raise ValueError(f"Unknown user type: {user_type}")

    score_column = celebrity_scores.get(selected_celebrity)
    if not score_column:
        raise ValueError(f"Unknown celebrity: {selected_celebrity}")

    recommended_stocks = []
    recommended_stocks.extend(low_risk_df.nlargest(risk_allocation['low'], score_column).to_dict('records'))
    recommended_stocks.extend(medium_risk_df.nlargest(risk_allocation['medium'], score_column).to_dict('records'))
    recommended_stocks.extend(high_risk_df.nlargest(risk_allocation['high'], score_column).to_dict('records'))

    return recommended_stocks
