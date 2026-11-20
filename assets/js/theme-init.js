/* Runs before first paint so a saved light theme doesn't flash dark.
   Kept as a separate file (not inline) so the Content-Security-Policy can
   forbid inline scripts. Dark is the default. */
(function () {
  var theme = "dark";
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) {}
  document.documentElement.dataset.theme = theme;
})();
