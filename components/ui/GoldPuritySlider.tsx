"use client";

import styles from "../../styles/GoldPuritySlider.module.css";
import clsx from "clsx";


type GoldPuritySliderProps = {
    value: number;
    onChange: (value: number) => void;
    loanAmount?: string;
    onLoanAmountChange?: (amount: string) => void;
    loanAmountError?: string;
};

export default function GoldPuritySlider({
    value,
    onChange,
    loanAmount,
    onLoanAmountChange,
    loanAmountError,
}: GoldPuritySliderProps) {
    const fillPercentage = ((value - 10) / (24 - 10)) * 100;

    return (
        <div className="w-full p-4 rounded-lg bg-white border border-[#CCD3DD] flex flex-col gap-2.5">
            {/* Slider Section */}
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#334F76] leading-none">
                        Gold purity
                    </span>
                    <span className="text-sm font-medium text-[#00AEEF] leading-none">
                        {value} Carat
                    </span>
                </div>

                {/* Slider */}
                <div className="relative w-full">
                    <input
                        type="range"
                        min={10}
                        max={24}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={styles.sliderInput}
                        style={{
                            background: `linear-gradient(to right, #234A8D 0%, #234A8D ${fillPercentage}%, #F1F5F9 ${fillPercentage}%, #F1F5F9 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#CCDBE8]" />

            {/* Loan Amount Section */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-normal text-[#334F76] leading-[138%] uppercase">
                    LOAN AMOUNT *
                </label>
                <input
                    type="text"
                    placeholder="Enter Loan amount"
                    value={loanAmount}
                    onChange={(e) => onLoanAmountChange?.(e.target.value)}
                    className={clsx(
                                `
                                h-input w-full px-3
                                rounded-md
                                bg-bg
                                text-inputText
                                font-primary font-normal text-sm 
                                border border-border
                                leading-[1.4] tracking-normal
                                placeholder:text-placeholder
                                outline-none
                                focus:ring-1 focus:ring-primary
                                `,
                                loanAmountError && "border-red-500",

                              )}
                />
                {loanAmountError && (
                    <span className="text-xs text-red-500">{loanAmountError}</span>
                )}
            </div>
        </div>
    );
}