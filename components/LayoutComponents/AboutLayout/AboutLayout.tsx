/* eslint-disable @next/next/no-img-element */
import { DashedTitle } from "../../common/CommonComponents";

export const AboutPatSection = () => {
  return (
    <>
      <DashedTitle text={"Our Founder"} />

      <div className="flex flex-col items-center">
        <div className="flex flex-col w-5/6 xl:flex-row h-2/4">
          <div className=" basis-2/3">
            <div className=" pb-7 pt-3  text-[#8b3479] font-normal font-poppins text-4xl">
              About Pat
            </div>

            <div className="w-11/12 text-lg font-poppins">
              <span className="-mr-1 text-3xl">P</span> at was a tireless
              advocate for animal rights and animal welfare. He devoted his
              whole life to the welfare and well-being of all animals that came
              into his care, often to the detriment of his own health. <br />
              <br />
              Through all the hard times Pat never lost his focus on helping the
              animals. Each and every one was given the help they needed,
              despite mounting vet and food bills and very limited funding.{" "}
              <br />
              <br />
              Back in the late 70&apos;s Pat and his wife rescued a stray tabby
              cat to their home in Derrin Park Enniskillen. Little did he know
              this would be the beginning of his success and a lifelong
              commitment. By the early 80&apos;s Pat had rescued a host of
              abandoned cats and cared for them in his home on the Kilmacormick
              estate. His reputation was growing and he earned the respected
              nickname of &apos;Pat the cat&apos; . Pat&apos;s next move was to
              a disused farm building in Coa. Pat lived in a cold cramped
              caravan while the animals, now also dogs, lived in the
              outbuildings. <br />
              <br />
              Pat&apos;s last move was to Killymittan Ballinamallard in 1995.
              Pat had a good team to support him and turned a dilapidated house
              and outbuildings to the facilities we see today, very impressive
              considering he received no formal funding, just generous donations
              from the public. <br />
              Pats dedication was recognised by being awarded a lifetime
              achievement award from the &apos; International Fund for Animal
              Welfare&apos;. Pat sadly passed away in 2013 but his legacy lives
              on. Pat&apos;s ashes now rest here at his beloved sanctuary which
              he worked so hard to establish. Rest easy friend of animals, your
              work here goes on.
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-10 xl:mt-0 basis-1/3">
            <img
              className="w-4/5 bg-center bg-no-repeat shadow-2xlxl sm:w-2/5 xl:w-auto xl:h-80 rounded-xl"
              src="/pat.jpg"
              alt=""
            />
            <div className="flex justify-center text-3xl font-poppins">
              Pat Nolan
            </div>
            <div className="flex justify-center text-xl font-poppins">
              1946 - 2013
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const AboutBrightEyesSection = () => {
  return (
    <div className="flex flex-col h-fit relative mt-32 pb-20 bg-[#c8a9c0] overflow-visible after:w-full after:h-full after:absolute after:bg-inherit after:-z-10 after:bottom-0 after:origin-top-right after:skew-y-2 ">
      <DashedTitle text={"About Bright Eyes"} />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full xl:flex-row h-2/4">
          <div className=" basis-2/3">
            <div className=" pb-7 pt-3  text-[#8b3479] font-normal font-poppins text-4xl">
              Bright Eyes Animal Sanctuary
            </div>
            <div className="w-11/12 text-xl font-poppins">
              <span className="slanted-about-us-bold-desc">
                We are based in Co.Fermanagh, Northern Ireland.
              </span>
              <br />
              <br />

              <div className="slanted-about-us-split-text-description">
                Bright Eyes was established in 1989, formerly registered with
                HMRC as a charity and reregistered with the Northern Ireland
                Charity Commission in 2016. <br /> <br />
                Our main purpose is a reduction in unnecessary suffering and
                distress of companion animals through the provision of a rescue
                and re-homing service. We provide a sanctuary for the care,
                protection, treatment and temporary or permanent accommodation
                of such animals.
                <br /> We rely heavily on volunteers to help with the running of
                the sanctuary and in return we provide social support,
                education, mental support and animal welfare training (in some
                cases leading to employment in a related field or academic
                qualifications). We have undertaken intensive feral cat
                neutering and spaying over the years resulting in a noticeable
                reduction in feral cat population. We operate a{" "}
                <span className="slanted-about-us-bold-desc">
                  no kill policy
                </span>{" "}
                at Bright Eyes and if an animal for any reason cannot get a home
                it will have shelter here with us for life. We receive no
                government funding and rely purely on the generosity of the
                public to help us continue our work. Rehoming from us All
                animals rehomed from us are neutered/spayed, vaccinated,
                microchipped, dewormed and deflead Please see page with animals
                that need a home and relevant application form.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InterviewSection = () => {
  return (
    <>
      <DashedTitle text={"An Interview With The Founder"} />
      <div className="flex justify-center mb-6">
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
    </>
  );
};
