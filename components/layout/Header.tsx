"use client";

import Image from "next/image";

type HeaderProps = {
  title: string;
  onBack?: () => void;
};

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <header
      className="
        h-14 px-4
        flex items-center gap-3
        bg-headerBg
      "
    >
      {/* Back Arrow */}
      {onBack && (
        <button onClick={onBack}>
          <Image
            src="/icons/back-arrow.svg"
            alt="Back"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* Title */}
      <h1
        className="
          text-headerText
          font-primary font-medium
          text-[18px]
        "
      >
        {title}
      </h1>
    </header>
  );
}
