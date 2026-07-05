import { clsx } from "clsx";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { DonationFormValues } from "../../../interfaces/donation";
import { donationInitialValues } from "../../../utils/formik/donationInitialValues";
import {
  DONATION_PRESET_AMOUNTS,
  GIFT_AID_DECLARATION_TEXT,
  MIN_DONATION_AMOUNT,
} from "../../../utils/donationConstants";
import { DonationSchema } from "../../../utils/yup/donationYupSchema";
import { SectionEyebrow } from "../../common/CommonComponents";

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
        className="mb-1.5 text-sm font-medium text-gray-800 font-poppins"
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm font-poppins text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
      <FormFieldError name={name} />
    </div>
  );
};

const StepLabel = ({ text }: { text: string }) => {
  return (
    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand font-poppins">
      {text}
    </div>
  );
};

const HeroBullet = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand">
        <Icon icon={icon} color="#ffffff" width="22" height="22" />
      </div>
      <div>
        <div className="text-base font-semibold text-gray-900 font-poppins">
          {title}
        </div>
        <p className="mt-1 max-w-sm text-sm leading-6 text-gray-600 font-poppins">
          {text}
        </p>
      </div>
    </div>
  );
};

const DonationFormCard = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const initialValues: DonationFormValues = useMemo(() => {
    const queryAmount = Number(router.query.amount);
    const queryType = router.query.type;
    return {
      ...donationInitialValues,
      amount:
        !isNaN(queryAmount) && queryAmount >= MIN_DONATION_AMOUNT
          ? queryAmount
          : donationInitialValues.amount,
      donationType:
        queryType === "one_off" || queryType === "monthly"
          ? queryType
          : donationInitialValues.donationType,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
    <div
      id="donation-form"
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-brand/10 lg:p-8"
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={DonationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-8">
            <div>
              <StepLabel text="1. Choose your donation" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "monthly", label: "Monthly Support" },
                  { value: "one_off", label: "One-off Gift" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={clsx(
                      "rounded-2xl border px-5 py-4 text-left transition",
                      values.donationType === option.value
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                        : "border-gray-200 bg-white text-gray-700 hover:border-brand"
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
                    <div className="text-base font-semibold font-poppins">
                      {option.label}
                    </div>
                    <div
                      className={clsx(
                        "mt-1 text-xs leading-5 font-poppins",
                        values.donationType === option.value
                          ? "text-white/80"
                          : "text-gray-500"
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
              <StepLabel text="2. Select an amount" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DONATION_PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={clsx(
                      "rounded-xl border px-4 py-3.5 text-center text-base font-semibold transition font-poppins",
                      Number(values.amount) === amount
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                        : "border-gray-200 bg-white text-gray-700 hover:border-brand"
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
              <StepLabel text="3. Your details" />
              <div className="grid gap-x-4 md:grid-cols-2">
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
                    label="Address line 2 (optional)"
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

            <div className="rounded-2xl bg-brand-50 p-5">
              <StepLabel text="4. Gift Aid" />
              <p className="mb-4 text-sm leading-6 text-gray-600 font-poppins">
                Gift Aid lets Bright Eyes reclaim 25p for every &pound;1 donated
                by eligible UK taxpayers, at no extra cost to you. The
                declaration is saved on this website before you are sent to
                Stripe.
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
                      "rounded-2xl border px-4 py-3.5 text-left transition",
                      values.giftAid.wantsGiftAid === option.value
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                        : "border-gray-200 bg-white text-gray-700 hover:border-brand"
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
                    <div className="text-base font-semibold font-poppins">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>

              {values.giftAid.wantsGiftAid ? (
                <div className="mt-5 space-y-4 rounded-2xl border border-brand/20 bg-white p-5">
                  {values.donationType === "monthly" ? (
                    <div className="rounded-xl bg-brand-50 px-4 py-4 text-sm leading-6 text-gray-700 font-poppins">
                      Because this is a monthly donation, your Gift Aid
                      declaration will apply to future donations until you
                      notify Bright Eyes otherwise.
                    </div>
                  ) : (
                    <label className="flex items-start gap-3 text-sm leading-6 text-gray-700 font-poppins">
                      <Field
                        type="checkbox"
                        name="giftAid.giftAidFuture"
                        className="mt-1 h-4 w-4 rounded border-gray-300 accent-brand"
                      />
                      <span>
                        Apply this declaration to future donations until I
                        notify Bright Eyes otherwise.
                      </span>
                    </label>
                  )}
                  <FormFieldError name="giftAid.giftAidFuture" />

                  <label className="flex items-start gap-3 text-sm leading-6 text-gray-700 font-poppins">
                    <Field
                      type="checkbox"
                      name="giftAid.giftAidPast"
                      className="mt-1 h-4 w-4 rounded border-gray-300 accent-brand"
                    />
                    <span>
                      Apply Gift Aid to donations made in the current tax year
                      and the previous four tax years.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-sm leading-6 text-gray-700 font-poppins">
                    <Field
                      type="checkbox"
                      name="giftAid.declarationAccepted"
                      className="mt-1 h-4 w-4 rounded border-gray-300 accent-brand"
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
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-medium text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 font-poppins"
            >
              <Icon icon="akar-icons:lock-on" color="white" width="16" />
              {isSubmitting
                ? "Starting secure checkout..."
                : "Continue to secure card payment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const DonateSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
      <div className="mx-auto grid w-11/12 max-w-6xl gap-10 py-12 lg:grid-cols-[0.9fr,1.1fr] lg:py-16">
        <div>
          <SectionEyebrow text="Card donations" />
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl font-poppins">
            Give securely online and{" "}
            <span className="text-brand">
              change lives.{" "}
              <Icon
                className="inline"
                icon="foundation:paw"
                color="#8b3479"
                width="32"
                height="32"
                inline={true}
              />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg font-poppins">
            Support Bright Eyes with a one-off card donation or a monthly gift.
            Your kindness helps provide food, medical care and safe homes for
            animals who need us most.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            <HeroBullet
              icon="akar-icons:lock-on"
              title="Secure payments"
              text="All card donations are processed securely via Stripe."
            />
            <HeroBullet
              icon="akar-icons:heart"
              title="Every gift helps"
              text="We receive no government funding and rely purely on the generosity of the public to continue our work."
            />
          </div>

          <div className="relative mt-8 hidden h-64 overflow-hidden rounded-[2rem] shadow-2xl shadow-brand/10 lg:block">
            <Image
              src="/HeroDogCat.jpg"
              alt="A dog and cat together at Bright Eyes Animal Sanctuary"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <DonationFormCard />
      </div>
    </section>
  );
};

export const DonateUsesSection = () => {
  const items = [
    {
      icon: "mdi:food-drumstick-outline",
      title: "Daily Care",
      text: "Food, bedding, cleaning and enrichment to keep our animals safe and comfortable every day.",
    },
    {
      icon: "healthicons:stethoscope-outline",
      title: "Vet Treatment",
      text: "Vaccinations, urgent check-ups and follow-up care for rescues in need of medical support.",
    },
    {
      icon: "mdi:home-heart",
      title: "Long-term Rescue",
      text: "Rehoming, training and long-term care for animals who deserve a second chance.",
    },
  ];

  return (
    <section className="bg-cream py-14">
      <div className="mx-auto w-11/12 max-w-6xl">
        <SectionEyebrow text="Why it matters" />
        <h2 className="flex items-center gap-3 text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
          Your support makes every day possible.
          <Icon
            className="hidden shrink-0 sm:block"
            icon="foundation:paw"
            color="#8b3479"
            width="26"
            height="26"
          />
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <Icon icon={item.icon} color="#8b3479" width="26" height="26" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 font-poppins">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DonateQuoteSection = () => {
  return (
    <section className="bg-brand-100 py-14">
      <div className="mx-auto flex w-11/12 max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Icon
          className="shrink-0"
          icon="akar-icons:heart"
          color="#8b3479"
          width="64"
          height="64"
        />
        <div>
          <p className="text-xl font-medium leading-9 text-gray-800 sm:text-2xl font-poppins">
            &ldquo;We couldn&apos;t do what we do without people like you. Thank
            you for giving animals a brighter tomorrow.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold text-brand font-poppins">
            &#8212; The Bright Eyes Team
          </p>
        </div>
      </div>
    </section>
  );
};
