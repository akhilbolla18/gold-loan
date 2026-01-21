"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  getDay,
  startOfWeek,
} from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { qde4Schema, QDE4FormData } from "@/schemas/qde4.schema";
import { useJourneyStore } from "@/store/journey.store";

/* MOCK DATA – API will replace later */
const HOLIDAYS = [5, 12, 19];
const BOOKED = [10, 24, 25, 27, 31];
const TIME_SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];

export default function QDE4BookAppointment() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const setQDE4 = useJourneyStore((s) => s.setQDE4);
  const stored = useJourneyStore((s) => s.qde4);

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    stored?.appointmentDate ? new Date(stored.appointmentDate) : null
  );

  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QDE4FormData>({
    resolver: zodResolver(qde4Schema),
    defaultValues: stored,
  });

  /* Close calendar on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  
  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  // Calculate offset for first day of month
  const firstDayOfMonth = getDay(monthStart);

  const onSubmit = (data: QDE4FormData) => {
    setQDE4(data);
    nextStep();
  };

  const today = new Date();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* DATE INPUT */}
      <div className="relative" ref={popoverRef}>
        <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
          SELECT DATE
        </label>

        <div
          onClick={() => setIsOpen(true)}
          className="
            w-full h-input px-3 rounded-md mt-2
            text-inputText
            font-primary font-normal text-sm 
            border border-border
            flex items-center justify-between
            cursor-pointer bg-bg
          "
        >
          <span className="font-primary font-normal text-sm text-inputText leading-[1.4] tracking-normal">
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
          </span>

          <Image src="/icons/calendar.svg" alt="Calendar" width={18} height={18} />
        </div>

        {/* CALENDAR POPOVER */}
        {isOpen && (
          <div
            className="
              absolute z-50 mt-2 w-full
              bg-bg border border-border
              rounded-lg shadow-lg p-4
            "
          >
            {/* MONTH HEADER */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="text-2xl text-text hover:text-primary"
              >
                ‹
              </button>

              <div className="font-lato font-medium text-base text-text">
                {format(currentMonth, "MMM  yyyy")}
              </div>

              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="text-2xl text-text hover:text-primary"
              >
                ›
              </button>
            </div>

            {/* WEEK DAYS */}
            <div className="grid grid-cols-7 mb-3">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <div
                  key={d}
                  className="
                    text-center
                    font-lato font-medium
                    text-[9.3px] leading-[9.3px]
                    tracking-[0.03em]
                    uppercase
                    text-placeholder
                  "
                >
                  {d}
                </div>
              ))}
            </div>

            {/* DAYS GRID */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8 w-8" />
              ))}

              {days.map((day) => {
                const dateISO = format(day, "yyyy-MM-dd");
                const dayNum = day.getDate();

                const isHoliday = HOLIDAYS.includes(dayNum);
                const isBooked = BOOKED.includes(dayNum);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isToday = isSameDay(day, today);

                return (
                  <button
                    key={dateISO}
                    type="button"
                    disabled={isHoliday || isBooked}
                    onClick={() => {
                      setSelectedDate(day);
                      setValue("appointmentDate", dateISO);
                      setIsOpen(false);
                    }}
                    className={`
                      h-8 w-8 rounded-full
                      flex items-center justify-center
                      font-lato
                      text-[13.95px] leading-[17.05px]
                      text-center
                      transition-colors
                      ${
                        isSelected
                          ? "bg-primary text-white font-bold"
                          : isToday
                          ? "bg-[#1294F21F] text-[#1294F2] font-bold"
                          : isHoliday
                          ? "text-placeholder font-medium cursor-not-allowed"
                          : isBooked
                          ? "text-[#BE161D] font-bold line-through cursor-not-allowed"
                          : "text-text font-medium hover:bg-stepBg"
                      }
                    `}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* LEGEND */}
            <div className="flex gap-4 text-xs mt-4 font-lato">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-text">Selected</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-black rounded-full" />
                <span className="text-text">Available</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-placeholder rounded-full" />
                <span className="text-text">Holiday</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#BE161D] rounded-full" />
                <span className="text-text">Booked</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* TIME SLOTS */}
      <div className="flex gap-3">
        {/* FROM TIME */}
        <div className="flex-1">
          <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
            FROM
          </label>
          <div className="relative mt-2">
            <select
              {...register("fromTime")}
              className="
                h-input w-full px-3 pr-10
                rounded-md
                bg-bg text-inputText
                font-primary font-normal text-sm 
                border border-border
                leading-[1.4] tracking-normal
                outline-none
                focus:ring-1 focus:ring-primary
                appearance-none
                [&>option]:bg-bg
                [&>option]:text-inputText
              "
            >
              <option value="">10:00 AM</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Image
              src="/icons/clock.svg"
              alt="Clock"
              width={18}
              height={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          {errors.fromTime && (
            <p className="text-xs text-red-500 mt-1 font-primary">{errors.fromTime.message}</p>
          )}
        </div>

        {/* TO TIME */}
        <div className="flex-1">
          <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
            TO
          </label>
          <div className="relative mt-2">
            <select
              {...register("toTime")}
              className="
                h-input w-full px-3 pr-10
                rounded-md
                bg-bg text-inputText
                font-primary font-normal text-sm 
                border border-border
                leading-[1.4] tracking-normal
                outline-none
                focus:ring-1 focus:ring-primary
                appearance-none
                [&>option]:bg-bg
                [&>option]:text-inputText
              "
            >
              <option value="">11:30 AM</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Image
              src="/icons/clock.svg"
              alt="Clock"
              width={18}
              height={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          {errors.toTime && (
            <p className="text-xs text-red-500 mt-1 font-primary">{errors.toTime.message}</p>
          )}
        </div>
      </div>

      {/* SAVE */}
      <button type="submit" className="h-button bg-primary text-primaryText rounded font-medium">
        Save & Continue
      </button>
    </form>
  );
}
