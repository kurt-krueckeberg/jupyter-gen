document.addEventListener(
  "click",
  (event) => {
    const img = event.target.closest("img.image-override, .image-override img");
    if (!img) return;

    const src = img.currentSrc || img.getAttribute("src");
    if (!src) return;

    event.preventDefault();
    event.stopPropagation();

    window.open(src, "_blank", "noopener,noreferrer");
  },
  true
);
