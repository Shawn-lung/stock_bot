import json

def reformat_json_file(input_file, output_file):
    with open(input_file, 'r') as f:
        data = f.readlines()

    fixed_data = []
    current_object = ""
    for line in data:
        line = line.strip()
        if line.startswith("{") and not current_object:
            current_object = line
        elif line.endswith("}") and current_object:
            current_object += line
            try:
                fixed_data.append(json.loads(current_object))
            except json.JSONDecodeError as e:
                print(f"Error parsing line: {current_object}")
                print(f"Error message: {e}")
            current_object = ""
        else:
            current_object += line

    with open(output_file, 'w') as f:
        json.dump(fixed_data, f, indent=4)

# 重新格式化 JSON 文件
reformat_json_file('high_risk_stock_data.json', 'high_risk_stock_data_fixed.json')
reformat_json_file('medium_risk_stock_data.json', 'medium_risk_stock_data_fixed.json')
reformat_json_file('low_risk_stock_data.json', 'low_risk_stock_data_fixed.json')
