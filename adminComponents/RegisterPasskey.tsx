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
    <div className="flex flex-col items-center p-5 m-2 border rounded-lg">
      <div className="flex items-center mb-2 text-base font-semibold font-poppins">
        <Icon className="w-auto h-6 mr-2" icon="carbon:fingerprint" />
        Fingerprint / Face ID login
      </div>
      <div className="mb-3 text-sm text-center text-gray-600 font-poppins">
        Set it up once on this phone or computer, then log in without typing a
        password.
      </div>
      <button
        id="RegisterPasskey"
        onClick={handleRegister}
        disabled={status === "working"}
        className="px-4 py-2 text-sm text-white rounded-lg bg-[#8b3479] hover:bg-[#398092] font-poppins disabled:opacity-50"
      >
        {status === "working" ? "Follow your device's prompt…" : "Set up"}
      </button>
      {message && (
        <div
          className={`mt-3 text-sm text-center font-poppins ${
            status === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterPasskey;
