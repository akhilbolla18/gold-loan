type GoldPuritySliderProps = {
    value: number;
    onChange: (value: number) => void;
};

export default function GoldPuritySlider({
    value,
    onChange,
}: GoldPuritySliderProps) {
    return (
        <div
            className="
        p-4 rounded-lg
        bg-[var(--gold-card-bg)]
        border border-[var(--gold-card-border)]
        flex flex-col gap-3
      "
        >
            <div className="flex justify-between items-center">
                <span className="font-medium text-text">Gold purity</span>
                <span className="text-primary font-medium">{value} Carat</span>
            </div>

            <input
                type="range"
                min={10}
                max={24}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
