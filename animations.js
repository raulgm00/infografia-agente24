// Initialize AOS (Animate On Scroll)
// MIRROR: TRUE allows animations to happen every time you scroll up/down
AOS.init({
  mirror: true,
  offset: 100,
  duration: 800,
});

// Back to Top Button Logic
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    backToTopButton.style.display = "flex"; // Changed to flex to center svg
  } else {
    backToTopButton.style.display = "none";
  }
};
