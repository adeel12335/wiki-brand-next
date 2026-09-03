/**
 * Contact API validation smoke tests (no captcha keys required).
 * Usage: node --env-file=.env.local scripts/test-contact-validations.mjs
 * Requires: npm run dev (or a running server on CONTACT_TEST_BASE)
 */
const base = (
  process.env.CONTACT_TEST_BASE ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

const endpoint = `${base}/api/contact/`;

async function post(body) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

function assert(cond, label) {
  if (!cond) throw new Error(`FAIL: ${label}`);
  console.log(`OK  ${label}`);
}

const valid = {
  name: "Test User",
  email: "test@example.com",
  phone: "",
  subject: "Notability assessment",
  message:
    "This is a validation test message with enough length for the form.",
  website: "",
  captchaToken: "",
};

console.log(`Testing ${endpoint}`);

{
  const { status, json } = await post({});
  assert(status === 400, `empty body => 400 (got ${status})`);
  assert(json.errors?.name || json.errors?.email || json.errors?.message, "empty body has field errors");
}

{
  const { status, json } = await post({ ...valid, email: "not-an-email" });
  assert(status === 400, `bad email => 400 (got ${status})`);
  assert(json.errors?.email, "bad email error present");
}

{
  const { status, json } = await post({ ...valid, message: "too short" });
  assert(status === 400, `short message => 400 (got ${status})`);
  assert(json.errors?.message, "short message error present");
}

{
  const { status, json } = await post({ ...valid, website: "http://spam.example" });
  assert(status === 400, `honeypot => 400 (got ${status})`);
  assert(json.errors?.form, "honeypot form error present");
}

{
  const { status, json } = await post({ ...valid, subject: "Not a real option" });
  assert(status === 400, `bad subject => 400 (got ${status})`);
  assert(json.errors?.subject, "bad subject error present");
}

{
  const { status, json } = await post({ ...valid, name: "" });
  assert(status === 400, `missing name => 400 (got ${status})`);
  assert(json.errors?.name, "missing name error present");
}

console.log("All validation cases passed.");
