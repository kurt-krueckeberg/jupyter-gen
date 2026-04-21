function bindImageOverrideClicks(root = document) {
  root.querySelectorAll("img.image-override, .image-override img").forEach((img) => {
    if (img.dataset.imageOverrideBound === "true") return;
    img.dataset.imageOverrideBound = "true";

    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      const src = img.currentSrc || img.getAttribute("src");
      if (!src) return;
      window.open(src, "_blank", "noopener,noreferrer");
    });
  });
}

function initImageOverrideClicks() {
  bindImageOverrideClicks(document);

  const observer = new MutationObserver(() => {
    bindImageOverrideClicks(document);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initImageOverrideClicks);
} else {
  initImageOverrideClicks();
}
