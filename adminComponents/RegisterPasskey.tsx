import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { startRegistration } from "@simplewebauthn/browser";

//Lets a logged-in admin register this device's fingerprint / Face ID as a
//passkey, so future logins don't need the shared password.
const RegisterPasskey = () => {
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setStatus("working");
    setMessage("");
    try {
      const optionsResponse = await axios.post(
        "/api/auth/webauthn/register-options"
      );
      const attestation = await startRegistration(optionsResponse.data.options);
      const verifyResponse = await axios.post(
        "/api/auth/webauthn/register-verify",
        attestation
      );
      if (verifyResponse.data.success) {
        setStatus("done");
        setMessage(
          "Done! Next time you log in, tap “Use fingerprint / Face ID”."
        );
        return;
      }
      throw new Error("Verification failed");
    } catch (error) {
      setStatus("error");
      setMessage(
        axios.isAxiosError(error) && error.response?.data?.message
          ? (error.response.data.message as string)
          : "Could not set up fingerprint login on this device."
      );
    }
  };

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50">
        {/* carbon has no plain "fingerprint" icon — it renders as an empty
            circle. mdi's does exist. */}
        <Icon icon="mdi:fingerprint" color="#8b3479" width="28" height="28" />
      </div>
      <div className="grow font-poppins">
        <div className="text-base font-semibold text-gray-900">
          Fingerprint / Face ID login
        </div>
        <div className="mt-0.5 max-w-xl text-sm text-gray-600">
          Set it up once on this phone or computer, then log in quickly and
          securely &#8212; no password to type.
        </div>
        {message && (
          <div
            className={`mt-2 text-sm font-medium ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
      <button
        id="RegisterPasskey"
        onClick={handleRegister}
        disabled={status === "working"}
        className="z-10 shrink-0 self-start rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark font-poppins disabled:opacity-50 sm:self-center"
      >
        {status === "working" ? "Follow your device's prompt…" : "Set up now"}
      </button>
      {/* decorative shield, echoing the padlock in the design */}
      <Icon
        icon="mdi:shield-lock"
        className="pointer-events-none absolute -right-4 -top-6 hidden text-brand-50 lg:block"
        width="150"
        height="150"
      />
    </div>
  );
};

export default RegisterPasskey;
