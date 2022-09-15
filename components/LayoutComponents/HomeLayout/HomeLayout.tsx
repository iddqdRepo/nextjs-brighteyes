import { InfoCard, AboutCard } from "../HomeLayout/HomeLayoutComponents";
import { Button, DashedTitle } from "../../common/CommonComponents";
import { Formik } from "formik";
import { RoughNotation } from "react-rough-notation";
import { Icon } from "@iconify/react";
export const HeroSection = () => {
  return (
    <div className="relative block bg-no-repeat sm:bg-center sm:bg-cover bg-[url('../public/DogHero4.png')]">
      <div className="h-85-vh"></div>

      <div className="absolute w-full rotate-180 -bottom-1 top-1/3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 283.5 19.6"
          preserveAspectRatio="none"
        >
          <path className="fill-white opacity-20" d="M0 0v19L142 4l142 15V0z" />
          <path className="fill-white opacity-20" d="M0 0v13l142-9 142 9V0z" />
          <path className="fill-white opacity-20" d="M0 0v6l142-2 142 2V0z" />
          <path className="fill-white" d="M0 0v1l142 3 142-3V0z" />
        </svg>
      </div>

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
          <Button text="View Animals" />
        </div>
      </div>
    </div>
  );
};
export const AboutUsSection = () => {
  return (
    <>
      <DashedTitle text="About Us" />
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-5/6 xl:flex-row h-2/4">
          <div className=" basis-2/3">
            <div className=" pb-7 pt-3  text-[#8b3479] font-normal font-poppins text-4xl">
              Bright Eyes Animal Sanctuary
            </div>

            <h1 className="w-11/12 text-lg font-roboto">
              Bright Eyes was established in 1989 and is based in
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
                <Icon icon="mdi:bone" color="#8b3479" width="30" height="30" />
                &nbsp;
                <span>
                  We support the local community and offer volunteering
                  opportunities, training and education on animal welfare
                </span>
              </div>
              <div className="flex mb-5">
                <Icon icon="mdi:bone" color="#8b3479" width="30" height="30" />
                &nbsp;
                <span>
                  We receive no government funding and rely purely on the
                  generosity of the public to help us continue our work.
                </span>
              </div>
              <div className="flex mb-5">
                <Icon icon="mdi:bone" color="#8b3479" width="30" height="30" />
                &nbsp;
                <span>
                  All animals rehomed from us are neutered/spayed, vaccinated,
                  microchipped, dewormed and deflead.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center basis-1/3">
            <img
              className="w-4/5 bg-center bg-no-repeat sm:w-2/5 xl:w-auto xl:h-4/5 rounded-xl"
              src="/puppyDogEyes.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const CardsSection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center w-full sm:w-5/6">
        <InfoCard
          title="OVER 2000"
          text="Pets Adopted within the past 5 years"
          icon="fluent-emoji-high-contrast:dog"
        />
        <InfoCard
          title="OVER 20"
          text="Helpful volunteers working at Bright Eyes"
          icon="ic:outline-volunteer-activism"
        />
        <InfoCard
          title="OVER 30"
          text="Years Experience getting pets the help they need"
          icon="iconoir:stats-square-up"
        />
      </div>
    </div>
  );
};
export const ContactUsSection = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  return (
    <>
      <DashedTitle text="Contact Us" />

      <div className="flex items-center justify-center mb-20">
        <div className="flex flex-col-reverse items-center justify-center w-full lg:flex-row xl:w-2/3">
          <Formik
            initialValues={initialValues}
            onSubmit={(data) => console.log(data)}
          >
            {({ values, handleChange }) => (
              <div className="flex flex-col items-start w-5/6 p-8 bg-white border rounded-md shadow-md ">
                <div className="flex">
                  <div className="flex flex-col mr-4 lg:mr-20">
                    <label
                      htmlFor="name"
                      className={"block mb-2 text-lg font-normal font-poppins"}
                    >
                      Name
                    </label>
                    <input
                      className={
                        "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                      }
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className={"block mb-2 text-lg font-normal font-poppins"}
                    >
                      Email
                    </label>
                    <input
                      className={
                        "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                      }
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <label
                  htmlFor="message"
                  className={"block mb-2 text-lg font-normal font-poppins"}
                >
                  Message
                </label>
                <textarea
                  className={
                    "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                  }
                  rows={14}
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            )}
          </Formik>
          <div className="flex justify-center basis-2/3">
            <img
              className="bg-center bg-no-repeat sm:w-4/5 xl:w-full"
              src="/ContactUsImage.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const GetInvolvedSection = () => {
  return (
    <>
      <DashedTitle text="Get Involved" />

      <div className="bg-[url('../public/DogGetInvolved.png')] bg-no-repeat bg-center bg-fixed bg-cover flex ">
        <div className="flex flex-col w-2/3 pt-5 ml-20 sm:pt-20 xl:w-1/3 h-card-vh">
          <span className="text-5xl font-semibold text-[#8b3479] font-poppins">
            Want to help out?
          </span>
          <span className="mt-3 text-2xl font-semibold text-white font-poppins ">
            Join The Bright Eyes Team
          </span>
          <span className="mt-5 text-xl font-semibold text-white font-poppins ">
            We receive no government funding and rely purely on the generosity
            of the public to help us continue our work.
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full -mt-10 sm:-mt-40">
        <div className="flex flex-wrap items-center justify-center w-full xl:flex-nowrap xl:w-4/5">
          <AboutCard
            icon="cil:dog"
            title="Adopt"
            text=" Take a look at our pets for Adoption. Join the 2000+ other
            people and find the perfect pet for your home!"
            buttonText="View Animals"
          />
          <AboutCard
            icon="bx:donate-heart"
            title="Donate"
            text="We receive no government funding and rely purely on the
            generosity of the public to help us continue our work."
            buttonText="More Info"
          />
          <AboutCard
            icon="carbon:person-favorite"
            title="Volunteer"
            text=" Our fantastic volunteers are the backbone of Bright Eyes. Want
            to help care for the animals and earn some valuable experience?"
            buttonText="View Animals"
          />
        </div>
      </div>
    </>
  );
};
