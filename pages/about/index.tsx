import React from "react";
import styles from "./about.module.css";
// import DonateSlantedComponent from "./DonateSlantedComponent";

function About() {
  return (
    <>
      <div className={styles["about-pat-container"]}>
        <div className={styles["about-header"]}>Our Founder</div>

        <div className={styles["about-pat-split-content"]}>
          <div className={styles["about-pat-image-name-container"]}>
            <div className={styles["about-pat-split-image"]}> </div>

            <div className={styles["about-pat-split-text-title"]}>
              Pat Nolan
            </div>
            <div className={styles["about-pat-split-text-subtitle"]}>
              1946 - 2013
            </div>
          </div>
          <div className={styles["about-pat-description-container"]}>
            <div className={styles["about-pat-split-text-description"]}>
              <span className={styles["pat-p"]}>P</span> at was a tireless
              advocate for animal rights and animal welfare. He devoted his
              whole life to the welfare and well-being of all animals that came
              into his care, often to the detriment of his own health. <br />
              <br />
              Through all the hard times Pat never lost his focus on helping the
              animals. Each and every one was given the help they needed,
              despite mounting vet and food bills and very limited funding.{" "}
              <br />
              <br />
              Back in the late 70’s Pat and his wife rescued a stray tabby cat
              to their home in Derrin Park Enniskillen. Little did he know this
              would be the beginning of his success and a lifelong commitment.
              By the early 80’s Pat had rescued a host of abandoned cats and
              cared for them in his home on the Kilmacormick estate. His
              reputation was growing and he earned the respected nickname of
              ‘Pat the cat’. Pat’s next move was to a disused farm building in
              Coa. Pat lived in a cold cramped caravan while the animals, now
              also dogs, lived in the outbuildings. <br />
              <br />
              Pat’s last move was to Killymittan Ballinamallard in 1995. Pat had
              a good team to support him and turned a dilapidated house and
              outbuildings to the facilities we see today, very impressive
              considering he received no formal funding, just generous donations
              from the public. <br />
              Pats dedication was recognised by being awarded a lifetime
              achievement award from the ‘International Fund for Animal
              Welfare’. Pat sadly passed away in 2013 but his legacy lives on.
              Pat’s ashes now rest here at his beloved sanctuary which he worked
              so hard to establish. Rest easy friend of animals, your work here
              goes on.
            </div>
          </div>
        </div>
      </div>

      <div className={styles["slanted-div-about"]}>
        <div className={styles["slanted-about-header"]}>About Bright Eyes</div>

        <div className={styles["slanted-about-us-split-content"]}>
          <div className={styles["slanted-about-us-split-text"]}>
            <div className={styles["slanted-about-us-split-text-title"]}>
              Bright Eyes Animal Sanctuary
            </div>
            <div className={styles["slanted-about-us-split-text-description"]}>
              Bright Eyes was established in 1989, formerly registered with HMRC
              as a charity and reregistered with the Northern Ireland Charity
              Commission in 2016. <br />
              <br />
              We are based in{" "}
              <span className={styles["slanted-about-us-bold-desc"]}>
                Co.Fermanagh, Northern Ireland{" "}
              </span>
              .<br /> Our main purpose is a reduction in unnecessary suffering
              and distress of companion animals through the provision of a
              rescue and re-homing service. We provide a sanctuary for the care,
              protection, treatment and temporary or permanent accommodation of
              such animals.
              <br /> We rely heavily on volunteers to help with the running of
              the sanctuary and in return we provide social support, education,
              mental support and animal welfare training (in some cases leading
              to employment in a related field or academic qualifications). We
              have undertaken intensive feral cat neutering and spaying over the
              years resulting in a noticeable reduction in feral cat population.
              We operate a{" "}
              <span className={styles["slanted-about-us-bold-desc"]}>
                no kill policy
              </span>{" "}
              at Bright Eyes and if an animal for any reason cannot get a home
              it will have shelter here with us for life. We receive no
              government funding and rely purely on the generosity of the public
              to help us continue our work. Rehoming from us All animals rehomed
              from us are neutered/spayed, vaccinated, microchipped, dewormed
              and deflead Please see page with animals that need a home and
              relevant application form.
            </div>
          </div>

          <div className={styles["slanted-about-us-split-image"]}> </div>
        </div>
      </div>
      <div className={styles["pat-video-header"]}>
        An Interview With The Founder
      </div>
      <div className={styles["video-responsive"]}>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/EUarwkgEoVY`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>

      {/* <DonateSlantedComponent /> */}
    </>
  );
}

export default About;
