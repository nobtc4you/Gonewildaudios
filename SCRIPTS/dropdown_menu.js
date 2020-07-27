function menuOpen() {
  if (document.getElementById("show").style.display === "block") {
    document.getElementById("show").style.cssText = "display:none;font-size:1em";
  } else {
      document.getElementById("show").style.cssText = "display:block;font-size:1em";
    };
};