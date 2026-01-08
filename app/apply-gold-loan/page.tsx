"use client";

import Header from "@/components/layout/Header";
import StepProgress from "@/components/layout/StepProgress";
import ScreenContainer from "@/components/layout/ScreenContainer";
import QDE1PersonalDetails from "@/components/steps/QDE1PersonalDetails";
import { useJourneyStore } from "@/store/journey.store";

export default function ApplyGoldLoanPage() {
  const step = useJourneyStore((s) => s.step);

  return (
    <div>
      <Header title="Personal details" />

      <StepProgress currentStep={step} totalSteps={7} />

      <ScreenContainer>
        <QDE1PersonalDetails />
      </ScreenContainer>
    </div>
  );
}
