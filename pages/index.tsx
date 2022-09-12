/* eslint-disable @next/next/no-img-element */

import React from "react";
import Map from "../components/MapComponent/Map.js";
// import Image from "next/image.js";
// import Link from "next/link";
// import ContactUsComponent from "../components/ContactUs/ContactUsComponent";
import { RoughNotation } from "react-rough-notation";
import { Icon } from "@iconify/react";

function Home() {
  const AboutUsSection = () => {
    return (
      <>
        <div className="flex flex-col items-center ">
          <div className="flex w-5/6 mt-16 mb-10 text-xl font-semibold font-poppins">
            <div className="flex items-center">
              <div className="mr-2 border-b-4 border-[#8b3479] w-7"></div>
            </div>
            About Us
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* <div className="about-us-container"> */}
          {/* <div className="about-header">About Us</div> */}

          {/* <div className="about-us-split-content"> */}
          <div className="flex flex-col w-5/6 xl:flex-row h-2/4">
            {/* <div className="about-us-split-text"> */}
            <div className=" basis-2/3">
              {/* <div className="about-us-split-text-title"> */}
              <div className=" pb-7 pt-3  text-[#8b3479] font-normal font-poppins text-4xl">
                Bright Eyes Animal Sanctuary
              </div>

              {/* <h1 className="about-us-split-text-description"> */}
              <h1 className="w-11/12 text-lg font-roboto">
                Bright Eyes was established in 1989 and is based in{" "}
                <span className="font-semibold ">
                  Co.Fermanagh, Northern Ireland.
                </span>
                <br />
                Our main purpose is to reduce unnecessary suffering and distress
                of companion animals through the provision of a rescue and
                re-homing service. We operate a strict no kill policy at Bright
                Eyes and if an animal, for any reason, cannot get a home it will
                have shelter here with us for life. <br />
              </h1>
              <div className="flex flex-col w-11/12 mt-10 text-lg font-roboto ">
                <div className="flex mb-5">
                  <Icon
                    icon="mdi:bone"
                    color="#8b3479"
                    width="30"
                    height="30"
                  />
                  &nbsp;
                  <span>
                    We support the local community and offer volunteering
                    opportunities, training and education on animal welfare
                  </span>
                </div>
                <div className="flex mb-5">
                  <Icon
                    icon="mdi:bone"
                    color="#8b3479"
                    width="30"
                    height="30"
                  />
                  &nbsp;
                  <span>
                    We receive no government funding and rely purely on the
                    generosity of the public to help us continue our work.
                  </span>
                </div>
                <div className="flex mb-5">
                  <Icon
                    icon="mdi:bone"
                    color="#8b3479"
                    width="30"
                    height="30"
                  />
                  &nbsp;
                  <span>
                    All animals rehomed from us are neutered/spayed, vaccinated,
                    microchipped, dewormed and deflead.
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="about-us-split-image"> </div> */}
            <div className="flex justify-center basis-1/3">
              <img
                className="w-2/5 bg-center bg-no-repeat xl:w-auto xl:h-4/5 rounded-xl"
                src="/puppyDogEyes.jpg"
                alt=""
              />
            </div>
          </div>
          {/* <Link href={`/about`}>
          <button
            type="button"
            className={[
              styles["about-us-read-more-button"],
              styles.button,
            ].join(" ")}
          >
            Learn More
          </button>
        </Link> */}
        </div>
      </>
    );
  };

  const GetInvolvedSection = () => {
    return (
      <>
        <div className="flex flex-col items-center ">
          <div className="flex justify-end w-5/6 mt-16 mb-10 mr-20 text-xl font-semibold font-poppins">
            Get Involved
            <div className="flex items-center">
              <div className="ml-2 border-b-4 border-[#8b3479] w-7"></div>
            </div>
          </div>
        </div>

        <div className="bg-[url('../public/DogGetInvolved.png')] bg-no-repeat bg-center bg-fixed bg-cover flex ">
          <div className="flex flex-col w-1/3 pt-20 ml-20 h-card-vh">
            <span className="text-3xl font-semibold text-[#8b3479] font-poppins sm:text-5xl">
              Want to help out?
            </span>
            <span className="mt-3 text-xl font-semibold text-white font-poppins sm:text-2xl">
              Join The Bright Eyes Team
            </span>
            <span className="mt-5 text-3xl font-semibold text-white font-poppins sm:text-xl">
              We receive no government funding and rely purely on the generosity
              of the public to help us continue our work.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-screen -mt-40">
          <div className="flex items-center justify-center w-full xl:w-4/5">
            <div className="flex flex-col w-80 h-96 bg-[url('../public/CardImage.png')] bg-no-repeat bg-center bg-cover mr-10">
              <div className="mt-5 ml-10">
                <Icon icon="cil:dog" color="white" width="60" height="60" />
              </div>
              <div className="flex flex-col p-10 ">
                <span className="text-3xl font-semibold text-[#8b3479] font-poppins mt-5 mb-5">
                  Adopt
                </span>
                Take a look at our pets for Adoption. Join the 2000+ other
                people and find the perfect pet for your home!
                <Button />
              </div>
            </div>
            <div className="flex flex-col w-80 h-96 bg-[url('../public/CardImage.png')] bg-no-repeat bg-center bg-cover mr-10 ">
              <div className="mt-5 ml-10">
                <Icon
                  icon="bx:donate-heart"
                  color="white"
                  width="60"
                  height="60"
                />
              </div>
              <div className="flex flex-col p-10 ">
                <span className="text-3xl font-semibold text-[#8b3479] font-poppins mt-5 mb-5">
                  Donate
                </span>
                We receive no government funding and rely purely on the
                generosity of the public to help us continue our work.
                <Button />
              </div>
            </div>
            <div className="flex flex-col w-80 h-96 bg-[url('../public/CardImage.png')] bg-no-repeat bg-center bg-cover">
              <div className="mt-5 ml-10">
                <Icon
                  icon="carbon:person-favorite"
                  color="white"
                  width="60"
                  height="60"
                />
              </div>
              <div className="flex flex-col p-10 ">
                <span className="text-3xl font-semibold text-[#8b3479] font-poppins mt-5 mb-5">
                  Volunteer
                </span>
                Our fantastic volunteers are the backbone of Bright Eyes. Want
                to help care for the animals and earn some valuable experience?
                <Button />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Button = () => {
    return (
      <button className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner">
        <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
          <span className="pr-4">View Animals</span>
          <Icon
            className=""
            icon="fa:long-arrow-right"
            inline={true}
            color="white"
          />
        </div>
      </button>
    );
  };

  return (
    <>
      <div className="relative block bg-no-repeat sm:bg-center sm:bg-cover bg-[url('../public/DogHero4.png')]">
        <div className="h-85-vh"></div>
        {/* <div className="relative w-full h-auto bg-center bg-no-repeat bg-contain"> */}
        {/* <img className="" src="/DogHero4.png" alt="" /> */}
        {/* <div className="w-full h-screen bg-no-repeat bg-[url('../public/DogHero4.png')]"></div> */}
        {/* <img className=" sm:hidden" src="/MobileHero.png" alt="" /> */}
        {/* <img src="/DogHero4.png" alt="" /> */}
        <div className="absolute w-full rotate-180 -bottom-1 top-1/3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 19.6"
            preserveAspectRatio="none"
          >
            <path
              className="fill-white opacity-20"
              d="M0 0v19L142 4l142 15V0z"
            />
            <path
              className="fill-white opacity-20"
              d="M0 0v13l142-9 142 9V0z"
            />
            <path className="fill-white opacity-20" d="M0 0v6l142-2 142 2V0z" />
            <path className="fill-white" d="M0 0v1l142 3 142-3V0z" />
          </svg>
        </div>
        {/* <div className="relative w-96 h-96">
        <div className="w-full h-full bg-center bg-no-repeat bg-contain bg-[url('../public/DogHero4.png')]"></div>
        <div className="absolute w-full rotate-180 -bottom-1 top-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 19.6"
            preserveAspectRatio="none"
          >
            <path
              className="fill-white opacity-20"
              d="M0 0v19L142 4l142 15V0z"
            />
            <path
              className="fill-white opacity-20"
              d="M0 0v13l142-9 142 9V0z"
            />
            <path className="fill-white opacity-20" d="M0 0v6l142-2 142 2V0z" />
            <path className="fill-white" d="M0 0v1l142 3 142-3V0z" />
          </svg>
        </div> */}

        <div className="absolute flex top-1/4 left-5 xl:left-20">
          <span className="text-3xl font-semibold font-poppins sm:text-5xl">
            Don&apos;t buy, &nbsp;
            <RoughNotation
              iterations={5}
              type="circle"
              show={true}
              color="#8b3479"
              strokeWidth={1}
            >
              adopt!
            </RoughNotation>
          </span>
          <div className="absolute flex flex-col mt-14 sm:mt-20 ">
            <span className="text-lg font-normal sm:text-xl font-poppins">
              Take a look at some of the wonderful animals we have at <br />
              Bright Eyes Animal Sanctuary.
            </span>
            <Button />
          </div>
        </div>
        {/* 
        <div className="absolute flex top-8 left-5 xl:left-20 m">
          <span className="text-2xl font-semibold font-poppins">
            Don&apos;t buy, &nbsp;
            <RoughNotation
              iterations={5}
              type="circle"
              show={true}
              color="#8b3479"
              strokeWidth={1}
            >
              adopt!
            </RoughNotation>
          </span>
          <div className="absolute flex flex-col mt-10 ">
            <span className="text-sm font-normal font-poppins">
              Take a look at some of the wonderful animals we have at <br />
              Bright Eyes Animal Sanctuary.
            </span>
            <Button />
          </div>
        </div> */}
      </div>

      <AboutUsSection />

      <div className="flex items-center justify-center ">
        <div className="flex flex-wrap items-center justify-center w-5/6">
          <div className="flex items-center justify-center p-8 mt-10 mr-10 border rounded-lg shadow-xl h-36 hover:shadow-2xl w-96">
            <div className="flex pr-10">
              <Icon
                icon="fluent-emoji-high-contrast:dog"
                color="#8b3479"
                width="70"
                height="70"
              />
            </div>
            <div className="flex flex-col w-3/6">
              <span className="text-lg font-medium font-poppins text-[#8b3479]">
                OVER 2000
              </span>
              <span className="text-sm font-normal flex-nowrap font-poppins">
                Pets Adopted within the past 5 years
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 mt-10 mr-10 border rounded-lg shadow-xl h-36 hover:shadow-2xl w-96">
            <div className="flex pr-10">
              <Icon
                icon="ic:outline-volunteer-activism"
                color="#8b3479"
                width="70"
                height="70"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium font-poppins text-[#8b3479]">
                OVER 20
              </span>
              <span className="font-normal font-poppins">
                Helpful volunteers working at Bright Eyes
              </span>
            </div>
          </div>{" "}
          <div className="flex items-center justify-center p-8 mt-10 mr-10 border rounded-lg shadow-xl h-36 hover:shadow-2xl w-96">
            <div className="flex pr-10">
              <Icon
                icon="iconoir:stats-square-up"
                color="#8b3479"
                width="70"
                height="70"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium font-poppins text-[#8b3479]">
                OVER 30
              </span>
              <span className="font-normal font-poppins">
                Years Experience getting pets the help they need
              </span>
            </div>
          </div>
        </div>
      </div>
      <GetInvolvedSection />
      <div className="get-involved-container-home">
        <div className="get-involved-header">Get Involved</div>

        <div className="get-involved-split-container">
          <div className="get-involved-split">
            <div className="involved-main-text"> Adopt</div>
            <div className="involved-image-1"></div>
            {/* <Link href="/adoption">
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
            </Link> */}
            <div className="involved-main-subtext">
              Take a look at our pets for Adoption. Join the 2000+ other people
              and find the perfect pet for your home!
            </div>
          </div>
          <div className="get-involved-split">
            <div className="involved-main-text"> Donate</div>
            <div className="involved-image-2"> </div>
            {/* <Link href="/donate">
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
            </Link> */}
            <div className="involved-main-subtext">
              We receive no government funding and rely purely on the generosity
              of the public to help us continue our work.
            </div>
          </div>
          <div className="get-involved-split">
            <div className="involved-main-text"> Volunteer</div>
            <div className="involved-image-3"> </div>
            {/* <Link href="/forms/volunteer">
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
            </Link> */}
            <div className="involved-main-subtext">
              Our fantastic volunteers are the backbone of Bright Eyes. Want to
              help care for the animals and earn some valuable experience?
            </div>
          </div>
        </div>
      </div>
      {/* <ContactUsComponent /> */}
      <div className="info-container">
        <div className="info-split-container">
          <div className="info-split">
            <div className="info-header">Location</div>
            <div className="info-main-text">
              53 Killymittan Road,
              <br />
              BT94 2FW,
              <br />
              Ballinamallard
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Hours</div>
            <div className="info-main-text">
              {" "}
              <span className="bold-noto">Mon - Sun:</span> 12:00 – 15:00
              <br />
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Contact Info</div>
            <div className="info-main-text">
              <span className="bold-noto">Mobile:</span> 07710607816
              <br />
              <span className="bold-noto">Phone:</span> 028 66 388885
              <br />
              <span className="bold-noto">Email:</span>{" "}
              brighteyes.sanctuary@btinternet.com
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Follow Us</div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/brighteyes.a.s/"
            >
              <span
                // className={styles.iconify}
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
                // className={styles.iconify}
                data-icon="akar-icons:instagram-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
          </div>
        </div>
      </div>
      <Map />
    </>
  );
}

export default Home;
