type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepProgress({
  currentStep,
  totalSteps,
}: StepProgressProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div
      className="
        px-4 py-3
        bg-stepBg
        border-b border-[var(--step-border,transparent)]
      "
    >
      {/* Step Text */}
      <p
        className="
          mb-2
          font-secondary font-medium
          text-sm
          text-stepText
        "
      >
        Step {currentStep}/{totalSteps}
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded bg-stepBg">
        <div
          className="h-2 rounded bg-stepFill transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
