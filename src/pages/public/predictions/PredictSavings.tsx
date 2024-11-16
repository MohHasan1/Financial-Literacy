import { useState } from "react";
import useStore from "@/store/store";

const PredictSavings = () => {
  const [year, setYear] = useState<number | string>(""); // State for year input
  const [result, setResult] = useState<any>(null); // State to hold prediction result
  const [error, setError] = useState<string | null>(null); // State for error handling
  const nonEssentialExpenses = useStore((state) => state.nonEssentialExpenses);
  const fixedExpenses = useStore((state) => state.fixedExpenses);
  const monthIncome = useStore((state) => state.monthlyIncome);

  // Calculate savings
  const savings = monthIncome - (nonEssentialExpenses + fixedExpenses);

  // Function to handle prediction request
  const handlePrediction = async () => {
    // Validate year input
    if (year === "" || !Number(year)) {
      setError("Please provide a valid year.");
      return;
    }

    const parsedYear = parseInt(year.toString(), 10);
    const currentYear = new Date().getFullYear();

    if (parsedYear <= currentYear) {
      setError("Please provide a year in the future.");
      return;
    }

    if (savings <= 0) {
      setError("Your savings are not enough to make a prediction.");
      return;
    }

    try {
      // Send a POST request to the Flask API
      const response = await fetch("http://127.0.0.1:5000/predict_savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: parsedYear,
          principal: savings,
        }),
      });

      // Handle response
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setError(null);
      } else {
        setResult(null);
        setError(data.error || "An unknown error occurred.");
      }
    } catch (error) {
      setResult(null);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div>
      <h2>Predict Savings</h2>
      <p>Your savings: ${savings}</p>
      
      {/* Input for year */}
      <label>
        Enter the year for prediction:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
        />
      </label>
      
      <button onClick={handlePrediction}>Predict Savings</button>

      {/* Show the result */}
      {result && (
        <div>
          <h3>Prediction Result:</h3>
          <p>Year: {result.year}</p>
          <p>Current Year: {result.current_year}</p>
          <p>Predicted Interest Rate: {result.predicted_interest_rate}%</p>
          <p>Total Savings: ${result.total_amount}</p>
        </div>
      )}

      {/* Show error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PredictSavings;
