import React, { useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
} from "../../../adminComponents/commonAdminComponents";
import { postUser } from "../../../routes/userRoutes";

function Index() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRetype, setPasswordRetype] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (username && password && passwordRetype) {
      if (password === passwordRetype) {
        if (!submitted) {
          const addUser = await postUser({ username, password });
          setSubmitted(addUser);
          setErrorMessage("");
        }
      } else {
        return setErrorMessage("Passwords don't match");
      }
    } else {
      return setErrorMessage("Please fill in all fields ");
    }
  };
  return (
    <>
      <AdminHeadTag
        title={"Add User"}
        metaContent={"Admin add a new user, Bright Eyes"}
        linkHref={"/admin/addUser"}
      />

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
                  className={
                    submitted
                      ? "w-5/6 px-4 py-4 font-sans font-bold rounded hover:bg-blue-dark text-blue hover:bg-gray-100 opacity-50 cursor-not-allowed"
                      : "w-5/6 px-4 py-4 font-sans font-bold rounded hover:bg-blue-dark text-blue hover:bg-gray-100"
                  }
                  type="button"
                  onClick={(e) => handleAddUser(e)}
                >
                  {submitted ? "User Added" : "Add User"}
                </button>
                {submitted && (
                  <button
                    className="w-5/6 px-4 py-4 font-sans font-bold rounded hover:bg-blue-dark text-blue hover:bg-gray-100"
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setPassword("");
                      setPasswordRetype("");
                      setUsername("");
                    }}
                  >
                    Add another user
                  </button>
                )}
              </div>
            </div>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
