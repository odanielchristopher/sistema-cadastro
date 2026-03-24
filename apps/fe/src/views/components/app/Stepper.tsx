import React from 'react';

import { StepperContext, StepperProvider } from '@app/contexts/StepperContext';
import { useStepper } from '@app/hooks/useStepper';
import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
  hasHeader?: boolean;
}

export function Stepper({
  steps,
  hasHeader = true,
  initialStep,
  className,
}: IStepperProps) {
  return (
    <StepperProvider steps={steps} initialStep={initialStep}>
      <StepperContext.Consumer>
        {({ currentStep }) => (
          <div className={cn('w-full', className)}>
            {hasHeader && (
              <header className="relative mb-6 flex items-center justify-between">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div
                      key={step.label}
                      className="relative flex flex-1 flex-col items-center"
                    >
                      {/* Linha de conexão */}
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            'absolute left-1/2 top-1/3 h-0.5 w-full',
                            isCompleted ? 'bg-primary' : 'bg-muted',
                          )}
                        />
                      )}

                      {/* Círculo do passo */}
                      <span
                        className={cn(
                          'z-10 flex size-10 items-center justify-center rounded-full border font-semibold',
                          isActive && 'bg-primary border-primary text-white',
                          isCompleted && 'bg-primary border-primary text-white',
                          !isActive && !isCompleted && 'bg-card border',
                        )}
                      >
                        {index + 1}
                      </span>

                      {/* Label */}
                      <span className="mt-2 text-sm">{step.label}</span>
                    </div>
                  );
                })}
              </header>
            )}

            <div key={currentStep}>{steps[currentStep].content}</div>
          </div>
        )}
      </StepperContext.Consumer>
    </StepperProvider>
  );
}

export function StepperPreviousButton({
  size = 'default',
  type = 'button',
  onClick,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();

  return (
    <Button
      type={type}
      size={size}
      variant="secondary"
      onClick={onClick ?? previousStep}
      className={cn('rounded-md', className)}
      {...props}
    >
      Voltar
    </Button>
  );
}

export function StepperNextButton({
  size = 'default',
  type = 'button',
  preventDefault = false,
  className,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
  preventDefault?: boolean;
}) {
  const { nextStep } = useStepper();

  const nextStepHandler = !preventDefault ? nextStep : undefined;

  return (
    <Button
      type={type}
      size={size}
      onClick={onClick ?? nextStepHandler}
      className={cn('rounded-md', className)}
      {...props}
    >
      Próximo
    </Button>
  );
}
