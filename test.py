import pandas as pd

# 读取 JSON 文件
high_risk_file = 'high_risk_stock_data.json'
medium_risk_file = 'medium_risk_stock_data.json'
low_risk_file = 'low_risk_stock_data.json'

# 检查文件内容
try:
    high_risk_data = pd.read_json(high_risk_file, lines=True)
    print("High Risk Data:")
    print(high_risk_data.head())
except ValueError as e:
    print(f"Error reading {high_risk_file}: {e}")

try:
    medium_risk_data = pd.read_json(medium_risk_file, lines=True)
    print("Medium Risk Data:")
    print(medium_risk_data.head())
except ValueError as e:
    print(f"Error reading {medium_risk_file}: {e}")

try:
    low_risk_data = pd.read_json(low_risk_file, lines=True)
    print("Low Risk Data:")
    print(low_risk_data.head())
except ValueError as e:
    print(f"Error reading {low_risk_file}: {e}")
