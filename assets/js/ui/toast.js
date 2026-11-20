let region;
let timer;

export function toast(message) {
  if (!region) {
    region = document.createElement("div");
    region.className = "toast";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.append(region);
  }
  region.textContent = message;
  region.classList.add("is-visible");
  clearTimeout(timer);
  timer = setTimeout(() => region.classList.remove("is-visible"), 2600);
}
