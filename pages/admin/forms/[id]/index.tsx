import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
  PageHeader,
} from "../../../../adminComponents/commonAdminComponents";
import {
  FieldSet,
  Label,
} from "../../../../components/IndividualFormLayout/CommonFormComponents";
import {
  ContactUsFormInterface,
  FormNote,
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  TitleMapInterface,
  VolunteerFormInterface,
} from "../../../../interfaces/interfaces";
import formModels from "../../../../models/formModels";
import dbConnect from "../../../../utils/dbConnect";
import titleMap from "../../../../utils/mappingTitles";
import { stringifyIdsAndDates } from "../../../../utils/stringifyIdsAndDates";
import { AdminUser, gateAdminPage } from "../../../../utils/auth";
import { FormApiType, updateFormTracking } from "../../../../routes/formRoutes";

//The form's own `type` value → the query type the API expects.
const API_TYPE: { [key: string]: FormApiType } = {
  Dog: "pet",
  Cat: "pet",
  giftAid: "giftaid",
  volunteer: "volunteer",
  contactUs: "contactus",
};

//Tracking + housekeeping fields that must not render as question fieldsets.
const HIDDEN_FIELDS = new Set([
  "_id",
  "type",
  "updatedAt",
  "archive",
  "date",
  "__v",
  "status",
  "handledBy",
  "handledAt",
  "read",
  "notes",
]);

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

//Everything the applicant gave us that staff can act on with one tap.
const contactDetails = (about: { [key: string]: string | undefined }) => {
  return [
    { label: "Phone", value: about.phone },
    { label: "Mobile", value: about.mobile },
    { label: "Home", value: about.homePhone },
    { label: "Work", value: about.workPhone },
  ].filter((entry) => entry.value);
};

