# Prediction API

Create and activate the ML virtual environment:

```bash
cd ml
python3 -m venv .venv
source .venv/bin/activate
pip install -r service/requirements.txt
```

Start the API from the same `ml` directory:

```bash
uvicorn service.main:app --reload
```

`POST /predict` accepts a JSON object containing the 117 numeric feature columns used by `price_model.joblib`, including the one-hot locality and home-type columns. The service validates the feature names and returns the predicted price in dollars:

```json
{ "prediction": 123456.78 }
```
