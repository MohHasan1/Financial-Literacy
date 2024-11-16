import { useState } from "react";

export const PredictionModel = () => {
  const [principal, setPrincipal] = useState(""); // Use proper casing for variable names
  const [year, setYear] = useState("");
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null); // Track prediction result
  const [error, setError] = useState<string | null>(null); // Error state handling

  const handlePrediction = async () => {
    if (!principal || !year) {
      setError("Please fill in all fields.");
      setPredictedPrice(null); // Reset prediction if there's an error
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer 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",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content:
              "You are a financial literacy bot. Be precise and concise. Give the suggestion based on user input. Using your own context tell how much the user would benefit if they invest the money in stocks and mutual funds. Tell the amount as well and percentage increase.",
          },
          {
            role: "user",
            content: `I want to invest this much: ${principal} and want to return in ${year}.`,
          },
        ],
      }),
    };

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", options);
      const data = await response.json();
      const prediction = data.choices[0]?.message?.content;

      if (prediction) {
        setPredictedPrice(prediction); // Set prediction if response is valid
        setError(null); // Reset any errors
      } else {
        setError("Unable to get a valid prediction.");
        setPredictedPrice(null);
      }
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch prediction. Please try again later.");
      setPredictedPrice(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center p-6">
      <h1 className="text-white text-3xl mb-6">Prediction</h1>

      <div className="w-full max-w-md">
        {/* Principal Input */}
        <input
          type="number"
          placeholder="Amount to invest"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        />

        {/* Year Input */}
        <input
          type="number"
          placeholder="Expected return year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        />

        {/* Submit Button */}
        <button
          onClick={handlePrediction}
          className="w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
        >
          Get Prediction
        </button>

        {/* Error or Prediction Display */}
        {error && (
          <p className="text-red-400 mt-4 w-full max-w-2xl text-left">
            {error}
          </p>
        )}

        {predictedPrice && (
          <p className="text-white mt-4 w-full max-w-2xl text-left">
            Predicted Price: {predictedPrice}
          </p>
        )}
      </div>
    </div>
  );
};
