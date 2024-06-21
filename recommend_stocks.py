import sys
import os
import pandas as pd
import json

def recommend_stocks(risk_type, celeb_type):
    try:
        # 定义文件路径
        current_dir = os.path.dirname(os.path.abspath(__file__))
        high_risk_file = os.path.join(current_dir, 'high_risk_stock_data.csv')
        medium_risk_file = os.path.join(current_dir, 'medium_risk_stock_data.csv')
        low_risk_file = os.path.join(current_dir, 'low_risk_stock_data.csv')

        # 读取CSV文件
        high_risk_stocks = pd.read_csv(high_risk_file)
        medium_risk_stocks = pd.read_csv(medium_risk_file)
        low_risk_stocks = pd.read_csv(low_risk_file)


        # 风险类型对应的投资比例
        risk_allocation = {
            '雪天型人格': {'low': 6, 'medium': 3, 'high': 1},
            '陰天型人格': {'low': 5, 'medium': 4, 'high': 1},
            '晴天型人格': {'low': 4, 'medium': 4, 'high': 2},
            '雷雨型人格': {'low': 3, 'medium': 4, 'high': 3},
            '閃電型人格': {'low': 2, 'medium': 3, 'high': 5}
        }

        # 名人对应的评分列
        celeb_score_map = {
            1: 'Buffet_Score',
            2: 'Graham_Score',
            3: 'OShaughnessy_Score',
            4: 'Murphy_Score'
        }

        allocation = risk_allocation[risk_type]
        score_column = celeb_score_map[celeb_type]

        low_risk_selected = low_risk_stocks.nlargest(allocation['low'], score_column)
        medium_risk_selected = medium_risk_stocks.nlargest(allocation['medium'], score_column)
        high_risk_selected = high_risk_stocks.nlargest(allocation['high'], score_column)

        selected_stocks = pd.concat([low_risk_selected, medium_risk_selected, high_risk_selected])

        return selected_stocks.to_dict(orient='records')
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    try:
        risk_type = sys.argv[1]
        celeb_type = int(sys.argv[2])
        investment_combo = recommend_stocks(risk_type, celeb_type)
        print(json.dumps(investment_combo, ensure_ascii=False, indent=4))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
