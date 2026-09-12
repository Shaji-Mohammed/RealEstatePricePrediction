# Real Estate Backend

Spring Boot 3 Maven project using Java 25 with Spring Web and Spring WebFlux.

Run it from this directory with:

```bash
mvn spring-boot:run
```

Build it with:

```bash
mvn clean package
```

## Prediction endpoint

The backend exposes `POST /api/predict` and forwards the request to the local
FastAPI service at `http://localhost:8000/predict`.

The JSON body is flat and must use the model's numeric feature names:

- `latitude`
- `longitude`
- `beds`
- `baths`
- `area`
- one-hot locality columns
- one-hot home-type columns (`CONDO`, `DUPLEX_TRIPLEX_FOURPLEX`, and `HOUSE`)

The response has this shape:

```json
{ "prediction": 123456.78 }
```

Requests from `http://localhost:3000` are allowed by CORS. If the FastAPI
service cannot be reached, the backend returns `503`; an error response from
the FastAPI service is returned as `502`.
