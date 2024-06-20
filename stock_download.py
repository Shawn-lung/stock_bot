import yfinance as yf
from concurrent.futures import ThreadPoolExecutor
import os
import numpy as np
import json

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
        rtnList = [stock_code, trailingEps, beta, forwardPE, returnOnEquity, returnOnAssets, grossMargin, operatingMargin, peRatio, pbRatio, revenuePerShare]
        print(rtnList)
        return rtnList

    def download_data(self):
        with ThreadPoolExecutor() as executor:
            results = list(executor.map(self._fetch_stock_data, self.stock_codes))

        data = []
        for result in results:
            data.append({
                "stock_code": result[0],
                "EPS": result[1],
                "Beta": result[2],
                "PE_Ratio": result[3],
                "ROE": result[4],
                "ROA": result[5],
                "Gross_margin": result[6],
                "Operating_margin": result[7],
                "PE_Ratio": result[8],
                "PB_Ratio": result[9],
                "Revenue_per_share": result[10]
            })

        with open(self.output_file, 'w') as json_file:
            json.dump(data, json_file, indent=4)

    def process(self):
        self.download_data()
