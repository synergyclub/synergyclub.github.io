const SYNERGY_VERSION = "v"+"1.3.6";

document.addEventListener("DOMContentLoaded", function () {
  // Target all spans with data-version attribute
  const versionElements = document.querySelectorAll("span[data-version]");
  versionElements.forEach(element => {
    element.textContent = SYNERGY_VERSION;
  });
});