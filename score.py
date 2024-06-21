import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

class StockScorer:
    def __init__(self, input_file, high_risk_file, medium_risk_file, low_risk_file):
        self.input_file = input_file
        self.high_risk_file = high_risk_file
        self.medium_risk_file = medium_risk_file
        self.low_risk_file = low_risk_file
        self.df = None

    def load_data(self):
        self.df = pd.read_csv(self.input_file)
        print(f"Initial rows: {len(self.df)}")

    def preprocess_data(self):
        required_columns = ["EPS", "Beta", "PE_Ratio", "ROE", "ROA", "Gross_margin", "Operating_margin", "Trailing_PE_Ratio", "PB_Ratio", "Revenue_per_share"]
        self.df = self.df.dropna(subset=required_columns)
        print(f"Rows after dropping NaNs: {len(self.df)}")
        for col in required_columns:
            self.df[col] = pd.to_numeric(self.df[col], errors='coerce')

    def normalize_data(self):
        normalized_columns = {
            'ROE': 'Normalized_ROE',
            'EPS': 'Normalized_EPS',
            'Gross_margin': 'Normalized_Gross_margin',
            'Revenue_per_share': 'Normalized_Revenue_per_share',
            'PB_Ratio': 'Normalized_PB_Ratio',
            'PE_Ratio': 'Normalized_PE_Ratio',
            'Operating_margin': 'Normalized_Operating_margin'
        }
        for col, norm_col in normalized_columns.items():
            scaler = MinMaxScaler()
            self.df[norm_col] = scaler.fit_transform(self.df[[col]])
            print(f"{col} normalized. First 5 values:")
            print(self.df[norm_col].head())

        print("Normalized data sample:")
        print(self.df[list(normalized_columns.values())].describe())

    def calculate_scores(self):
        def buffet_score(row):
            weights = {
                'Normalized_ROE': 0.2808,
                'Normalized_EPS': 0.3004,
                'Normalized_Gross_margin': 0.16,
                'Normalized_Revenue_per_share': 0.16,
                'Normalized_PB_Ratio': 0.0988
            }
            return (row['Normalized_ROE'] * weights['Normalized_ROE'] +
                    row['Normalized_EPS'] * weights['Normalized_EPS'] +
                    row['Normalized_Gross_margin'] * weights['Normalized_Gross_margin'] +
                    row['Normalized_Revenue_per_share'] * weights['Normalized_Revenue_per_share'] -
                    row['Normalized_PB_Ratio'] * weights['Normalized_PB_Ratio'])

        def graham_score(row):
            weights = {
                'Normalized_PE_Ratio': 0.4286,
                'Normalized_PB_Ratio': 0.4286,
                'Normalized_EPS': 0.1429
            }
            return (row['Normalized_PE_Ratio'] * weights['Normalized_PE_Ratio'] +
                    row['Normalized_PB_Ratio'] * weights['Normalized_PB_Ratio'] +
                    row['Normalized_EPS'] * weights['Normalized_EPS'])

        def o_shaughnessy_score(row):
            weights = {
                'Normalized_EPS': 0.637,
                'Normalized_PE_Ratio': 0.2583,
                'Normalized_ROE': 0.1047
            }
            return (row['Normalized_EPS'] * weights['Normalized_EPS'] +
                    row['Normalized_PE_Ratio'] * weights['Normalized_PE_Ratio'] +
                    row['Normalized_ROE'] * weights['Normalized_ROE'])

        def lynch_score(row):
            weights = {
                'Normalized_PE_Ratio': 0.5825,
                'Normalized_Revenue_per_share': 0.2362,
                'Normalized_Gross_margin': 0.0789,
                'Normalized_PB_Ratio': 0.1024
            }
            return (row['Normalized_PE_Ratio'] * weights['Normalized_PE_Ratio'] +
                    row['Normalized_Revenue_per_share'] * weights['Normalized_Revenue_per_share'] +
                    row['Normalized_Gross_margin'] * weights['Normalized_Gross_margin'] -
                    row['Normalized_PB_Ratio'] * weights['Normalized_PB_Ratio'])

        def murphy_score(row):
            weights = {
                'Normalized_ROE': 0.6132,
                'Normalized_Operating_margin': 0.5868
            }
            return (row['Normalized_ROE'] * weights['Normalized_ROE'] +
                    row['Normalized_Operating_margin'] * weights['Normalized_Operating_margin'])

        self.df['Buffet_Score'] = self.df.apply(buffet_score, axis=1)
        self.df['Graham_Score'] = self.df.apply(graham_score, axis=1)
        self.df['OShaughnessy_Score'] = self.df.apply(o_shaughnessy_score, axis=1)
        self.df['Lynch_Score'] = self.df.apply(lynch_score, axis=1)
        self.df['Murphy_Score'] = self.df.apply(murphy_score, axis=1)

    def save_results(self):
        high_risk = self.df[self.df['Beta'] > 1.2]
        medium_risk = self.df[(self.df['Beta'] >= 0.8) & (self.df['Beta'] <= 1.2)]
        low_risk = self.df[self.df['Beta'] < 0.8]

        high_risk.to_csv(self.high_risk_file, index=False)
        medium_risk.to_csv(self.medium_risk_file, index=False)
        low_risk.to_csv(self.low_risk_file, index=False)

    def process(self):
        self.load_data()
        self.preprocess_data()
        self.normalize_data()
        self.calculate_scores()
        self.save_results()
