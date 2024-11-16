import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PredictSavings = () => {
  const [year, setYear] = useState<number | string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const nonEssentialExpenses = useStore((state) => state.nonEssentialExpenses);
  const fixedExpenses = useStore((state) => state.fixedExpenses);
  const monthIncome = useStore((state) => state.monthlyIncome);

  const savings = monthIncome - (nonEssentialExpenses + fixedExpenses);

  const handlePrediction = async () => {
    setIsLoading(true);
    setError(null);

    // Validation
    if (year === "" || !Number(year)) {
      setError("Please provide a valid year.");
      setIsLoading(false);
      return;
    }

    const parsedYear = parseInt(year.toString(), 10);
    const currentYear = new Date().getFullYear();

    if (parsedYear <= currentYear) {
      setError("Please provide a year in the future.");
      setIsLoading(false);
      return;
    }

    if (savings <= 0) {
      setError("Your savings are not enough to make a prediction.");
      setIsLoading(false);
      return;
    }

    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  // Generate chart data if result exists
  const chartData = result ? [
    { year: new Date().getFullYear(), amount: savings },
    { year: result.year, amount: result.total_amount }
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="bg-[#1a2234] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Predict Your Future Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Savings Display */}
          <motion.div
            className="bg-[#2a3447] p-6 rounded-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-lg text-gray-300 mb-2">Current Monthly Savings</h3>
            <p className="text-3xl font-bold text-blue-400">${savings.toFixed(2)}</p>
          </motion.div>

          {/* Year Input Section */}
          <div className="space-y-4">
            <label className="block text-sm text-gray-300">
              Enter the year for prediction
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2030"
                className="mt-1 bg-[#2a3447] border-blue-500/50 focus:border-blue-400 text-white"
              />
            </label>

            <Button
              onClick={handlePrediction}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
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
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-center p-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#2a3447] p-6 rounded-lg space-y-4">
                  <h3 className="text-xl font-semibold text-blue-400">Prediction Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Target Year</p>
                      <p className="text-xl font-semibold">{result.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Interest Rate</p>
                      <p className="text-xl font-semibold">{result.predicted_interest_rate}%</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400">Projected Savings</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${result.total_amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-[300px] bg-[#2a3447] p-6 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#60A5FA" 
                        strokeWidth={2}
                        dot={{ fill: '#60A5FA' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictSavings;