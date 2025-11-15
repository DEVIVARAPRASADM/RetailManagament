import json
import pandas as pd
from prophet import Prophet
from pymongo import MongoClient

# 1. Connect to MongoDB
def load_data():
    client = MongoClient(
        "mongodb+srv://mdevivaraprasad:mdvp88975@cluster0.lvsgybg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )

    db = client["retail_db"]     
    sales_col = db["sales"]      

    cursor = sales_col.find({}, {"saleDate": 1, "totalAmount": 1, "_id": 0})
    sales = list(cursor)

    if not sales:
        raise Exception("No sales data found!")

    df = pd.DataFrame(sales)

    df["ds"] = pd.to_datetime(df["saleDate"])
    df["y"] = df["totalAmount"]

    # Aggregate by day
    df = df.groupby(df["ds"].dt.date)["y"].sum().reset_index()
    df["ds"] = pd.to_datetime(df["ds"])

    return df

def generate_forecast():
    df = load_data()

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=10)
    forecast = model.predict(future)

    # Last 14 predictions
    result = forecast.tail(14)[["ds", "yhat"]]

    # Output JSON to Node.js
    print(result.to_json(orient="records"))


generate_forecast()
