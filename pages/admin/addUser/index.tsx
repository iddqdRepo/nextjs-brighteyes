// import axios from "axios";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRetype, setPasswordRetype] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (username && password && passwordRetype) {
      if (password === passwordRetype) {
        console.log("Match");
      } else {
        setErrorMessage("Passwords don't match");
      }
    } else {
      setErrorMessage("Please fill in all fields ");
    }

    // const credentials = { username, password };
    // console.log("username", username);
    // if (username && password && username != "admin") {
    //   const user = await axios.post("/api/auth/login", credentials);
    //   if (user.data.success) {
    //     router.push("/admin");
    //   } else {
    //     console.log("setting Response");
    //     setResponse(user.data.message);
    //   }
    // } else {
    //   setResponse("Invalid username or password");
    // }
  };
  return (
    <AdminSidebarComponent highlighted="AddUser">
      <PageContainerComponent>
        <div className="flex justify-center px-10 py-20">
          <div className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="flex justify-center mb-2 text-lg font-poppins">
              Add user
            </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 font-sans text-sm font-bold text-grey-darker"
                htmlFor="password"
              >
                Retype Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
                id="passwordRetype"
                type="password"
                value={passwordRetype}
                onChange={(e) => setPasswordRetype(e.target.value)}
              />
            </div>
            <div className="flex justify-center text-red-600">
              {errorMessage}
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                className="w-5/6 px-4 py-4 font-sans font-bold rounded hover:bg-blue-dark text-blue hover:bg-gray-100"
                type="button"
                onClick={(e) => handleAddUser(e)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
