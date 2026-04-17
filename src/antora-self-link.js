document.addEventListener("DOMContentLoaded", () => {
  function findImageInContainer(el) {
    if (!el) return null;
    if (el.tagName === "IMG") return el;
    return el.querySelector("img");
  }

  function makeClickable(container) {
    const img = findImageInContainer(container);
    if (!img) return;

    const src = img.getAttribute("src");
    if (!src) return;

    // Do not wrap twice
    if (img.closest("a")) return;

    // Prevent re-processing (important)
    if (img.dataset.selfLinkProcessed) return;
    img.dataset.selfLinkProcessed = "true";

    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "antora-self-link-anchor";

    img.parentNode.insertBefore(link, img);
    link.appendChild(img);

    img.style.cursor = "zoom-in";
  }

  // ONLY target intended elements (tight scope)
  document.querySelectorAll("img.antora-self-link").forEach(makeClickable);
  document.querySelectorAll(".antora-self-link").forEach(makeClickable);
});
