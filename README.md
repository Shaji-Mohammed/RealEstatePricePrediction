# Toronto Real Estate Price Prediction

A machine learning project for predicting Toronto residential property prices using property characteristics and location. The project explores data preprocessing, feature engineering, linear regression, gradient-descent regression, Random Forest, and XGBoost-based regression models.

## Overview

The dataset contains Toronto real estate listings with information such as:

- Property type
- Listing price
- Number of bedrooms and bathrooms
- Estimated area in square feet
- Latitude and longitude
- Neighbourhood

The project preprocesses the data and trains regression models to predict property prices.

## Dataset

The notebook uses:

```text
../data/toronto_real_estate_public_area.csv
```

The original dataset contains **9,704 records**. After cleaning and filtering, the primary regression dataset contains approximately **9,000 properties**.

### Features

The main features used include:

- `beds` — number of bedrooms
- `baths` — number of bathrooms
- `area` — estimated area in square feet
- `latitude`
- `longitude`
- `home_type`
- `locality` — normalized neighbourhood

Categorical variables are converted using one-hot encoding. The final Random Forest dataset contains **118 columns**, including the encoded categorical features.

## Model Comparison

| Model               |     R² |       RMSE |      MAE |
| ------------------- | -----: | ---------: | -------: |
| Linear Regression   | 0.8554 | $1,192,694 | $335,352 |
| SGD Regression      | 0.8555 | $1,141,272 |        — |
| Random Forest       | 0.9092 |   $470,465 | $217,304 |
| Tuned Random Forest | 0.9206 |   $453,091 | $203,043 |
| XGBoost             | 0.9172 |   $454,398 | $208,143 |
| Tuned XGBoost       | 0.9252 |   $435,752 | $199,401 |

Based on the evaluated metrics, the **tuned Random Forest** performs best among the models evaluated in the notebook.

## Data Preprocessing

The notebook performs several preprocessing steps:

1. Removes identifiers and fields not used for prediction.
2. Normalizes neighbourhood names into a `locality` feature.
3. Groups very low-frequency localities into an `other` category.
4. Renames:
   - `bedrooms` → `beds`
   - `bathrooms` → `baths`
   - `estimated_area_sqft` → `area`

5. Removes properties with implausibly small area-per-bedroom ratios.
6. Removes rows with missing bathrooms, bedrooms, area, or locality.
7. Removes townhouse properties for the regression experiments.
8. Removes properties priced above `$10,000,000`.
9. Applies one-hot encoding to property type and locality.
10. Uses the natural logarithm of price as the prediction target.

The log transformation is used as:

```python
price_log = np.log(price)
```

and predictions are converted back to dollar values using:

```python
np.exp(prediction)
```

## Models

### 1. Linear Regression

A standard `LinearRegression` model from scikit-learn is trained using an 80/20 train-test split.

**Results:**

| Metric         |     Result |
| -------------- | ---------: |
| R² (log price) |     0.8554 |
| RMSE           | $1,192,694 |
| MAE            |   $335,352 |

The model also includes an analysis of the observations with the largest prediction errors.

### 2. Gradient Descent Linear Regression

`SGDRegressor` is used as a gradient-descent-based linear regression approach. Numerical features are standardized using `StandardScaler`.

**Results:**

| Metric         |     Result |
| -------------- | ---------: |
| R² (log price) |     0.8555 |
| RMSE           | $1,141,272 |

The model uses a maximum of 20,000 iterations with an initial learning rate of `0.001`.

### 3. Random Forest

A `RandomForestRegressor` is trained on the cleaned dataset.

**Baseline results:**

| Metric         |   Result |
| -------------- | -------: |
| R² (log price) |   0.9092 |
| RMSE           | $470,465 |
| MAE            | $217,304 |

Random Forest substantially improves over the linear regression models on this dataset.

### 4. Tuned Random Forest

`RandomizedSearchCV` with 5-fold cross-validation is used to tune the Random Forest hyperparameters.

Best parameters found:

```text
n_estimators:      500
max_depth:         None
min_samples_split: 2
min_samples_leaf:  1
max_features:      log2
```

**Cross-validation R²:** `0.9272`

**Test R²:** `0.9206`

**Test RMSE:** `$453,091`

**Test MAE:** `$203,043`

The tuned Random Forest provides the strongest evaluated results in the notebook.

### 5. XGBoost

An `XGBRegressor` is also trained on the same feature set.

**Results:**

| Metric         |   Result |
| -------------- | -------: |
| R² (log price) |   0.9172 |
| RMSE           | $454,398 |
| MAE            | $208,143 |

## Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- Matplotlib
- Seaborn
- Jupyter Notebook

## Project Structure

```text
.
├── data/
│   └── toronto_real_estate_public_area.csv
├── notebooks/
│   └── LinearRegression.ipynb
├── requirements.txt
└── README.md
```

## Running the Project

Create and activate the virtual environment inside the `ml` folder:

```bash
cd ml
python3 -m venv .venv
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Then open the notebook:

```bash
jupyter notebook LinearRegression.ipynb
```

Make sure the Toronto real estate dataset is available at:

```text
../data/toronto_real_estate_public_area.csv
```

## Future Improvements

Potential improvements include:

- Feature engineering using geographic distance and spatial features
- More systematic handling of outliers
- Cross-validation across all models
- Additional hyperparameter tuning for XGBoost
- Error analysis by neighbourhood and property type
- Comparing predictions against a simple baseline model
- Building a reusable prediction pipeline
- Deploying the final model as an API
