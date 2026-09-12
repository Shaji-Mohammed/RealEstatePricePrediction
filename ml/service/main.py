from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from pydantic import RootModel


MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "price_model.joblib"


class PredictionRequest(RootModel[dict[str, float]]):
    pass


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = joblib.load(MODEL_PATH)
    app.state.feature_columns = [str(column) for column in app.state.model.feature_names_in_]
    yield


app = FastAPI(title="Real Estate Price Prediction API", lifespan=lifespan)


@app.post("/predict")
def predict(payload: PredictionRequest, request: Request) -> dict[str, float]:
    model: Any = request.app.state.model
    feature_columns: list[str] = request.app.state.feature_columns
    features = payload.root

    missing = [column for column in feature_columns if column not in features]
    extra = [column for column in features if column not in feature_columns]
    if missing or extra:
        raise HTTPException(
            status_code=422,
            detail={"missing_features": missing, "unexpected_features": extra},
        )

    ordered_features = pd.DataFrame(
        [[features[column] for column in feature_columns]],
        columns=feature_columns,
    )
    log_prediction = float(model.predict(ordered_features)[0])
    prediction = float(np.exp(log_prediction))
    return {"prediction": prediction}