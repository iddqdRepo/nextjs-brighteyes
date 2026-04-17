import { clsx } from "clsx";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useState } from "react";
import { DonationFormValues } from "../../../interfaces/donation";
import { donationInitialValues } from "../../../utils/formik/donationInitialValues";
import {
  DONATION_PRESET_AMOUNTS,
  GIFT_AID_DECLARATION_TEXT,
} from "../../../utils/donationConstants";
import { DonationSchema } from "../../../utils/yup/donationYupSchema";

const FormFieldError = ({ name }: { name: string }) => {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="min-h-[1.25rem] text-xs text-red-600"
    />
  );
};

const DonationInput = ({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium text-slate-700 font-poppins"
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border border-slate-300 px-4 text-sm font-poppins text-slate-900 outline-none transition focus:border-[#8b3479] focus:ring-2 focus:ring-[#8b3479]/20"
      />
      <FormFieldError name={name} />
    </div>
  );
};

const SectionTitle = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="max-w-2xl">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b3479]">
        {eyebrow}
      </div>
      <h2 className="mb-4 text-3xl font-semibold text-slate-900 font-poppins md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-600 font-poppins">{text}</p>
    </div>
  );
};

export const DonateHeroSection = () => {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,_rgba(139,52,121,0.18),_transparent_40%),linear-gradient(135deg,_#fef2f7,_#ffffff_55%,_#f8fafc)]">
      <div className="mx-auto grid w-11/12 max-w-6xl gap-10 py-16 lg:grid-cols-[1.05fr,0.95fr] lg:py-20">
        <div className="flex flex-col justify-center">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#8b3479]">
            Card Donations
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 font-poppins md:text-6xl">
            Give securely online and add Gift Aid in the same flow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 font-poppins">
            Support Bright Eyes with a one-off card donation or a monthly gift.
            The website collects donor details and any Gift Aid declaration
            first, then hands the payment step to Stripe Checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#donation-form"
              className="rounded-full bg-[#8b3479] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#742c67]"
            >
              Start donating
            </a>
            <Link href="/forms/giftAidForm">
              <a className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
                Standalone Gift Aid form
              </a>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl shadow-[#8b3479]/10 lg:p-8">
          <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.25em] text-white/70">
              Monthly support
            </div>
            <div className="mt-3 text-4xl font-semibold font-poppins">
              &pound;10
            </div>
            <p className="mt-3 text-sm leading-6 text-white/80 font-poppins">
              could help cover food, heating, and day-to-day care for animals
              waiting to be rehomed.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <div className="text-sm font-semibold font-poppins">One-off</div>
              <p className="mt-2 text-sm text-white/80 font-poppins">
                Fast hosted card payment through Stripe Checkout.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <div className="text-sm font-semibold font-poppins">Monthly</div>
              <p className="mt-2 text-sm text-white/80 font-poppins">
                Subscription-based giving with webhooks tracking status changes.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <div className="text-sm font-semibold font-poppins">Gift Aid</div>
              <p className="mt-2 text-sm text-white/80 font-poppins">
                Declaration stored in Mongo before the user reaches Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const DonationFormSection = () => {
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (
    values: DonationFormValues,
    actions: FormikHelpers<DonationFormValues>
  ) => {
    setSubmitError("");

    try {
      const response = await fetch("/api/donations/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to start checkout");
      }

      if (payload.url) {
        window.location.assign(payload.url);
        return;
      }

      throw new Error("Stripe did not return a checkout URL");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again."
      );
      actions.setSubmitting(false);
    }
  };

  return (
    <section id="donation-form" className="bg-white py-16">
      <div className="mx-auto grid w-11/12 max-w-6xl gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <SectionTitle
          eyebrow="Online Donations"
          title="Donate online with card and Gift Aid"
          text="Donation details and any Gift Aid declaration are captured on the website before the donor is redirected to Stripe Checkout for the secure card payment."
        />

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/50 lg:p-8">
          <Formik
            initialValues={donationInitialValues}
            validationSchema={DonationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-10">
                <div>
                  <div className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    1. Choose your donation
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "monthly", label: "Monthly gift" },
                      { value: "one_off", label: "One-off gift" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={clsx(
                          "rounded-[1.5rem] border px-5 py-4 text-left transition",
                          values.donationType === option.value
                            ? "border-[#8b3479] bg-[#8b3479] text-white shadow-lg shadow-[#8b3479]/20"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        )}
                        onClick={() => {
                          setFieldValue("donationType", option.value);
                          if (
                            option.value === "monthly" &&
                            values.giftAid.wantsGiftAid
                          ) {
                            setFieldValue("giftAid.giftAidFuture", true);
                          }

                          if (option.value === "one_off") {
                            setFieldValue("giftAid.giftAidFuture", false);
                          }
                        }}
                      >
                        <div className="text-lg font-semibold font-poppins">
                          {option.label}
                        </div>
                        <div
                          className={clsx(
                            "mt-2 text-sm font-poppins",
                            values.donationType === option.value
                              ? "text-white/80"
                              : "text-slate-500"
                          )}
                        >
                          {option.value === "monthly"
                            ? "Recurring monthly support via Stripe subscriptions."
                            : "Single secure card payment via Stripe Checkout."}
                        </div>
                      </button>
                    ))}
                  </div>
                  <FormFieldError name="donationType" />
                </div>

                <div>
                  <div className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    2. Select an amount
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {DONATION_PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={clsx(
                          "rounded-2xl border px-4 py-4 text-center text-lg font-semibold transition font-poppins",
                          Number(values.amount) === amount
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        )}
                        onClick={() => setFieldValue("amount", amount)}
                      >
                        &pound;{amount}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <DonationInput
                      label="Or enter a custom amount"
                      name="amount"
                      type="number"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    3. Your details
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DonationInput
                      label="Full name"
                      name="donor.fullName"
                      autoComplete="name"
                    />
                    <DonationInput
                      label="Email address"
                      name="donor.email"
                      type="email"
                      autoComplete="email"
                    />
                    <DonationInput
                      label="Phone number"
                      name="donor.phone"
                      autoComplete="tel"
                    />
                    <div className="hidden md:block"></div>
                    <div className="md:col-span-2">
                      <DonationInput
                        label="Address line 1"
                        name="donor.addressLine1"
                        autoComplete="address-line1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <DonationInput
                        label="Address line 2"
                        name="donor.addressLine2"
                        autoComplete="address-line2"
                      />
                    </div>
                    <DonationInput
                      label="Town or city"
                      name="donor.townCity"
                      autoComplete="address-level2"
                    />
                    <DonationInput
                      label="Postcode"
                      name="donor.postcode"
                      autoComplete="postal-code"
                    />
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-white p-5">
                  <div className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    4. Gift Aid
                  </div>
                  <p className="mb-4 text-sm leading-6 text-slate-600 font-poppins">
                    Gift Aid lets Bright Eyes reclaim 25p for every &pound;1
                    donated by eligible UK taxpayers. The declaration is saved
                    on the website before you are sent to Stripe.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: true, label: "Yes, add Gift Aid" },
                      { value: false, label: "No Gift Aid" },
                    ].map((option) => (
                      <button
                        key={String(option.value)}
                        type="button"
                        className={clsx(
                          "rounded-2xl border px-4 py-4 text-left transition",
                          values.giftAid.wantsGiftAid === option.value
                            ? "border-[#8b3479] bg-[#8b3479] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        )}
                        onClick={() => {
                          setFieldValue("giftAid.wantsGiftAid", option.value);

                          if (!option.value) {
                            setFieldValue("giftAid.giftAidFuture", false);
                            setFieldValue("giftAid.giftAidPast", false);
                            setFieldValue("giftAid.declarationAccepted", false);
                          } else if (values.donationType === "monthly") {
                            setFieldValue("giftAid.giftAidFuture", true);
                          } else {
                            setFieldValue("giftAid.giftAidFuture", false);
                          }
                        }}
                      >
                        <div className="text-lg font-semibold font-poppins">
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {values.giftAid.wantsGiftAid ? (
                    <div className="mt-6 space-y-4 rounded-[1.5rem] border border-[#8b3479]/20 bg-[#fdf3fa] p-5">
                      {values.donationType === "monthly" ? (
                        <div className="rounded-2xl border border-[#8b3479]/10 bg-white px-4 py-4 text-sm leading-6 text-slate-700 font-poppins">
                          Because this is a monthly donation, your Gift Aid
                          declaration will apply to future donations until you
                          notify Bright Eyes otherwise.
                        </div>
                      ) : (
                        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700 font-poppins">
                          <Field
                            type="checkbox"
                            name="giftAid.giftAidFuture"
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8b3479] focus:ring-[#8b3479]"
                          />
                          <span>
                            Apply this declaration to future donations until I
                            notify Bright Eyes otherwise.
                          </span>
                        </label>
                      )}
                      <FormFieldError name="giftAid.giftAidFuture" />

                      <label className="flex items-start gap-3 text-sm leading-6 text-slate-700 font-poppins">
                        <Field
                          type="checkbox"
                          name="giftAid.giftAidPast"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8b3479] focus:ring-[#8b3479]"
                        />
                        <span>
                          Apply Gift Aid to donations made in the current tax
                          year and the previous four tax years.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 text-sm leading-6 text-slate-700 font-poppins">
                        <Field
                          type="checkbox"
                          name="giftAid.declarationAccepted"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8b3479] focus:ring-[#8b3479]"
                        />
                        <span>{GIFT_AID_DECLARATION_TEXT}</span>
                      </label>
                      <FormFieldError name="giftAid.declarationAccepted" />
                    </div>
                  ) : null}
                </div>

                {submitError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Starting secure checkout..."
                    : "Continue to secure card payment"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export const DonateUsesSection = () => {
  const items = [
    {
      title: "Daily care",
      text: "Food, heating, bedding, and the basics that keep rescues safe while they wait for a home.",
    },
    {
      title: "Vet treatment",
      text: "Vaccinations, urgent check-ups, and follow-up care for animals who arrive needing medical support.",
    },
    {
      title: "Longer-term rescue work",
      text: "Reliable monthly income helps the sanctuary plan ahead instead of relying only on one-off appeals.",
    },
  ];

  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto w-11/12 max-w-6xl">
        <SectionTitle
          eyebrow="Why it matters"
          title="What this donation flow supports"
          text="This donation flow gives the sanctuary the operational pieces it needs: secure card payments, recurring donations, and a Gift Aid record connected to each donation."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold font-poppins">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/75 font-poppins">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
