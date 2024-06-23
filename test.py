import pandas as pd
import numpy as np
import yfinance as yf


df = yf.Ticker('2330.TW')
print(df.info)
print(np.round(np.array(1.32),0))
