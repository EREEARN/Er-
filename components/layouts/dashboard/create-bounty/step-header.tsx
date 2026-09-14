import { Check } from "lucide-react";
import { cn } from "cn";

type StepHeaderProps = {
    steps: string[];
    currentStep: number;
};

const StepHeader = ({ steps, currentStep }: StepHeaderProps) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
                {steps.map((step, index) => {
                    const isDone = index < currentStep;
                    const isCurrent = index === currentStep;
                    return (
                        <div key={step} className="flex items-center gap-2">
                            <span
                                className={cn(
                                    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                                    (isDone || isCurrent) && "bg-app-primary text-white",
                                    !isDone && !isCurrent && "bg-gray-100 text-app-grey-light"
                                )}
                            >
                                {isDone ? <Check className="size-3.5" /> : index + 1}
                            </span>
                            <span
                                className={cn(
                                    "text-sm",
                                    isDone || isCurrent ? "font-medium text-app-dark-purple" : "text-app-grey-light"
                                )}
                            >
                                {step}
                            </span>
                            {index < steps.length - 1 && <span className="mx-1 h-px w-6 bg-gray-200" />}
                        </div>
                    );
                })}
            </div>
            <span className="text-xs text-app-grey-light">
                Step {currentStep + 1} of {steps.length}
            </span>
        </div>
    );
};

export default StepHeader;
