import { h, svg } from "../lib/dom.js";
import { icon } from "../lib/icons.js";
import { isMissing, safeUrl } from "../lib/content.js";
import { toast } from "../ui/toast.js";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without the async clipboard API.
    const ta = h("textarea", { readonly: true, class: "sr-only" });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand && document.execCommand("copy");
    ta.remove();
    return !!ok;
  }
}

export function renderContact(root, { contact, socialLinks }) {
  const email = isMissing(contact.email) ? null : contact.email.trim();

  const emailBlock = email
    ? h(
        "div",
        { class: "email" },
        h("a", { class: "email__address", href: `mailto:${email}` }, email),
        h(
          "button",
          {
            type: "button",
            class: "btn btn--outline btn--sm",
            onclick: async (e) => {
              const ok = await copyText(email);
              toast(ok ? "Email address copied" : "Couldn't copy. Select the address and copy it manually.");
              if (ok) {
                const btn = e.currentTarget;
                btn.replaceChildren(svg(icon("check")), "Copied");
                setTimeout(() => btn.replaceChildren(svg(icon("copy")), "Copy email"), 2000);
              }
            },
          },
          svg(icon("copy")),
          "Copy email"
        )
      )
    : h("div", { class: "email" }, h("span", { class: "email__address ph", dataset: { placeholder: "Email address (social-links.js)" } }, "your.email@example.com"));

  const visible = socialLinks.filter((l) => !(l.optional && isMissing(l.url)));
  const socials = h(
    "ul",
    { class: "socials" },
    email ? h("li", {}, h("a", { class: "social", href: `mailto:${email}` }, svg(icon("mail")), h("span", {}, "Email"))) : null,
    visible.map((l) => {
      const href = safeUrl(l.url);
      return h(
        "li",
        {},
        href
          ? h("a", { class: "social", href, target: "_blank", rel: "noopener noreferrer" }, svg(icon(l.icon)), h("span", {}, l.label), l.handle ? h("span", { class: "social__handle" }, l.handle) : null, h("span", { class: "sr-only" }, " (opens in a new tab)"))
          : h("span", { class: "social social--placeholder", dataset: { placeholder: `${l.label} URL` }, title: "Link not added yet" }, svg(icon(l.icon)), h("span", {}, l.label), h("span", { class: "social__handle" }, "to add"))
      );
    })
  );

  // Composes a message in the visitor's email app. Nothing is sent by the site.
  const form = h(
    "form",
    { class: "compose", novalidate: true },
    h("h3", { class: "compose__title" }, "Write a message"),
    h("p", { class: "compose__note" }, "This opens your email app with the message filled in. Nothing is sent from this site."),
    field("Your name", "name", "text", { autocomplete: "name" }),
    field("Subject", "subject", "text", { value: "Opportunity" }),
    field("Message", "message", "textarea", { rows: 5, required: true }),
    h("p", { class: "compose__error", "aria-live": "polite" }),
    h("button", { type: "submit", class: "btn btn--primary", disabled: email ? null : true }, svg(icon("mail")), "Open in email app")
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const msg = String(data.get("message") || "").trim();
    const err = form.querySelector(".compose__error");
    if (!msg) {
      err.textContent = "Add a message before opening your email app.";
      form.querySelector("[name=message]").focus();
      return;
    }
    err.textContent = "";
    const name = String(data.get("name") || "").trim();
    const subject = String(data.get("subject") || "").trim() || "Hello";
    const body = name ? `${msg}\n\n${name}` : msg;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  root.append(
    h(
      "div",
      { class: "contact__grid" },
      h("div", { class: "contact__main" }, h("p", { class: "contact__message" }, contact.message), emailBlock, socials),
      form
    )
  );
}

function field(label, name, type, opts = {}) {
  const id = `f-${name}`;
  const control =
    type === "textarea"
      ? h("textarea", { id, name, rows: opts.rows, required: opts.required || null })
      : h("input", { id, name, type, autocomplete: opts.autocomplete || null, value: opts.value || null });
  return h("div", { class: "field" }, h("label", { for: id }, label), control);
}
