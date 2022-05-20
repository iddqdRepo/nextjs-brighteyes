import React, { useState } from "react";
import styles from "./ContactUsComponent.module.css";

function ContactUsComponent() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const type = "message";
  const [senderEmail, setSenderEmail] = useState("");
  const [messageSentAlert, setMessageSentAlert] = useState("");
  const [errorAlertText, setErrorAlertText] = useState("");
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const updateForm = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.name === "email") {
      setSenderEmail(e.currentTarget.value);
    } else if (e.currentTarget.name === "name") {
      setName(e.currentTarget.value);
    } else if (e.currentTarget.name === "message") {
      setMessage(e.currentTarget.value);
    }
  };

  const sendFormEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      senderEmail,
      message,
      type,
    };
    if (data.name === "" || data.senderEmail === "" || data.message === "") {
      setErrorAlertText("Please fill in all fields");
    } else {
      if (!data.senderEmail.match(regex)) {
        setErrorAlertText("Please enter a valid email address");
      } else {
        try {
          setMessageSentAlert("loading");
          // const messageSentRes = await api.sendMail(data);
          // setMessageSentAlert(messageSentRes.data.message);
        } catch (error) {
          setMessageSentAlert("ERROR, Check Internet Connection");
        }
      }
    }
  };

  return (
    <div className={styles["contact-us-container"]}>
      <div className={styles["contact-us-header"]}>Contact Us</div>

      <div className={styles["contact-us-split-content"]}>
        <div className={styles["contact-us-split-name-email-message"]}>
          {messageSentAlert === "" ? (
            <>
              <div
                className={styles["errorAlertText"]}
                data-testid={"errorAlertText"}
              >
                {errorAlertText}
              </div>
              <form onSubmit={(e) => sendFormEmail(e)}>
                <div className={styles["contact-us-name-email-row"]}>
                  <div className={styles["contact-us-name-col"]}>
                    <label htmlFor="name" className={styles["name-text"]}>
                      Name
                    </label>
                    <input
                      className={styles["name-form-box"]}
                      onInput={(e) => {
                        updateForm(e);
                      }}
                      id="name"
                      value={name}
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className={styles["contact-us-email-col"]}>
                    <label htmlFor="email" className={styles["email-text"]}>
                      Email
                    </label>
                    <input
                      className={styles["email-form-box"]}
                      onInput={(e) => {
                        updateForm(e);
                      }}
                      id="email"
                      value={senderEmail}
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
                <div className={styles["contact-us-message"]}>
                  <label htmlFor="message" className={styles["message-text"]}>
                    Message
                  </label>
                  <textarea
                    className={styles["message-form-box"]}
                    onInput={(e) => {
                      updateForm(e);
                    }}
                    value={message}
                    id="message"
                    name="message"
                  />
                </div>
                <button
                  className={[
                    styles["contact-us-submit-button"],
                    styles.button,
                  ].join(" ")}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <>
              {messageSentAlert === "loading" ? (
                <div className={styles["loading-container"]}>
                  <div className={styles["Loading-ring"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <>
                  {messageSentAlert === "Success" ? (
                    <>
                      <div className={styles["messageSentContainer"]}>
                        <div className={styles["messageSentContent"]}>
                          Message sent successfully.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        Our email Server is down, please message us on Facebook
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className={styles["contact-us-split-image"]}> </div>
      </div>
    </div>
  );
}

export default ContactUsComponent;
