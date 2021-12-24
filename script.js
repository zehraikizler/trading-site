// navbar fixed

window.onscroll = function() {
  scrollFunction();
};

let navbar = document.getElementById("navbar");

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.style.position = "fixed";
    navbar.style.width = "100%";
    navbar.style.zIndex = "100";
  } else {
    navbar.style.position = "relative";
  }
}
