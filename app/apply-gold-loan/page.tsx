"use client";

import Header from "@/components/layout/Header";
import StepProgress from "@/components/layout/StepProgress";
import ScreenContainer from "@/components/layout/ScreenContainer";
import QDE1PersonalDetails from "@/components/steps/QDE1PersonalDetails";
import QDE2BusinessDetails from "@/components/steps/QDE2BusinessDetails";
import { useJourneyStore } from "@/store/journey.store";
import QDE3BranchSelection from "@/components/steps/QDE3BranchSelection";
import QDE4BookAppointment from "@/components/steps/QDE4BookAppointment";



export default function ApplyGoldLoanPage() {
  const step = useJourneyStore((s) => s.step);
  const prevStep = useJourneyStore((s) => s.prevStep);

  //Dynamic header title 
  const getTitle = () => {
    switch (step) {
      case 1:
        return "Personal details";
      case 2:
        return "Business details";
      case 3:
        return "Branch selection";
      case 4: 
      return "Book appointment"
      default: 
      return ""
    }
  }

  return (
    <div className="">
      <Header title={getTitle()} onBack={step>1? prevStep:undefined} />

      <StepProgress currentStep={step} totalSteps={7} />

      <ScreenContainer>
        {step === 1 && <QDE1PersonalDetails />}
        {step === 2 && <QDE2BusinessDetails />}
        {step === 3 && <QDE3BranchSelection />} 
        {step === 4 && <QDE4BookAppointment />}

      </ScreenContainer>
    </div>
  );
}
