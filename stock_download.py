import yfinance as yf
from concurrent.futures import ThreadPoolExecutor
import os
import numpy as np
import csv

class StockDownloader:
    def __init__(self, stock_list_file, output_file):
        self.stock_list_file = stock_list_file
        self.output_file = output_file
        self.stock_codes = self._load_stock_codes()

    def _load_stock_codes(self):
        with open(self.stock_list_file, 'r') as file:
            lines = file.read().splitlines()
        return [line + ".TW" for line in lines]

    def _fetch_stock_data(self, stock_code):
        try:
            stock = yf.Ticker(stock_code)
            stock_info = stock.info
            trailingEps = stock_info.get('trailingEps', np.nan)
            beta = stock_info.get('beta', np.nan)
            forwardPE = stock_info.get('forwardPE', np.nan)
            returnOnEquity = stock_info.get('returnOnEquity', np.nan)
            returnOnAssets = stock_info.get('returnOnAssets', np.nan)
            grossMargin = stock_info.get('grossMargins', np.nan)
            operatingMargin = stock_info.get('operatingMargins', np.nan)
            peRatio = stock_info.get('trailingPE', np.nan)
            pbRatio = stock_info.get('priceToBook', np.nan)
            revenuePerShare = stock_info.get('revenuePerShare', np.nan)
            return [stock_code, trailingEps, beta, forwardPE, returnOnEquity, returnOnAssets, grossMargin, operatingMargin, peRatio, pbRatio, revenuePerShare]
        except Exception as e:
            print(f"Error fetching data for {stock_code}: {e}")
            return [stock_code, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan]

    def download_data(self):
        with ThreadPoolExecutor() as executor:
            results = list(executor.map(self._fetch_stock_data, self.stock_codes))

        header = ["stock_code", "EPS", "Beta", "PE_Ratio", "ROE", "ROA", "Gross_margin", "Operating_margin", "Trailing_PE_Ratio", "PB_Ratio", "Revenue_per_share"]
        
        with open(self.output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(header)
            writer.writerows(results)

    def process(self):
        self.download_data()
