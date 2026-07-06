import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { startAuthentication } from "@simplewebauthn/browser";
import { AdminHeadTag } from "../../adminComponents/commonAdminComponents";
import { ShowButtonTextOnSubmit } from "../../components/common/CommonComponents";

function Index() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(`Log in`);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const credentials = { username, password };
    if (!username || !password) {
      setResponse("Invalid username or password");
      return;
    }

    setLoading(true);

    try {
      const user = await axios.post("/api/auth/login", credentials);

      if (user.data.success) {
        setIsSuccess(true);
        router.push("/admin");
        return;
      }

      setLoading(false);
      setIsSuccess(false);
      setButtonText("ERROR, try again");
      setResponse(user.data.message || "Invalid username or password");
    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      setButtonText("ERROR, try again");
      setResponse(
        axios.isAxiosError(error) && error.response?.data?.message
          ? (error.response.data.message as string)
          : "Invalid username or password"
      );
    }
  };

  //Passkey (WebAuthn) login: the phone/computer does the fingerprint or Face
  //ID check locally; the server only ever sees a signed challenge.
  const handlePasskeyLogin = async () => {
    if (!username) {
      setResponse("Enter your username first, then tap the fingerprint");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const optionsResponse = await axios.post(
        "/api/auth/webauthn/login-options",
        { username }
      );
      const assertion = await startAuthentication(optionsResponse.data.options);
      const verifyResponse = await axios.post(
        "/api/auth/webauthn/login-verify",
        assertion
      );

      if (verifyResponse.data.success) {
        setIsSuccess(true);
        router.push("/admin");
        return;
      }
      throw new Error("Sign-in failed");
    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      setResponse(
        axios.isAxiosError(error) && error.response?.data?.message
          ? (error.response.data.message as string)
          : "Fingerprint sign-in didn't work — you can still use your password"
      );
    }
  };

  return (
    <>
      <AdminHeadTag
        title={"Login"}
        metaContent={"Log in to Bright Eyes"}
        linkHref={"/login"}
      />
      <div className="flex justify-center px-10 py-20">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!loading) {
              handleLogin();
            }
          }}
          className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              className="block mb-2 font-sans text-sm font-bold text-grey-darker"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker "
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 font-sans text-sm font-bold text-grey-darker"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center text-red-600">{response}</div>
          <div className="flex flex-col items-center justify-between">
            {/* <button
              className="w-5/6 px-4 py-4 font-sans font-bold rounded hover:bg-blue-dark text-blue hover:bg-gray-100"
              type="button"
              id="LoginButton"
              onClick={(e) => handleLogin(e)}
            >
              Sign In
            </button> */}
            <ShowButtonTextOnSubmit
              loading={loading}
              isSuccess={isSuccess}
              buttonText={buttonText}
              submitHandler={() => handleLogin()}
              animalName={""}
            />
            <button
              type="button"
              id="PasskeyLoginButton"
              onClick={handlePasskeyLogin}
              disabled={loading}
              className="flex items-center justify-center w-5/6 px-4 py-3 mt-3 text-sm font-poppins border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <Icon className="w-auto h-5 mr-2" icon="carbon:fingerprint" />
              Use fingerprint / Face ID
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;
