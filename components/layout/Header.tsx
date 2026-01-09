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
        relative
        w-full h-14
        flex items-center justify-center
        bg-headerBg
      "
    >
      {onBack && <button
        onClick={onBack}
        className="absolute left-4 flex items-center justify-center"
        aria-label="Back"
      >
        <Image
          src="/icons/back-arrow.svg"
          alt="Back"
          width={24}
          height={24}
        />
      </button>
      }

      <h1
        className="
          font-primary font-medium
          text-[18px]
          text-headerText
          leading-none
          tracking-normal
        "
      >
        {title}
      </h1>
    </header>
  );
}
