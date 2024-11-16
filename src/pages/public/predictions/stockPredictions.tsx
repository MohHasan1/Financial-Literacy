import React, { useState } from "react";

const StockPredictions = () => {
  const [year, setYear] = useState<number | "">("");
  const [principal, setPrincipal] = useState<number | "">("");
  const [prediction, setPrediction] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = { year, principal };

    try {
      const response = await fetch("http://localhost:5003/predict_savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction(result);
      } else {
        setError(result.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Stock and Savings Predictions</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="Enter target year"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Principal (CAD):
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              placeholder="Enter principal amount"
              required
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {prediction && (
        <div>
          <h2>Prediction Results</h2>
          <p>Year: {prediction.year}</p>
          <p>Current Year: {prediction.current_year}</p>
          <p>Predicted Interest Rate: {prediction.predicted_interest_rate}%</p>
          <p>Principal: {prediction.principal} CAD</p>
          <p>Time: {prediction.time} years</p>
          <p>Total Amount: {prediction.total_amount} CAD</p>
          <p>Interest Earned: {prediction.interest_earned} CAD</p>
          <h3>LLM Response:</h3>
          <p>{prediction.llm_response}</p>
        </div>
      )}
    </div>
  );
};

export default StockPredictions;
