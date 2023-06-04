const callNavigation = (path) => {
  if (path === "roman") {
    window.open("./pages/roman-numbers/roman.html", "_self");
  } else if (path === "game") {
    window.open("./pages/game-of-life/game-of-life.html", "_self");
  }
};
