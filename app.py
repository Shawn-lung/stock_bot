from flask import Flask, request, jsonify, render_template
import json
import os
from stock_download import StockDownloader
from score import StockScorer
from recommend_stocks import recommend_stocks  # 假设你将推荐函数放在这个文件里

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_type = data.get('user_type')
    selected_celebrity = data.get('selected_celebrity')

    # 生成推荐股票列表
    recommended_stocks = recommend_stocks(user_type, selected_celebrity)

    return jsonify(recommended_stocks)

if __name__ == "__main__":
    app.run(debug=True)
