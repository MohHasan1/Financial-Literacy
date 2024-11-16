import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PredictSavings = () => {
  const [year, setYear] = useState<number | string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Hard-coded principal for demo - you can modify this as needed
  const principal = 10000;

  const handlePrediction = async () => {
    setError(null);

    if (year === "" || !Number(year)) {
      setError("Please provide a valid year.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: parseInt(year.toString(), 10),
          principal: principal,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setError(null);
      } else {
        setError(data.error || "An unknown error occurred.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h2 className="text-2xl text-center text-blue-400 font-semibold">
        Predict Your Future Savings
      </h2>

      {/* Current Savings Card */}
      <div className="bg-[#1a2234] p-6 rounded-lg">
        <p className="text-gray-400">Current Monthly Savings</p>
        <p className="text-3xl font-bold text-blue-400">${principal.toFixed(2)}</p>
      </div>

      {/* Input Section */}
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Enter the year for prediction</p>
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full bg-[#1a2234] border-0 text-white h-12"
          placeholder="e.g., 2030"
        />
      </div>

      {/* Calculate Button */}
      <Button
        onClick={handlePrediction}
        className="w-full bg-blue-500 hover:bg-blue-600 h-12"
      >
        Calculate Prediction
      </Button>

      {/* Results Section */}
      {result && (
        <div className="bg-[#1a2234] p-6 rounded-lg space-y-4">
          <h3 className="text-blue-400 text-xl mb-4">Prediction Results</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400">Target Year</p>
              <p className="text-white text-xl">{result.year}</p>
            </div>
            <div>
              <p className="text-gray-400">Interest Rate</p>
              <p className="text-white text-xl">{result.predicted_interest_rate}%</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-400">Projected Savings</p>
            <p className="text-green-400 text-2xl font-bold">
              ${result.total_amount.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center">{error}</p>
      )}
    </div>
  );
};

export default PredictSavings;