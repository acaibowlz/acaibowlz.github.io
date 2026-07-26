const dialog = document.createElement("dialog");
dialog.className = "lightbox";
dialog.innerHTML = '<img alt="">';
document.body.append(dialog);
const full = dialog.firstElementChild;

// Delegated from the document: one listener covers every image on the page,
// including any added later, without touching the Markdown-rendered markup.
document.addEventListener("click", (event) => {
  const image = event.target.closest(".body img");
  if (!image || image.closest("a")) return; // a linked image keeps its link
  full.src = image.currentSrc || image.src;
  full.alt = image.alt;
  dialog.showModal();
});
// Escape closes the dialog natively, so fade out on cancel too, not just click.
const fadeOut = (event) => {
  if (dialog.classList.contains("closing")) return;
  event.preventDefault();
  dialog.classList.add("closing");
  // Timer, not transitionend: that never fires if the transition is suppressed,
  // which would leave the modal stuck open. Keep in sync with main.css (0.2s).
  setTimeout(() => {
    dialog.classList.remove("closing");
    dialog.close();
  }, 200);
};
dialog.addEventListener("click", fadeOut);
dialog.addEventListener("cancel", fadeOut);
