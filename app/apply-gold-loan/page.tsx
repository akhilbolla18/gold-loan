"use client";

import Header from "@/components/layout/Header";
import StepProgress from "@/components/layout/StepProgress";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { useJourneyStore } from "@/store/journey.store";

export default function ApplyGoldLoanPage() {
  const step = useJourneyStore((s) => s.step);

  return (
    <div>
      <Header title="Personal details" />

      <StepProgress currentStep={step} totalSteps={7} />

      {/* CONTENT AREA (328px aligned) */}
      <ScreenContainer> 
        <p className="text-text text-sm bg-yellow-200 dark:bg-yellow-600 dark:text-white px-2 py-1">
  Step content goes here
</p>

      </ScreenContainer>
    </div>
  );
}
