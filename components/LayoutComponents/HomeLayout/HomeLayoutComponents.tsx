import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "../../common/CommonComponents";
import {
  DONATION_PRESET_AMOUNTS,
  MAX_DONATION_AMOUNT,
  MIN_DONATION_AMOUNT,
} from "../../../utils/donationConstants";

export const StatCard = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-200 bg-brand-50">
        <Icon icon={icon} color="#8b3479" width="28" height="28" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-900 font-poppins">
          {title}
        </span>
        <span className="text-sm leading-5 text-gray-600 font-poppins">
          {text}
        </span>
      </div>
    </div>
  );
};

export const HelpCard = ({
  title,
  text,
  icon,
  buttonText,
  link,
}: {
  title: string;
  text: string;
  icon: string;
  buttonText: string;
  link: string;
}) => {
  return (
    <div className="flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200/60 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100">
        <Icon icon={icon} color="#8b3479" width="34" height="34" />
      </div>
      <span className="mt-5 text-xl font-semibold text-gray-900 font-poppins">
        {title}
      </span>
      <p className="mt-2 grow text-sm leading-6 text-gray-600 font-poppins">
        {text}
      </p>
      <Button text={buttonText} link={link} variant="outline" />
    </div>
  );
};

export const DonationTeaserCard = () => {
  const router = useRouter();
  const [donationType, setDonationType] = useState<"monthly" | "one_off">(
    "monthly"
  );
  const [amount, setAmount] = useState<number | "">(10);

  const continueToDonate = () => {
    const validAmount =
      typeof amount === "number" &&
      Number.isInteger(amount) &&
      amount >= MIN_DONATION_AMOUNT &&
      amount <= MAX_DONATION_AMOUNT
        ? amount
        : 10;
    router.push({
      pathname: "/donate",
      query: { type: donationType, amount: validAmount },
    });
  };

  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-brand/10 sm:p-8">
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            value: "monthly" as const,
            label: "Monthly Support",
            icon: "ant-design:heart-outlined",
          },
          {
            value: "one_off" as const,
            label: "One-off Donation",
            icon: "akar-icons:gift",
          },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setDonationType(option.value)}
            className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition font-poppins ${
              donationType === option.value
                ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                : "border-gray-200 bg-white text-gray-700 hover:border-brand"
            }`}
          >
            <Icon
              icon={option.icon}
              color={donationType === option.value ? "#ffffff" : "#8b3479"}
              width="18"
            />
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-sm font-medium text-gray-800 font-poppins">
        Choose an amount
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {DONATION_PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset)}
            className={`rounded-xl border px-2 py-3 text-base font-semibold transition font-poppins ${
              amount === preset
                ? "border-brand bg-brand text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-brand"
            }`}
          >
            &pound;{preset}
          </button>
        ))}
      </div>

      <label
        className="mt-5 block text-sm font-medium text-gray-800 font-poppins"
        htmlFor="home-custom-amount"
      >
        Custom amount
      </label>
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-poppins">
          &pound;
        </span>
        <input
          id="home-custom-amount"
          type="number"
          min={MIN_DONATION_AMOUNT}
          max={MAX_DONATION_AMOUNT}
          step={1}
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="h-12 w-full rounded-xl border border-gray-200 pl-9 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-poppins"
        />
      </div>

      <p className="mt-4 rounded-xl bg-brand-50 p-3 text-xs leading-5 text-gray-600 font-poppins">
        <span className="font-semibold text-brand">Gift Aid:</span> eligible UK
        taxpayers can add Gift Aid on the next step, letting us reclaim 25p for
        every &pound;1 donated at no extra cost to you.
      </p>

      <button
        type="button"
        onClick={continueToDonate}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-sm font-medium text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark font-poppins"
      >
        Continue to Secure Donation
        <Icon icon="akar-icons:lock-on" color="white" width="16" />
      </button>
    </div>
  );
};
