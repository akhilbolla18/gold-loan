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
    <div className="w-full px-4 py-3 gap-2  bg-stepBg border-b border-[#004B8D24] dark:border-[#00AEEF2E]">
      <p className="mb-2 text-sm font-medium font-secondary text-text leading-5">
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
