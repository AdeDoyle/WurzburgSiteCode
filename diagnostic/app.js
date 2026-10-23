document.addEventListener("DOMContentLoaded", () => {
  const biographies = document.querySelectorAll(".team-bio");

  biographies.forEach((biography) => {
    const text = biography.querySelector(".bio-text");
    const button = biography.querySelector(".bio-toggle");

    if (!text || !button) {
      return;
    }

    // Collapse the biography temporarily so we can check its height.
    text.classList.add("is-collapsed");

    // Show the button only if the biography exceeds the collapsed height.
    const isLong = text.scrollHeight > text.clientHeight + 1;

    if (!isLong) {
      text.classList.remove("is-collapsed");
      button.hidden = true;
      return;
    }

    button.hidden = false;

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        text.classList.add("is-collapsed");
        button.setAttribute("aria-expanded", "false");
        button.textContent = "See more";
      } else {
        text.classList.remove("is-collapsed");
        button.setAttribute("aria-expanded", "true");
        button.textContent = "See less";
      }
    });
  });
});