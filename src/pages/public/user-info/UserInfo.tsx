import { useState } from "react";
import FixedIncome from "./FixedExpense";
import MonthlyIncome from "./MonthlyIncome";
import UserInfoIntro from "./UserInfoIntro";
import NonEssentialExp from "./NonEssentialExp";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // Step tracker
  const totalSteps = 4; // Number of steps/pages

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-muted">
      <div className="flex flex-col">
        <div className="size-[500px]">
          {currentStep === 1 && <UserInfoIntro />}
          {currentStep === 2 && <MonthlyIncome />}
          {currentStep === 3 && <FixedIncome />}
          {currentStep === 4 && <NonEssentialExp />}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={nextStep}
            disabled={currentStep === totalSteps} // Disable if on the last step
          >
            {currentStep === totalSteps ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
