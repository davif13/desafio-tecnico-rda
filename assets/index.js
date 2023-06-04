const callNavigation = (path) => {
  if (path === "roman") {
    window.open("./pages/roman-numbers/roman.html", "_self");
  } else if (path === "game") {
    window.open("./pages/game-of-life/game-of-life.html", "_self");
  } else if (path === "bill") {
    window.open("./pages/bill-divider/bill-divider.html", "_self");
  } else if (path === "github") {
    window.open("https://github.com/davif13/desafio-tecnico-rda", "_self");
  } else {
    window.open("https://www.linkedin.com/in/davifernandez/", "_self");
  }
};
