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

    // Prevent re-processing
    if (img.dataset.imageOverrideProcessed) return;
    img.dataset.imageOverrideProcessed = "true";

    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "image-override-anchor";

    img.parentNode.insertBefore(link, img);
    link.appendChild(img);

    img.style.cursor = "zoom-in";
  }

  // Only target intended elements
  document.querySelectorAll("img.image-override").forEach(makeClickable);
  document.querySelectorAll(".image-override").forEach(makeClickable);
});
