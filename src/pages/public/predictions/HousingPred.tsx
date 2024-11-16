import React, { useState } from 'react';

interface Result {
  predicted_house_worth: number;
  user_savings: number;
  percentage_of_goal: number;
  target_year: number;
  message: string;
  difference_needed: number;
}

const HousingPred: React.FC = () => {
  const [userSavings, setUserSavings] = useState<string>('');
  const [targetYear, setTargetYear] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      // Ensure user_savings and target_year are numbers before sending
      const savings = parseFloat(userSavings);
      const year = parseInt(targetYear);

      // Validate inputs
      if (isNaN(savings) || isNaN(year)) {
        setError('Please enter valid numbers for savings and target year.');
        return;
      }

      // Send POST request to Flask backend
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_savings: savings,
          target_year: year,
        }),
      });

      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      // Parse the JSON response from the backend
      const data: Result = await response.json();
      setResult(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("An error occurred while fetching the prediction.");
      setResult(null); // Clear the result if there's an error
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>House Worth Prediction</h2>

      {/* Input for user savings */}
      <div>
        <label htmlFor="savings">Enter your savings:</label>
        <input
          id="savings"
          type="number"
          value={userSavings}
          onChange={(e) => setUserSavings(e.target.value)}
          placeholder="Enter your savings"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
      </div>

      {/* Input for target year */}
      <div>
        <label htmlFor="year">Enter the target year:</label>
        <input
          id="year"
          type="number"
          value={targetYear}
          onChange={(e) => setTargetYear(e.target.value)}
          placeholder="Enter the target year"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Get Prediction
      </button>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Result */}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Prediction Results:</h3>
          <p><strong>Predicted House Worth:</strong> {result.predicted_house_worth.toLocaleString()} CAD</p>
          <p><strong>Your Savings:</strong> {result.user_savings.toLocaleString()} CAD</p>
          <p><strong>Percentage of Goal:</strong> {result.percentage_of_goal.toFixed(2)}%</p>
          <p>{result.message}</p>
          {result.difference_needed > 0 && (
            <p style={{ color: 'red' }}>
              <strong>Difference Needed:</strong> {result.difference_needed.toLocaleString()} CAD
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HousingPred;
