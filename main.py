import os
from stock_download import StockDownloader
from score import StockScorer

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    stock_list_file = os.path.join(current_dir, "tw_stock_codes.txt")
    input_file = os.path.join(current_dir, "taiex_mid100_stock_data.csv")
    high_risk_file = os.path.join(current_dir, "high_risk_stock_data.csv")
    medium_risk_file = os.path.join(current_dir, "medium_risk_stock_data.csv")
    low_risk_file = os.path.join(current_dir, "low_risk_stock_data.csv")

    downloader = StockDownloader(stock_list_file, input_file)
    downloader.process()

    scorer = StockScorer(input_file, high_risk_file, medium_risk_file, low_risk_file)
    scorer.process()

if __name__ == "__main__":
    main()
