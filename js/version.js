const SYNERGY_VERSION = "1.3.0";

document.addEventListener("DOMContentLoaded", function () {
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