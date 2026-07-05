//Emails the charity the moment a form lands, so nobody has to remember to
//check the dashboard. Sending is strictly best-effort: a form submission must
//NEVER fail because the email provider is down, so callers fire this after the
//form is safely in the database and every error is swallowed (but logged).

const LIVE_EMAIL = "brighteyes.sanctuary@btinternet.com";
const TEST_EMAIL = "chris.walker.beng@gmail.com";

//Until a sending domain is verified in Resend, only the onboarding sender
//works. Set RESEND_FROM after verifying a domain to use a branded address.
const DEFAULT_FROM = "Bright Eyes Website <onboarding@resend.dev>";

const FORM_LABELS: Record<string, string> = {
  pet: "Adoption application",
  giftaid: "Gift Aid declaration",
  volunteer: "Volunteer application",
  contactus: "Contact message",
};

export const notificationRecipient = () =>
  process.env.FORM_NOTIFY_EMAIL ||
  (process.env.VERCEL_ENV === "production" ? LIVE_EMAIL : TEST_EMAIL);

export const notifyFormSubmission = async (
  formType: string,
  submitterName?: string
) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return; //Notifications are optional; the form has already been saved.
  }

  const label = FORM_LABELS[formType] || "Form";
  const from = submitterName ? ` from ${submitterName}` : "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: [notificationRecipient()],
        subject: `New ${label.toLowerCase()}${from} — Bright Eyes website`,
        //Deliberately no personal details beyond the first name: the full
        //submission stays in the admin dashboard, not in inboxes.
        html: [
          `<p>A new <strong>${label.toLowerCase()}</strong>${from} has just been submitted on the website.</p>`,
          siteUrl
            ? `<p><a href="${siteUrl}/admin/forms?archive=false">Log in to the dashboard to view it</a>.</p>`
            : `<p>Log in to the admin dashboard to view it.</p>`,
        ].join(""),
      }),
    });

    if (!response.ok) {
      console.error(
        "Form notification email failed:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Form notification email failed:", error);
  }
};