function Index({
  form,
  currentUser,
}: {
  form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[];
  currentUser: AdminUser;
}) {
  const record = form[0];
  const recordId = record._id as string;
  const apiType = API_TYPE[record.type] ?? "pet";
  const about =
    record.aboutQuestions && typeof record.aboutQuestions === "object"
      ? (record.aboutQuestions as {
          [key: string]: string | undefined;
        })
      : {};
  const applicantName =
    typeof about.name === "string" && about.name.trim()
      ? about.name.trim()
      : "Unknown applicant";

  //"legacy" = submitted before tracking existed (no status field).
  const [status, setStatus] = useState<"new" | "handled" | "legacy">(
    record.status === "handled"
      ? "handled"
      : record.status === "new"
      ? "new"
      : "legacy"
  );
  const [handledBy, setHandledBy] = useState(record.handledBy || "");
  const [handledAt, setHandledAt] = useState(record.handledAt || "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [notes, setNotes] = useState<FormNote[]>(record.notes ?? []);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteError, setNoteError] = useState(false);

  //Opening a submission marks it read, so the dashboard's "Unread Messages"
  //count reflects what has actually been looked at.
  useEffect(() => {
    if (!record.read) {
      updateFormTracking(apiType, recordId, { read: true }).catch(() => {
        //Purely cosmetic; the page still works if this fails.
      });
    }
  }, [apiType, recordId, record.read]);

  const toggleStatus = async () => {
    const next = status === "handled" ? "new" : "handled";
    setSavingStatus(true);
    try {
      const body = await updateFormTracking(apiType, recordId, {
        status: next,
      });
      setStatus(body.data.status === "handled" ? "handled" : "new");
      setHandledBy(body.data.handledBy || "");
      setHandledAt(body.data.handledAt || "");
    } catch {
      //Leave the current state showing; the next tap retries.
    } finally {
      setSavingStatus(false);
    }
  };

  const addNote = async () => {
    const text = noteText.trim();
    if (!text) {
      return;
    }
    setSavingNote(true);
    setNoteError(false);
    try {
      const body = await updateFormTracking(apiType, recordId, {
        addNote: text,
      });
      setNotes(body.data.notes ?? []);
      setNoteText("");
    } catch {
      setNoteError(true);
    } finally {
      setSavingNote(false);
    }
  };

  const emailSubject =
    record.type === "contactUs"
      ? "Re: your message to Bright Eyes Animal Sanctuary"
      : `Your ${
          record.type === "giftAid"
            ? "Gift Aid"
            : record.type === "volunteer"
            ? "volunteer"
            : "adoption"
        } form for Bright Eyes Animal Sanctuary`;

  const phones = contactDetails(about);
  const FieldAndAnswer = ({
    labelText,
    answer,
  }: {
    labelText: string;
    answer: string;
  }) => {
    return (
      <div className="flex flex-col items-center justify-start pt-2 mb-4 ml-1 mr-1 border border-gray-300 w-60">
        <Label
          text={titleMap[labelText as keyof TitleMapInterface] || labelText}
          hFor={"val"}
          classN="text-center text-xs"
        />

        <div className="text-center text-wrap h-fit text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60  p-2.5 ">
          {answer}
        </div>
      </div>
    );
  };
  return (
    <>
      <AdminHeadTag
        title={"View Form"}
        metaContent={"Admin View Form, Bright Eyes"}
        linkHref={"/admin/forms/"}
      />
      <AdminSidebarComponent highlighted="" currentUser={currentUser}>
        <PageContainerComponent>
          <PageHeader>{form[0].type + " Form for " + applicantName}</PageHeader>

          {/* who's on it + one-tap ways to reach the applicant */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              {status === "handled" ? (
                <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 font-poppins">
                  <Icon icon="mdi:account-check" width="14" height="14" />
                  Being handled
                  {handledBy &&
                    ` — ${handledBy}${
                      handledAt ? `, ${formatDate(handledAt)}` : ""
                    }`}
                </span>
              ) : status === "new" ? (
                <span className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-deep font-poppins">
                  New
                </span>
              ) : (
                <span
                  title="This form arrived before tracking was added, so nobody has claimed it in the system yet."
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 font-poppins"
                >
                  Pre-update &#8212; submitted before tracking
                </span>
              )}
              <button
                id="toggle-status"
                onClick={toggleStatus}
                disabled={savingStatus}
                className={
                  status === "handled"
                    ? "rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-brand hover:text-brand font-poppins disabled:opacity-50"
                    : "rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-dark font-poppins disabled:opacity-50"
                }
              >
                {savingStatus
                  ? "Saving…"
                  : status === "handled"
                  ? "Mark as new"
                  : "I'm handling this"}
              </button>
            </div>
            {(about.email || phones.length > 0) && (
              <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                {about.email && (
                  <a
                    href={`mailto:${about.email}?subject=${encodeURIComponent(
                      emailSubject
                    )}`}
                    className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark font-poppins"
                  >
                    <Icon icon="akar-icons:envelope" width="14" height="14" />
                    Reply by email
                  </a>
                )}
                {phones.map((phone) => (
                  <a
                    key={phone.label}
                    href={`tel:${String(phone.value).replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-brand hover:text-brand font-poppins"
                  >
                    <Icon icon="carbon:phone" width="14" height="14" />
                    {phone.label}: {phone.value}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* shared team memory: who rang whom, what was agreed */}
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-base font-semibold text-gray-900 font-poppins">
              Staff notes
            </div>
            <p className="mt-0.5 text-xs text-gray-500 font-poppins">
              Only the team can see these. e.g. &quot;Left a voicemail, will try
              again Friday&quot;
            </p>
            {notes.length > 0 && (
              <div className="mt-3 flex flex-col gap-2">
                {notes.map((note, index) => (
                  <div key={index} className="rounded-xl bg-gray-50 p-3">
                    <div className="whitespace-pre-wrap text-sm text-gray-800 font-poppins">
                      {note.text}
                    </div>
                    <div className="mt-1 text-xs text-gray-500 font-poppins">
                      {note.by}
                      {note.date && ` · ${formatDate(note.date)}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <textarea
                id="new-note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note for the team…"
                className="h-20 grow rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 font-poppins"
              />
              <button
                id="add-note"
                onClick={addNote}
                disabled={savingNote || !noteText.trim()}
                className="shrink-0 self-start rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-dark font-poppins disabled:opacity-50"
              >
                {savingNote ? "Saving…" : "Add note"}
              </button>
            </div>
            {noteError && (
              <p className="mt-2 text-xs font-medium text-red-600 font-poppins">
                Could not save that note — please try again.
              </p>
            )}
          </div>

          {Object.entries(form[0]).map(([fieldSetTitle, fieldSetContent]) => {
            if (
              fieldSetTitle === "message" ||
              fieldSetTitle === "giftAidFuture" ||
              fieldSetTitle === "giftAidPast" ||
              fieldSetTitle === "declarationAccepted" ||
              fieldSetTitle === "declarationText" ||
              fieldSetTitle === "declarationTextVersion" ||
              fieldSetTitle === "acceptedAt"
            ) {
              return (
                <FieldSet key={fieldSetTitle} legendText={fieldSetTitle}>
                  <FieldAndAnswer
                    labelText={fieldSetTitle}
                    answer={
                      typeof fieldSetContent === "boolean"
                        ? fieldSetContent
                          ? "Yes"
                          : "No"
                        : String(fieldSetContent ?? "")
                    }
                  />
                </FieldSet>
              );
            } else {
              return (
                !HIDDEN_FIELDS.has(fieldSetTitle) &&
                fieldSetContent !== null &&
                typeof fieldSetContent === "object" &&
                !Array.isArray(fieldSetContent) && (
                  <FieldSet key={fieldSetTitle} legendText={fieldSetTitle}>
                    {Object.entries(fieldSetContent).map(
                      ([question, answer]) => {
                        if (
                          //If it's an object, go deeper and un-nest
                          typeof answer === "object" &&
                          !Array.isArray(answer) &&
                          answer !== null
                        ) {
                          return Object.entries(answer).map(
                            ([nestedQuestion, nestedAnswer]) => {
                              return (
                                //Dont show blank answers
                                nestedAnswer && (
                                  <FieldAndAnswer
                                    key={nestedQuestion}
                                    labelText={nestedQuestion}
                                    answer={nestedAnswer}
                                  />
                                )
                              );
                            }
                          );
                        } else {
                          return (
                            //Dont show blank answers
                            answer !== "" && (
                              <FieldAndAnswer
                                key={question}
                                labelText={question}
                                answer={answer as string}
                              />
                            )
                          );
                        }
                      }
                    )}
                  </FieldSet>
                )
              );
            }
          })}
          {/* <pre>{JSON.stringify(form[0], null, 2)}</pre> */}
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

//Rendered at request time (never at build time): submitted forms hold
//applicants' personal data, which must not be baked into build artifacts.
//The middleware's JWT check still gates every request to /admin pages.
export async function getServerSideProps(context: {
  params: { id: string };
  req: { cookies?: Partial<{ [key: string]: string }> };
}) {
  //Submitted forms contain applicants' personal data, so viewing one needs
  //the forms permission.
  const gate = await gateAdminPage(context.req, "forms");
  if (gate.redirect) {
    return gate.redirect;
  }

  await dbConnect();
  const id = context.params.id;
  let form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[] = [];

  try {
    //try contactUs first, then giftAid, then volunteer, then adoption
    if (form.length === 0) {
      form = await formModels.FormContactUsModel.find({ _id: id }).lean();
    }
    if (form.length === 0) {
      form = await formModels.FormGiftAidModel.find({ _id: id }).lean();
    }
    if (form.length === 0) {
      form = await formModels.FormVolunteerModel.find({ _id: id }).lean();
    }
    if (form.length === 0) {
      form = await formModels.FormPetAdoptionModel.find({ _id: id }).lean();
    }
  } catch {
    //A malformed id fails the ObjectId cast; treat it as not found.
    return { notFound: true };
  }

  if (form.length === 0) {
    return { notFound: true };
  }

  stringifyIdsAndDates(form);

  return {
    props: {
      form,
      currentUser: gate.user,
    },
  };
}
