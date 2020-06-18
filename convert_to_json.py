import pandas as pd

df = pd.read_csv (r'covid_data.csv')
df.to_json(r'covid-data.json')