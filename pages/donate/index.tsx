import React, { useEffect } from "react";
// import * as api from "../api/apiIndex";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ContactUsComponent from "../../components/ContactUs/ContactUsComponent";
import styles from "./donate.module.css";
import { Icon } from "@iconify/react";
import Image from "next/image";

function Donate() {
  useEffect(() => {
    //^When donate button is clicked from another page
    //^ React-Router-Link goes to bottom of this page, this is to offset that
    window.scrollTo(0, 0);
  }, []);

  function createData(type: string, details: string) {
    return { type, details };
  }

  const rows = [
    createData("Bank", "Santander Bank"),
    createData("Sort Code", "09-01-26"),
    createData("Account Number", "23320595"),
    createData("Type", "Business"),
    createData("Name", "Bright Eyes Animal Sanctuary"),
    createData("Reference", "Bright Eyes Donation"),
  ];

  function BasicTable() {
    return (
      <div style={{ width: "100%" }}>
        <Table sx={{ width: 300, margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <>
      <div className={styles["donate-container"]}>
        <div className={styles["donate-header"]}></div>

        <div className={styles["donate-split-content"]}>
          <div className={styles["donate-split-text"]}>
            <div className={styles["donate-split-text-title"]}>Donate,</div>
            <div className={styles["donate-split-text-title"]}>
              Change a Life Today.
            </div>

            <div className={styles["donate-split-text-description"]}>
              In the past 5 years we have rehomed over{" "}
              <span className={styles["slanted-about-us-bold-desc"]}>
                {" "}
                1,000 Cats and Dogs.{" "}
              </span>
              <br />
              We receive no government funding and rely purely on the generosity
              of the public to help us continue our work. <br />
              We would be grateful if you would like to set up a standing order
              each month or leave a legacy in your will, your contribution will
              make a huge difference to animal welfare and help us continue to
              rescue more animals that need us.
            </div>
          </div>

          <div className={styles["donate-split-image"]}></div>
        </div>
      </div>

      <div className={styles["donate-container"]}>
        {/* <PayPalButton createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)} /> */}
        <div className={styles["donate-header"]}>Donate</div>
        <div className={styles["donate-subtext"]}>
          Perfect for a one off donation <br />
          or recurring monthly donations <br />
          if you have a Paypal account.
        </div>
        <Icon icon="akar-icons:arrow-down" width="40" />
        <div className={styles["donate-paypal-content"]}>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top"
          >
            <input
              type="hidden"
              name="hosted_button_id"
              value="JPRFRRVZHSMY4"
            />
            <input
              type="image"
              id="image"
              className={styles["paypal-donate-image"]}
              src="https://www.paypal-community.com/t5/image/serverpage/image-id/56084iFE8EEC50D9040CCB/image-size/large?v=v2&px=999"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <Image
              className={styles["paypal-donate"]}
              alt=""
              src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
        <div className={styles["donate-header"]}>Set up a Standing Order</div>
        <div className={styles["donate-subtext"]}>
          Perfect for a recurring <br />
          donation if you do not have a <br />
          Paypal account.
        </div>
        <Icon icon="akar-icons:arrow-down" width="40" />
        <BasicTable />
      </div>
      <div className={styles["donate-header"]}>Your donation goes towards:</div>
      <div className={styles["donate-split-content-container"]}>
        <div className={styles["donation-split-content"]}>
          <div className={styles["donation-split-points-left-container"]}>
            <div className={styles["donation-point-container"]}>
              <Icon icon="fluent:food-24-filled" width="40" />
              <span className={styles["donation-point-text"]}> Food </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="ic:sharp-model-training" width="40" />
              <span className={styles["donation-point-text"]}> Training </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="map:veterinary-care" width="40" />
              <span className={styles["donation-point-text"]}> Vet Bills </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="map:insurance-agency" width="40" />
              <span className={styles["donation-point-text"]}> Insurance </span>
            </div>
          </div>
          <div className={styles["donation-split-points-left-container"]}>
            <div className={styles["donation-point-container"]}>
              <Icon icon="bx:bxs-blanket" width="40" />
              <span className={styles["donation-point-text"]}> Bedding </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="mdi:toy-brick-plus" width="40" />
              <span className={styles["donation-point-text"]}> Toys </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="pepicons:electricity-print" width="40" />
              <span className={styles["donation-point-text"]}>
                {" "}
                Electricity{" "}
              </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="icon-park-outline:oil-industry" width="40" />
              <span className={styles["donation-point-text"]}> Heating </span>
            </div>
          </div>

          <div className={styles["donation-split-points-right-container"]}>
            <div className={styles["donation-point-container"]}>
              <Icon icon="mdi:needle" width="40" />
              <span className={styles["donation-point-text"]}>
                {" "}
                Vaccinations{" "}
              </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="healthicons:emergency-post-outline" width="40" />
              <span className={styles["donation-point-text"]}>
                {" "}
                Emergencies{" "}
              </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="wpf:maintenance" width="40" />
              <span className={styles["donation-point-text"]}>
                {" "}
                Maintenance{" "}
              </span>
            </div>
            <div className={styles["donation-point-container"]}>
              <Icon icon="ep:more-filled" width="40" />
              <span className={styles["donation-point-text"]}> And More </span>
            </div>
          </div>
        </div>
      </div>

      <ContactUsComponent />
    </>
  );
}

export default Donate;
