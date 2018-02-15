var roll = document.querySelector(".roll");
var rollBoard = document.querySelector(".board img");
var hold = document.querySelector(".hold");
var slide = document.querySelector('.game-rules h3');

var player1 = new $game.player({
  roundBoard: document.querySelector(".pl1roundScore h6"),
  globalBoard: document.querySelector(".pl1globalScore"),
  backcolor: document.querySelector(".playerOne"),
  indicator: document.querySelector(".playerOne h3 span")

});
var player2 = new $game.player({
  roundBoard: document.querySelector(".pl2roundScore h6"),
  globalBoard: document.querySelector(".pl2globalScore"),
  backcolor: document.querySelector(".playerTwo"),
  indicator: document.querySelector(".playerTwo h3 span")
});

$game.init({
  player1: player1,
  player2: player2,
  rollBoard: rollBoard,
});

roll.addEventListener("click", $game.play);
hold.addEventListener("click", $game.hold);

var rules = document.querySelector('.rules');
slide.addEventListener("click", sliding);
slide.addEventListener("mouseenter", sliding)
function sliding() {
  if (rules.classList.contains("slideDown")) {
    rules.classList.add("slideUp");
    rules.classList.remove("slideDown");
  }
  else {
      rules.classList.add("slideDown");
      rules.classList.remove("slideUp");
  }
}
slide.addEventListener("mouseleave", function () {
  rules.classList.add("slideUp");
  rules.classList.remove("slideDown");

})
