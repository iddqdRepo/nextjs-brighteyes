import React from "react";
// import Map from "./Map";
import Link from "next/link";
import ContactUsComponent from "../components/ContactUs/ContactUsComponent";
import styles from "./home.module.css";

function Home() {
  return (
    <>
      <div className={styles["hero-image"]}></div>

      <div className={styles["about-us-container"]}>
        <div className={styles["about-header"]}>About Us</div>

        <div className={styles["about-us-split-content"]}>
          <div className={styles["about-us-split-text"]}>
            <div className={styles["about-us-split-text-title"]}>
              Bright Eyes Animal Sanctuary
            </div>

            <h1 className={styles["about-us-split-text-description"]}>
              Bright Eyes was established in 1989 and is based in{" "}
              <span className={styles["bolding"]}>
                Co.Fermanagh, Northern Ireland{" "}
              </span>
              .
              <br />
              Our main purpose is to reduce unnecessary suffering and distress
              of companion animals through the provision of a rescue and
              re-homing service. We operate a strict{" "}
              <span className={styles["bolding"]}>no kill policy</span> at
              Bright Eyes and if an animal, for any reason, cannot get a home it
              will have shelter here with us for life. <br />
              We support the local community and offer volunteering
              opportunities, training and education on animal welfare. <br />
              We receive no government funding and rely purely on the generosity
              of the public to help us continue our work.
              <br /> All animals rehomed from us are neutered/spayed,
              vaccinated, microchipped, dewormed and deflead.
            </h1>
          </div>

          <div className={styles["about-us-split-image"]}> </div>
        </div>
        <Link href={`/about`}>
          <button
            type="button"
            className={[
              styles["about-us-read-more-button"],
              styles.button,
            ].join(" ")}
          >
            Learn More
          </button>
        </Link>
      </div>

      <div className={styles["stats-box-container"]}>
        <div className={styles["stats-box-1"]}>
          <div className={styles["stats-box-title"]}>2000+</div>
          <div className={styles["stats-box-info"]}>Pets Adopted</div>
        </div>
        <div className={styles["stats-box-2"]}>
          <div className={styles["stats-box-title"]}>20+</div>
          <div className={styles["stats-box-info"]}>Volunteers</div>
        </div>
        <div className={styles["stats-box-3"]}>
          <div className={styles["stats-box-title"]}>30+</div>
          <div className={styles["stats-box-info"]}>Years Experience</div>
        </div>
      </div>

      <div className={styles["get-involved-container-home"]}>
        <div className={styles["get-involved-header"]}>Get Involved</div>

        <div className={styles["get-involved-split-container"]}>
          <div className={styles["get-involved-split"]}>
            <div className={styles["involved-main-text"]}> Adopt</div>
            <div className={styles["involved-image-1"]}></div>
            <Link href="/adoption">
              <button
                type="button"
                data-testid={"moreInfoAdoptButton"}
                className={[
                  styles["get-involved-more-info-button"],
                  styles.button,
                ].join(" ")}
              >
                More Info
              </button>
            </Link>
            <div className={styles["involved-main-subtext"]}>
              Take a look at our pets for Adoption. Join the 2000+ other people
              and find the perfect pet for your home!
            </div>
          </div>
          <div className={styles["get-involved-split"]}>
            <div className={styles["involved-main-text"]}> Donate</div>
            <div className={styles["involved-image-2"]}> </div>
            <Link href="/donate">
              <button
                type="button"
                data-testid={"moreInfoDonateButton"}
                className={[
                  styles["get-involved-more-info-button"],
                  styles.button,
                ].join(" ")}
              >
                More Info
              </button>
            </Link>
            <div className={styles["involved-main-subtext"]}>
              We receive no government funding and rely purely on the generosity
              of the public to help us continue our work.
            </div>
          </div>
          <div className={styles["get-involved-split"]}>
            <div className={styles["involved-main-text"]}> Volunteer</div>
            <div className={styles["involved-image-3"]}> </div>
            <Link href="/forms/volunteer">
              <button
                type="button"
                data-testid={"moreInfoVolunteerButton"}
                className={[
                  styles["get-involved-more-info-button"],
                  styles.button,
                ].join(" ")}
              >
                More Info
              </button>
            </Link>
            <div className={styles["involved-main-subtext"]}>
              Our fantastic volunteers are the backbone of Bright Eyes. Want to
              help care for the animals and earn some valuable experience?
            </div>
          </div>
        </div>
      </div>

      <ContactUsComponent />
      <div className={styles["info-container"]}>
        <div className={styles["info-split-container"]}>
          <div className={styles["info-split"]}>
            <div className={styles["info-header"]}>Location</div>
            <div className={styles["info-main-text"]}>
              53 Killymittan Road,
              <br />
              BT94 2FW,
              <br />
              Ballinamallard
            </div>
          </div>
          <div className={styles["info-split"]}>
            <div className={styles["info-header"]}>Hours</div>
            <div className={styles["info-main-text"]}>
              {" "}
              <span className={styles["bold-noto"]}>Mon - Sun:</span> 12:00 –
              15:00
              <br />
            </div>
          </div>
          <div className={styles["info-split"]}>
            <div className={styles["info-header"]}>Contact Info</div>
            <div className={styles["info-main-text"]}>
              <span className={styles["bold-noto"]}>Mobile:</span> 07710607816
              <br />
              <span className={styles["bold-noto"]}>Phone:</span> 028 66 388885
              <br />
              <span className={styles["bold-noto"]}>Email:</span>{" "}
              brighteyes.sanctuary@btinternet.com
            </div>
          </div>
          <div className={styles["info-split"]}>
            <div className={styles["info-header"]}>Follow Us</div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/brighteyes.a.s/"
            >
              <span
                className="iconify"
                data-icon="akar-icons:facebook-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/brighteyesanimalsanctuary"
            >
              <span
                className="iconify"
                data-icon="akar-icons:instagram-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
          </div>
        </div>
      </div>

      {/* <Map /> */}
    </>
  );
}

export default Home;
