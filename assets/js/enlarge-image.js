function wireImageOverrides(root = document) {
  root.querySelectorAll('img.image-override, .image-override img').forEach((img) => {
    if (!img) return;
    if (img.dataset.imageOverrideProcessed === "true") return;
    if (img.closest("a")) return;

    const src = img.currentSrc || img.getAttribute("src");
    if (!src) return;

    img.dataset.imageOverrideProcessed = "true";

    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "image-override-anchor";

    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  });
}

function initImageOverrides() {
  wireImageOverrides(document);

  const observer = new MutationObserver(() => {
    wireImageOverrides(document);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initImageOverrides);
} else {
  initImageOverrides();
}
