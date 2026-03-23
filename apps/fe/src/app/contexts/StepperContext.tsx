import React, { createContext, useCallback, useState } from 'react';

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
  changeStep: (index: number) => void;
  currentStep: number;
  direction: number;
}

export const StepperContext = createContext({} as IStepperContextValue);

export function StepperProvider({
  children,
  steps,
  initialStep,
}: {
  children: React.ReactNode;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
  initialStep?: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextStep = useCallback(() => {
    setDirection(1);
    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps]);

  const previousStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  const changeStep = useCallback(
    (index: number) => {
      setCurrentStep((prevStep) => {
        const newStep = index < 0 ? prevStep + index : index;
        return Math.max(0, Math.min(newStep, steps.length - 1));
      });
    },
    [steps.length],
  );

  return (
    <StepperContext.Provider
      value={{ nextStep, previousStep, changeStep, currentStep, direction }}
    >
      {children}
    </StepperContext.Provider>
  );
}
