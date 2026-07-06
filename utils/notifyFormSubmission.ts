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

//The name comes straight from the public request body; escaping it stops a
//submitted "name" like <a href=evil>…</a> becoming live HTML in the
//charity's inbox (a ready-made phishing vector).
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const notifyFormSubmission = async (
  formType: string,
  submitterName?: string
) => {
  if (process.env.FORM_NOTIFICATIONS_DISABLED === "true") {
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return; //Notifications are optional; the form has already been saved.
  }

  const label = FORM_LABELS[formType] || "Form";
  const safeName =
    typeof submitterName === "string"
      ? escapeHtml(submitterName.slice(0, 80))
      : "";
  const from = safeName ? ` from ${safeName}` : "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  //Bound how long a slow email provider can hold up the 201 response; the
  //visitor's submission is already saved at this point.
  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 5000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: abort.signal,
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
  } finally {
    clearTimeout(timeout);
  }
};
