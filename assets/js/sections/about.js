import { h } from "../lib/dom.js";
import { isMissing, safeUrl } from "../lib/content.js";

export function renderAbout(root, { site }) {
  const a = site.about;
  const photoSrc = safeUrl(a.photo);

  // The photo is optional: with about.photo set to null, no photo or
  // placeholder is shown at all.
  const photo = photoSrc
    ? h("img", { class: "about__photo", src: photoSrc, alt: a.photoAlt, width: 480, height: 480, loading: "lazy", decoding: "async" })
    : null;

  root.append(
    h(
      "div",
      { class: "about__grid" },
      h(
        "div",
        { class: "about__aside" },
        photo,
        h(
          "dl",
          { class: ["facts", !photo && "facts--first"] },
          h("div", {}, h("dt", {}, "Studying"), h("dd", {}, a.education.degree)),
          h("div", {}, h("dt", {}, "At"), h("dd", {}, a.education.institution)),
          h("div", {}, h("dt", {}, "Year"), h("dd", {}, a.education.detail)),
          h(
            "div",
            {},
            h("dt", {}, "Graduating"),
            h("dd", {}, isMissing(a.education.graduation) ? h("span", { class: "ph", dataset: { placeholder: "Graduation date" } }, "Date to add") : a.education.graduation)
          ),
          h("div", {}, h("dt", {}, "Based in"), h("dd", {}, site.location))
        )
      ),
      h(
        "div",
        { class: "about__body prose" },
        a.bio.map((p) => h("p", {}, p)),
        h("h3", {}, "How I learn"),
        h("ul", { class: "approach" }, a.approach.map((x) => h("li", {}, x))),
        h("h3", {}, "What I want to do next"),
        h("ul", { class: "tags" }, a.careerInterests.map((x) => h("li", { class: "chip chip--soft" }, x)))
      )
    )
  );
}
