import React from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "react-qr-code";
import { Icon } from "@iconify/react";
import petModel from "../../../../models/petModel";
import dbConnect from "../../../../utils/dbConnect";
import { PetInterface } from "../../../../interfaces/interfaces";
import { AdminHeadTag } from "../../../../adminComponents/commonAdminComponents";
import { PetPhoto } from "../../../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";
import { server } from "../../../../config";
import { gateAdminPage } from "../../../../utils/auth";

//A print-ready A4 adoption poster: photo, details and a QR code straight to
//the animal's page. For shop windows, vet noticeboards and the sanctuary
//gate. Deliberately no admin chrome, so printing gives a clean sheet.
function Poster({ animal }: { animal: PetInterface[] }) {
  const pet = animal[0];
  const publicUrl = `${server}/adoption/${pet._id}`;

  return (
    <>
      <AdminHeadTag
        title={`Poster - ${pet.name}`}
        metaContent={"Printable adoption poster, Bright Eyes"}
        linkHref={"/admin/animals"}
      />
      <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
        {/* toolbar — never printed */}
        <div className="mx-auto mb-6 flex w-[210mm] max-w-full items-center justify-between px-4 print:hidden">
          <Link
            href={"/admin/animals?archive=false"}
            className="flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand hover:text-brand font-poppins"
          >
            <Icon icon="akar-icons:arrow-left" width="14" />
            Back to Animals
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins"
          >
            <Icon icon="carbon:printer" width="16" />
            Print Poster
          </button>
        </div>

        {/* the A4 sheet */}
        <div className="mx-auto flex min-h-[280mm] w-[210mm] max-w-full flex-col bg-white p-10 shadow-2xl print:min-h-0 print:shadow-none">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo-nav.png"
              alt="Bright Eyes Animal Sanctuary"
              width={64}
              height={58}
            />
            <span className="font-poppins">
              <span className="block text-xl font-semibold tracking-[0.2em] text-brand">
                BRIGHT EYES
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-gray-500">
                Animal Sanctuary
              </span>
            </span>
          </div>

          <h1 className="mt-6 text-center text-5xl font-semibold text-gray-900 font-poppins">
            Could you give <span className="text-brand">{pet.name}</span> a
            home?
          </h1>

          <PetPhoto
            image={pet.image}
            className="mt-8 h-[130mm] w-full rounded-3xl border border-gray-200"
          />

          <div className="mt-8 grid grid-cols-4 gap-3 text-center">
            {[
              { label: "Type", value: pet.type },
              { label: "Breed", value: pet.breed },
              { label: "Age", value: `${pet.age} ${pet.yearsOrMonths}` },
              { label: "Sex", value: pet.sex || "N/A" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border-2 border-brand-100 p-3"
              >
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gray-500 font-poppins">
                  {item.label}
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900 font-poppins">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {pet.desc && (
            <p className="mx-auto mt-6 max-w-[170mm] text-center text-base leading-7 text-gray-700 font-poppins">
              {pet.desc.length > 260
                ? `${pet.desc.slice(0, 260).trim()}…`
                : pet.desc}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-6 border-t-2 border-gray-100 pt-6">
            <div className="font-poppins">
              <div className="text-lg font-semibold text-brand">
                Scan to meet {pet.name} online
              </div>
              <div className="mt-2 flex flex-col gap-1 text-sm text-gray-700">
                <span className="flex items-center gap-2">
                  <Icon icon="carbon:phone-voice" color="#8b3479" width="15" />
                  028 66 720078
                </span>
                <span className="flex items-center gap-2">
                  <Icon icon="akar-icons:location" color="#8b3479" width="15" />
                  53 Killymittan Road, BT94 2FW, Ballinamallard
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  {publicUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl border-2 border-brand-100 p-3">
              <QRCode
                value={publicUrl}
                size={128}
                aria-label={`QR code for ${pet.name}'s page`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Poster;

export async function getServerSideProps(context: {
  params: { id: string };
  req: { cookies?: Partial<{ [key: string]: string }> };
}) {
  const gate = await gateAdminPage(context.req, "animals");
  if (gate.redirect) {
    return gate.redirect;
  }

  await dbConnect();
  let dataTemp;
  try {
    dataTemp = await petModel.find({ _id: context.params.id }).lean();
  } catch {
    return { notFound: true };
  }
  if (dataTemp.length === 0) {
    return { notFound: true };
  }
  const animal = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.name) {
      doc.name = doc.name.trim();
    }
    if (doc.createdAt) {
      doc.createdAt = doc.createdAt.toString();
    }
    if (doc.updatedAt) {
      doc.updatedAt = doc.updatedAt.toString();
    }
    return doc;
  });

  return {
    props: { animal, currentUser: gate.user },
  };
}
