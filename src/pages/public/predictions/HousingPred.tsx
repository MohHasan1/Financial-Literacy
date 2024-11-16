import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const savings = parseFloat(userSavings);
      const year = parseInt(targetYear);

      if (isNaN(savings) || isNaN(year)) {
        setError('Please enter valid numbers for savings and target year.');
        return;
      }

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

      if (!response.ok) throw new Error('Failed to fetch prediction');

      const data: Result = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("An error occurred while fetching the prediction.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 space-y-8">
      <motion.h2 
        className="text-3xl font-bold text-center text-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        House Worth Prediction
      </motion.h2>

      <Card className="bg-[#1a2234] border-0 p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Your Savings</label>
            <Input
              type="number"
              value={userSavings}
              onChange={(e) => setUserSavings(e.target.value)}
              placeholder="Enter your savings"
              className="bg-[#2a3447] border-blue-500/30 focus:border-blue-500 text-white h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Target Year</label>
            <Input
              type="number"
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
              placeholder="Enter target year"
              className="bg-[#2a3447] border-blue-500/30 focus:border-blue-500 text-white h-12"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⟳
                </motion.div>
              ) : (
                "Calculate Prediction"
              )}
            </Button>
          </motion.div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-blue-400">Prediction Results</h3>
            
            <div className="bg-[#2a3447] p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Predicted House Worth</p>
                  <p className="text-2xl font-bold text-white">
                    ${result.predicted_house_worth.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Your Savings</p>
                  <p className="text-2xl font-bold text-blue-400">
                    ${result.user_savings.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Goal Progress</span>
                    <span className="text-lg font-semibold text-green-400">
                      {result.percentage_of_goal.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(result.percentage_of_goal, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                <p className="text-gray-300">{result.message}</p>
                {result.difference_needed > 0 && (
                  <p className="mt-2 text-red-400">
                    Additional savings needed: ${result.difference_needed.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default HousingPred;