type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepProgress({
  currentStep,
  totalSteps,
}: StepProgressProps) {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-4 py-3 bg-stepBg">
      <p className="mb-2 text-sm font-medium text-text">
        Step {currentStep}/{totalSteps}
      </p>

      <div className="w-full h-2 rounded bg-stepBg">
        <div
          className="h-2 rounded bg-stepFill transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
