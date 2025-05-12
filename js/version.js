// Set the version number here
const SYNERGY_VERSION = "1.0.4";

// Wait for DOMContentLoaded to ensure footer exists
document.addEventListener("DOMContentLoaded", function () {
  // Find or create the footer
  let footer = document.querySelector("footer[data-version]");
  if (!footer) {
    footer = document.createElement("footer");
    footer.setAttribute("data-version", "true");
    footer.style.textAlign = "center";
    footer.style.color = "#aaa";
    footer.style.marginTop = "40px";
    footer.style.marginBottom = "10px";
    footer.style.fontSize = "0.95rem";
    document.body.appendChild(footer);
  }
  footer.textContent = `Version ${SYNERGY_VERSION}`;
});