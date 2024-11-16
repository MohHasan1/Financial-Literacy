import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FixedIncome from "./FixedExpense";
import MonthlyIncome from "./MonthlyIncome";
import UserInfoIntro from "./UserInfoIntro";
import NonEssentialExp from "./NonEssentialExp";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-gradient-to-br from-background via-muted to-background">
      <div className="flex flex-col">
        {/* Progress Bar */}
        <div className="mb-6 flex justify-between px-2">
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              initial={false}
              animate={{
                scale: currentStep >= step ? 1 : 0.9,
                opacity: currentStep >= step ? 1 : 0.5,
              }}
              className={`flex h-2 w-[100px] rounded-full ${
                currentStep >= step ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="size-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <UserInfoIntro />}
              {currentStep === 2 && <MonthlyIncome />}
              {currentStep === 3 && <FixedIncome />}
              {currentStep === 4 && <NonEssentialExp />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            {currentStep === totalSteps ? "Finish" : "Next"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;



