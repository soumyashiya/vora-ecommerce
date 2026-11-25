import path from "node:path";
import { pathToFileURL } from "node:url";

// The order-confirmation mailer lives OUTSIDE this repo, in a folder shared
// by several sites on the VPS. On the VPS, vora's project root is
// /var/www/vora/app/, so the shared module sits two levels up at
// /var/www/shared-email/order-email.js.
//
// It is loaded at request time (not with a static import) so the build never
// needs that folder. A static import made `next build` fail anywhere the
// folder is missing — Vercel and local machines included.
//
// Override the location with SHARED_EMAIL_PATH (absolute path to
// order-email.js) if the folder lives somewhere else.
const SHARED_EMAIL_PATH =
  process.env.SHARED_EMAIL_PATH ||
  path.resolve(process.cwd(), "../../shared-email/order-email.js");

let mailerPromise;

/** Resolves to the shared mailer function, or null where it isn't installed. */
function loadMailer() {
  if (!mailerPromise) {
    mailerPromise = import(
      /* webpackIgnore: true */ pathToFileURL(SHARED_EMAIL_PATH).href
    )
      .then((mod) => mod.sendOrderConfirmationEmail ?? null)
      .catch((err) => {
        console.warn(
          `[order-email] shared mailer not available at ${SHARED_EMAIL_PATH}:`,
          err?.message
        );
        mailerPromise = undefined; // retry on a later request
        return null;
      });
  }
  return mailerPromise;
}

export async function POST(request) {
  const sendOrderConfirmationEmail = await loadMailer();
  if (!sendOrderConfirmationEmail) {
    // Checkout treats this email as best-effort, so report it and move on.
    return Response.json(
      { success: false, error: "Order email service is not configured on this host." },
      { status: 503 }
    );
  }

  const { customer, order } = await request.json();
  const result = await sendOrderConfirmationEmail({
    domain: request.headers.get("host"),
    customer,
    order,
  });
  return Response.json(result, { status: result.success ? 200 : 502 });
}
